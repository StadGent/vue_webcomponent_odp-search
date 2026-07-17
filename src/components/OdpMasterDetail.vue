<template>
  <div :class="theme" class="odp-master-detail" ref="root">
    <div v-show="!selectedRecord">
      <form class="mb-20" @submit.prevent="search">
        <div class="flex mb-10">

          <div v-if="query">
            <label for="query">{{ query }}</label>
            <input v-model="q" type="text" id="query">
          </div>

          <div v-for="(f,index) in myFormFields" :key="f.column + '-' + index">
            <label :for="f.column">{{ f.label }}</label>
            <select v-if="!f.type || f.type === 'select'" v-model="f.value" :id="f.column">
              <option :value="null">Geen keuze</option>
              <option v-for="({name, value}, i) in splitOptions(f.options)"
                      :key="f.column + '-' + index + '-' + value + '-' + i"
                      :value="value">{{ name }}
              </option>
            </select>
          </div>

        </div>
        <button type="submit" class="button button-secondary icon-search icon-left">Zoeken</button>
      </form>

      <div style="position: relative">
        <div v-if="hasMap" class="map-toggle--top">
          <button v-show="!showMap" class="button button-primary button-small icon-marker" @click="showMap = true"
                  style="margin-left: auto">Toon op kaart
          </button>
          <button v-show="showMap" class="button button-primary button-small icon-document" @click="showMap = false"
                  style="margin-left: auto">Toon als lijst
          </button>
        </div>

        <p v-if="noResult" class="mb-20 mt-20"><strong>Deze zoekopdracht leverde geen resultaten op.</strong></p>

        <odp-map v-if="hasMap" v-show="showMap && allItems.length > 0" :show="showMap && allItems.length > 0" class="odp-map" :items="allItems"></odp-map>

        <ul v-if="items.length && !random" v-show="!showMap" :style="horizontal ? 'margin-left: 0' : null"
            class="is-ordered"
            :class="horizontal ? null : 'grid-3'" tabindex="-1" ref="grid">
          <teaser v-for="(i, index) in items" @selected="setTrigger($event)" :teaser="i"
                  :horizontal="horizontal"
                  :key="'teaser'+index" :images="images"></teaser>
        </ul>

        <ul v-if="items.length && random " v-show="!showMap" :style="horizontal ? 'margin-left: 0' : null"
            class="is-random"
            :class="horizontal ? null : 'grid-3'" tabindex="-1" ref="grid">
          <teaser v-for="(i, index) in randomList(items)" @selected="setTrigger($event)" :teaser="i"
                  :horizontal="horizontal"
                  :key="'teaser'+index" :images="images"></teaser>
        </ul>

        <div v-if="hasMap" class="map-toggle--bottom">
          <button v-show="!showMap" class="button button-primary button-small icon-marker" @click="showMap = true"
                  style="margin-left: auto">Toon op kaart
          </button>
          <button v-show="showMap" class="button button-primary button-small icon-document" @click="showMap = false"
                  style="margin-left: auto">Toon als lijst
          </button>
        </div>
      </div>

      <pagination v-show="!showMap" class="mt-20" :total="total" :active="page" @navigate="navigate"></pagination>

      <div v-if="loading" class="spinner-wrapper">
        <div class="spinner">
          <div>&hellip;loading</div>
        </div>
      </div>
    </div>
    <detail v-if="selectedRecord" :key="selectedRecord.recordid" @back="back()" :row="selectedRecord"></detail>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Pagination from '@/components/Pagination.vue'
import Teaser from '@/components/Teaser.vue'
import Detail from '@/components/Detail.vue'
import { Dataset } from '@/types/dataset'
import { FormField, Option } from '@/types/formField'
import { Row } from '@/types/row'

export default Vue.extend({
  name: 'OdpMasterDetail',
  components: {
    Detail,
    OdpMap: () => import('@/components/Map.vue'),
    Teaser,
    Pagination
  },
  props: {
    source: {
      type: String,
      default: 'https://data.stad.gent/api/records/1.0/search/?dataset='
    },
    dataset: {
      type: String,
      required: true
    },
    query: {
      type: String,
      default: 'Zoek op trefwoord'
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    formFields: {
      type: Array as PropType<FormField[]>,
      default: () => []
    },
    sort: {
      type: String,
      required: false
    },
    random: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'cs--cyan'
    }
  },
  data () {
    return {
      items: [] as Row[],
      allItems: [] as Row[],
      images: false,
      total: 0,
      offset: 0,
      loading: true,
      noResult: true,
      q: null as string | null,
      myFormFields: [] as FormField[],
      selectedRecord: null as (Row | null),
      trigger: null as (HTMLElement | null),
      showMap: false,
      hasMap: false,
      currentSort: null as string | null
    }
  },
  watch: {
    formFields: {
      immediate: true,
      deep: true,
      handler (v: FormField[]) {
        this.myFormFields = v.map(f => ({
          ...f,
          value: f.value ?? undefined
        }))

        // URL must be applied AFTER fields exist - fields are added in drupal
        const hash = window.location.hash.replace('#', '')
        if (hash) {
          this.fetch(false).then(async () => {
            const row = this.items.find(i => i.recordid === hash)
            if (row) {
              this.selectedRecord = row
              this.$emit('detail', JSON.parse(JSON.stringify(row)))
            }
          })
        } else {
          this.applyQueryParams()
          this.offset = 0
          this.fetch(true).then(async () => {
            if (this.hasMap) {
              await this.fetchAll()
            }
          })
        }
      }
    }
  },
  computed: {
    page (): number {
      return Math.floor(this.offset / 12) + 1
    }
  },
  methods: {
    randomList (rand: unknown[]) {
      return rand.slice().sort(() => 0.5 - Math.random())
    },

    splitOptions (options: Array<Option | string>): Option[] {
      if (!options) { return [] }
      return options.map((o: Option | string) =>
        typeof o === 'string' ? { name: o, value: o } : o
      )
    },
    applyQueryParams (): void {
      const params = new URLSearchParams(window.location.search)

      const rawQ = params.get('q')
      const page = params.get('page')
      const sort = params.get('sort')

      // sort (LOCAL STATE)
      if (sort) {
        this.currentSort = sort
      }

      // paging
      if (page) {
        const p = parseInt(page, 10)
        if (!isNaN(p) && p > 0) {
          this.offset = (p - 1) * 12
        }
      } else {
        this.offset = 0
      }

      if (!rawQ) return

      const regex = /([\w-]+):'([^']+)'/g
      const filters: Array<{ column: string; value: string }> = []

      let match: RegExpExecArray | null

      while ((match = regex.exec(rawQ)) !== null) {
        filters.push({
          column: match[1],
          value: match[2]
        })
      }

      // Apply the query params to the form fields.
      // This allows users to visually see that the form field are prefilled.
      this.myFormFields.forEach(field => {
        const found = filters.find(f => f.column === field.column)

        if (found) {
          field.value = this.normalizeValue(found.value, field.options)
          this.$set(this.myFormFields, this.myFormFields.indexOf(field), field)
        }
      })

      // Prefill the free search textbox when available in the query params.
      let freeSearch = rawQ.replace(regex, '')

      freeSearch = freeSearch
        .replace(/\sand\s/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

      this.q = freeSearch || null
    },
    buildQueryParams (): URLSearchParams {
      const params = new URLSearchParams()

      const page = Math.floor(this.offset / 12) + 1
      params.set('page', String(page))

      const parts: string[] = []

      if (this.q) parts.push(this.q)

      this.myFormFields
        .filter(f => !!f.value)
        .forEach(f => {
          parts.push(`${f.column}:'${f.value}'`)
        })

      if (parts.length) {
        params.set('q', parts.join(' and '))
      }

      if (this.currentSort) {
        params.set('sort', this.currentSort)
      }

      return params
    },
    updateUrl (): void {
      const params = this.buildQueryParams()

      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${params.toString()}${window.location.hash}`
      )
    },
    createUrl (paged: boolean): string {
      const fields = this.myFormFields.filter(f => !!f.value)

      let url

      if (paged) {
        url = `${this.source}${this.dataset}&rows=12&start=${this.offset}${this.sort ? '&sort=' + this.sort : ''}&q=`
      } else {
        url = `${this.source}${this.dataset}&rows=1000${this.sort ? '&sort=' + this.sort : ''}&q=`
      }

      if (this.q) {
        url += this.q + (fields.length ? ' and ' : '')
      }

      url += fields
        .map(f => `${f.column}:'${f.value}'`)
        .join(' and ')

      return url
    },
    normalizeValue (value: string, options: Array<Option | string>) {
      const list = this.splitOptions(options)
      const match = list.find(o => String(o.value) === String(value))
      return match ? match.value : value
    },
    async fetchAll (): Promise<void> {
      this.allItems = []
      const url = this.createUrl(false)
      const response = await fetch(url)
      if (!response.ok) {
        this.allItems = []
        this.noResult = true
        this.loading = false
        this.total = 0
        return
      }

      const { records }: Dataset = await response.json()
      this.noResult = records.length === 0

      this.allItems = records.map(({ fields, recordid }) => ({
        ...fields,
        recordid, // Ensure recordid is included.
        beschrijving: fields.beschrijving || '', // Ensure beschrijving is present.
        imageUrl: fields.image_url || '' // Ensure image_url is present.
      }))

      // Only ever set hasMap to true, never back to false.
      // Once the dataset is known to have coordinates, keep the map
      // component mounted so the OpenLayers instance isn't destroyed
      // when a filter temporarily yields zero results.
      if (!this.hasMap) {
        this.hasMap = !!this.allItems[0]?.coordinates
      }
    },
    async fetch (paged: boolean): Promise<void> {
      this.loading = true
      this.items = []

      const url = this.createUrl(paged)
      const response = await fetch(url)

      if (!response.ok) {
        this.noResult = true
        this.loading = false
        this.total = 0
        return
      }

      const { nhits, records }: Dataset = await response.json()

      this.noResult = records.length === 0
      this.total = Math.ceil(nhits / 12)
      this.items = records.map(({ fields }) => ({
        ...fields,
        beschrijving: fields.beschrijving || '', // Ensure beschrijving is present.
        imageUrl: fields.image_url || '' // Ensure image_url is present.
      }))

      for (let i = 0; i < records.length; i++) {
        this.items[i].recordid = records[i].recordid
      }

      // Only ever set hasMap to true, never back to false.
      // Once the dataset is known to have coordinates, keep the map
      // component mounted so the OpenLayers instance isn't destroyed
      // when a filter temporarily yields zero results.
      if (!this.hasMap) {
        this.hasMap = !!this.items[0]?.coordinates
      }
      this.images = false

      for (let i = 0; i < this.items.length; i++) {
        if ((this.images = !!this.items[i]?.teaser_img_url) === true) {
          break
        }
      }

      /**
       * reset pagination if needed
       */
      if (nhits < this.offset) {
        this.offset = 0
        await this.fetch(false)
      }

      this.loading = false
    },
    async firstFetch (): Promise<void> {
      this.offset = 0
      this.emitFilter()
      const hash = window.location.hash.replace('#', '')
      const paged = !hash

      await this.fetch(paged)
      if (this.hasMap) {
        await this.fetchAll()
      }
    },
    async search (): Promise<void> {
      this.offset = 0
      await this.firstFetch()
      const grid = this.$refs.grid as HTMLElement
      if (grid) {
        grid.focus()
      }
      this.updateUrl()
    },
    async navigate (page: number): Promise<void> {
      this.offset = (page - 1) * 12
      await this.fetch(true)
      const grid = this.$refs.grid as HTMLElement
      if (grid) {
        grid.focus()
      }
      this.updateUrl()
    },
    setTrigger ({ currentTarget }: Event): void {
      this.trigger = currentTarget as HTMLElement
    },
    async back (): Promise<void> {
      location.hash = ''
      this.applyQueryParams()
      await this.fetch(true)
    },
    onHashChange (): void {
      const hash = window.location.hash.replace('#', '')
      if (!hash) {
        this.selectedRecord = null
        setTimeout(() => {
          if (this.trigger !== null) {
            this.trigger.focus()
          }
        })
        return
      }

      const row = this.items.find(i => i.recordid === hash)
      if (row) {
        this.selectedRecord = row
        this.$emit('detail', JSON.parse(JSON.stringify(row)))
      }
    },
    emitFilter (): void {
      const formValue: Record<string, unknown> = {
        q: this.q
      }
      this.myFormFields.forEach((f: FormField) => {
        formValue[f.column] = f.value
      })
      this.$emit('filter', formValue)
    }
  },

  async mounted (): Promise<void> {
    this.myFormFields = this.formFields

    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const row = this.items.find(i => i.recordid === hash)
      if (row) {
        this.selectedRecord = row
        this.$emit('detail', JSON.parse(JSON.stringify(row)))
      }
    } else {
      await this.$nextTick()
      this.applyQueryParams()
      await this.$nextTick()
    }

    window.addEventListener('hashchange', this.onHashChange)
    this.onHashChange()

    /**
     * Gent_styleguide expects a document font-size of 20px
     * and uses REM for all styling.
     *
     * If the document embedding this component does not have a 20px font-size,
     * this part will increase all REM values in all CSS rules.
     * Obviously, this is to be avoided...
     */
    try {
      const docFontSize = +getComputedStyle(document.documentElement).fontSize.replace('px', '')
      // eslint-disable-next-line
      console.warn('DocFontsize is ' + docFontSize + '. Adjusting font-sizes now, but this impacts performance.')

      if (docFontSize === 20) {
        return
      }

      const docFontSizeAdjust = 20 / docFontSize
      const { shadowRoot } = this.$parent.$options as { shadowRoot: ShadowRoot }
      const sheets = shadowRoot.styleSheets

      const changeRule = (rule: CSSRule) => {
        if (rule instanceof CSSStyleRule) {
          const style = rule.style
          style.cssText = style.cssText.replace(/(\d*[.]*\d*)(rem[ ;})])/g, (match, p1, p2) => (p1 * docFontSizeAdjust) + p2)
        } else if (rule instanceof CSSMediaRule) {
          for (let i = rule.cssRules.length; i--;) {
            changeRule(rule.cssRules[i])
          }
        }
      }

      for (let i = sheets.length; i--;) {
        const sheet = sheets[i]
        for (let i = sheet.cssRules.length; i--;) {
          changeRule(sheet.cssRules[i])
        }
      }
    } catch (e) {
      // eslint-disable-next-line
      console.error(e)
    }
  }
})
</script>

<style lang="scss">
$styleguide-dir: '../../node_modules/gent_styleguide/build/styleguide';

@import '~gent_styleguide/build/styleguide/sass/settings';
@import '~gent_styleguide/build/styleguide/sass/mixins';
@import '~gent_styleguide/build/styleguide/sass/base';
@import "~gent_styleguide/build/styleguide/sass/atoms";
@import "~gent_styleguide/build/styleguide/sass/molecules";
@import "~gent_styleguide/build/styleguide/sass/organisms";
@import "~gent_styleguide/build/styleguide/sass/layouts";

// Styleguide unreleased
.teaser .teaser-content span.teaser-label {
  line-height: 1.5;
  padding: .2em .5em;
  max-width: calc(100% - 2rem);
}

@import "../styles/map";

.teaser-content .icon-list {
  margin: .8rem 0;
}

.teaser.teaser--wide:first-of-type {
  border-top: 0;
}

.teaser.teaser--wide .tag {
  margin-bottom: 0;
}

.map-toggle--top {
  position: relative;
  text-align: center;
  background-color: #ffffff;
  border-bottom: 2px solid;
}

.map-toggle--bottom,
.map-toggle--top {
  position: sticky;
  z-index: 5;
  text-align: center;
  background-color: #ffffff;
}

.map-toggle--top {
  @include theme('border-color', 'color-primary--lighten-4', 'contact-details-border-color');
  display: none;
  top: 0;
  border-bottom: 2px solid;
  padding: 1rem;
  margin-bottom: 1rem;
  @include tablet {
    display: block;
  }
}

.map-toggle--bottom {
  @include theme('border-color', 'color-primary--lighten-4', 'contact-details-border-color');
  display: block;
  bottom: 0;
  border-top: 2px solid;
  padding: 1rem;
  margin-bottom: 1rem;
  @include tablet {
    display: none;
  }
}

.odp-map {
  @include tablet {
    margin-top: -1rem;
  }
}

.odp-master-detail {
  font: 400 .8rem "Fira Sans", "sans-serif";
  box-sizing: border-box;
  position: relative;
}

.spinner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, .8);
  animation: fade .5s ease-out forwards;
  z-index: 2;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

.action-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.display-switcher {
  align-items: center;
}

</style>
