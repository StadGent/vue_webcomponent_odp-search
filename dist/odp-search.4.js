(window["odpSearch_jsonp"] = window["odpSearch_jsonp"] || []).push([[4],{

/***/ "a0be":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"44690cf2-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Map.vue?vue&type=template&id=a9bf5c5e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{ref:"map",staticClass:"map-container"},[_c('div',{staticClass:"content-container"},[_c('div',{staticClass:"geolocate"},[_c('div',{staticClass:"tools"},[_c('button',{attrs:{"type":"button","aria-label":"Zoom in","title":"Zoom in"},on:{"click":_vm.zoomIn}},[_c('i',{staticClass:"icon-plus",attrs:{"aria-hidden":"true"}})]),_c('button',{attrs:{"type":"button","aria-label":"Zoom uit","title":"Zoom uit"},on:{"click":_vm.zoomOut}},[_c('i',{staticClass:"icon-minus",attrs:{"aria-hidden":"true"}})]),_c('button',{attrs:{"type":"button","aria-label":"Ga naar huidige locatie","title":"Ga naar huidige locatie"},on:{"click":_vm.goToCurrentLocation}},[_c('i',{staticClass:"icon-marker",attrs:{"aria-hidden":"true"}})])])])])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Map.vue?vue&type=template&id=a9bf5c5e&

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
const vectorLayer = new Vector["a" /* default */]({
  source: new source_Vector["a" /* default */]({
    features: []
  })
}); // Define a static icon mapping with SVG strings.

const iconMap = {
  default: 'data:image/svg+xml,%3Csvg%20width%3D%2232%22%20height%3D%2239%22%20viewBox%3D%220%200%2032%2039%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M15.9697%2010.2243C18.9666%2010.2243%2021.3902%2012.6479%2021.3902%2015.634C21.3902%2018.6202%2018.9666%2021.0329%2015.9697%2021.0329C12.9727%2021.0329%2010.5491%2018.6094%2010.5491%2015.634C10.5491%2012.6587%2012.9727%2010.2243%2015.9697%2010.2243Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M15.9696%200C24.5711%200%2031.5496%206.9569%2031.5496%2015.5367C31.5496%2026.8322%2015.9696%2038.95%2015.9696%2038.95C15.9696%2038.95%200.389648%2026.8322%200.389648%2015.5367C0.389648%206.9569%207.36819%200%2015.9696%200ZM21.3902%2015.634C21.3902%2012.6479%2018.9666%2010.2243%2015.9697%2010.2243C12.9727%2010.2243%2010.5491%2012.6479%2010.5491%2015.634C10.5491%2018.6202%2012.9727%2021.0329%2015.9697%2021.0329C18.9666%2021.0329%2021.3902%2018.6094%2021.3902%2015.634Z%22%20fill%3D%22%23005BA9%22%2F%3E%3C%2Fsvg%3E',
  toilet: 'data:image/svg+xml,%3Csvg%20width%3D%2232%22%20height%3D%2241%22%20viewBox%3D%220%200%2032%2041%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.9306%200C7.13273%200%200%207.14976%200%2015.9686C0%2027.5812%2015.9306%2040.0306%2015.9306%2040.0306C15.9306%2040.0306%2031.8611%2027.5812%2031.8611%2015.9686C31.8611%207.14976%2024.7284%200%2015.9306%200Z%22%20fill%3D%22%23005BA9%22%2F%3E%3Cg%20clip-path%3D%22url(%23clip0_7290_23894)%22%3E%3Cpath%20d%3D%22M22.1187%2017.3453C22.105%2016.1834%2021.0944%2015.3928%2020.0837%2014.939C19.9737%2014.8909%2019.8431%2014.8496%2019.7263%2014.8084C20.7231%2013.8184%2021.3281%2012.4571%2021.3281%2011.0065C21.3281%208.05025%2018.9219%205.65088%2015.9725%205.65088C14.5425%205.65088%2013.195%206.20775%2012.1844%207.21838C11.1738%208.229%2010.6169%209.5765%2010.6169%2011.0065C10.6169%2012.4503%2011.2219%2013.8115%2012.2188%2014.8084C12.1019%2014.8565%2011.9713%2014.8909%2011.8613%2014.939C10.8575%2015.3859%209.8675%2016.1559%209.81937%2017.2834H9.8125V17.359V17.5103C9.8125%2018.2046%209.8125%2018.9196%2010.3487%2019.7171C10.7337%2020.2878%2011.2219%2020.6384%2011.6481%2020.9478C12.3013%2021.4221%2012.59%2021.6559%2012.59%2022.309V23.8284L12.6106%2024.3715L13.1056%2024.5709C14.0475%2024.949%2015.0444%2025.1415%2016.0413%2025.1415C16.9831%2025.1415%2017.925%2024.9696%2018.8188%2024.6328L19.3344%2024.4403V22.3778C19.3344%2021.7246%2019.6231%2021.4909%2020.2763%2021.0165C20.7025%2020.7071%2021.1906%2020.3565%2021.5756%2019.7859C22.1119%2018.9884%2022.1119%2018.2734%2022.1119%2017.5859V17.3521L22.1187%2017.3453ZM12.1913%2011.0065C12.1913%209.99588%2012.5831%209.04713%2013.2981%208.339C14.0131%207.624%2014.9619%207.23213%2015.9725%207.23213C18.0556%207.23213%2019.7469%208.92338%2019.7469%2011.0065C19.7469%2012.3815%2018.9838%2013.6465%2017.7875%2014.3065C17.21%2014.2171%2016.605%2014.1621%2015.9656%2014.1621C15.3262%2014.1621%2014.7281%2014.2171%2014.1506%2014.3065C12.9544%2013.6465%2012.1913%2012.3815%2012.1913%2011.0065ZM12.5006%2016.3828C13.3463%2016.0046%2014.57%2015.7503%2015.9725%2015.7503C17.375%2015.7503%2018.5919%2016.0046%2019.4444%2016.3828C20.3588%2016.7953%2020.5444%2017.2009%2020.5512%2017.359C20.5512%2017.524%2020.3656%2017.9296%2019.4444%2018.3421C18.5988%2018.7203%2017.375%2018.9746%2015.9725%2018.9746C14.57%2018.9746%2013.3531%2018.7203%2012.5006%2018.3421C11.5794%2017.9296%2011.3937%2017.524%2011.3937%2017.359C11.3937%2017.2009%2011.5794%2016.7884%2012.5006%2016.3759V16.3828ZM17.76%2022.3778V23.3265C16.5844%2023.6565%2015.34%2023.6428%2014.1781%2023.2784V22.3159C14.1781%2021.319%2013.7794%2020.7071%2013.305%2020.2534C14.1162%2020.4459%2015.0169%2020.5628%2015.9725%2020.5628C16.9281%2020.5628%2017.8906%2020.439%2018.7294%2020.2328C18.2138%2020.6934%2017.7669%2021.319%2017.7669%2022.3778H17.76Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M14.7281%2018.2321H17.4781C17.9112%2018.2321%2018.2688%2017.8746%2018.2688%2017.4415C18.2688%2017.0084%2017.9112%2016.6509%2017.4781%2016.6509H14.7281C14.2881%2016.6509%2013.9375%2017.0084%2013.9375%2017.4415C13.9375%2017.8746%2014.2881%2018.2321%2014.7281%2018.2321Z%22%20fill%3D%22white%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0_7290_23894%22%3E%3Crect%20width%3D%2212.3062%22%20height%3D%2219.4906%22%20fill%3D%22white%22%20transform%3D%22translate(9.8125%205.65088)%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E',
  parking: 'data:image/svg+xml,%3Csvg%20width%3D%2232%22%20height%3D%2241%22%20viewBox%3D%220%200%2032%2041%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.9306%200C7.13273%200%200%207.14976%200%2015.9686C0%2027.5812%2015.9306%2040.0306%2015.9306%2040.0306C15.9306%2040.0306%2031.8611%2027.5812%2031.8611%2015.9686C31.8611%207.14976%2024.7284%200%2015.9306%200Z%22%20fill%3D%22%23005BA9%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M25.625%2015.2759C25.625%2020.5916%2021.3157%2024.9009%2016%2024.9009C10.6843%2024.9009%206.375%2020.5916%206.375%2015.2759C6.375%209.96014%2010.6843%205.65088%2016%205.65088C21.3157%205.65088%2025.625%209.96014%2025.625%2015.2759ZM21.3279%2013.4324C21.3279%2012.7072%2021.1506%2012.0859%2020.7942%2011.5135C20.4397%2010.9411%2019.9366%2010.5174%2019.2888%2010.2057C18.639%209.89606%2017.8934%209.77588%2017.0501%209.77588H12.5625V20.7759H15.2106V16.9055H17.0053C18.3477%2016.9055%2019.4049%2016.6244%2020.1749%2015.9827C20.9429%2015.339%2021.3279%2014.5079%2021.3279%2013.4324ZM18.6329%2013.4446C18.6329%2013.9131%2018.4984%2014.2594%2018.2275%2014.5161C17.9586%2014.7748%2017.5655%2014.8685%2017.0501%2014.8685H15.2106V11.8129H17.0806C17.5614%2011.8129%2017.9403%2011.9372%2018.2173%2012.2448C18.4944%2012.5544%2018.6329%2012.9292%2018.6329%2013.4446Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E',
  park: 'data:image/svg+xml,%3Csvg%20width%3D%2232%22%20height%3D%2241%22%20viewBox%3D%220%200%2032%2041%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.9306%200C7.13273%200%200%207.14976%200%2015.9686C0%2027.5812%2015.9306%2040.0306%2015.9306%2040.0306C15.9306%2040.0306%2031.8611%2027.5812%2031.8611%2015.9686C31.8611%207.14976%2024.7284%200%2015.9306%200Z%22%20fill%3D%22%23005BA9%22%2F%3E%3Cpath%20d%3D%22M24.0197%2013.7634C23.7914%2013.4315%2023.3961%2013.1061%2023.0551%2012.861C23.1771%2012.4389%2023.2071%2012.0072%2023.1437%2011.5709C23.0444%2010.8865%2022.756%2010.2894%2022.2861%209.79616C21.821%209.30838%2021.249%208.98182%2020.5856%208.8261C20.2095%208.73586%2019.8331%208.71438%2019.455%208.76488C19.2439%208.20628%2018.8964%207.71334%2018.4158%207.29328C17.6878%206.65958%2016.8319%206.33838%2015.8625%206.33838C14.8931%206.33838%2014.0372%206.65958%2013.3119%207.29435C12.8306%207.71441%2012.4834%208.20769%2012.2703%208.76629C11.8922%208.71679%2011.5175%208.73707%2011.1394%208.82747C10.477%208.98319%209.90497%209.30975%209.43988%209.7965C8.96963%2010.2606%208.68122%2010.8862%208.58188%2011.5737C8.52065%2011.9938%208.54911%2012.4073%208.66513%2012.8112C8.28866%2013.0656%207.96794%2013.3818%207.706%2013.7634C7.27896%2014.3856%207.0625%2015.0799%207.0625%2015.8259C7.0625%2016.8561%207.44062%2017.7433%208.18622%2018.4642C8.92356%2019.1774%209.829%2019.5384%2010.8781%2019.5384H15.0444L15.0475%2023.1134C15.0478%2023.5706%2015.4122%2023.9384%2015.8659%2023.9384C15.8659%2023.9384%2015.8654%2023.9384%2015.8659%2023.9384C16.3214%2023.9384%2016.6982%2023.5678%2016.6975%2023.1123L16.6944%2019.5384H20.8469C21.896%2019.5384%2022.8014%2019.1774%2023.5388%2018.4642C24.2844%2017.744%2024.6625%2016.8262%2024.6625%2015.8259C24.6625%2015.0799%2024.4459%2014.3856%2024.0197%2013.7634ZM22.3903%2017.2799C21.9675%2017.689%2021.4622%2017.8884%2020.8469%2017.8884H16.6944L16.6942%2017.6746L18.647%2015.7218C18.9693%2015.3995%2018.9693%2014.8775%2018.647%2014.5551C18.3248%2014.2326%2017.8028%2014.2328%2017.4803%2014.5551L16.6921%2015.3433L16.6875%2011.5324C16.687%2011.077%2016.3176%2010.7085%2015.8622%2010.7085C15.8622%2010.7085%2015.8627%2010.7085%2015.8622%2010.7085C15.4067%2010.7085%2015.0368%2011.0794%2015.0375%2011.5348L15.0394%2013.6692L14.2159%2012.904C13.8937%2012.5817%2013.3717%2012.5817%2013.0493%2012.904C12.7268%2013.2263%2012.727%2013.7483%2013.0493%2014.0707L15.0114%2016.0328L15.0444%2017.8884H10.8781C10.2632%2017.8884%209.75819%2017.6886%209.33331%2017.2782C8.91566%2016.8743%208.7125%2016.3999%208.7125%2015.8259C8.7125%2015.4134%208.82797%2015.0449%209.06588%2014.6991C9.3022%2014.3553%209.61759%2014.1082%2010.0284%2013.9459L10.9383%2013.587L10.4306%2012.7493C10.2394%2012.4365%2010.1686%2012.1271%2010.2147%2011.8074C10.2646%2011.4637%2010.4016%2011.1791%2010.6341%2010.935C10.8781%2010.6799%2011.1669%2010.5149%2011.5209%2010.4324C11.638%2010.4045%2011.7556%2010.3905%2011.8733%2010.3905C12.0951%2010.3905%2012.3184%2010.4389%2012.5491%2010.5377L13.5718%2010.9749L13.6937%209.86945C13.7519%209.33554%2013.9822%208.89932%2014.3947%208.53632C15.2379%207.79932%2016.484%207.79932%2017.3272%208.53632C17.7425%208.89932%2017.9728%209.33554%2018.0312%209.87041L18.1531%2010.9759L19.1758%2010.5387C19.5288%2010.3883%2019.8654%2010.3539%2020.204%2010.4334C20.5556%2010.5161%2020.8454%2010.6805%2021.0891%2010.936C21.3217%2011.1798%2021.4586%2011.4647%2021.5085%2011.8084C21.5558%2012.135%2021.4902%2012.4519%2021.3087%2012.7774L20.9155%2013.4821L21.6122%2013.8915C22.0086%2014.1236%2022.5232%2014.5037%2022.6576%2014.6993C22.8956%2015.0456%2023.0125%2015.4134%2023.0125%2015.8259C23.0125%2016.3999%2022.8097%2016.8743%2022.3903%2017.2799Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E',
  'event-location': 'data:image/svg+xml,%3Csvg%20width%3D%2232%22%20height%3D%2241%22%20viewBox%3D%220%200%2032%2041%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.9306%200C7.13273%200%200%207.14976%200%2015.9686C0%2027.5812%2015.9306%2040.0306%2015.9306%2040.0306C15.9306%2040.0306%2031.8611%2027.5812%2031.8611%2015.9686C31.8611%207.14976%2024.7284%200%2015.9306%200Z%22%20fill%3D%22%23005BA9%22%2F%3E%3Cpath%20d%3D%22M7.75%2024.2134V11.8384L16%205.65088L24.25%2011.8384V24.2134H7.75ZM9.8125%2022.1509H22.1875V12.8696L16%208.229L9.8125%2012.8696V22.1509Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M20.0826%2014.9857C19.9732%2014.6389%2019.674%2014.4027%2019.3204%2014.3831L17.4625%2014.28L16.7931%2012.4955C16.6703%2012.168%2016.3763%2011.9544%2016.038%2011.9394L15.9999%2011.8384V11.9363C15.6457%2011.9363%2015.3342%2012.1558%2015.2071%2012.4955L14.5377%2014.28L12.6801%2014.3831C12.3262%2014.4027%2012.027%2014.6389%2011.9175%2014.9857C11.8077%2015.3324%2011.9148%2015.7044%2012.1898%2015.934L13.6337%2017.14L13.1554%2018.9884C13.0639%2019.3403%2013.19%2019.7063%2013.4766%2019.9202C13.7632%2020.1342%2014.1409%2020.1447%2014.4381%2019.9468L15.9999%2018.9073L17.5621%2019.9472C17.7042%2020.0412%2017.8643%2020.0884%2018.0241%2020.0884C18.1992%2020.0884%2018.3736%2020.0321%2018.5235%2019.9202C18.8101%2019.7063%2018.9362%2019.3403%2018.8451%2018.9887L18.3661%2017.14L19.81%2015.9344C20.0853%2015.7044%2020.1921%2015.3324%2020.0826%2014.9857Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E',
  'public-stop': 'data:image/svg+xml,%3Csvg%20width%3D%2232%22%20height%3D%2241%22%20viewBox%3D%220%200%2032%2041%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.9306%200C7.13273%200%200%207.14976%200%2015.9686C0%2027.5812%2015.9306%2040.0306%2015.9306%2040.0306C15.9306%2040.0306%2031.8611%2027.5812%2031.8611%2015.9686C31.8611%207.14976%2024.7284%200%2015.9306%200Z%22%20fill%3D%22%23005BA9%22%2F%3E%3Cpath%20d%3D%22M16.5893%2024.3853V14.5678C15.8936%2014.8015%2015.4414%2015.2312%2015.2327%2015.8568C15.1127%2016.2165%2015.0272%2016.5819%2014.9762%2016.953C14.9134%2017.4098%2014.5459%2017.7853%2014.0848%2017.7853C13.6238%2017.7853%2013.2442%2017.4103%2013.2917%2016.9517C13.4343%2015.5768%2013.9422%2014.4521%2014.8153%2013.5778C15.8588%2012.5328%2017.285%2012.0103%2019.0938%2012.0103C20.4851%2012.0103%2021.5286%2011.6699%2022.2243%2010.9893C22.773%2010.4526%2023.1053%209.69561%2023.2212%208.71846C23.2756%208.26062%2023.6416%207.88525%2024.1027%207.88525C24.5637%207.88525%2024.9431%208.26018%2024.8941%208.71863C24.8002%209.59801%2024.5538%2010.403%2024.1549%2011.1337C23.6331%2012.0893%2022.7809%2012.7665%2021.5982%2013.1653V23.5504C21.5982%2024.0115%2021.2245%2024.3853%2020.7634%2024.3853C20.3023%2024.3853%2019.9286%2024.0115%2019.9286%2023.5504V19.4353H18.2589V24.3853H16.5893ZM19.0938%2011.1853C18.6346%2011.1853%2018.2415%2011.0237%2017.9146%2010.7006C17.5876%2010.3774%2017.4241%209.989%2017.4241%209.53525C17.4241%209.0815%2017.5876%208.69307%2017.9146%208.36994C18.2415%208.04682%2018.6346%207.88525%2019.0938%207.88525C19.5529%207.88525%2019.946%208.04682%2020.2729%208.36994C20.5999%208.69307%2020.7634%209.0815%2020.7634%209.53525C20.7634%209.989%2020.5999%2010.3774%2020.2729%2010.7006C19.946%2011.0237%2019.5529%2011.1853%2019.0938%2011.1853Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.0625%2023.354C7.0625%2022.7845%207.52421%2022.3228%208.09375%2022.3228H17.375V24.3853H8.09375C7.52421%2024.3853%207.0625%2023.9235%207.0625%2023.354Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M14.1094%207.19775C14.1094%206.34344%2013.4168%205.65088%2012.5625%205.65088H9.8125C8.95818%205.65088%208.26562%206.34344%208.26562%207.19775V12.0103C8.26562%2012.8646%208.95818%2013.5571%209.8125%2013.5571H12.5625C13.4168%2013.5571%2014.1094%2012.8646%2014.1094%2012.0103V7.19775ZM12.3906%207.36963V11.8384H9.98438V7.36963H12.3906Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.3281%2023.354V12.6978H12.0469V23.354H10.3281Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E'
};
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
        layers: [stadsPlanLayer, vectorLayer],
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

          if (!f || !f.get('teaser')) {
            return;
          }

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

      if (this.olMap) {
        this.olMap.removeOverlay(this.flyOut);
      }

      vectorLayer.getSource().addFeatures(this.items.map(item => {
        const coordinates = item !== null && item !== void 0 && item.coordinates ? item.coordinates.split(',').map(Number) : null; // Transform source coordinates with EPSG:4326 projection to EPSG:3857 projection.

        const transformedCoordinates = coordinates ? Object(proj["n" /* transform */])(coordinates, 'EPSG:4326', 'EPSG:3857') : null; // Update item.coordinates so Fly-out can use the same EPSG:3857 coordinates.

        item.coordinates = transformedCoordinates ? transformedCoordinates.join(',') : '';
        const iconName = item.icoon || 'default'; // Use 'default' if `icoon` is not available.

        const iconPath = iconMap[iconName] || iconMap.default; // Fallback to 'default' if no match.
        // Create a new style with the appropriate icon.

        const itemStyle = new Style["b" /* default */]({
          image: new Icon["a" /* default */]({
            src: iconPath,
            anchor: [0.5, 0.5],
            size: [68, 68],
            scale: 1,
            anchorXUnits: IconAnchorUnits["a" /* default */].FRACTION,
            anchorYUnits: IconAnchorUnits["a" /* default */].FRACTION
          })
        }); // Create the feature with the dynamic style

        const feature = new Feature["a" /* default */]({
          teaser: item,
          geometry: transformedCoordinates ? new Point["a" /* default */](transformedCoordinates) : null
        });
        feature.setStyle(itemStyle);
        return feature;
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
      const position = (_teaser$coordinates = teaser.coordinates) === null || _teaser$coordinates === void 0 ? void 0 : _teaser$coordinates.split(',').map(v => v.trim());
      accolade.className = 'accolade-inverse bottom-center';
      innerFlyOut.className = 'map-teaser';
      flyOut.$mount();
      innerFlyOut.appendChild(flyOut.$el);
      innerFlyOut.appendChild(accolade);
      flyOutWrapper.appendChild(innerFlyOut);
      return new Overlay["a" /* default */]({
        position,
        offset: [-17, -45],
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
    },
    goToCurrentLocation: function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const {
            longitude,
            latitude
          } = position.coords;
          const coords = Object(proj["d" /* fromLonLat */])([longitude, latitude]);
          this.olMap.getView().animate({
            center: coords,
            zoom: 14
          });
        }, error => {
          console.error('Geolocation error:', error);
          alert('Unable to retrieve your location.');
        });
      } else {
        alert('Geolocation is not supported by your browser.');
      }
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
//# sourceMappingURL=odp-search.4.js.map