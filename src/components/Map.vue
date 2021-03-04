<template>
  <div>
    <div ref="map" tabindex="0" class="map-container"
         style="width: 100%; height: 600px">

      <div class="content-container">
        <div class="geolocate">
          <div class="tools">
            <button type="button" @click="zoomIn" aria-label="Zoom in" title="Zoom in">
              <i class="icon-plus" aria-hidden="true"></i>
            </button>
            <button type="button" @click="zoomOut" aria-label="Zoom uit" title="Zoom uit">
              <i class="icon-minus" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { fromLonLat, get as getProjection } from 'ol/proj'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { getTopLeft, getWidth } from 'ol/extent'
import WMTS from 'ol/source/WMTS'
import BaseLayer from 'ol/layer/Base'
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import { Row } from '@/types/row'
import Teaser from '@/components/Teaser.vue'

// importing the OpenLayers stylesheet is required for having
// good looking buttons!
import 'ol/ol.css'
import { Feature, Overlay } from 'ol'
import VectorLayer from 'ol/layer/Vector'
import { Source, Vector } from 'ol/source'
import { Geometry, Point } from 'ol/geom'
import { Icon, Style } from 'ol/style'
import IconAnchorUnits from 'ol/style/IconAnchorUnits'
import OverlayPositioning from 'ol/OverlayPositioning'

const TeaserClass = Vue.extend(Teaser)

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
const stadsPlanLayer = new TileLayer({
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

const inActiveVectorStyle: Style = new Style({
  image: new Icon({
    src: 'marker.svg',
    anchor: [0.5, 0.5],
    size: [68, 68],
    scale: 1,
    anchorXUnits: IconAnchorUnits.FRACTION,
    anchorYUnits: IconAnchorUnits.FRACTION
  })
})

const activeVectorStyle: Style = new Style({
  image: new Icon({
    src: 'marker_active.svg',
    anchor: [0.5, 0.5],
    size: [68, 68],
    scale: 1,
    anchorXUnits: IconAnchorUnits.FRACTION,
    anchorYUnits: IconAnchorUnits.FRACTION
  })
})

const vectorLayer: VectorLayer = new VectorLayer({
  style: inActiveVectorStyle,
  source: new Vector({
    features: []
  })
})

const activeVectorLayer: VectorLayer = new VectorLayer({
  style: activeVectorStyle,
  source: new Vector({
    features: []
  })
})

export default Vue.extend({
  name: 'OdpMap',
  props: {
    items: {
      type: Array as PropType<Row[]>,
      default: () => []
    }
  },
  data () {
    return {
      olMap: null as unknown as Map,
      flyOut: null as unknown as Overlay
    }
  },
  methods: {
    setFeatures: function (): void {
      vectorLayer.getSource().clear()
      vectorLayer.getSource().addFeatures(this.items.map(
        item => new Feature<Geometry>({
          teaser: item,
          geometry: new Point(item.coordinates?.split(',') as unknown as number[])
        })
      ))
    },
    createFlyOut: function (teaser: Row): Overlay {
      const flyOutWrapper = document.createElement('div')
      const innerFlyOut = document.createElement('div')
      const accolade = document.createElement('div')
      const flyOut = new TeaserClass({ propsData: { teaser } })

      accolade.className = 'accolade-inverse bottom-center'
      innerFlyOut.className = 'map-teaser'

      flyOut.$mount()
      innerFlyOut.appendChild(flyOut.$el)
      innerFlyOut.appendChild(accolade)
      flyOutWrapper.appendChild(innerFlyOut)

      return new Overlay({
        position: teaser.coordinates?.split(',') as unknown as number[],
        offset: [0, -45],
        positioning: OverlayPositioning.BOTTOM_CENTER,
        autoPan: true,
        autoPanMargin: 5,
        autoPanAnimation: {
          duration: 200
        },
        element: flyOutWrapper
      })
    },
    zoomIn: function () {
      this.olMap.getView().setZoom((this.olMap.getView()?.getZoom() || 15) + 1)
    },
    zoomOut: function () {
      this.olMap.getView().setZoom((this.olMap.getView()?.getZoom() || 15) - 1)
    }
  },
  watch: {
    items: function (): void {
      this.setFeatures()
    }
  },
  mounted () {
    this.olMap = new Map({
      layers: [
        stadsPlanLayer,
        vectorLayer,
        activeVectorLayer
      ],
      controls: [],
      target: this.$refs.map as HTMLElement,
      view: new View({
        center: fromLonLat([3.7236731510340757, 51.05478835923585]),
        zoom: 13,
        maxZoom: 21
      })
    })
    this.olMap.on('click', e => {
      vectorLayer.getFeatures(e.pixel).then(
        ([f]) => {
          this.olMap.removeOverlay(this.flyOut)
          activeVectorLayer.getSource().clear()
          if (!f || !f.get('teaser')) {
            return
          }
          activeVectorLayer.getSource().addFeature(f)
          this.flyOut = this.createFlyOut(f.get('teaser'))
          setTimeout(() => {
            this.olMap.addOverlay(this.flyOut)
          })
        })
    })
    this.setFeatures()
  }
})
</script>

<style lang="scss">
.map-teaser {
  max-width: 300px;
  background-color: white;
  padding: 1rem;
  filter: drop-shadow(0 0 .2rem rgba(0,0,0,.1)) drop-shadow(0 0 1rem  rgba(0,0,0,.2));
  border-radius: .2rem;

  .content__first {
    display: none;
  }

  .accolade-inverse {
    bottom: -1rem;
    transform: rotate(180deg);
  }
}

.map-container {
  position: relative;
  height: 30rem;

  .content-container {
    position: relative;
  }

  .tools {
    position: absolute;
    z-index: 2;
    top: .8rem;
    right: .8rem;

    & > button {
      display: block;
      width: 2.2rem;
      padding: 0;
      margin: 0 0 .4rem;
      border: 0;
      border-radius: .2rem;
      background-color: #fff;
      color: #23333a;
      font-size: 1.2rem;
      box-shadow: 0 8px 12px 0 rgba(0, 125, 179, .06);
      cursor: pointer;

      i {
        line-height: 2.2rem;
      }
    }
  }
}
</style>
