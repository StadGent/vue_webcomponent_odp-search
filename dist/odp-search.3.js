(window["odpSearch_jsonp"] = window["odpSearch_jsonp"] || []).push([[3],{

/***/ "08aa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1ec34416-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Detail.vue?vue&type=template&id=0693e6e3&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"detail-layout"},[_c('div',{staticClass:"action-header"},[_c('h2',{ref:"title",staticStyle:{"margin-right":"2rem"},attrs:{"tabindex":"-1","id":"detail-header"}},[_vm._v(_vm._s(_vm.row.titel))]),_c('button',{ref:"test",staticClass:"mb-8 button button-secondary icon-left icon-arrow-left",on:{"click":function($event){return _vm.$emit('back')}}},[_vm._v("Terug ")])]),(_vm.labels.length)?_c('div',[_c('ul',{staticClass:"label-list"},_vm._l((_vm.labels),function(label,index){return _c('li',{key:index + label},[_vm._v(_vm._s(label))])}),0)]):_vm._e(),_c('div',{domProps:{"innerHTML":_vm._s(_vm.row.beschrijving)}}),(_vm.tags.length)?_c('div',{staticClass:"tag-list-wrapper"},[_c('ul',{staticClass:"tag-list"},_vm._l((_vm.tags),function(tag,index){return _c('li',{key:index + tag},[_c('span',{staticClass:"tag"},[_vm._v(_vm._s(tag))])])}),0)]):_vm._e(),(_vm.row.totale_capaciteit)?_c('div',[_c('ul',{staticClass:"icon-list"},[(_vm.row.totale_capaciteit)?_c('li',[_c('i',{staticClass:"icon-users",attrs:{"aria-hidden":"true"}}),(_vm.row.totale_capaciteit && _vm.row.gereserveerde_plaatsen && _vm.row.datum_reservatie)?[_vm._v(_vm._s(_vm.row.gereserveerde_plaatsen)+" / "+_vm._s(_vm.row.totale_capaciteit)+" gereserveerd op "+_vm._s(_vm.moment(_vm.row.datum_reservatie, 'YYYY-MM-DD').format('DD/MM/YYYY')))]:(_vm.row.totale_capaciteit && _vm.row.gereserveerde_plaatsen)?[_vm._v(_vm._s(_vm.row.gereserveerde_plaatsen)+" / "+_vm._s(_vm.row.totale_capaciteit)+" gereserveerd")]:[_vm._v(_vm._s(_vm.row.totale_capaciteit))]],2):_vm._e()])]):_vm._e(),(_vm.openingHours.length >= 1)?_c('div',{staticClass:"opening-hours-accordion"},[_c('div',{staticClass:"opening-hours-accordion__item"},[_c('div',{staticClass:"openinghours-wrapper"},[_c('div',{attrs:{"id":"opening-hours","role":"tabpanel"}},[(_vm.openingHours.length > 0)?_c('div',{staticClass:"openinghours-widget",attrs:{"data-type":"day"}},[_c('div',{staticClass:"openinghours openinghours--details openinghours--day-open",attrs:{"property":"openingHoursSpecification","typeof":"OpeningHoursSpecification"}},[_c('div',{staticClass:"openinghours--date openinghours--special-day",attrs:{"property":"validFrom validThrough","datetime":_vm.getDateTime()}},[_c('span',{staticClass:"openinghours--date-special-day"},[_vm._v("Vandaag ")]),_c('span',{staticClass:"openinghours--date-between"},[_vm._v(", ")]),_c('span',{staticClass:"openinghours--date-day-of-week"},[_c('link',{attrs:{"property":"dayOfWeek","href":'http://schema.org/' + _vm.moment(_vm.getDateTime(), 'YYYY-MM-DD').format('dddd')}}),_vm._v(_vm._s(_vm.moment(_vm.getDateTime(), 'YYYY-MM-DD').format('dddd'))+" ")]),_c('span',{staticClass:"openinghours--date-day"},[_vm._v(_vm._s(_vm.moment(_vm.getDateTime(), 'YYYY-MM-DD').format('D')))]),_c('span',{staticClass:"openinghours--date-month"},[_vm._v(_vm._s(_vm.moment(_vm.getDateTime(), 'YYYY-MM-DD').format('MMMM')))])]),_c('div',{staticClass:"openinghours--content"},[_c('div',{staticClass:"openinghours--times"},[_c('span',{staticClass:"openinghours--status"},[_vm._v("open")]),_vm._l((_vm.openingHours),function(openingHour,index){return _c('div',{key:index + openingHour,staticClass:"openinghours--time"},[_c('span',{staticClass:"openinghours--time-prefix"},[_vm._v("from")]),(_vm.startHour(openingHour))?_c('time',{attrs:{"property":"opens","datetime":_vm.startHour(openingHour),"aria-label":_vm.startHour(openingHour)}},[_vm._v(" "+_vm._s(_vm.startHour(openingHour))+" u. ")]):_vm._e(),_c('span',{staticClass:"openinghours--time-separator"},[_vm._v("to")]),_c('time',{attrs:{"property":"closes","datetime":_vm.endHour(openingHour),"aria-label":_vm.endHour(openingHour)}},[_vm._v(" "+_vm._s(_vm.endHour(openingHour))+" u.")]),(_vm.openingHours.length > 2 && index != Object.keys(_vm.openingHours).length - 1 && index != Object.keys(_vm.openingHours).length - 2)?_c('div',{staticClass:"openinghours--times-between"},[_vm._v(",")]):_vm._e(),(_vm.openingHours.length > 1 && index == Object.keys(_vm.openingHours).length - 2)?_c('div',{staticClass:"openinghours--times-between"},[_vm._v(" en")]):_vm._e()])})],2)])])]):_vm._e()])])])]):_vm._e(),(_vm.row.adres || _vm.row.gemeente || _vm.row.postcode || _vm.row.telefoon || _vm.row.email || _vm.row.website)?_c('section',{staticClass:"highlight contact-details contact-details-inverted highlight--top"},[_c('div',{staticClass:"highlight__inner"},[_c('h2',[_vm._v("Contactgegevens")]),_c('div',{staticClass:"contact-details-column"},[_c('ul',{staticClass:"icon-list contact-details-inverted"},[(_vm.row.adres || _vm.row.postcode || _vm.row.gemeente)?_c('li',[_c('i',{staticClass:"icon-marker",attrs:{"aria-hidden":"true"}}),(_vm.row.adres)?[_vm._v(_vm._s(_vm.row.adres))]:_vm._e(),(_vm.row.postcode || _vm.row.gemeente)?[_vm._v(",")]:_vm._e(),(_vm.row.postcode)?[_vm._v(" "+_vm._s(_vm.row.postcode))]:_vm._e(),(_vm.row.gemeente)?[_vm._v(" "+_vm._s(_vm.row.gemeente))]:_vm._e()],2):_vm._e(),(_vm.row.telefoon)?_c('li',[_c('i',{staticClass:"icon-phone",attrs:{"aria-hidden":"true"}}),_c('a',{attrs:{"href":'tel:' + _vm.row.telefoon.split(' ').join()}},[_vm._v(_vm._s(_vm.row.telefoon))])]):_vm._e(),(_vm.row.email)?_c('li',[_c('i',{staticClass:"icon-envelope",attrs:{"aria-hidden":"true"}}),_c('a',{attrs:{"href":'mailto:' + _vm.row.email.trim()}},[_vm._v(_vm._s(_vm.row.email))])]):_vm._e(),(_vm.row.website)?_c('li',[_c('i',{staticClass:"icon-url",attrs:{"aria-hidden":"true"}}),_c('a',{attrs:{"href":_vm.row.website}},[_vm._v(_vm._s(_vm.row.website))])]):_vm._e()])])])]):_vm._e(),(_vm.row.image_url)?_c('figure',[_c('img',{attrs:{"src":_vm.row.image_url,"alt":""}})]):_vm._e(),_c('div',[_c('button',{ref:"test",staticClass:"mb-8 button button-primary icon-left icon-arrow-left",on:{"click":function($event){return _vm.$emit('back')}}},[_vm._v("Terug ")])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Detail.vue?vue&type=template&id=0693e6e3&

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__("c1df");
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// EXTERNAL MODULE: ./node_modules/vue-simple-markdown/dist/vue-simple-markdown.js
var vue_simple_markdown = __webpack_require__("7602");
var vue_simple_markdown_default = /*#__PURE__*/__webpack_require__.n(vue_simple_markdown);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Detail.vue?vue&type=script&lang=ts&




vue_runtime_esm["a" /* default */].use(vue_simple_markdown_default.a);
/* harmony default export */ var Detailvue_type_script_lang_ts_ = (vue_runtime_esm["a" /* default */].extend({
  name: 'Detail',
  props: {
    row: {
      required: true,
      type: Object
    }
  },
  methods: {
    getDateTime() {
      const today = new Date();
      const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      return date;
    },

    startHour(openingHour) {
      const startHour = openingHour ? openingHour === null || openingHour === void 0 ? void 0 : openingHour.split(' - ')[0] : '';
      return startHour;
    },

    endHour(openingHour) {
      const endHour = openingHour ? openingHour === null || openingHour === void 0 ? void 0 : openingHour.split(' - ')[1] : '';
      return endHour;
    }

  },
  computed: {
    moment: () => moment_default.a,

    labels() {
      return [this.row.label_1, this.row.label_2].filter(l => !!l);
    },

    openingHours() {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const {
        openingsuren
      } = this.row;
      const openingHours = [...((openingsuren === null || openingsuren === void 0 ? void 0 : openingsuren.split(',')) || [])];
      return openingHours;
    },

    tags() {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const {
        tag_1,
        tag_2,
        tag_3
      } = this.row;
      return [...((tag_1 === null || tag_1 === void 0 ? void 0 : tag_1.split(',')) || []), ...((tag_2 === null || tag_2 === void 0 ? void 0 : tag_2.split(',')) || []), ...((tag_3 === null || tag_3 === void 0 ? void 0 : tag_3.split(',')) || [])].filter(t => !!t).map(t => t.trim());
    }

  },

  mounted() {
    this.$refs.title.focus();
  }

}));
// CONCATENATED MODULE: ./src/components/Detail.vue?vue&type=script&lang=ts&
 /* harmony default export */ var components_Detailvue_type_script_lang_ts_ = (Detailvue_type_script_lang_ts_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Detail.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Detailvue_type_script_lang_ts_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  ,true
)

/* harmony default export */ var Detail = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=odp-search.3.js.map