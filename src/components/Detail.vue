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

    <section class="highlight contact-details contact-details-inverted highlight--top">
      <div class="highlight__inner">
        <h2>Contactgegevens</h2>
        <div class="contact-details-column">
          <ul class="icon-list contact-details-inverted">
            <li>
              <i class="icon-marker" aria-hidden="true"></i>
              {{ row.adres }}, {{ row.postcode }} {{ row.gemeente }}
            </li>
            <li v-if="row.telefoon">
              <i class="icon-phone" aria-hidden="true"></i>
              <a :href="'tel:' + row.telefoon.split(' ').join()">{{ row.telefoon }}</a>
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

export default Vue.extend({
  name: 'Detail',
  props: {
    row: {
      required: true,
      type: Object as PropType<Row>
    }
  },
  computed: {
    labels (): string[] {
      return [this.row.label_1, this.row.label_2].filter(l => !!l) as string[]
    },
    tags (): string[] {
      return [this.row.tag_1, this.row.tag_2, this.row.tag_3].filter(t => !!t) as string[]
    }
  },
  mounted () {
    (this.$refs.title as HTMLElement).focus()
  }
})
</script>

<style scoped>

</style>
