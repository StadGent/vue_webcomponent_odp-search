<template>
  <component :is="tagName || 'li'" class="teaser" :class="[teaser.teaser_img_url ? '': 'teaser--underlined', horizontal ? 'teaser--wide' : '']">
    <article class="teaser-content">
      <div class="content__second">
        <h3>{{ teaser.titel }}</h3>
        <div class="tag-list-wrapper mb-4" v-if="horizontal && tags && tags.length">
          <ul class="tag-list">
            <li v-for="(tag, index) of tags" :key="index + tag">
              <span class="tag">{{ tag }}</span>
            </li>
          </ul>
        </div>
        <div class="mb-8" v-if="teaser.adres || teaser.telefoon">
          <ul class="icon-list">
            <li v-if="teaser.adres">
              <i class='icon-marker'></i><span> {{ teaser.adres }}</span>
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
import { Teaser } from '@/types/teaser'

export default Vue.extend({
  name: 'Teaser',
  props: { teaser: Object as PropType<Teaser>, horizontal: Boolean, tagName: String },
  methods: {},
  computed: {
    label (): string {
      return [this.teaser.label_1, this.teaser.label_2].filter(l => !!l).join(' - ')
    },
    tags (): string[] {
      return [this.teaser.tag_1, this.teaser.tag_2, this.teaser.tag_3].filter(t => !!t) as string[]
    },
    readMore (): string {
      return this.teaser.lees_meer || '#' + encodeURIComponent(this.teaser.titel)
    }
  }
})
</script>
