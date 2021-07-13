<template>
  <component :is="tagName || 'li'" class="teaser"
             :class="[
               !horizontal && !teaser.teaser_img_url ? 'teaser--underlined' : null,
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
        <ul class="icon-list" v-if="teaser.adres">
          <li v-if="teaser.adres">
            <i class='icon-marker' aria-hidden="true"></i>
            <template> {{ teaser.adres }}</template>
            <template v-if="teaser.postcode || teaser.gemeente">,</template>
            <template v-if="teaser.postcode"> {{ teaser.postcode }}</template>
            <template v-if="teaser.gemeente"> {{ teaser.gemeente }}</template>
          </li>
        </ul>
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

export default Vue.extend({
  name: 'Teaser',
  props: {
    teaser: Object as PropType<Row>,
    horizontal: Boolean,
    tagName: String,
    tag1Hidden: {
      type: Boolean
    },
    tag2Hidden: {
      type: Boolean
    },
    tag3Hidden: {
      type: Boolean
    },
    label1Hidden: {
      type: Boolean
    },
    label2Hidden: {
      type: Boolean
    }
  },
  methods: {},
  computed: {
    label (): string {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const { label_1, label_2, label1Hidden, label2Hidden } = this.teaser
      // eslint-disable-next-line @typescript-eslint/camelcase
      const label1 = (label1Hidden === undefined || label1Hidden === false) ? label_1 : ''
      // eslint-disable-next-line @typescript-eslint/camelcase
      const label2 = (label2Hidden === undefined || label2Hidden === false) ? label_2 : ''

      console.log(label1, label2)
      return [label1, label2].filter(l => !!l).join(' - ')
    },
    tags (): string[] {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const { tag_1, tag_2, tag_3, tag1Hidden, tag2Hidden, tag3Hidden } = this.teaser
      const tag1 = (tag1Hidden === undefined || tag1Hidden === false) ? [...tag_1?.split(',') || []] : []
      const tag2 = (tag2Hidden === undefined || tag2Hidden === false) ? [...tag_2?.split(',') || []] : []
      const tag3 = (tag3Hidden === undefined || tag3Hidden === false) ? [...tag_3?.split(',') || []] : []
      return [...tag1, ...tag2, ...tag3].filter(t => !!t).map(t => t.trim())
    },
    readMore (): string {
      return this.teaser.lees_meer || '#' + encodeURIComponent(this.teaser.titel)
    }
  }
})
</script>
