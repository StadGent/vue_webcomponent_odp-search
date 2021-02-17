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
              <option v-for="({name, value}, i) in f.options"
                      :key="f.column + '-' + index + '-' + value + '-' + i"
                      :value="value">{{ name }}
              </option>
            </select>
          </div>

        </div>
        <button type="submit" class="button button-secondary icon-search icon-left">Zoeken</button>
      </form>

      <ul v-if="items.length" :style="horizontal ? 'margin-left: 0' : null" :class="horizontal ? null : 'grid-3'" tabindex="-1" ref="grid">
        <teaser v-for="(i, index) in items" @selected="setTrigger($event)" :teaser="i"
                :horizontal="horizontal"
                :key="'teaser'+index"></teaser>
      </ul>

      <pagination class="mt-20" :total="total" :active="page" @navigate="navigate"></pagination>

      <div v-if="loading" class="spinner-wrapper">
        <div class="spinner">
          <div>&hellip;loading</div>
        </div>
      </div>
    </div>

    <detail v-if="selectedRecord" @back="back()" :row="selectedRecord"></detail>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Pagination from '@/components/Pagination.vue'
import Teaser from '@/components/Teaser.vue'
import { Dataset } from '@/types/dataset'
import { FormField } from '@/types/formField'
import { Row } from '@/types/row'
import Detail from '@/components/Detail.vue'

export default Vue.extend({
  name: 'OdpMasterDetail',
  components: {
    Detail,
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
      default: 'Inhoud'
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
    theme: {
      type: String,
      default: 'cs--cyan'
    }
  },
  data () {
    return {
      items: [] as Row[],
      total: 0,
      offset: 0,
      loading: true,
      q: null,
      myFormFields: [] as FormField[],
      selectedRecord: null as (Row | null),
      trigger: null as (HTMLElement | null)
    }
  },
  watch: {
    formFields (v: FormField[]) {
      this.myFormFields = v
    }
  },
  computed: {
    page (): number {
      return Math.floor(this.offset / 12) + 1
    }
  },
  methods: {
    async fetch (): Promise<void> {
      this.loading = true
      this.items = []

      const fields = this.myFormFields.filter(f => !!f.value)

      let url = `${this.source}${this.dataset}&rows=12&start=${this.offset}${this.sort ? '&sort=' + this.sort : ''}&q=`

      if (this.query && this.q) {
        url += `${this.q}${fields?.length ? ' and ' : ''}`
      }
      url += fields.map((f: FormField) => `${f.column}:'${f.value}'`).join(' and ')

      const response = await fetch(url)
      if (!response.ok) {
        return
      }

      const {
        nhits,
        records
      }: Dataset = await response.json()
      this.total = Math.ceil(nhits / 12)
      this.items = records.map(({ fields }) => fields)

      /**
       * reset pagination if needed
       */
      if (nhits < this.offset) {
        this.offset = 0
        await this.fetch()
      }

      this.loading = false
    },
    async search (): Promise<void> {
      this.offset = 0
      await this.fetch();
      (this.$refs.grid as HTMLElement).focus()
    },
    setTrigger ({ currentTarget }: Event): void {
      this.trigger = currentTarget as HTMLElement
    },
    back (): void {
      location.hash = ''
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
      const row = this.items.find(i => encodeURIComponent(i.titel) === hash)
      if (row) {
        this.selectedRecord = row
      }
    },
    async navigate (page: number): Promise<void> {
      this.offset = (page - 1) * 12
      await this.fetch();
      (this.$refs.grid as HTMLElement).focus()
    }
  },
  async mounted (): Promise<void> {
    this.myFormFields = this.formFields
    await this.fetch()
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
      console.warn('DocFontsize is ' + docFontSize + '. Adjusting font-sizes now, but this impacts performance.')

      if (docFontSize === 20) {
        return
      }

      const docFontSizeAdjust = 20 / docFontSize
      const { shadowRoot } = this.$parent.$options as { shadowRoot: ShadowRoot}
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

// For some reason this font does not load in production mode.
// See demo/index.html for a 'fix'.
@font-face {
  font-family: "gent-icons-v4";
  src: url('~gent_styleguide/build/styleguide/fonts/gent-icons.woff2') format('woff2'), url('~gent_styleguide/build/styleguide/fonts/gent-icons.woff') format('woff');
}

// Override icon-styles and rename the font-family to avoid conflict with the host page.
@mixin icon-styles {
  font-family: "gent-icons-v4", "fira-sans", "sans-serif";
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  text-decoration: none;
  text-transform: none;
}

[class*='icon-'],
%icon {
  font-family: "gent-icons-v4", "fira-sans", "sans-serif";
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  text-decoration: none;
  text-transform: none;
}

@import "~gent_styleguide/build/styleguide/sass/atoms";
@import "~gent_styleguide/build/styleguide/sass/molecules";
@import "~gent_styleguide/build/styleguide/sass/organisms";
@import "~gent_styleguide/build/styleguide/sass/layouts";

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

</style>
