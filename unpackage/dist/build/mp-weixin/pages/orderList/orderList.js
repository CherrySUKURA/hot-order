(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/orderList/orderList","common/main"],{"038d":function(t,e,n){"use strict";n.r(e);var r=n("9df9"),o=n.n(r);for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);e["default"]=o.a},"1fa2":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return r}));var r={topBar:function(){return n.e("components/top-bar/top-bar").then(n.bind(null,"a5ed"))},topFilter:function(){return n.e("components/top-filter/top-filter").then(n.bind(null,"e577"))},uniTag:function(){return n.e("components/uni-tag/uni-tag").then(n.bind(null,"8e61"))},uniLoadMore:function(){return n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"28d0"))},uniPopup:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(n.bind(null,"ce94"))}},o=function(){var t=this,e=t.$createElement;t._self._c},u=[]},5164:function(t,e,n){"use strict";(function(t){n("310c");r(n("66fd"));var e=r(n("88bc"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"6a10":function(t,e,n){},"6e0d":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={onLaunch:function(){},onShow:function(){},onHide:function(){}};e.default=r},"73aa":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("310c");var r=a(n("66fd")),o=a(n("dd84")),u=a(n("4154")),i=n("ccb4");function a(t){return t&&t.__esModule?t:{default:t}}function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}r.default.prototype.$deepClone=i.deepClone,r.default.prototype.$switchTimeFormat=i.switchTimeFormat,r.default.config.productionTip=!1,o.default.mpType="app";var f=new r.default(d({store:u.default,deepClone:i.deepClone},o.default));t(f).$mount();var l=f;e.default=l}).call(this,n("543d")["createApp"])},"78c3":function(t,e,n){},"88bc":function(t,e,n){"use strict";n.r(e);var r=n("1fa2"),o=n("038d");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("94e9");var i,a=n("f0c5"),c=Object(a["a"])(o["default"],r["b"],r["c"],!1,null,"d10415bc",null,!1,r["a"],i);e["default"]=c.exports},"94e9":function(t,e,n){"use strict";var r=n("6a10"),o=n.n(r);o.a},"9df9":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=u(n("a34a")),o=n("85e0");function u(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,r,o,u,i){try{var a=t[u](i),c=a.value}catch(d){return void n(d)}a.done?e(c):Promise.resolve(c).then(r,o)}function a(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var u=t.apply(e,n);function a(t){i(u,r,o,a,c,"next",t)}function c(t){i(u,r,o,a,c,"throw",t)}a(void 0)}))}}var c=function(){n.e("components/top-bar/top-bar").then(function(){return resolve(n("a5ed"))}.bind(null,n)).catch(n.oe)},d=function(){n.e("components/top-filter/top-filter").then(function(){return resolve(n("e577"))}.bind(null,n)).catch(n.oe)},s=function(){n.e("components/uni-tag/uni-tag").then(function(){return resolve(n("8e61"))}.bind(null,n)).catch(n.oe)},f=function(){n.e("components/uni-load-more/uni-load-more").then(function(){return resolve(n("28d0"))}.bind(null,n)).catch(n.oe)},l=function(){Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(function(){return resolve(n("ce94"))}.bind(null,n)).catch(n.oe)},p=function(){n.e("components/uni-popup-message/uni-popup-message").then(function(){return resolve(n("c809"))}.bind(null,n)).catch(n.oe)},h=function(){n.e("components/uni-popup-dialog/uni-popup-dialog").then(function(){return resolve(n("9a3a"))}.bind(null,n)).catch(n.oe)},m={components:{topBar:c,topFilter:d,uniTag:s,uniLoadMore:f,uniPopup:l,uniPopupMessage:p,uniPopupDialog:h},onLoad:function(t){t.id?this.OrderParam.buttonId=t.id:this.OrderParam.buttonId=1},onShow:function(){this.HttpRequest()},onReachBottom:function(){this.OrderParam.pageNo++,this.dataStatus="loading",this.HttpRequestOrderInfo(this.OrderParam)},data:function(){return{topBarList:{topText:"订单列表"},filterData:[{title:"订单筛选",type:"list",list:[]},{title:"开始时间",type:"date"},{title:"结束时间",type:"date"}],imageSrc:n("6853"),orderListData:[],OrderParam:{buttonId:1,pageNo:1,pageSize:12,dealerId:"",endTime:"",phone:"",startTime:""},OrderIdParam:{id:""},dataStatus:"more",orderMessage:{},name:""}},methods:{HttpRequest:function(){this.HttpRequestOrderInfo(this.OrderParam),this.HttpRequestChannel({})},asyncFun:function(t){return new Promise((function(e,n){setTimeout(e,t)}))},HttpRequestOrderInfo:function(t){var e=arguments,n=this;return a(r.default.mark((function u(){var i;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return i=e.length>1&&void 0!==e[1]?e[1]:null,"filter"===i&&(t.pageNo=1),r.next=4,n.asyncFun(0);case 4:(0,o.getOrderInfo)(t).then((function(t){if(null===t.data)return n.dataStatus="noMore",!1;n.dataStatus="More",t.data.forEach((function(t,e){null===i&&n.orderListData.push(t)})),"filter"===i&&(n.orderListData=t.data)}));case 5:case"end":return r.stop()}}),u)})))()},HttpRequestOrderSkuInfo:function(t){var e=this;(0,o.getOrderSkuInfo)(t).then((function(t){e.orderMessage=t.data}))},HttpRequestChannel:function(t){var e=this;(0,o.getChannel)(t).then((function(t){e.filterData[0].list.unshift({id:"",title:"全部"}),t.data.forEach((function(t,n){e.filterData[0].list.push({id:t.dealerId,title:t.simplified})}))}))},close:function(){this.$refs.topFilter.close()},change:function(t){this.OrderParam.dealerId=t[0].value,this.OrderParam.startTime=t[1].value,this.OrderParam.endTime=t[2].value,this.HttpRequestOrderInfo(this.OrderParam,"filter")},search:function(){this.HttpRequestOrderInfo(this.OrderParam,"filter")},open:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;this.OrderIdParam.id=t,this.name=e,"sku"===e&&this.HttpRequestOrderSkuInfo(this.OrderIdParam),"logistics"===e&&(this.orderMessage=n),this.$refs.popup.open()},closePopup:function(){this.$refs.popup.close()},copy:function(e){t.setClipboardData({data:e,success:function(){}})}}};e.default=m}).call(this,n("543d")["default"])},b5ae:function(t,e,n){"use strict";n.r(e);var r=n("6e0d"),o=n.n(r);for(var u in r)"default"!==u&&function(t){n.d(e,t,(function(){return r[t]}))}(u);e["default"]=o.a},dd84:function(t,e,n){"use strict";n.r(e);var r=n("b5ae");for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("f95e");var u,i,a,c,d=n("f0c5"),s=Object(d["a"])(r["default"],u,i,!1,null,null,null,!1,a,c);e["default"]=s.exports},f95e:function(t,e,n){"use strict";var r=n("78c3"),o=n.n(r);o.a}},[["5164","common/runtime","common/vendor"]]]);