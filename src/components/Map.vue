<template>
  <div ref="map" tabindex="0"
       style="width: 100%; height: 600px">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { fromLonLat, get as getProjection } from 'ol/proj'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { getTopLeft, getWidth } from 'ol/extent'
import WMTS from 'ol/source/WMTS'
import BaseLayer from 'ol/layer/Base'
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'

// importing the OpenLayers stylesheet is required for having
// good looking buttons!
import 'ol/ol.css'

export default Vue.extend({
  name: 'OdpMap',
  data () {
    return {
      olMap: null as unknown as Map
    }
  },
  methods: {
    createStadsplanLayer: function (): BaseLayer {
      const projection = getProjection('EPSG:3857')
      const projectionExtent = projection.getExtent()
      const size = getWidth(projectionExtent) / 256
      const resolutions = new Array(14)
      const matrixIds = new Array(14)
      for (let z = 0; z < 21; ++z) {
        // generate resolutions and matrixIds arrays for this WMTS
        resolutions[z] = size / Math.pow(2, z)
        matrixIds[z] = 'SG-WEB MERCATOR:' + z
      }

      return new TileLayer({
        source: new WMTS({
          url: 'https://geo.gent.be/geoserver/gwc/service/wmts/',
          matrixSet: 'SG-WEB MERCATOR',
          format: 'image/png',
          projection,
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(projectionExtent),
            resolutions,
            matrixIds
          }),
          style: 'default',
          wrapX: true,
          layer: 'SG-E-Stadsplan:Stadsplan'
        })
      })
    }
  },
  mounted () {
    this.olMap = new Map({
      layers: [
        this.createStadsplanLayer()
      ],
      target: this.$refs.map as HTMLElement,
      view: new View({
        center: fromLonLat([3.7236731510340757, 51.05478835923585]),
        zoom: 13,
        maxZoom: 21
      })
    })
  }
})
</script>

<style scoped>

</style>
