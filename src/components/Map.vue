<template>
  <div>
    <div ref="map" class="map-container">
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
import { Vector } from 'ol/source'
import { Geometry, Point } from 'ol/geom'
import { Icon, Style } from 'ol/style'
import IconAnchorUnits from 'ol/style/IconAnchorUnits'
import OverlayPositioning from 'ol/OverlayPositioning'

const TeaserClass = Vue.extend(Teaser)

const projection = getProjection('EPSG:4326')
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
    src: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='68px' height='68px' viewBox='0 0 68 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: Sketch 58 (84663) - https://sketch.com --%3E%3Ctitle%3Emarker%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3Ccircle id='path-1' cx='20' cy='20' r='20'%3E%3C/circle%3E%3Cfilter x='-56.2%25' y='-48.8%25' width='212.5%25' height='212.5%25' filterUnits='objectBoundingBox' id='filter-2'%3E%3CfeOffset dx='0' dy='3' in='SourceAlpha' result='shadowOffsetOuter1'%3E%3C/feOffset%3E%3CfeGaussianBlur stdDeviation='7' in='shadowOffsetOuter1' result='shadowBlurOuter1'%3E%3C/feGaussianBlur%3E%3CfeColorMatrix values='0 0 0 0 0.137254902 0 0 0 0 0.2 0 0 0 0 0.22745098 0 0 0 0.25 0' type='matrix' in='shadowBlurOuter1'%3E%3C/feColorMatrix%3E%3C/filter%3E%3Cpath d='M16,11.2390572 C13.8870435,11.2390572 12.173913,12.9522115 12.173913,15.0651974 C12.173913,17.1781833 13.8870435,18.8913376 16,18.8913376 C18.1129565,18.8913376 19.826087,17.1781833 19.826087,15.0651974 C19.826087,12.9522115 18.1129565,11.2390572 16,11.2390572 M16,14.1086624 C16.5270435,14.1086624 16.9565217,14.5381466 16.9565217,15.0651974 C16.9565217,15.5922482 16.5270435,16.0217325 16,16.0217325 C15.4729565,16.0217325 15.0434783,15.5922482 15.0434783,15.0651974 C15.0434783,14.5381466 15.4729565,14.1086624 16,14.1086624 M16,4 C9.92513043,4 5,8.92519896 5,15.000153 C5,22.9996556 16,29 16,29 C16,29 27,22.9996556 27,15.000153 C27,8.92519896 22.0748696,4 16,4 M16,6.86960514 C20.4832174,6.86960514 24.1304348,10.5168733 24.1304348,15.000153 C24.1304348,19.392562 19.1058261,23.6118381 16,25.6473447 C12.8922609,23.609925 7.86956522,19.3916054 7.86956522,15.000153 C7.86956522,10.5168733 11.5167826,6.86960514 16,6.86960514' id='path-3'%3E%3C/path%3E%3C/defs%3E%3Cg id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='atom/map/marker' transform='translate(14.000000, 11.000000)'%3E%3Cg id='Oval'%3E%3Cuse fill='black' fill-opacity='1' filter='url(%23filter-2)' xlink:href='%23path-1'%3E%3C/use%3E%3Cuse fill='%23FFFFFF' fill-rule='evenodd' xlink:href='%23path-1'%3E%3C/use%3E%3C/g%3E%3Cg id='atom/icon/map/marker' transform='translate(4.000000, 5.000000)'%3E%3Cmask id='mask-4' fill='white'%3E%3Cuse xlink:href='%23path-3'%3E%3C/use%3E%3C/mask%3E%3Cuse id='Fill-1' fill='%2323333A' fill-rule='evenodd' xlink:href='%23path-3'%3E%3C/use%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A",
    anchor: [0.5, 0.5],
    size: [68, 68],
    scale: 1,
    anchorXUnits: IconAnchorUnits.FRACTION,
    anchorYUnits: IconAnchorUnits.FRACTION
  })
})

const activeVectorStyle: Style = new Style({
  image: new Icon({
    src: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='68px' height='68px' viewBox='0 0 68 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: Sketch 58 (84663) - https://sketch.com --%3E%3Ctitle%3Emarker%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3Ccircle id='path-1' cx='20' cy='20' r='20'%3E%3C/circle%3E%3Cfilter x='-56.2%25' y='-48.8%25' width='212.5%25' height='212.5%25' filterUnits='objectBoundingBox' id='filter-2'%3E%3CfeOffset dx='0' dy='3' in='SourceAlpha' result='shadowOffsetOuter1'%3E%3C/feOffset%3E%3CfeGaussianBlur stdDeviation='7' in='shadowOffsetOuter1' result='shadowBlurOuter1'%3E%3C/feGaussianBlur%3E%3CfeColorMatrix values='0 0 0 0 0.137254902 0 0 0 0 0.2 0 0 0 0 0.22745098 0 0 0 0.25 0' type='matrix' in='shadowBlurOuter1'%3E%3C/feColorMatrix%3E%3C/filter%3E%3Cpath d='M16,11.2390572 C13.8870435,11.2390572 12.173913,12.9522115 12.173913,15.0651974 C12.173913,17.1781833 13.8870435,18.8913376 16,18.8913376 C18.1129565,18.8913376 19.826087,17.1781833 19.826087,15.0651974 C19.826087,12.9522115 18.1129565,11.2390572 16,11.2390572 M16,14.1086624 C16.5270435,14.1086624 16.9565217,14.5381466 16.9565217,15.0651974 C16.9565217,15.5922482 16.5270435,16.0217325 16,16.0217325 C15.4729565,16.0217325 15.0434783,15.5922482 15.0434783,15.0651974 C15.0434783,14.5381466 15.4729565,14.1086624 16,14.1086624 M16,4 C9.92513043,4 5,8.92519896 5,15.000153 C5,22.9996556 16,29 16,29 C16,29 27,22.9996556 27,15.000153 C27,8.92519896 22.0748696,4 16,4 M16,6.86960514 C20.4832174,6.86960514 24.1304348,10.5168733 24.1304348,15.000153 C24.1304348,19.392562 19.1058261,23.6118381 16,25.6473447 C12.8922609,23.609925 7.86956522,19.3916054 7.86956522,15.000153 C7.86956522,10.5168733 11.5167826,6.86960514 16,6.86960514' id='path-3'%3E%3C/path%3E%3C/defs%3E%3Cg id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='atom/map/marker' transform='translate(14.000000, 11.000000)'%3E%3Cg id='Oval'%3E%3Cuse fill='%23007db3' fill-opacity='1' filter='url(%23filter-2)' xlink:href='%23path-1'%3E%3C/use%3E%3Cuse fill='%23FFFFFF' fill-rule='evenodd' xlink:href='%23path-1'%3E%3C/use%3E%3Cuse stroke='%23007db3' stroke-width='2' fill-rule='evenodd' xlink:href='%23path-1'%3E%3C/use%3E%3C/g%3E%3Cg id='atom/icon/map/marker' transform='translate(4.000000, 5.000000)'%3E%3Cmask id='mask-4' fill='white'%3E%3Cuse xlink:href='%23path-3'%3E%3C/use%3E%3C/mask%3E%3Cuse id='Fill-1' fill='%2323333A' fill-rule='evenodd' xlink:href='%23path-3'%3E%3C/use%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A",
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
    },
    show: Boolean
  },
  data () {
    return {
      olMap: null as unknown as Map,
      flyOut: null as unknown as Overlay
    }
  },
  methods: {
    initMap: function () {
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
    },
    setFeatures: function (): void {
      vectorLayer.getSource().clear()
      if (this.olMap) {
        activeVectorLayer.getSource().clear()
        this.olMap.removeOverlay(this.flyOut)
      }
      vectorLayer.getSource().addFeatures(this.items.map(
        item => new Feature<Geometry>({
          teaser: item,
          geometry: item?.coordinates ? new Point(item.coordinates?.split(',') as unknown as number[]) : null
        })
      ))
    },
    createFlyOut: function (teaser: Row): Overlay {
      const flyOutWrapper = document.createElement('div')
      const innerFlyOut = document.createElement('div')
      const accolade = document.createElement('div')
      const flyOut = new TeaserClass({ propsData: { teaser, tagName: 'div' } })
      const position = teaser.coordinates?.split(',').map(v => v.trim()) as unknown as number[]

      accolade.className = 'accolade-inverse bottom-center'
      innerFlyOut.className = 'map-teaser'

      flyOut.$mount()
      innerFlyOut.appendChild(flyOut.$el)
      innerFlyOut.appendChild(accolade)
      flyOutWrapper.appendChild(innerFlyOut)

      return new Overlay({
        position,
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
    },
    show: function (show): void {
      // Map container must be visible before initialization
      this.$nextTick(() => {
        if (show && !this.olMap) {
          this.initMap()
        }
      })
    }
  }
})
</script>
