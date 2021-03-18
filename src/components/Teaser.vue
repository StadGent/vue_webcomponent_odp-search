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
        <div class="mb-8" v-if="teaser.adres || teaser.telefoon">
          <ul class="icon-list">
            <li v-if="teaser.adres">
              <i class='icon-marker' aria-hidden="true"></i>
              <template> {{ teaser.adres }}</template>
              <template v-if="teaser.postcode || teaser.gemeente">,</template>
              <template v-if="teaser.postcode"> {{ teaser.postcode }}</template>
              <template v-if="teaser.gemeente"> {{ teaser.gemeente }}</template>
            </li>
            <li v-if="teaser.telefoon">
              <i class="icon-phone"></i><a :href="'tel:'+teaser.telefoon">{{ teaser.telefoon }}</a>
            </li>
          </ul>
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

export default Vue.extend({
  name: 'Teaser',
  props: { teaser: Object as PropType<Row>, horizontal: Boolean, tagName: String },
  methods: {},
  computed: {
    label (): string {
      return [this.teaser.label_1, this.teaser.label_2].filter(l => !!l).join(' - ')
    },
    tags (): string[] {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const { tag_1, tag_2, tag_3 } = this.teaser
      return [...tag_1?.split(',') || [], ...tag_2?.split(',') || [], ...tag_3?.split(',') || []].filter(t => !!t).map(t => t.trim())
    },
    readMore (): string {
      return this.teaser.lees_meer || '#' + encodeURIComponent(this.teaser.titel)
    }
  }
})
</script>
