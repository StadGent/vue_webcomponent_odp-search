(window["odpSearch_jsonp"] = window["odpSearch_jsonp"] || []).push([[3],{

/***/ "a0be":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"efe80db6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Map.vue?vue&type=template&id=75a46a0c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{ref:"map",staticClass:"map-container",attrs:{"tabindex":"0"}},[_c('div',{staticClass:"content-container"},[_c('div',{staticClass:"geolocate"},[_c('div',{staticClass:"tools"},[_c('button',{attrs:{"type":"button","aria-label":"Zoom in","title":"Zoom in"},on:{"click":_vm.zoomIn}},[_c('i',{staticClass:"icon-plus",attrs:{"aria-hidden":"true"}})]),_c('button',{attrs:{"type":"button","aria-label":"Zoom uit","title":"Zoom uit"},on:{"click":_vm.zoomOut}},[_c('i',{staticClass:"icon-minus",attrs:{"aria-hidden":"true"}})])])])])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Map.vue?vue&type=template&id=75a46a0c&

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/ol/proj.js + 5 modules
var proj = __webpack_require__("256f");

// EXTERNAL MODULE: ./node_modules/ol/tilegrid/WMTS.js
var WMTS = __webpack_require__("6ed8");

// EXTERNAL MODULE: ./node_modules/ol/extent.js
var extent = __webpack_require__("0af5");

// EXTERNAL MODULE: ./node_modules/ol/source/WMTS.js + 17 modules
var source_WMTS = __webpack_require__("d510");

// EXTERNAL MODULE: ./node_modules/ol/View.js + 3 modules
var View = __webpack_require__("a2c7");

// EXTERNAL MODULE: ./node_modules/ol/Map.js + 35 modules
var Map = __webpack_require__("5eee");

// EXTERNAL MODULE: ./node_modules/ol/layer/Tile.js + 3 modules
var Tile = __webpack_require__("480c");

// EXTERNAL MODULE: ./src/components/Teaser.vue + 4 modules
var Teaser = __webpack_require__("bc34");

// EXTERNAL MODULE: ./node_modules/ol/ol.css
var ol = __webpack_require__("5bc0");

// EXTERNAL MODULE: ./node_modules/ol/Feature.js
var Feature = __webpack_require__("4cdf");

// EXTERNAL MODULE: ./node_modules/ol/Overlay.js
var Overlay = __webpack_require__("0710");

// EXTERNAL MODULE: ./node_modules/ol/layer/Vector.js + 20 modules
var Vector = __webpack_require__("3e6b");

// EXTERNAL MODULE: ./node_modules/ol/source/Vector.js + 5 modules
var source_Vector = __webpack_require__("5831");

// EXTERNAL MODULE: ./node_modules/ol/geom/Point.js
var Point = __webpack_require__("f403");

// EXTERNAL MODULE: ./node_modules/ol/style/Style.js + 4 modules
var Style = __webpack_require__("6c77");

// EXTERNAL MODULE: ./node_modules/ol/style/Icon.js + 2 modules
var Icon = __webpack_require__("6cbf");

// EXTERNAL MODULE: ./node_modules/ol/style/IconAnchorUnits.js
var IconAnchorUnits = __webpack_require__("82b0");

// EXTERNAL MODULE: ./node_modules/ol/OverlayPositioning.js
var OverlayPositioning = __webpack_require__("698f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Map.vue?vue&type=script&lang=ts&









 // importing the OpenLayers stylesheet is required for having
// good looking buttons!









const TeaserClass = vue_runtime_esm["a" /* default */].extend(Teaser["a" /* default */]);
const projection = Object(proj["g" /* get */])('EPSG:3857');
const projectionExtent = projection.getExtent();
const size = Object(extent["E" /* getWidth */])(projectionExtent) / 256;
const resolutions = new Array(14);
const matrixIds = new Array(14);

for (let z = 0; z < 21; ++z) {
  // generate resolutions and matrixIds arrays for this WMTS
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = 'SG-WEB MERCATOR:' + z;
}

const stadsPlanLayer = new Tile["a" /* default */]({
  source: new source_WMTS["a" /* default */]({
    url: 'https://geo.gent.be/geoserver/gwc/service/wmts/',
    matrixSet: 'SG-WEB MERCATOR',
    format: 'image/png',
    projection,
    tileGrid: new WMTS["b" /* default */]({
      origin: Object(extent["C" /* getTopLeft */])(projectionExtent),
      resolutions,
      matrixIds
    }),
    style: 'default',
    wrapX: true,
    layer: 'SG-E-Stadsplan:Stadsplan'
  })
});
const inActiveVectorStyle = new Style["b" /* default */]({
  image: new Icon["a" /* default */]({
    src: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='68px' height='68px' viewBox='0 0 68 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: Sketch 58 (84663) - https://sketch.com --%3E%3Ctitle%3Emarker%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3Ccircle id='path-1' cx='20' cy='20' r='20'%3E%3C/circle%3E%3Cfilter x='-56.2%25' y='-48.8%25' width='212.5%25' height='212.5%25' filterUnits='objectBoundingBox' id='filter-2'%3E%3CfeOffset dx='0' dy='3' in='SourceAlpha' result='shadowOffsetOuter1'%3E%3C/feOffset%3E%3CfeGaussianBlur stdDeviation='7' in='shadowOffsetOuter1' result='shadowBlurOuter1'%3E%3C/feGaussianBlur%3E%3CfeColorMatrix values='0 0 0 0 0.137254902 0 0 0 0 0.2 0 0 0 0 0.22745098 0 0 0 0.25 0' type='matrix' in='shadowBlurOuter1'%3E%3C/feColorMatrix%3E%3C/filter%3E%3Cpath d='M16,11.2390572 C13.8870435,11.2390572 12.173913,12.9522115 12.173913,15.0651974 C12.173913,17.1781833 13.8870435,18.8913376 16,18.8913376 C18.1129565,18.8913376 19.826087,17.1781833 19.826087,15.0651974 C19.826087,12.9522115 18.1129565,11.2390572 16,11.2390572 M16,14.1086624 C16.5270435,14.1086624 16.9565217,14.5381466 16.9565217,15.0651974 C16.9565217,15.5922482 16.5270435,16.0217325 16,16.0217325 C15.4729565,16.0217325 15.0434783,15.5922482 15.0434783,15.0651974 C15.0434783,14.5381466 15.4729565,14.1086624 16,14.1086624 M16,4 C9.92513043,4 5,8.92519896 5,15.000153 C5,22.9996556 16,29 16,29 C16,29 27,22.9996556 27,15.000153 C27,8.92519896 22.0748696,4 16,4 M16,6.86960514 C20.4832174,6.86960514 24.1304348,10.5168733 24.1304348,15.000153 C24.1304348,19.392562 19.1058261,23.6118381 16,25.6473447 C12.8922609,23.609925 7.86956522,19.3916054 7.86956522,15.000153 C7.86956522,10.5168733 11.5167826,6.86960514 16,6.86960514' id='path-3'%3E%3C/path%3E%3C/defs%3E%3Cg id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='atom/map/marker' transform='translate(14.000000, 11.000000)'%3E%3Cg id='Oval'%3E%3Cuse fill='black' fill-opacity='1' filter='url(%23filter-2)' xlink:href='%23path-1'%3E%3C/use%3E%3Cuse fill='%23FFFFFF' fill-rule='evenodd' xlink:href='%23path-1'%3E%3C/use%3E%3C/g%3E%3Cg id='atom/icon/map/marker' transform='translate(4.000000, 5.000000)'%3E%3Cmask id='mask-4' fill='white'%3E%3Cuse xlink:href='%23path-3'%3E%3C/use%3E%3C/mask%3E%3Cuse id='Fill-1' fill='%2323333A' fill-rule='evenodd' xlink:href='%23path-3'%3E%3C/use%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A",
    anchor: [0.5, 0.5],
    size: [68, 68],
    scale: 1,
    anchorXUnits: IconAnchorUnits["a" /* default */].FRACTION,
    anchorYUnits: IconAnchorUnits["a" /* default */].FRACTION
  })
});
const activeVectorStyle = new Style["b" /* default */]({
  image: new Icon["a" /* default */]({
    src: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='68px' height='68px' viewBox='0 0 68 68' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: Sketch 58 (84663) - https://sketch.com --%3E%3Ctitle%3Emarker%3C/title%3E%3Cdesc%3ECreated with Sketch.%3C/desc%3E%3Cdefs%3E%3Ccircle id='path-1' cx='20' cy='20' r='20'%3E%3C/circle%3E%3Cfilter x='-56.2%25' y='-48.8%25' width='212.5%25' height='212.5%25' filterUnits='objectBoundingBox' id='filter-2'%3E%3CfeOffset dx='0' dy='3' in='SourceAlpha' result='shadowOffsetOuter1'%3E%3C/feOffset%3E%3CfeGaussianBlur stdDeviation='7' in='shadowOffsetOuter1' result='shadowBlurOuter1'%3E%3C/feGaussianBlur%3E%3CfeColorMatrix values='0 0 0 0 0.137254902 0 0 0 0 0.2 0 0 0 0 0.22745098 0 0 0 0.25 0' type='matrix' in='shadowBlurOuter1'%3E%3C/feColorMatrix%3E%3C/filter%3E%3Cpath d='M16,11.2390572 C13.8870435,11.2390572 12.173913,12.9522115 12.173913,15.0651974 C12.173913,17.1781833 13.8870435,18.8913376 16,18.8913376 C18.1129565,18.8913376 19.826087,17.1781833 19.826087,15.0651974 C19.826087,12.9522115 18.1129565,11.2390572 16,11.2390572 M16,14.1086624 C16.5270435,14.1086624 16.9565217,14.5381466 16.9565217,15.0651974 C16.9565217,15.5922482 16.5270435,16.0217325 16,16.0217325 C15.4729565,16.0217325 15.0434783,15.5922482 15.0434783,15.0651974 C15.0434783,14.5381466 15.4729565,14.1086624 16,14.1086624 M16,4 C9.92513043,4 5,8.92519896 5,15.000153 C5,22.9996556 16,29 16,29 C16,29 27,22.9996556 27,15.000153 C27,8.92519896 22.0748696,4 16,4 M16,6.86960514 C20.4832174,6.86960514 24.1304348,10.5168733 24.1304348,15.000153 C24.1304348,19.392562 19.1058261,23.6118381 16,25.6473447 C12.8922609,23.609925 7.86956522,19.3916054 7.86956522,15.000153 C7.86956522,10.5168733 11.5167826,6.86960514 16,6.86960514' id='path-3'%3E%3C/path%3E%3C/defs%3E%3Cg id='Symbols' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='atom/map/marker' transform='translate(14.000000, 11.000000)'%3E%3Cg id='Oval'%3E%3Cuse fill='%23007db3' fill-opacity='1' filter='url(%23filter-2)' xlink:href='%23path-1'%3E%3C/use%3E%3Cuse fill='%23FFFFFF' fill-rule='evenodd' xlink:href='%23path-1'%3E%3C/use%3E%3Cuse stroke='%23007db3' stroke-width='2' fill-rule='evenodd' xlink:href='%23path-1'%3E%3C/use%3E%3C/g%3E%3Cg id='atom/icon/map/marker' transform='translate(4.000000, 5.000000)'%3E%3Cmask id='mask-4' fill='white'%3E%3Cuse xlink:href='%23path-3'%3E%3C/use%3E%3C/mask%3E%3Cuse id='Fill-1' fill='%2323333A' fill-rule='evenodd' xlink:href='%23path-3'%3E%3C/use%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A",
    anchor: [0.5, 0.5],
    size: [68, 68],
    scale: 1,
    anchorXUnits: IconAnchorUnits["a" /* default */].FRACTION,
    anchorYUnits: IconAnchorUnits["a" /* default */].FRACTION
  })
});
const vectorLayer = new Vector["a" /* default */]({
  style: inActiveVectorStyle,
  source: new source_Vector["a" /* default */]({
    features: []
  })
});
const activeVectorLayer = new Vector["a" /* default */]({
  style: activeVectorStyle,
  source: new source_Vector["a" /* default */]({
    features: []
  })
});
/* harmony default export */ var Mapvue_type_script_lang_ts_ = (vue_runtime_esm["a" /* default */].extend({
  name: 'OdpMap',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    show: Boolean
  },

  data() {
    return {
      olMap: null,
      flyOut: null
    };
  },

  methods: {
    initMap: function () {
      this.olMap = new Map["a" /* default */]({
        layers: [stadsPlanLayer, vectorLayer, activeVectorLayer],
        controls: [],
        target: this.$refs.map,
        view: new View["a" /* default */]({
          center: Object(proj["d" /* fromLonLat */])([3.7236731510340757, 51.05478835923585]),
          zoom: 13,
          maxZoom: 21
        })
      });
      this.olMap.on('click', e => {
        vectorLayer.getFeatures(e.pixel).then(([f]) => {
          this.olMap.removeOverlay(this.flyOut);
          activeVectorLayer.getSource().clear();

          if (!f || !f.get('teaser')) {
            return;
          }

          activeVectorLayer.getSource().addFeature(f);
          this.flyOut = this.createFlyOut(f.get('teaser'));
          setTimeout(() => {
            this.olMap.addOverlay(this.flyOut);
          });
        });
      });
      this.setFeatures();
    },
    setFeatures: function () {
      vectorLayer.getSource().clear();
      vectorLayer.getSource().addFeatures(this.items.map(item => {
        var _item$coordinates;

        return new Feature["a" /* default */]({
          teaser: item,
          geometry: new Point["a" /* default */]((_item$coordinates = item.coordinates) === null || _item$coordinates === void 0 ? void 0 : _item$coordinates.split(','))
        });
      }));
    },
    createFlyOut: function (teaser) {
      var _teaser$coordinates;

      const flyOutWrapper = document.createElement('div');
      const innerFlyOut = document.createElement('div');
      const accolade = document.createElement('div');
      const flyOut = new TeaserClass({
        propsData: {
          teaser,
          tagName: 'div'
        }
      });
      accolade.className = 'accolade-inverse bottom-center';
      innerFlyOut.className = 'map-teaser';
      flyOut.$mount();
      innerFlyOut.appendChild(flyOut.$el);
      innerFlyOut.appendChild(accolade);
      flyOutWrapper.appendChild(innerFlyOut);
      return new Overlay["a" /* default */]({
        position: (_teaser$coordinates = teaser.coordinates) === null || _teaser$coordinates === void 0 ? void 0 : _teaser$coordinates.split(','),
        offset: [0, -45],
        positioning: OverlayPositioning["a" /* default */].BOTTOM_CENTER,
        autoPan: true,
        autoPanMargin: 5,
        autoPanAnimation: {
          duration: 200
        },
        element: flyOutWrapper
      });
    },
    zoomIn: function () {
      var _this$olMap$getView;

      this.olMap.getView().setZoom((((_this$olMap$getView = this.olMap.getView()) === null || _this$olMap$getView === void 0 ? void 0 : _this$olMap$getView.getZoom()) || 15) + 1);
    },
    zoomOut: function () {
      var _this$olMap$getView2;

      this.olMap.getView().setZoom((((_this$olMap$getView2 = this.olMap.getView()) === null || _this$olMap$getView2 === void 0 ? void 0 : _this$olMap$getView2.getZoom()) || 15) - 1);
    }
  },
  watch: {
    items: function () {
      this.setFeatures();
    },
    show: function (show) {
      // Map container must be visible before initialization
      this.$nextTick(() => {
        if (show && !this.olMap) {
          this.initMap();
        }
      });
    }
  }
}));
// CONCATENATED MODULE: ./src/components/Map.vue?vue&type=script&lang=ts&
 /* harmony default export */ var components_Mapvue_type_script_lang_ts_ = (Mapvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Map.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Mapvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var components_Map = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=odp-search.3.js.map