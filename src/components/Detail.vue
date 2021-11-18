<template>
  <div class="detail-layout">

    <div class="action-header">
      <h2 tabindex="-1" ref="title" id="detail-header" style="margin-right: 2rem">{{ row.titel }}</h2>
      <button ref="test" @click="$emit('back')" class="mb-8 button button-secondary icon-left icon-arrow-left">Terug
      </button>
    </div>

    <div v-if="labels.length">
      <ul class="dash-separated-list">
        <li v-for="(label, index) of labels" :key="index + label">{{ label }}</li>
      </ul>
    </div>

    <div v-html="row.beschrijving"></div>

    <div v-if="tags.length" class="tag-list-wrapper">
      <ul class="tag-list">
        <li v-for="(tag, index) of tags" :key="index + tag">
          <span class="tag">{{ tag }}</span>
        </li>
      </ul>
    </div>

    <div v-if="row.totale_capaciteit">
      <ul class="icon-list">
        <li v-if="row.totale_capaciteit">
          <i class='icon-users' aria-hidden="true"></i>
          <template v-if="teaser.totale_capaciteit && teaser.gereserveerde_plaatsen && teaser.datum_reservatie">{{ teaser.gereserveerde_plaatsen }} / {{ teaser.totale_capaciteit }} gereserveerd op {{ teaser.datum_reservatie }}</template>
          <template v-else-if="teaser.totale_capaciteit && teaser.gereserveerde_plaatsen">{{ teaser.gereserveerde_plaatsen }} / {{ teaser.totale_capaciteit }} gereserveerd</template>
          <template v-else>{{ row.totale_capaciteit }}</template>
        </li>
      </ul>
    </div>

            <div class="opening-hours-accordion">
          <div class="opening-hours-accordion__item">
            <div class="openinghours-wrapper">
              <div id="opening-hours" role="tabpanel">
                <div class="openinghours-widget" data-type="day" v-if="openingHours.length > 0">
                    <div class="openinghours openinghours--details openinghours--day-open" property="openingHoursSpecification" typeof="OpeningHoursSpecification">
                        <div class="openinghours--date openinghours--special-day" property="validFrom validThrough" :datetime="getDateTime()">
                            <span class="openinghours--date-special-day">Vandaag </span>
                            <span class="openinghours--date-between">, </span>
                            <span class="openinghours--date-day-of-week">
                              <link property="dayOfWeek" :href="'http://schema.org/' + moment(getDateTime(), 'YYYY-MM-DD').format('dddd')">{{ moment(getDateTime(), 'YYYY-MM-DD').format('dddd') }}
                            </span>
                            <span class="openinghours--date-day">{{ moment(getDateTime(), 'YYYY-MM-DD').format('D') }}</span>
                            <span class="openinghours--date-month">{{ moment(getDateTime(), 'YYYY-MM-DD').format('MMMM') }}</span>
                        </div>
                        <div class="openinghours--content">
                            <div class="openinghours--times">
                                <span class="openinghours--status">open</span>
                                <div class="openinghours--time" v-for="(openingHour, index) of openingHours" :key="index + openingHour">
                                    <span class="openinghours--time-prefix">from</span>
                                    <time v-if="startHour(openingHour)" property="opens" :datetime="startHour(openingHour)" :aria-label="startHour(openingHour)">
                                        {{ startHour(openingHour) }} u. </time>
                                    <span class="openinghours--time-separator">to</span>
                                    <time property="closes" :datetime="endHour(openingHour)" :aria-label="endHour(openingHour)">
                                        {{ endHour(openingHour) }} u.</time>
                                    <div v-if="openingHours.length > 2 && index != Object.keys(openingHours).length - 1 && index != Object.keys(openingHours).length - 2" class="openinghours--times-between">,</div>
                                    <div v-if="openingHours.length > 1 && index == Object.keys(openingHours).length - 2" class="openinghours--times-between"> en</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    <section class="highlight contact-details contact-details-inverted highlight--top">
      <div class="highlight__inner">
        <h2>Contactgegevens</h2>
        <div class="contact-details-column">
          <ul class="icon-list contact-details-inverted">
            <li v-if="row.adres || row.postcode || row.gemeente">
              <i class='icon-marker' aria-hidden="true"></i>
              <template v-if="row.adres">{{ row.adres }}</template>
              <template v-if="row.postcode || row.gemeente">,</template>
              <template v-if="row.postcode"> {{ row.postcode }}</template>
              <template v-if="row.gemeente"> {{ row.gemeente }}</template>
            </li>
            <li v-if="row.telefoon">
              <i class="icon-phone" aria-hidden="true"></i>
              <a :href="'tel:' + row.telefoon.split(' ').join()">{{ row.telefoon }}</a>
            </li>
            <li v-if="row.email">
              <i class="icon-envelope" aria-hidden="true"></i>
              <a :href="'mailto:' + row.email.trim()">{{ row.email }}</a>
            </li>
            <li v-if="row.website">
              <i class="icon-url" aria-hidden="true"></i>
              <a :href="row.website">{{ row.website }}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <figure v-if="row.image_url">
      <img :src="row.image_url" alt="">
    </figure>
    <div>
      <button ref="test" @click="$emit('back')" class="mb-8 button button-primary icon-left icon-arrow-left">Terug
      </button>
    </div>

  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Row } from '@/types/row'
import moment from 'moment'

export default Vue.extend({
  name: 'Detail',
  props: {
    row: {
      required: true,
      type: Object as PropType<Row>
    }
  },
  methods: {
    getDateTime () {
      const today = new Date()
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

      return date
    },
    startHour (openingHour: string): string {
      const startHour = openingHour ? openingHour?.split(' - ')[0] : ''
      return startHour
    },
    endHour (openingHour: string): string {
      const endHour = openingHour ? openingHour?.split(' - ')[1] : ''
      return endHour
    }
  },
  computed: {
    moment: () => moment,
    labels (): string[] {
      return [this.row.label_1, this.row.label_2].filter(l => !!l) as string[]
    },
    openingHours (): string[] {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const { openingsuren } = this.row
      const openingHours = [...openingsuren?.split(',') || []]
      return openingHours
    },
    tags (): string[] {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const { tag_1, tag_2, tag_3 } = this.row
      return [...tag_1?.split(',') || [], ...tag_2?.split(',') || [], ...tag_3?.split(',') || []].filter(t => !!t).map(t => t.trim())
    }
  },
  mounted () {
    (this.$refs.title as HTMLElement).focus()
  }
})
</script>
