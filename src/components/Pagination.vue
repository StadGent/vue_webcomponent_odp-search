<template>
  <nav v-if="total > 1" class="pager" aria-labelledby="pagination_1">
    <h2 id="pagination_1" class="visually-hidden">Paginatie</h2>
    <ul class="pager__items">
      <li v-if="1 !== +active" class="previous">
        <a href="#"
           class="previous"
           @click.prevent="$emit('navigate', active-1)">
          Vorige <span class="visually-hidden">pagina</span>
        </a>
      </li>
      <li>
        <a href="#"
           :title="`Ga naar pagina ${1}`"
           :class="{active: 1 === +active}"
           @click.prevent="$emit('navigate', 1)">
          <span class="visually-hidden">Pagina</span>
          {{ 1 }}
        </a>
      </li>
      <li v-if="active > 3">
        ...
      </li>
      <li v-if="active - 1 > 1 && +active-1 !== total">
        <a href="#"
           :title="`Ga naar pagina ${active-1}`"
           @click.prevent="$emit('navigate', active-1)">
          <span class="visually-hidden">Pagina</span>
          {{ +active - 1 }}
        </a>
      </li>
      <li v-if="+active !==1 && +active !== total">
        <a href="#"
           :title="`Ga naar pagina ${active}`"
           class="active"
           @click.prevent="$emit('navigate', active)">
          <span class="visually-hidden">Pagina</span>
          {{ +active }}
        </a>
      </li>
      <li v-if="active+1 < total">
        <a href="#"
           :title="`Ga naar pagina ${ +active+1}`"
           @click.prevent="$emit('navigate', active+1)">
          <span class="visually-hidden">Pagina</span>
          {{ +active + 1 }}
        </a>
      </li>
      <li v-if="total - active > 2">
        ...
      </li>
      <li>
        <a href="#"
           :title="`Ga naar pagina ${total}`"
           :class="{active: total === +active}"
           @click.prevent="$emit('navigate', total)">
          <span class="visually-hidden">Pagina</span>
          {{ total }}
        </a>
      </li>
      <li v-if="total !== +active" class="next">
        <a href="#"
           class="next"
           @click.prevent="$emit('navigate', active+1)">
          Volgende
          <span class="visually-hidden">pagina</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    total: {
      type: Number,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    /**
     * Remove focus since the link value will be
     * updated after the click event.
     *
     * @param {ClickEvent} e
     */
    blur: ({ target }: { target: HTMLElement }) => {
      target.blur()
    }
  }
})
</script>
