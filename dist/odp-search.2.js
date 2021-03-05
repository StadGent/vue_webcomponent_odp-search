(window["odpSearch_jsonp"] = window["odpSearch_jsonp"] || []).push([[2],{

/***/ "08aa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"efe80db6-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Detail.vue?vue&type=template&id=3236ff88&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"detail-layout"},[_c('div',{staticClass:"action-header"},[_c('h2',{ref:"title",staticStyle:{"margin-right":"2rem"},attrs:{"tabindex":"-1","id":"detail-header"}},[_vm._v(_vm._s(_vm.row.titel))]),_c('button',{ref:"test",staticClass:"mb-8 button button-secondary icon-left icon-arrow-left",on:{"click":function($event){return _vm.$emit('back')}}},[_vm._v("Terug ")])]),(_vm.labels.length)?_c('div',[_c('ul',{staticClass:"dash-separated-list"},_vm._l((_vm.labels),function(label,index){return _c('li',{key:index + label},[_vm._v(_vm._s(label))])}),0)]):_vm._e(),_c('div',{domProps:{"innerHTML":_vm._s(_vm.row.beschrijving)}}),(_vm.tags.length)?_c('div',{staticClass:"tag-list-wrapper"},[_c('ul',{staticClass:"tag-list"},_vm._l((_vm.tags),function(tag,index){return _c('li',{key:index + tag},[_c('span',{staticClass:"tag"},[_vm._v(_vm._s(tag))])])}),0)]):_vm._e(),_c('section',{staticClass:"highlight contact-details contact-details-inverted highlight--top"},[_c('div',{staticClass:"highlight__inner"},[_c('h2',[_vm._v("Contactgegevens")]),_c('div',{staticClass:"contact-details-column"},[_c('ul',{staticClass:"icon-list contact-details-inverted"},[_c('li',[_c('i',{staticClass:"icon-marker",attrs:{"aria-hidden":"true"}}),_vm._v(" "+_vm._s(_vm.row.adres)+", "+_vm._s(_vm.row.postcode)+" "+_vm._s(_vm.row.gemeente)+" ")]),(_vm.row.telefoon)?_c('li',[_c('i',{staticClass:"icon-phone",attrs:{"aria-hidden":"true"}}),_c('a',{attrs:{"href":'tel:' + _vm.row.telefoon.split(' ').join()}},[_vm._v(_vm._s(_vm.row.telefoon))])]):_vm._e(),(_vm.row.website)?_c('li',[_c('i',{staticClass:"icon-url",attrs:{"aria-hidden":"true"}}),_c('a',{attrs:{"href":_vm.row.website}},[_vm._v(_vm._s(_vm.row.website))])]):_vm._e()])])])]),(_vm.row.image_url)?_c('figure',[_c('img',{attrs:{"src":_vm.row.image_url,"alt":""}})]):_vm._e(),_c('div',[_c('button',{ref:"test",staticClass:"mb-8 button button-primary icon-left icon-arrow-left",on:{"click":function($event){return _vm.$emit('back')}}},[_vm._v("Terug ")])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Detail.vue?vue&type=template&id=3236ff88&

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Detail.vue?vue&type=script&lang=ts&

/* harmony default export */ var Detailvue_type_script_lang_ts_ = (vue_runtime_esm["a" /* default */].extend({
  name: 'Detail',
  props: {
    row: {
      required: true,
      type: Object
    }
  },
  computed: {
    labels() {
      return [this.row.label_1, this.row.label_2].filter(l => !!l);
    },

    tags() {
      return [this.row.tag_1, this.row.tag_2, this.row.tag_3].filter(t => !!t);
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
//# sourceMappingURL=odp-search.2.js.map