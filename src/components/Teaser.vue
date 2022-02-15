<template>
  <component :is="tagName || 'li'" class="teaser"
             :class="[
               !this.images && !horizontal && !teaser.teaser_img_url ? 'teaser--underlined' : null,
               horizontal ? 'teaser--wide' : null
             ]">
    <article class="teaser-content">
      <div class="content__second">
        <h3>{{ teaser.titel }}</h3>
        <div class="tag-list-wrapper mb-8" v-if="(horizontal || !teaser.teaser_img_url) && tags && tags.length">
          <ul class="tag-list">
            <li v-for="(tag, index) of tags" :key="index + tag">
              <span class="tag">{{ tag }}</span>
            </li>
          </ul>
        </div>
        <ul class="icon-list" v-if="teaser.adres || teaser.totale_capaciteit">
          <li v-if="teaser.adres">
            <i class='icon-marker' aria-hidden="true"></i>
            <template> {{ teaser.adres }}</template>
            <template v-if="teaser.postcode || teaser.gemeente">,</template>
            <template v-if="teaser.postcode"> {{ teaser.postcode }}</template>
            <template v-if="teaser.gemeente"> {{ teaser.gemeente }}</template>
          </li>
          <li v-if="teaser.totale_capaciteit">
            <i class='icon-users' aria-hidden="true"></i>
            <template v-if="teaser.totale_capaciteit && teaser.gereserveerde_plaatsen && teaser.datum_reservatie">{{ teaser.gereserveerde_plaatsen }} / {{ teaser.totale_capaciteit }} gereserveerd op {{ moment(teaser.datum_reservatie, 'YYYY-MM-DD').format('DD/MM/YYYY') }}</template>
            <template v-else-if="teaser.totale_capaciteit && teaser.gereserveerde_plaatsen">{{ teaser.gereserveerde_plaatsen }} / {{ teaser.totale_capaciteit }} gereserveerd</template>
            <template v-else>{{ teaser.totale_capaciteit }}</template>
          </li>
        </ul>
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
        <p v-if="teaser.teaser_text">{{ teaser.teaser_text }}</p>
        <a :href="readMore" @click="$emit('selected', $event)" class="read-more standalone-link">
          Lees meer <span class="visually-hidden">over {{ teaser.titel }}</span>
        </a>
      </div>
      <div class="content__first" v-if="teaser.teaser_img_url">
        <span class="teaser-label" v-if="label">{{ label }}</span>
        <div class="figure-wrapper">
          <figure>
            <div class="image-wrapper" data-ratio="8:5">
              <img :src="teaser.teaser_img_url" alt="">
            </div>
          </figure>
          <div v-if="horizontal" class="accolade-inverse right-top"></div>
          <div class="accolade-inverse bottom-left"></div>
        </div>
        <div class="tag-list-wrapper" v-if="!horizontal && tags && tags.length">
          <ul class="tag-list">
            <li v-for="(tag, index) of tags" :key="index + tag">
              <span class="tag">{{ tag }}</span>
            </li>
          </ul>
        </div>
      </div>
    </article>
    <a :href="readMore"
       @click="$emit('selected', $event)"
       class="teaser-overlay-link"
       tabindex="-1"
       aria-hidden="true">{{ teaser.titel }}</a>
  </component>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Row } from '@/types/row'
import moment from 'moment'

export default Vue.extend({
  name: 'Teaser',
  props: {
    teaser: Object as PropType<Row>,
    horizontal: Boolean,
    images: Boolean,
    tagName: String,
    tag1hidden: {
      type: String
    },
    tag2hidden: {
      type: String
    },
    tag3hidden: {
      type: String
    },
    label1hidden: {
      type: String
    },
    label2hidden: {
      type: String
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
    label (): string {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const { label_1, label_2, label1hidden, label2hidden } = this.teaser
      // eslint-disable-next-line @typescript-eslint/camelcase
      const label1 = (label1hidden === undefined || label1hidden === 'false') ? label_1 : ''
      // eslint-disable-next-line @typescript-eslint/camelcase
      const label2 = (label2hidden === undefined || label2hidden === 'false') ? label_2 : ''

      return [label1, label2].filter(l => !!l).join(' - ')
    },
    tags (): string[] {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const { tag_1, tag_2, tag_3, tag1hidden, tag2hidden, tag3hidden } = this.teaser
      const tag1 = (tag1hidden === undefined || tag1hidden === 'false') ? [...tag_1?.split(',') || []] : []
      const tag2 = (tag2hidden === undefined || tag2hidden === 'false') ? [...tag_2?.split(',') || []] : []
      const tag3 = (tag3hidden === undefined || tag3hidden === 'false') ? [...tag_3?.split(',') || []] : []
      return [...tag1, ...tag2, ...tag3].filter(t => !!t).map(t => t.trim())
    },
    openingHours (): string[] {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const { openingsuren } = this.teaser
      const openingHours = [...openingsuren?.split(',') || []]
      return openingHours
    },
    readMore (): string {
      return this.teaser.lees_meer || '#' + encodeURIComponent(this.teaser.titel)
    }
  }
})
</script>
