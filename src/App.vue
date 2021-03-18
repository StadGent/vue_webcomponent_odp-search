<template>
  <div id="app" class="cs--cyan">
    <odp-master-detail dataset="stadgent-zoeker-test-data&apikey=41912e7bc2e5b15d189fafdbd7e74d5e04f26eaacfcc6524e689d3b5"
                       :horizontal="false"
                       :form-fields="[
                         { label: 'veld 1', column: 'kolom_1', options: [{value: 'optie1', name: 'optie één'}, {value: 'optie2', name: 'optie twee'}]},
                         { label: 'veld 2', column: 'kolom_2', options: [{value: 'optie1', name: 'optie één'}, {value: 'optie2', name: 'optie twee'}]}
                       ]"
                       style="max-width: 1280px; margin: auto"></odp-master-detail>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import OdpMasterDetail from './components/OdpMasterDetail.vue'

export default Vue.extend({
  name: 'App',
  components: {
    OdpMasterDetail
  }
})
</script>

<style lang="scss">
</style>
