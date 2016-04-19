!function(a,b){if("function"==typeof define&&define.amd)define(["underscore","jquery","exports"],function(c,d,e){a.Backbone=b(a,e,c,d)});else if("undefined"!=typeof exports){var c=require("underscore");b(a,exports,c)}else a.Backbone=b(a,{},a._,a.jQuery||a.Zepto||a.ender||a.$)}(this,function(a,b,c,d){{var e=a.Backbone,f=[],g=(f.push,f.slice);f.splice}b.VERSION="1.1.2",b.$=d,b.noConflict=function(){return a.Backbone=e,this},b.emulateHTTP=!1,b.emulateJSON=!1;var h=b.Events={on:function(a,b,c){if(!j(this,"on",a,[b,c])||!b)return this;this._events||(this._events={});var d=this._events[a]||(this._events[a]=[]);return d.push({callback:b,context:c,ctx:c||this}),this},once:function(a,b,d){if(!j(this,"once",a,[b,d])||!b)return this;var e=this,f=c.once(function(){e.off(a,f),b.apply(this,arguments)});return f._callback=b,this.on(a,f,d)},off:function(a,b,d){var e,f,g,h,i,k,l,m;if(!this._events||!j(this,"off",a,[b,d]))return this;if(!a&&!b&&!d)return this._events=void 0,this;for(h=a?[a]:c.keys(this._events),i=0,k=h.length;k>i;i++)if(a=h[i],g=this._events[a]){if(this._events[a]=e=[],b||d)for(l=0,m=g.length;m>l;l++)f=g[l],(b&&b!==f.callback&&b!==f.callback._callback||d&&d!==f.context)&&e.push(f);e.length||delete this._events[a]}return this},trigger:function(a){if(!this._events)return this;var b=g.call(arguments,1);if(!j(this,"trigger",a,b))return this;var c=this._events[a],d=this._events.all;return c&&k(c,b),d&&k(d,arguments),this},stopListening:function(a,b,d){var e=this._listeningTo;if(!e)return this;var f=!b&&!d;d||"object"!=typeof b||(d=this),a&&((e={})[a._listenId]=a);for(var g in e)a=e[g],a.off(b,d,this),(f||c.isEmpty(a._events))&&delete this._listeningTo[g];return this}},i=/\s+/,j=function(a,b,c,d){if(!c)return!0;if("object"==typeof c){for(var e in c)a[b].apply(a,[e,c[e]].concat(d));return!1}if(i.test(c)){for(var f=c.split(i),g=0,h=f.length;h>g;g++)a[b].apply(a,[f[g]].concat(d));return!1}return!0},k=function(a,b){var c,d=-1,e=a.length,f=b[0],g=b[1],h=b[2];switch(b.length){case 0:for(;++d<e;)(c=a[d]).callback.call(c.ctx);return;case 1:for(;++d<e;)(c=a[d]).callback.call(c.ctx,f);return;case 2:for(;++d<e;)(c=a[d]).callback.call(c.ctx,f,g);return;case 3:for(;++d<e;)(c=a[d]).callback.call(c.ctx,f,g,h);return;default:for(;++d<e;)(c=a[d]).callback.apply(c.ctx,b);return}},l={listenTo:"on",listenToOnce:"once"};c.each(l,function(a,b){h[b]=function(b,d,e){var f=this._listeningTo||(this._listeningTo={}),g=b._listenId||(b._listenId=c.uniqueId("l"));return f[g]=b,e||"object"!=typeof d||(e=this),b[a](d,e,this),this}}),h.bind=h.on,h.unbind=h.off,c.extend(b,h);var m=b.Model=function(a,b){var d=a||{};b||(b={}),this.cid=c.uniqueId("c"),this.attributes={},b.collection&&(this.collection=b.collection),b.parse&&(d=this.parse(d,b)||{}),d=c.defaults({},d,c.result(this,"defaults")),this.set(d,b),this.changed={},this.initialize.apply(this,arguments)};c.extend(m.prototype,h,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(){return c.clone(this.attributes)},sync:function(){return b.sync.apply(this,arguments)},get:function(a){return this.attributes[a]},escape:function(a){return c.escape(this.get(a))},has:function(a){return null!=this.get(a)},set:function(a,b,d){var e,f,g,h,i,j,k,l;if(null==a)return this;if("object"==typeof a?(f=a,d=b):(f={})[a]=b,d||(d={}),!this._validate(f,d))return!1;g=d.unset,i=d.silent,h=[],j=this._changing,this._changing=!0,j||(this._previousAttributes=c.clone(this.attributes),this.changed={}),l=this.attributes,k=this._previousAttributes,this.idAttribute in f&&(this.id=f[this.idAttribute]);for(e in f)b=f[e],c.isEqual(l[e],b)||h.push(e),c.isEqual(k[e],b)?delete this.changed[e]:this.changed[e]=b,g?delete l[e]:l[e]=b;if(!i){h.length&&(this._pending=d);for(var m=0,n=h.length;n>m;m++)this.trigger("change:"+h[m],this,l[h[m]],d)}if(j)return this;if(!i)for(;this._pending;)d=this._pending,this._pending=!1,this.trigger("change",this,d);return this._pending=!1,this._changing=!1,this},unset:function(a,b){return this.set(a,void 0,c.extend({},b,{unset:!0}))},clear:function(a){var b={};for(var d in this.attributes)b[d]=void 0;return this.set(b,c.extend({},a,{unset:!0}))},hasChanged:function(a){return null==a?!c.isEmpty(this.changed):c.has(this.changed,a)},changedAttributes:function(a){if(!a)return this.hasChanged()?c.clone(this.changed):!1;var b,d=!1,e=this._changing?this._previousAttributes:this.attributes;for(var f in a)c.isEqual(e[f],b=a[f])||((d||(d={}))[f]=b);return d},previous:function(a){return null!=a&&this._previousAttributes?this._previousAttributes[a]:null},previousAttributes:function(){return c.clone(this._previousAttributes)},fetch:function(a){a=a?c.clone(a):{},void 0===a.parse&&(a.parse=!0);var b=this,d=a.success;return a.success=function(c){return b.set(b.parse(c,a),a)?(d&&d(b,c,a),void b.trigger("sync",b,c,a)):!1},L(this,a),this.sync("read",this,a)},save:function(a,b,d){var e,f,g,h=this.attributes;if(null==a||"object"==typeof a?(e=a,d=b):(e={})[a]=b,d=c.extend({validate:!0},d),e&&!d.wait){if(!this.set(e,d))return!1}else if(!this._validate(e,d))return!1;e&&d.wait&&(this.attributes=c.extend({},h,e)),void 0===d.parse&&(d.parse=!0);var i=this,j=d.success;return d.success=function(a){i.attributes=h;var b=i.parse(a,d);return d.wait&&(b=c.extend(e||{},b)),c.isObject(b)&&!i.set(b,d)?!1:(j&&j(i,a,d),void i.trigger("sync",i,a,d))},L(this,d),f=this.isNew()?"create":d.patch?"patch":"update","patch"===f&&(d.attrs=e),g=this.sync(f,this,d),e&&d.wait&&(this.attributes=h),g},destroy:function(a){a=a?c.clone(a):{};var b=this,d=a.success,e=function(){b.trigger("destroy",b,b.collection,a)};if(a.success=function(c){(a.wait||b.isNew())&&e(),d&&d(b,c,a),b.isNew()||b.trigger("sync",b,c,a)},this.isNew())return a.success(),!1;L(this,a);var f=this.sync("delete",this,a);return a.wait||e(),f},url:function(){var a=c.result(this,"urlRoot")||c.result(this.collection,"url")||K();return this.isNew()?a:a.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(a){return this._validate({},c.extend(a||{},{validate:!0}))},_validate:function(a,b){if(!b.validate||!this.validate)return!0;a=c.extend({},this.attributes,a);var d=this.validationError=this.validate(a,b)||null;return d?(this.trigger("invalid",this,d,c.extend(b,{validationError:d})),!1):!0}});var n=["keys","values","pairs","invert","pick","omit"];c.each(n,function(a){m.prototype[a]=function(){var b=g.call(arguments);return b.unshift(this.attributes),c[a].apply(c,b)}});var o=b.Collection=function(a,b){b||(b={}),b.model&&(this.model=b.model),void 0!==b.comparator&&(this.comparator=b.comparator),this._reset(),this.initialize.apply(this,arguments),a&&this.reset(a,c.extend({silent:!0},b))},p={add:!0,remove:!0,merge:!0},q={add:!0,remove:!1};c.extend(o.prototype,h,{model:m,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},sync:function(){return b.sync.apply(this,arguments)},add:function(a,b){return this.set(a,c.extend({merge:!1},b,q))},remove:function(a,b){var d=!c.isArray(a);a=d?[a]:c.clone(a),b||(b={});var e,f,g,h;for(e=0,f=a.length;f>e;e++)h=a[e]=this.get(a[e]),h&&(delete this._byId[h.id],delete this._byId[h.cid],g=this.indexOf(h),this.models.splice(g,1),this.length--,b.silent||(b.index=g,h.trigger("remove",h,this,b)),this._removeReference(h,b));return d?a[0]:a},set:function(a,b){b=c.defaults({},b,p),b.parse&&(a=this.parse(a,b));var d=!c.isArray(a);a=d?a?[a]:[]:c.clone(a);var e,f,g,h,i,j,k,l=b.at,n=this.model,o=this.comparator&&null==l&&b.sort!==!1,q=c.isString(this.comparator)?this.comparator:null,r=[],s=[],t={},u=b.add,v=b.merge,w=b.remove,x=!o&&u&&w?[]:!1;for(e=0,f=a.length;f>e;e++){if(i=a[e]||{},g=i instanceof m?h=i:i[n.prototype.idAttribute||"id"],j=this.get(g))w&&(t[j.cid]=!0),v&&(i=i===h?h.attributes:i,b.parse&&(i=j.parse(i,b)),j.set(i,b),o&&!k&&j.hasChanged(q)&&(k=!0)),a[e]=j;else if(u){if(h=a[e]=this._prepareModel(i,b),!h)continue;r.push(h),this._addReference(h,b)}h=j||h,!x||!h.isNew()&&t[h.id]||x.push(h),t[h.id]=!0}if(w){for(e=0,f=this.length;f>e;++e)t[(h=this.models[e]).cid]||s.push(h);s.length&&this.remove(s,b)}if(r.length||x&&x.length)if(o&&(k=!0),this.length+=r.length,null!=l)for(e=0,f=r.length;f>e;e++)this.models.splice(l+e,0,r[e]);else{x&&(this.models.length=0);var y=x||r;for(e=0,f=y.length;f>e;e++)this.models.push(y[e])}if(k&&this.sort({silent:!0}),!b.silent){for(e=0,f=r.length;f>e;e++)(h=r[e]).trigger("add",h,this,b);(k||x&&x.length)&&this.trigger("sort",this,b)}return d?a[0]:a},reset:function(a,b){b||(b={});for(var d=0,e=this.models.length;e>d;d++)this._removeReference(this.models[d],b);return b.previousModels=this.models,this._reset(),a=this.add(a,c.extend({silent:!0},b)),b.silent||this.trigger("reset",this,b),a},push:function(a,b){return this.add(a,c.extend({at:this.length},b))},pop:function(a){var b=this.at(this.length-1);return this.remove(b,a),b},unshift:function(a,b){return this.add(a,c.extend({at:0},b))},shift:function(a){var b=this.at(0);return this.remove(b,a),b},slice:function(){return g.apply(this.models,arguments)},get:function(a){return null==a?void 0:this._byId[a]||this._byId[a.id]||this._byId[a.cid]},at:function(a){return this.models[a]},where:function(a,b){return c.isEmpty(a)?b?void 0:[]:this[b?"find":"filter"](function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},findWhere:function(a){return this.where(a,!0)},sort:function(a){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");return a||(a={}),c.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(c.bind(this.comparator,this)),a.silent||this.trigger("sort",this,a),this},pluck:function(a){return c.invoke(this.models,"get",a)},fetch:function(a){a=a?c.clone(a):{},void 0===a.parse&&(a.parse=!0);var b=a.success,d=this;return a.success=function(c){var e=a.reset?"reset":"set";d[e](c,a),b&&b(d,c,a),d.trigger("sync",d,c,a)},L(this,a),this.sync("read",this,a)},create:function(a,b){if(b=b?c.clone(b):{},!(a=this._prepareModel(a,b)))return!1;b.wait||this.add(a,b);var d=this,e=b.success;return b.success=function(a,c){b.wait&&d.add(a,b),e&&e(a,c,b)},a.save(null,b),a},parse:function(a){return a},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0,this.models=[],this._byId={}},_prepareModel:function(a,b){if(a instanceof m)return a;b=b?c.clone(b):{},b.collection=this;var d=new this.model(a,b);return d.validationError?(this.trigger("invalid",this,d.validationError,b),!1):d},_addReference:function(a){this._byId[a.cid]=a,null!=a.id&&(this._byId[a.id]=a),a.collection||(a.collection=this),a.on("all",this._onModelEvent,this)},_removeReference:function(a){this===a.collection&&delete a.collection,a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){("add"!==a&&"remove"!==a||c===this)&&("destroy"===a&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],null!=b.id&&(this._byId[b.id]=b)),this.trigger.apply(this,arguments))}});var r=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"];c.each(r,function(a){o.prototype[a]=function(){var b=g.call(arguments);return b.unshift(this.models),c[a].apply(c,b)}});var s=["groupBy","countBy","sortBy","indexBy"];c.each(s,function(a){o.prototype[a]=function(b,d){var e=c.isFunction(b)?b:function(a){return a.get(b)};return c[a](this.models,e,d)}});var t=b.View=function(a){this.cid=c.uniqueId("view"),a||(a={}),c.extend(this,c.pick(a,v)),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},u=/^(\S+)\s*(.*)$/,v=["model","collection","el","id","attributes","className","tagName","events"];c.extend(t.prototype,h,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this.stopListening(),this},setElement:function(a,c){return this.$el&&this.undelegateEvents(),this.$el=a instanceof b.$?a:b.$(a),this.el=this.$el[0],c!==!1&&this.delegateEvents(),this},delegateEvents:function(a){if(!a&&!(a=c.result(this,"events")))return this;this.undelegateEvents();for(var b in a){var d=a[b];if(c.isFunction(d)||(d=this[a[b]]),d){var e=b.match(u),f=e[1],g=e[2];d=c.bind(d,this),f+=".delegateEvents"+this.cid,""===g?this.$el.on(f,d):this.$el.on(f,g,d)}}return this},undelegateEvents:function(){return this.$el.off(".delegateEvents"+this.cid),this},_ensureElement:function(){if(this.el)this.setElement(c.result(this,"el"),!1);else{var a=c.extend({},c.result(this,"attributes"));this.id&&(a.id=c.result(this,"id")),this.className&&(a["class"]=c.result(this,"className"));var d=b.$("<"+c.result(this,"tagName")+">").attr(a);this.setElement(d,!1)}}}),b.sync=function(a,d,e){var f=x[a];c.defaults(e||(e={}),{emulateHTTP:b.emulateHTTP,emulateJSON:b.emulateJSON});var g={type:f,dataType:"json"};if(e.url||(g.url=c.result(d,"url")||K()),null!=e.data||!d||"create"!==a&&"update"!==a&&"patch"!==a||(g.contentType="application/json",g.data=JSON.stringify(e.attrs||d.toJSON(e))),e.emulateJSON&&(g.contentType="application/x-www-form-urlencoded",g.data=g.data?{model:g.data}:{}),e.emulateHTTP&&("PUT"===f||"DELETE"===f||"PATCH"===f)){g.type="POST",e.emulateJSON&&(g.data._method=f);var h=e.beforeSend;e.beforeSend=function(a){return a.setRequestHeader("X-HTTP-Method-Override",f),h?h.apply(this,arguments):void 0}}"GET"===g.type||e.emulateJSON||(g.processData=!1),"PATCH"===g.type&&w&&(g.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")});var i=e.xhr=b.ajax(c.extend(g,e));return d.trigger("request",d,i,e),i};var w=!("undefined"==typeof window||!window.ActiveXObject||window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent),x={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};b.ajax=function(){return b.$.ajax.apply(b.$,arguments)};var y=b.Router=function(a){a||(a={}),a.routes&&(this.routes=a.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},z=/\((.*?)\)/g,A=/(\(\?)?:\w+/g,B=/\*\w+/g,C=/[\-{}\[\]+?.,\\\^$|#\s]/g;c.extend(y.prototype,h,{initialize:function(){},route:function(a,d,e){c.isRegExp(a)||(a=this._routeToRegExp(a)),c.isFunction(d)&&(e=d,d=""),e||(e=this[d]);var f=this;return b.history.route(a,function(c){var g=f._extractParameters(a,c);f.execute(e,g),f.trigger.apply(f,["route:"+d].concat(g)),f.trigger("route",d,g),b.history.trigger("route",f,d,g)}),this},execute:function(a,b){a&&a.apply(this,b)},navigate:function(a,c){return b.history.navigate(a,c),this},_bindRoutes:function(){if(this.routes){this.routes=c.result(this,"routes");for(var a,b=c.keys(this.routes);null!=(a=b.pop());)this.route(a,this.routes[a])}},_routeToRegExp:function(a){return a=a.replace(C,"\\$&").replace(z,"(?:$1)?").replace(A,function(a,b){return b?a:"([^/?]+)"}).replace(B,"([^?]*?)"),new RegExp("^"+a+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(a,b){var d=a.exec(b).slice(1);return c.map(d,function(a,b){return b===d.length-1?a||null:a?decodeURIComponent(a):null})}});var D=b.History=function(){this.handlers=[],c.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},E=/^[#\/]|\s+$/g,F=/^\/+|\/+$/g,G=/msie [\w.]+/,H=/\/$/,I=/#.*$/;D.started=!1,c.extend(D.prototype,h,{interval:50,atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root},getHash:function(a){var b=(a||this).location.href.match(/#(.*)$/);return b?b[1]:""},getFragment:function(a,b){if(null==a)if(this._hasPushState||!this._wantsHashChange||b){a=decodeURI(this.location.pathname+this.location.search);var c=this.root.replace(H,"");a.indexOf(c)||(a=a.slice(c.length))}else a=this.getHash();return a.replace(E,"")},start:function(a){if(D.started)throw new Error("Backbone.history has already been started");D.started=!0,this.options=c.extend({root:"/"},this.options,a),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var d=this.getFragment(),e=document.documentMode,f=G.exec(navigator.userAgent.toLowerCase())&&(!e||7>=e);if(this.root=("/"+this.root+"/").replace(F,"/"),f&&this._wantsHashChange){var g=b.$('<iframe src="javascript:0" tabindex="-1">');this.iframe=g.hide().appendTo("body")[0].contentWindow,this.navigate(d)}this._hasPushState?b.$(window).on("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!f?b.$(window).on("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=d;var h=this.location;if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot())return this.fragment=this.getFragment(null,!0),this.location.replace(this.root+"#"+this.fragment),!0;this._hasPushState&&this.atRoot()&&h.hash&&(this.fragment=this.getHash().replace(E,""),this.history.replaceState({},document.title,this.root+this.fragment))}return this.options.silent?void 0:this.loadUrl()},stop:function(){b.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl),this._checkUrlInterval&&clearInterval(this._checkUrlInterval),D.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();return a===this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe))),a===this.fragment?!1:(this.iframe&&this.navigate(a),void this.loadUrl())},loadUrl:function(a){return a=this.fragment=this.getFragment(a),c.any(this.handlers,function(b){return b.route.test(a)?(b.callback(a),!0):void 0})},navigate:function(a,b){if(!D.started)return!1;b&&b!==!0||(b={trigger:!!b});var c=this.root+(a=this.getFragment(a||""));if(a=a.replace(I,""),this.fragment!==a){if(this.fragment=a,""===a&&"/"!==c&&(c=c.slice(0,-1)),this._hasPushState)this.history[b.replace?"replaceState":"pushState"]({},document.title,c);else{if(!this._wantsHashChange)return this.location.assign(c);this._updateHash(this.location,a,b.replace),this.iframe&&a!==this.getFragment(this.getHash(this.iframe))&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,a,b.replace))}return b.trigger?this.loadUrl(a):void 0}},_updateHash:function(a,b,c){if(c){var d=a.href.replace(/(javascript:|#).*$/,"");a.replace(d+"#"+b)}else a.hash="#"+b}}),b.history=new D;var J=function(a,b){var d,e=this;d=a&&c.has(a,"constructor")?a.constructor:function(){return e.apply(this,arguments)},c.extend(d,e,b);var f=function(){this.constructor=d};return f.prototype=e.prototype,d.prototype=new f,a&&c.extend(d.prototype,a),d.__super__=e.prototype,d};m.extend=o.extend=y.extend=t.extend=D.extend=J;var K=function(){throw new Error('A "url" property or function must be specified')},L=function(a,b){var c=b.error;b.error=function(d){c&&c(a,d,b),a.trigger("error",a,d,b)}};return b}),Backbone.ChildViewContainer=function(a,b){var c=function(a){this._views={},this._indexByModel={},this._indexByCustom={},this._updateLength(),b.each(a,this.add,this)};b.extend(c.prototype,{add:function(a,b){var c=a.cid;return this._views[c]=a,a.model&&(this._indexByModel[a.model.cid]=c),b&&(this._indexByCustom[b]=c),this._updateLength(),this},findByModel:function(a){return this.findByModelCid(a.cid)},findByModelCid:function(a){var b=this._indexByModel[a];return this.findByCid(b)},findByCustom:function(a){var b=this._indexByCustom[a];return this.findByCid(b)},findByIndex:function(a){return b.values(this._views)[a]},findByCid:function(a){return this._views[a]},remove:function(a){var c=a.cid;return a.model&&delete this._indexByModel[a.model.cid],b.any(this._indexByCustom,function(a,b){return a===c?(delete this._indexByCustom[b],!0):void 0},this),delete this._views[c],this._updateLength(),this},call:function(a){this.apply(a,b.tail(arguments))},apply:function(a,c){b.each(this._views,function(d){b.isFunction(d[a])&&d[a].apply(d,c||[])})},_updateLength:function(){this.length=b.size(this._views)}});var d=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck"];return b.each(d,function(a){c.prototype[a]=function(){var c=b.values(this._views),d=[c].concat(b.toArray(arguments));return b[a].apply(b,d)}}),c}(Backbone,_),Backbone.Wreqr=function(a,b,c){"use strict";var d={};return d.Handlers=function(a,b){var c=function(a){this.options=a,this._wreqrHandlers={},b.isFunction(this.initialize)&&this.initialize(a)};return c.extend=a.Model.extend,b.extend(c.prototype,a.Events,{setHandlers:function(a){b.each(a,function(a,c){var d=null;b.isObject(a)&&!b.isFunction(a)&&(d=a.context,a=a.callback),this.setHandler(c,a,d)},this)},setHandler:function(a,b,c){var d={callback:b,context:c};this._wreqrHandlers[a]=d,this.trigger("handler:add",a,b,c)},hasHandler:function(a){return!!this._wreqrHandlers[a]},getHandler:function(a){var b=this._wreqrHandlers[a];return b?function(){var a=Array.prototype.slice.apply(arguments);return b.callback.apply(b.context,a)}:void 0},removeHandler:function(a){delete this._wreqrHandlers[a]},removeAllHandlers:function(){this._wreqrHandlers={}}}),c}(a,c),d.CommandStorage=function(){var b=function(a){this.options=a,this._commands={},c.isFunction(this.initialize)&&this.initialize(a)};return c.extend(b.prototype,a.Events,{getCommands:function(a){var b=this._commands[a];return b||(b={command:a,instances:[]},this._commands[a]=b),b},addCommand:function(a,b){var c=this.getCommands(a);c.instances.push(b)},clearCommands:function(a){var b=this.getCommands(a);b.instances=[]}}),b}(),d.Commands=function(a){return a.Handlers.extend({storageType:a.CommandStorage,constructor:function(b){this.options=b||{},this._initializeStorage(this.options),this.on("handler:add",this._executeCommands,this);var c=Array.prototype.slice.call(arguments);a.Handlers.prototype.constructor.apply(this,c)},execute:function(a,b){a=arguments[0],b=Array.prototype.slice.call(arguments,1),this.hasHandler(a)?this.getHandler(a).apply(this,b):this.storage.addCommand(a,b)},_executeCommands:function(a,b,d){var e=this.storage.getCommands(a);c.each(e.instances,function(a){b.apply(d,a)}),this.storage.clearCommands(a)},_initializeStorage:function(a){var b,d=a.storageType||this.storageType;b=c.isFunction(d)?new d:d,this.storage=b}})}(d),d.RequestResponse=function(a){return a.Handlers.extend({request:function(){var a=arguments[0],b=Array.prototype.slice.call(arguments,1);return this.hasHandler(a)?this.getHandler(a).apply(this,b):void 0}})}(d),d.EventAggregator=function(a,b){var c=function(){};return c.extend=a.Model.extend,b.extend(c.prototype,a.Events),c}(a,c),d}(Backbone,Backbone.Marionette,_);var Marionette=function(a,b,c){"use strict";function d(a,b){var c=new Error(a);throw c.name=b||"Error",c}var e={};b.Marionette=e,e.$=b.$;var f=Array.prototype.slice;return e.extend=b.Model.extend,e.getOption=function(a,b){if(a&&b){var c;return c=a.options&&b in a.options&&void 0!==a.options[b]?a.options[b]:a[b]}},e.normalizeMethods=function(a){var b,d={};return c.each(a,function(a,e){b=a,c.isFunction(b)||(b=this[b]),b&&(d[e]=b)},this),d},e.normalizeUIKeys=function(a,b){return"undefined"!=typeof a?(c.each(c.keys(a),function(c){var d=/@ui.[a-zA-Z_$0-9]*/g;c.match(d)&&(a[c.replace(d,function(a){return b[a.slice(4)]})]=a[c],delete a[c])}),a):void 0},e.actAsCollection=function(a,b){var d=["forEach","each","map","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","toArray","first","initial","rest","last","without","isEmpty","pluck"];c.each(d,function(d){a[d]=function(){var a=c.values(c.result(this,b)),e=[a].concat(c.toArray(arguments));return c[d].apply(c,e)}})},e.triggerMethod=function(){function a(a,b,c){return c.toUpperCase()}var b=/(^|:)(\w)/gi,d=function(d){var e="on"+d.replace(b,a),f=this[e];return c.isFunction(this.trigger)&&this.trigger.apply(this,arguments),c.isFunction(f)?f.apply(this,c.tail(arguments)):void 0};return d}(),e.MonitorDOMRefresh=function(a){function b(a){a._isShown=!0,e(a)}function d(a){a._isRendered=!0,e(a)}function e(a){a._isShown&&a._isRendered&&f(a)&&c.isFunction(a.triggerMethod)&&a.triggerMethod("dom:refresh")}function f(b){return a.contains(b.el)}return function(a){a.listenTo(a,"show",function(){b(a)}),a.listenTo(a,"render",function(){d(a)})}}(document.documentElement),function(a){function b(a,b,e,f){var g=f.split(/\s+/);c.each(g,function(c){var f=a[c];f||d("Method '"+c+"' was configured as an event handler, but does not exist."),a.listenTo(b,e,f)})}function e(a,b,c,d){a.listenTo(b,c,d)}function f(a,b,d,e){var f=e.split(/\s+/);c.each(f,function(c){var e=a[c];a.stopListening(b,d,e)})}function g(a,b,c,d){a.stopListening(b,c,d)}function h(a,b,d,e,f){b&&d&&(c.isFunction(d)&&(d=d.call(a)),c.each(d,function(d,g){c.isFunction(d)?e(a,b,g,d):f(a,b,g,d)}))}a.bindEntityEvents=function(a,c,d){h(a,c,d,e,b)},a.unbindEntityEvents=function(a,b,c){h(a,b,c,g,f)}}(e),e.Callbacks=function(){this._deferred=e.$.Deferred(),this._callbacks=[]},c.extend(e.Callbacks.prototype,{add:function(a,b){this._callbacks.push({cb:a,ctx:b}),this._deferred.done(function(c,d){b&&(c=b),a.call(c,d)})},run:function(a,b){this._deferred.resolve(b,a)},reset:function(){var a=this._callbacks;this._deferred=e.$.Deferred(),this._callbacks=[],c.each(a,function(a){this.add(a.cb,a.ctx)},this)}}),e.Controller=function(a){this.triggerMethod=e.triggerMethod,this.options=a||{},c.isFunction(this.initialize)&&this.initialize(this.options)},e.Controller.extend=e.extend,c.extend(e.Controller.prototype,b.Events,{close:function(){this.stopListening();var a=Array.prototype.slice.call(arguments);this.triggerMethod.apply(this,["close"].concat(a)),this.off()}}),e.Region=function(a){if(this.options=a||{},this.el=e.getOption(this,"el"),this.el||d("An 'el' must be specified for a region.","NoElError"),this.initialize){var b=Array.prototype.slice.apply(arguments);this.initialize.apply(this,b)}},c.extend(e.Region,{buildRegion:function(a,b){var e=c.isString(a),f=c.isString(a.selector),g=c.isUndefined(a.regionType),h=c.isFunction(a);h||e||f||d("Region must be specified as a Region type, a selector string or an object with selector property");var i,j;e&&(i=a),a.selector&&(i=a.selector,delete a.selector),h&&(j=a),!h&&g&&(j=b),a.regionType&&(j=a.regionType,delete a.regionType),(e||h)&&(a={}),a.el=i;var k=new j(a);return a.parentEl&&(k.getEl=function(b){var d=a.parentEl;return c.isFunction(d)&&(d=d()),d.find(b)}),k}}),c.extend(e.Region.prototype,b.Events,{show:function(a,b){this.ensureEl();var d=b||{},f=a.isClosed||c.isUndefined(a.$el),g=a!==this.currentView,h=!!d.preventClose,i=!h&&g;i&&this.close(),a.render(),e.triggerMethod.call(this,"before:show",a),e.triggerMethod.call(a,"before:show"),(g||f)&&this.open(a),this.currentView=a,e.triggerMethod.call(this,"show",a),e.triggerMethod.call(a,"show")},ensureEl:function(){this.$el&&0!==this.$el.length||(this.$el=this.getEl(this.el))},getEl:function(a){return e.$(a)},open:function(a){this.$el.empty().append(a.el)},close:function(){var a=this.currentView;a&&!a.isClosed&&(a.close?a.close():a.remove&&a.remove(),e.triggerMethod.call(this,"close",a),delete this.currentView)},attachView:function(a){this.currentView=a},reset:function(){this.close(),delete this.$el}}),e.Region.extend=e.extend,e.RegionManager=function(a){var b=a.Controller.extend({constructor:function(b){this._regions={},a.Controller.prototype.constructor.call(this,b)},addRegions:function(a,b){var d={};return c.each(a,function(a,e){c.isString(a)&&(a={selector:a}),a.selector&&(a=c.defaults({},a,b));var f=this.addRegion(e,a);d[e]=f},this),d},addRegion:function(b,d){var e,f=c.isObject(d),g=c.isString(d),h=!!d.selector;return e=g||f&&h?a.Region.buildRegion(d,a.Region):c.isFunction(d)?a.Region.buildRegion(d,a.Region):d,this._store(b,e),this.triggerMethod("region:add",b,e),e},get:function(a){return this._regions[a]},removeRegion:function(a){var b=this._regions[a];this._remove(a,b)},removeRegions:function(){c.each(this._regions,function(a,b){this._remove(b,a)},this)},closeRegions:function(){c.each(this._regions,function(a){a.close()},this)},close:function(){this.removeRegions(),a.Controller.prototype.close.apply(this,arguments)},_store:function(a,b){this._regions[a]=b,this._setLength()},_remove:function(a,b){b.close(),b.stopListening(),delete this._regions[a],this._setLength(),this.triggerMethod("region:remove",a,b)},_setLength:function(){this.length=c.size(this._regions)}});return a.actAsCollection(b.prototype,"_regions"),b}(e),e.TemplateCache=function(a){this.templateId=a},c.extend(e.TemplateCache,{templateCaches:{},get:function(a){var b=this.templateCaches[a];return b||(b=new e.TemplateCache(a),this.templateCaches[a]=b),b.load()},clear:function(){var a,b=f.call(arguments),c=b.length;if(c>0)for(a=0;c>a;a++)delete this.templateCaches[b[a]];else this.templateCaches={}}}),c.extend(e.TemplateCache.prototype,{load:function(){if(this.compiledTemplate)return this.compiledTemplate;var a=this.loadTemplate(this.templateId);return this.compiledTemplate=this.compileTemplate(a),this.compiledTemplate},loadTemplate:function(a){var b=e.$(a).html();return b&&0!==b.length||d("Could not find template: '"+a+"'","NoTemplateError"),b},compileTemplate:function(a){return c.template(a)}}),e.Renderer={render:function(a,b){a||d("Cannot render the template since it's false, null or undefined.","TemplateNotFoundError");var c;return(c="function"==typeof a?a:e.TemplateCache.get(a))(b)}},e.View=b.View.extend({constructor:function(a){c.bindAll(this,"render"),c.isObject(this.behaviors)&&new e.Behaviors(this),this.options=c.extend({},c.result(this,"options"),c.isFunction(a)?a.call(this):a),this.events=this.normalizeUIKeys(c.result(this,"events")),b.View.prototype.constructor.apply(this,arguments),e.MonitorDOMRefresh(this),this.listenTo(this,"show",this.onShowCalled)},triggerMethod:e.triggerMethod,normalizeMethods:e.normalizeMethods,getTemplate:function(){return e.getOption(this,"template")},mixinTemplateHelpers:function(a){a=a||{};var b=e.getOption(this,"templateHelpers");return c.isFunction(b)&&(b=b.call(this)),c.extend(a,b)},normalizeUIKeys:function(a){var b=c.result(this,"ui");return e.normalizeUIKeys(a,b)},configureTriggers:function(){if(this.triggers){var a={},b=this.normalizeUIKeys(c.result(this,"triggers"));return c.each(b,function(b,d){var e=c.isObject(b),f=e?b.event:b;a[d]=function(a){if(a){var c=a.preventDefault,d=a.stopPropagation,g=e?b.preventDefault:c,h=e?b.stopPropagation:d;g&&c&&c.apply(a),h&&d&&d.apply(a)}var i={view:this,model:this.model,collection:this.collection};this.triggerMethod(f,i)}},this),a}},delegateEvents:function(a){this._delegateDOMEvents(a),e.bindEntityEvents(this,this.model,e.getOption(this,"modelEvents")),e.bindEntityEvents(this,this.collection,e.getOption(this,"collectionEvents"))},_delegateDOMEvents:function(a){a=a||this.events,c.isFunction(a)&&(a=a.call(this));var d={},e=c.result(this,"behaviorEvents")||{},f=this.configureTriggers();c.extend(d,e,a,f),b.View.prototype.delegateEvents.call(this,d)},undelegateEvents:function(){var a=Array.prototype.slice.call(arguments);b.View.prototype.undelegateEvents.apply(this,a),e.unbindEntityEvents(this,this.model,e.getOption(this,"modelEvents")),e.unbindEntityEvents(this,this.collection,e.getOption(this,"collectionEvents"))},onShowCalled:function(){},close:function(){if(!this.isClosed){var a=Array.prototype.slice.call(arguments),b=this.triggerMethod.apply(this,["before:close"].concat(a));b!==!1&&(this.isClosed=!0,this.triggerMethod.apply(this,["close"].concat(a)),this.unbindUIElements(),this.remove())}},bindUIElements:function(){
    if (this.ui) { this._uiBindings || (this._uiBindings = this.ui); var a = c.result(this, "_uiBindings"); this.ui = {}, c.each(c.keys(a), function (b) { var c = a[b]; this.ui[b] = this.$(c) }, this) }
}, unbindUIElements: function () { this.ui && this._uiBindings && (c.each(this.ui, function (a, b) { delete this.ui[b] }, this), this.ui = this._uiBindings, delete this._uiBindings) }
}), e.ItemView = e.View.extend({ constructor: function () { e.View.prototype.constructor.apply(this, arguments) }, serializeData: function () { var a = {}; return this.model ? a = this.model.toJSON() : this.collection && (a = { items: this.collection.toJSON() }), a }, render: function () { this.isClosed = !1, this.triggerMethod("before:render", this), this.triggerMethod("item:before:render", this); var a = this.serializeData(); a = this.mixinTemplateHelpers(a); var b = this.getTemplate(), c = e.Renderer.render(b, a); return this.$el.html(c), this.bindUIElements(), this.triggerMethod("render", this), this.triggerMethod("item:rendered", this), this }, close: function () { this.isClosed || (this.triggerMethod("item:before:close"), e.View.prototype.close.apply(this, arguments), this.triggerMethod("item:closed")) } }), e.CollectionView = e.View.extend({ itemViewEventPrefix: "itemview", constructor: function () { this._initChildViewStorage(), e.View.prototype.constructor.apply(this, arguments), this._initialEvents(), this.initRenderBuffer() }, initRenderBuffer: function () { this.elBuffer = document.createDocumentFragment(), this._bufferedChildren = [] }, startBuffering: function () { this.initRenderBuffer(), this.isBuffering = !0 }, endBuffering: function () { this.isBuffering = !1, this.appendBuffer(this, this.elBuffer), this._triggerShowBufferedChildren(), this.initRenderBuffer() }, _triggerShowBufferedChildren: function () { this._isShown && (c.each(this._bufferedChildren, function (a) { e.triggerMethod.call(a, "show") }), this._bufferedChildren = []) }, _initialEvents: function () { this.collection && (this.listenTo(this.collection, "add", this.addChildView), this.listenTo(this.collection, "remove", this.removeItemView), this.listenTo(this.collection, "reset", this.render)) }, addChildView: function (a) { this.closeEmptyView(); var b = this.getItemView(a), c = this.collection.indexOf(a); this.addItemView(a, b, c) }, onShowCalled: function () { this.children.each(function (a) { e.triggerMethod.call(a, "show") }) }, triggerBeforeRender: function () { this.triggerMethod("before:render", this), this.triggerMethod("collection:before:render", this) }, triggerRendered: function () { this.triggerMethod("render", this), this.triggerMethod("collection:rendered", this) }, render: function () { return this.isClosed = !1, this.triggerBeforeRender(), this._renderChildren(), this.triggerRendered(), this }, _renderChildren: function () { this.startBuffering(), this.closeEmptyView(), this.closeChildren(), this.isEmpty(this.collection) ? this.showEmptyView() : this.showCollection(), this.endBuffering() }, showCollection: function () { var a; this.collection.each(function (b, c) { a = this.getItemView(b), this.addItemView(b, a, c) }, this) }, showEmptyView: function () { var a = this.getEmptyView(); if (a && !this._showingEmptyView) { this._showingEmptyView = !0; var c = new b.Model; this.addItemView(c, a, 0) } }, closeEmptyView: function () { this._showingEmptyView && (this.closeChildren(), delete this._showingEmptyView) }, getEmptyView: function () { return e.getOption(this, "emptyView") }, getItemView: function () { var a = e.getOption(this, "itemView"); return a || d("An `itemView` must be specified", "NoItemViewError"), a }, addItemView: function (a, b, d) { var f = e.getOption(this, "itemViewOptions"); c.isFunction(f) && (f = f.call(this, a, d)); var g = this.buildItemView(a, b, f); return this.addChildViewEventForwarding(g), this.triggerMethod("before:item:added", g), this.children.add(g), this.renderItemView(g, d), this._isShown && !this.isBuffering && e.triggerMethod.call(g, "show"), this.triggerMethod("after:item:added", g), g }, addChildViewEventForwarding: function (a) { var b = e.getOption(this, "itemViewEventPrefix"); this.listenTo(a, "all", function () { var d = f.call(arguments), g = d[0], h = this.normalizeMethods(this.getItemEvents()); d[0] = b + ":" + g, d.splice(1, 0, a), "undefined" != typeof h && c.isFunction(h[g]) && h[g].apply(this, d), e.triggerMethod.apply(this, d) }, this) }, getItemEvents: function () { return c.isFunction(this.itemEvents) ? this.itemEvents.call(this) : this.itemEvents }, renderItemView: function (a, b) { a.render(), this.appendHtml(this, a, b) }, buildItemView: function (a, b, d) { var e = c.extend({ model: a }, d); return new b(e) }, removeItemView: function (a) { var b = this.children.findByModel(a); this.removeChildView(b), this.checkEmpty() }, removeChildView: function (a) { a && (a.close ? a.close() : a.remove && a.remove(), this.stopListening(a), this.children.remove(a)), this.triggerMethod("item:removed", a) }, isEmpty: function () { return !this.collection || 0 === this.collection.length }, checkEmpty: function () { this.isEmpty(this.collection) && this.showEmptyView() }, appendBuffer: function (a, b) { a.$el.append(b) }, appendHtml: function (a, b) { a.isBuffering ? (a.elBuffer.appendChild(b.el), a._bufferedChildren.push(b)) : a.$el.append(b.el) }, _initChildViewStorage: function () { this.children = new b.ChildViewContainer }, close: function () { this.isClosed || (this.triggerMethod("collection:before:close"), this.closeChildren(), this.triggerMethod("collection:closed"), e.View.prototype.close.apply(this, arguments)) }, closeChildren: function () { this.children.each(function (a) { this.removeChildView(a) }, this), this.checkEmpty() } }), e.CompositeView = e.CollectionView.extend({ constructor: function () { e.CollectionView.prototype.constructor.apply(this, arguments) }, _initialEvents: function () { this.once("render", function () { this.collection && (this.listenTo(this.collection, "add", this.addChildView), this.listenTo(this.collection, "remove", this.removeItemView), this.listenTo(this.collection, "reset", this._renderChildren)) }) }, getItemView: function () { var a = e.getOption(this, "itemView") || this.constructor; return a || d("An `itemView` must be specified", "NoItemViewError"), a }, serializeData: function () { var a = {}; return this.model && (a = this.model.toJSON()), a }, render: function () { this.isRendered = !0, this.isClosed = !1, this.resetItemViewContainer(), this.triggerBeforeRender(); var a = this.renderModel(); return this.$el.html(a), this.bindUIElements(), this.triggerMethod("composite:model:rendered"), this._renderChildren(), this.triggerMethod("composite:rendered"), this.triggerRendered(), this }, _renderChildren: function () { this.isRendered && (this.triggerMethod("composite:collection:before:render"), e.CollectionView.prototype._renderChildren.call(this), this.triggerMethod("composite:collection:rendered")) }, renderModel: function () { var a = {}; a = this.serializeData(), a = this.mixinTemplateHelpers(a); var b = this.getTemplate(); return e.Renderer.render(b, a) }, appendBuffer: function (a, b) { var c = this.getItemViewContainer(a); c.append(b) }, appendHtml: function (a, b) { if (a.isBuffering) a.elBuffer.appendChild(b.el), a._bufferedChildren.push(b); else { var c = this.getItemViewContainer(a); c.append(b.el) } }, getItemViewContainer: function (a) { if ("$itemViewContainer" in a) return a.$itemViewContainer; var b, f = e.getOption(a, "itemViewContainer"); if (f) { var g = c.isFunction(f) ? f.call(a) : f; b = "@" === g.charAt(0) && a.ui ? a.ui[g.substr(4)] : a.$(g), b.length <= 0 && d("The specified `itemViewContainer` was not found: " + a.itemViewContainer, "ItemViewContainerMissingError") } else b = a.$el; return a.$itemViewContainer = b, b }, resetItemViewContainer: function () { this.$itemViewContainer && delete this.$itemViewContainer } }), e.Layout = e.ItemView.extend({ regionType: e.Region, constructor: function (a) { a = a || {}, this._firstRender = !0, this._initializeRegions(a), e.ItemView.prototype.constructor.call(this, a) }, render: function () { return this.isClosed && this._initializeRegions(), this._firstRender ? this._firstRender = !1 : this.isClosed || this._reInitializeRegions(), e.ItemView.prototype.render.apply(this, arguments) }, close: function () { this.isClosed || (this.regionManager.close(), e.ItemView.prototype.close.apply(this, arguments)) }, addRegion: function (a, b) { var c = {}; return c[a] = b, this._buildRegions(c)[a] }, addRegions: function (a) { return this.regions = c.extend({}, this.regions, a), this._buildRegions(a) }, removeRegion: function (a) { return delete this.regions[a], this.regionManager.removeRegion(a) }, getRegion: function (a) { return this.regionManager.get(a) }, _buildRegions: function (a) { var b = this, c = { regionType: e.getOption(this, "regionType"), parentEl: function () { return b.$el } }; return this.regionManager.addRegions(a, c) }, _initializeRegions: function (a) { var b; this._initRegionManager(), b = c.isFunction(this.regions) ? this.regions(a) : this.regions || {}, this.addRegions(b) }, _reInitializeRegions: function () { this.regionManager.closeRegions(), this.regionManager.each(function (a) { a.reset() }) }, _initRegionManager: function () { this.regionManager = new e.RegionManager, this.listenTo(this.regionManager, "region:add", function (a, b) { this[a] = b, this.trigger("region:add", a, b) }), this.listenTo(this.regionManager, "region:remove", function (a, b) { delete this[a], this.trigger("region:remove", a, b) }) } }), e.Behavior = function (a, b) { function c(b, c) { this.view = c, this.defaults = a.result(this, "defaults") || {}, this.options = a.extend({}, this.defaults, b), this.$ = function () { return this.view.$.apply(this.view, arguments) }, this.initialize.apply(this, arguments) } return a.extend(c.prototype, b.Events, { initialize: function () { }, triggerMethod: e.triggerMethod }), c.extend = e.extend, c }(c, b), e.Behaviors = function (a, b) { function c(a) { this.behaviors = c.parseBehaviors(a, b.result(a, "behaviors")), c.wrap(a, this.behaviors, ["bindUIElements", "unbindUIElements", "delegateEvents", "undelegateEvents", "onShow", "onClose", "behaviorEvents", "triggerMethod", "setElement"]) } var d = { setElement: function (a, c) { a.apply(this, b.tail(arguments, 2)), b.each(c, function (a) { a.$el = this.$el }, this) }, onShow: function (c, d) { var e = b.tail(arguments, 2); b.each(d, function (b) { a.triggerMethod.apply(b, ["show"].concat(e)) }), b.isFunction(c) && c.apply(this, e) }, onClose: function (c, d) { var e = b.tail(arguments, 2); b.each(d, function (b) { a.triggerMethod.apply(b, ["close"].concat(e)) }), b.isFunction(c) && c.apply(this, e) }, bindUIElements: function (a, c) { a.apply(this), b.invoke(c, a) }, unbindUIElements: function (a, c) { a.apply(this), b.invoke(c, a) }, triggerMethod: function (a, c) { var d = b.tail(arguments, 2); a.apply(this, d), b.each(c, function (b) { a.apply(b, d) }) }, delegateEvents: function (c, d) { var e = b.tail(arguments, 2); c.apply(this, e), b.each(d, function (b) { a.bindEntityEvents(b, this.model, a.getOption(b, "modelEvents")), a.bindEntityEvents(b, this.collection, a.getOption(b, "collectionEvents")) }, this) }, undelegateEvents: function (c, d) { var e = b.tail(arguments, 2); c.apply(this, e), b.each(d, function (b) { a.unbindEntityEvents(this, this.model, a.getOption(b, "modelEvents")), a.unbindEntityEvents(this, this.collection, a.getOption(b, "collectionEvents")) }, this) }, behaviorEvents: function (c, d) { var e = {}, f = b.result(this, "ui"); return b.each(d, function (c, d) { var g = {}, h = b.result(c, "events") || {}, i = b.result(c, "ui"), j = b.extend({}, f, i); h = a.normalizeUIKeys(h, j), b.each(b.keys(h), function (a) { var e = new Array(d + 2).join(" "), f = a + e, i = b.isFunction(h[a]) ? h[a] : c[h[a]]; g[f] = b.bind(i, c) }), e = b.extend(e, g) }), e } }; return b.extend(c, { behaviorsLookup: function () { throw new Error("You must define where your behaviors are stored. See https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.behaviors.md#behaviorslookup") }, getBehaviorClass: function (a, d) { return a.behaviorClass ? a.behaviorClass : b.isFunction(c.behaviorsLookup) ? c.behaviorsLookup.apply(this, arguments)[d] : c.behaviorsLookup[d] }, parseBehaviors: function (a, d) { return b.map(d, function (b, d) { var e = c.getBehaviorClass(b, d); return new e(b, a) }) }, wrap: function (a, c, e) { b.each(e, function (e) { a[e] = b.partial(d[e], a[e], c) }) } }), c }(e, c), e.AppRouter = b.Router.extend({ constructor: function (a) { b.Router.prototype.constructor.apply(this, arguments), this.options = a || {}; var c = e.getOption(this, "appRoutes"), d = this._getController(); this.processAppRoutes(d, c), this.on("route", this._processOnRoute, this) }, appRoute: function (a, b) { var c = this._getController(); this._addAppRoute(c, a, b) }, _processOnRoute: function (a, b) { var d = c.invert(this.appRoutes)[a]; c.isFunction(this.onRoute) && this.onRoute(a, d, b) }, processAppRoutes: function (a, b) { if (b) { var d = c.keys(b).reverse(); c.each(d, function (c) { this._addAppRoute(a, c, b[c]) }, this) } }, _getController: function () { return e.getOption(this, "controller") }, _addAppRoute: function (a, b, e) { var f = a[e]; f || d("Method '" + e + "' was not found on the controller"), this.route(b, e, c.bind(f, a)) } }), e.Application = function (a) { this._initRegionManager(), this._initCallbacks = new e.Callbacks, this.vent = new b.Wreqr.EventAggregator, this.commands = new b.Wreqr.Commands, this.reqres = new b.Wreqr.RequestResponse, this.submodules = {}, c.extend(this, a), this.triggerMethod = e.triggerMethod }, c.extend(e.Application.prototype, b.Events, { execute: function () { this.commands.execute.apply(this.commands, arguments) }, request: function () { return this.reqres.request.apply(this.reqres, arguments) }, addInitializer: function (a) { this._initCallbacks.add(a) }, start: function (a) { this.triggerMethod("initialize:before", a), this._initCallbacks.run(a, this), this.triggerMethod("initialize:after", a), this.triggerMethod("start", a) }, addRegions: function (a) { return this._regionManager.addRegions(a) }, closeRegions: function () { this._regionManager.closeRegions() }, removeRegion: function (a) { this._regionManager.removeRegion(a) }, getRegion: function (a) { return this._regionManager.get(a) }, module: function (a, b) { var c = e.Module.getClass(b), d = f.call(arguments); return d.unshift(this), c.create.apply(c, d) }, _initRegionManager: function () { this._regionManager = new e.RegionManager, this.listenTo(this._regionManager, "region:add", function (a, b) { this[a] = b }), this.listenTo(this._regionManager, "region:remove", function (a) { delete this[a] }) } }), e.Application.extend = e.extend, e.Module = function (a, b, d) { this.moduleName = a, this.options = c.extend({}, this.options, d), this.initialize = d.initialize || this.initialize, this.submodules = {}, this._setupInitializersAndFinalizers(), this.app = b, this.startWithParent = !0, this.triggerMethod = e.triggerMethod, c.isFunction(this.initialize) && this.initialize(this.options, a, b) }, e.Module.extend = e.extend, c.extend(e.Module.prototype, b.Events, { initialize: function () { }, addInitializer: function (a) { this._initializerCallbacks.add(a) }, addFinalizer: function (a) { this._finalizerCallbacks.add(a) }, start: function (a) { this._isInitialized || (c.each(this.submodules, function (b) { b.startWithParent && b.start(a) }), this.triggerMethod("before:start", a), this._initializerCallbacks.run(a, this), this._isInitialized = !0, this.triggerMethod("start", a)) }, stop: function () { this._isInitialized && (this._isInitialized = !1, e.triggerMethod.call(this, "before:stop"), c.each(this.submodules, function (a) { a.stop() }), this._finalizerCallbacks.run(void 0, this), this._initializerCallbacks.reset(), this._finalizerCallbacks.reset(), e.triggerMethod.call(this, "stop")) }, addDefinition: function (a, b) { this._runModuleDefinition(a, b) }, _runModuleDefinition: function (a, d) { if (a) { var f = c.flatten([this, this.app, b, e, e.$, c, d]); a.apply(this, f) } }, _setupInitializersAndFinalizers: function () { this._initializerCallbacks = new e.Callbacks, this._finalizerCallbacks = new e.Callbacks } }), c.extend(e.Module, { create: function (a, b, d) { var e = a, g = f.call(arguments); g.splice(0, 3), b = b.split("."); var h = b.length, i = []; return i[h - 1] = d, c.each(b, function (b, c) { var f = e; e = this._getModule(f, b, a, d), this._addModuleDefinition(f, e, i[c], g) }, this), e }, _getModule: function (a, b, d, e) { var f = c.extend({}, e), g = this.getClass(e), h = a[b]; return h || (h = new g(b, d, f), a[b] = h, a.submodules[b] = h), h }, getClass: function (a) { var b = e.Module; return a ? a.prototype instanceof b ? a : a.moduleClass || b : b }, _addModuleDefinition: function (a, b, c, d) { var e = this._getDefine(c), f = this._getStartWithParent(c, b); e && b.addDefinition(e, d), this._addStartWithParent(a, b, f) }, _getStartWithParent: function (a, b) { var d; return c.isFunction(a) && a.prototype instanceof e.Module ? (d = b.constructor.prototype.startWithParent, c.isUndefined(d) ? !0 : d) : c.isObject(a) ? (d = a.startWithParent, c.isUndefined(d) ? !0 : d) : !0 }, _getDefine: function (a) { return !c.isFunction(a) || a.prototype instanceof e.Module ? c.isObject(a) ? a.define : null : a }, _addStartWithParent: function (a, b, c) { b.startWithParent = b.startWithParent && c, b.startWithParent && !b.startWithParentIsConfigured && (b.startWithParentIsConfigured = !0, a.addInitializer(function (a) { b.startWithParent && b.start(a) })) } }), e
}(this, Backbone, _);

BCG.utils.dropdownTree = (function () {
    "use strict";
    var searchArray = [],
        oRequestFilter = {
            NodeID: null,
            TLStatus: null,
            UserID: null,
            IsFrozen: null,
            IsExtensible: null,
            IsFavorite: null
        },
        projectManualEnb,
        rmManualenabled,
        $tree,
        nodeType = {
            program: 1,
            project: 2,
            roadmap: 3
        },
        TreeNode, //Tree Node Model for a single Node
        TreeNodeCollection, //All collection of Tree node
        TreeView, //View for tree
        TreeRoot, // Root Node of the Tree
        pmTree, // it is a application variable
        programID = $.cookie('PROG_CURRENT'),
        context; // it is a header view functionality view


    /**
     * This method used to give auto complete feature in Search box of Tree
     * @method searchPMtree
     * @return 
     */
    function searchPMtree() {
        if (!programID) {
            programID = $.cookie('PROG_CURRENT');
        }
        $(".search-field",'.treeContainer',context).autocomplete({
            source: function (request, response) {
                var paramsForSearch = {
                    url: BCG.config.urls.restRoot + BCG.serviceConfig.programManagementTree.getSearchedData,
                    data: {
                        searchKey: request.term,
                        objectTypeName: null
                    },
                    async: true,
                    successCallback: function (msg) {
                        // msg = _.pluck(msg, "Name");
                        response(msg);                        
                        closeTreeLoading();
                    },
                    hideLoader: true
                };


                if (/msie/.test(navigator.userAgent.toLowerCase())) {
                    paramsForSearch.cache = false;
                }
                BCG.service.getData(paramsForSearch);
            },
            minLength: 3,
            select: function (event, ui) {
                $(".search-field",context).val(ui.item.Name).data("nodeId", ui.item.NodeID).data("parentNodeId", ui.item.ParentNodeID);
                startSearch(ui.item.ParentNodeID, ui.item.NodeID);
                return false;
            }
        }).autocomplete("instance")._renderItem = function (ul, item) {
            return $("<li>")
                .data("nodeId", item.NodeID)
                .data("parentNodeId", item.ParentNodeID)
                .text(item.Name)
                .appendTo(ul);
        }
        // val('');
    }

    function startSearch(programid, nodeId) {
        var params = {
            url: BCG.config.urls.restRoot + BCG.serviceConfig.programManagementTree.getSearchedSelectedData,
            data: {
                parentNodeID: programid,
                nodeID: nodeId,
                programID: programID
            },
            successCallback: function (data) {
                var tree = new TreeNodeCollection(data),
                    treeView = new TreeRoot({
                        collection: tree
                    });
                $tree.html(treeView.render().el);
                // Closes page Loader
                //closeTreeLoading();
            },
            errorCallback: function () {
                // Throws failure alert
                BCG.utils.openAlert(l10n("rm-global-msg-errorWhileFetchingData"), { dialogClass: "alert" });
            },
            hideLoader: true
        };
        // IE9 hack to fix caching issue
        if (/msie/.test(navigator.userAgent.toLowerCase())) {
            params.cache = false;
        }
        BCG.service.getData(params);
    }

    function initTreeLoading() {
        //var $loader = $("#tree-loader");
       // $loader.fadeIn(300);
    }

    function closeTreeLoading() {
        //var $loader = $("#tree-loader");

        //$loader.fadeOut(500, function () {
        //    $loader.hide();
        //});
    }

    TreeNode = Backbone.Model.extend({
        /**
         * This method run when a tree node initialize, it is used to bind some additional value to the node
         * @return
         * @method initialize
         * @return 
         */
        initialize: function () {
            var nodes = this.get("Children");
            nodes = _.sortBy(nodes, function (node) {
                return node.SortOrder;
            });
            if (nodes) {
                this.nodes = new TreeNodeCollection(nodes);
            } else {
                this.nodes = new TreeNodeCollection();
            }
            this.unset("nodes");
            this.attributes.IsProjectManualNumberEnabled = projectManualEnb;
            this.attributes.IsRoadmapManualNumberEnabled = rmManualenabled;
        }
    });

    /*****************             COLLECTIONS            *******************/

    TreeNodeCollection = Backbone.Collection.extend({
        model: TreeNode
    });
    /*****************             VIEWS            *******************/



    // The recursive tree view
    TreeView = Backbone.Marionette.CompositeView.extend({
        template: '#node-template-dropdown',

        tagName: "li",

        /**
         * this method runs when tree view get initialized, , anything custom we want, we can write here
         * @return
         * @method initialize
         * @return 
         */
        initialize: function () {

            var self = this;

            /** grab the child collection from the parent model
             * so that we can render the collection as children
             * of this parent node
             */
            if (typeof self.collection === "undefined") {
                self.collection = self.model.nodes;
            }
            
        },

        /**
         * This method provided by the Marionette to append extra html to the template
         * @return
         * @method appendHtml
         * @param {} cv: collectionView
         * @param {} iv: itemView
         * @param {} i
         * @return 
         */
        appendHtml: function (cv, iv, i) {
            var childrenContainer = cv.$("ul:first"),
                children = childrenContainer.children();
            if (children.size() === i) {
                childrenContainer.append(iv.el);
            } else {
                childrenContainer.children().eq(i).before(iv.el);
            }
        },
        /**
         * This method run on the render of each tree node
         * @return
         * @method onRender
         * @return 
         */
        onRender: function () {
            var self = this,
                wrapper = self.$el.children().children('.wrapper');

            //TODO: check the rights of the node and make it active or inactive for the particular user
            if (this.collection.length) {
                // this.$el.children('.wrapper').children('.tools').hide();
                this.$el.children().children('ul').show();
                $('.toggle', wrapper).toggleClass("icon-expand icon-collapse");
            }

            wrapper
                .hover(
                    function () {
                        var leftMargin = $tree.offset().left - $(this).offset().left;

                        $(this).children('.pseudo-wrapper').css({
                            "margin-left": leftMargin + "px"
                        }).show();
                    },
                    function () {
                        $(this).children('.pseudo-wrapper').hide();
                    });

        },

        events: {
            'click >a .wrapper': 'updateContentArea',
            'click.a >a .wrapper .toggle': 'checkChildren'
        },

       
        

        /**
         * update content area (right panel) and give the node details to the hand shaking method
         * Also Inits the respective page by NodeType
         * @return
         * @method showNavByRights
         * @param {} nodeType
         * @param {} rightsArr
         * @return 
         */
        updateContentArea: function (event) {
            var data = this.model.toJSON();
            event.preventDefault();
            EventHelpers.cancelBubble(event);
            event.stopPropagation();
            if (data.NodeTypeName === "Roadmap" && (!$(event.target).hasClass("rm-unpublished") && !$(event.target).closest(".rm-unpublished").length && !$(event.target).find(".rm-unpublished").length)) {
                $(".add-interdependency-rm-dd", context).html("<option value='"+data.NodeID+"'>"+data.NodeNumber + " " + data.NodeName+"</option>").val(data.NodeID);
                BCG.utils.bindMilestonesInInterdependancy(event);
                $('.treeContainer.select:not(.hidden)', context).toggleClass("hidden");

            }           
            
            //just selecting the nodes and displaying the corrosponding milestone in dropdown
        },


        /**
         * It checks the children of any node by a service call and add it to the collection
         * @return
         * @method checkChildren
         * @param {} event
         * @return 
         */
        checkChildren: function (event) {
            event.preventDefault();
            EventHelpers.cancelBubble(event);
            var $childNodes = $(event.currentTarget).closest('li').children().children('ul'),
                isChildVisible = $childNodes.is(':visible'),
                data, self, thisWrapper, params;

            //If children list is visible hide it
            if (isChildVisible && $childNodes.children().length) {
                this.toggleChildren(event);
                $childNodes.children().remove();
                $(".pseudo-wrapper")
                    .width(_.max($(".wrapper").map(function (a, e) { return $(e).width() + e.offsetLeft; })))
                    .css("minWidth", $tree.width());

                return false;
            }

            $childNodes.hide();
            self = this;
            data = self.model.toJSON();
            thisWrapper = self.$('a >div.wrapper:first');
            oRequestFilter.NodeID = data.NodeID;
            params = {
                url: BCG.config.urls.restRoot + BCG.serviceConfig.programManagementTree.getTreeNodeChildren,
                data: {
                    jsonRequest: JSON.stringify(oRequestFilter),
                    programID: programID
                },
                successCallback: function (data) {
                    if (data[0].NodeName !== null) {
                        thisWrapper.siblings('ul').html('');
                        data = _.sortBy(data, function (node) {
                            return node.SortOrder;
                        });
                        // self.collection.add(data);
                        pmTree.appendChildren(data, thisWrapper);
                        //self.toggleChildren(event);
                    }
                    // Closes page Loader
                    closeTreeLoading();
                },
                errorCallback: function () {
                    // Throws failure alert
                    BCG.utils.openAlert(l10n("rm-global-msg-errorWhileFetchingData"), { dialogClass: "alert" });
                },
                hideLoader: true
            };
            // IE9 hack to fix caching issue
            if (/msie/.test(navigator.userAgent.toLowerCase())) {
                params.cache = false;
            }
            initTreeLoading("loading Children");
            BCG.service.getData(params);

        },

        /**
         * create the toggleChildren function
         * @return
         * @method toggleChildren
         * @param {} event
         * @return 
         */
        toggleChildren: function (event) {
            // show / hide the children of the buttons parent element
            // also hide children edit panels
            var children = $(event.currentTarget).closest('li').children().children('ul');

            children.slideToggle();
            
            // toggle button content +/-;
            if (event) {
                $(event.currentTarget).toggleClass("icon-expand icon-collapse");
            }
        }
    });
    // The tree's root: a simple collection view that renders
    // a recursive tree structure for each item in the collection
    TreeRoot = Backbone.Marionette.CollectionView.extend({
        tagName: "ul",
        itemView: TreeView
    });



    pmTree = new Backbone.Marionette.Application();

    /**
     * Initialize the rendering of Tree
     * @return
     * @method init
     * @param {} nodeId
     * @return 
     */
    pmTree.init = function (nodeId,context) {
        $tree = $("#dropDownTree",context);
        oRequestFilter.NodeID = nodeId;
        initTreeLoading();
        var params = {
            url: BCG.config.urls.restRoot + BCG.serviceConfig.programManagementTree.getRoleBasedTreeNodes,
            data: {
                jsonRequest: JSON.stringify(oRequestFilter)
            },
            async: true,
            successCallback: function (data) {
                if (data && data[0] && data[0].TreeNode) {
                    projectManualEnb = !(data[0].IsProjectAutoNumberEnabled || data[0].IsProjectAutoNumberEnabled === null);
                    rmManualenabled = !(data[0].IsRoadmapAutoNumberEnabled || data[0].IsRoadmapAutoNumberEnabled === null);
                    var programNodeId = data[0].TreeNode[0].ProgramID,
                    tree,
                    treeView;
                    //$.cookie('PROG_CURRENT', programNodeId, {
                    //    path: '/'
                    //});

                    tree = new TreeNodeCollection(data[0].TreeNode),
                    treeView = new TreeRoot({ collection: tree });
                    $tree.html(treeView.render().el);
                    searchPMtree();
                    // treeView.show();

                    //pmTree.setWidthFvrt()

                    //$(".pseudo-wrapper")
                    //    .width(_.max($(".wrapper").map(function (a, e) { return $(e).width() + e.offsetLeft; })))
                    //    .css("minWidth", $tree.width());

                    //$(document).on('click.b', '#tree .toggle', function (event) {
                    //    event.preventDefault();
                    //    EventHelpers.cancelBubble(event);
                    //    var $targetElem = $(EventHelpers.getEventTarget(event)),
                    //        $childNodes = $targetElem.closest('li').children().children('ul');
                    //    $childNodes.hide();
                    //    $targetElem.removeClass("icon-collapse").addClass('icon-expand');
                    //});
                }
                // Closes page Loader
                closeTreeLoading();
            },

            errorCallback: function () {
                BCG.utils.openAlert(l10n("rm-global-msg-errorWhileFetchingData"), { dialogClass: "alert" });
            },
            $container: $('.tree-column')
        };
        // IE9 hack to fix caching issue
        if (/msie/.test(navigator.userAgent.toLowerCase())) {
            params.cache = false;
        }
        initTreeLoading("loading Tree");
        BCG.service.getData(params);
    };
    pmTree.appendChildren = function (data, wrapper) {
        var $toggleButton = wrapper.find('.toggle'),
            childUl = wrapper.siblings('ul'),
            tree = new TreeNodeCollection(data),
            treeView = new TreeRoot({
                collection: tree
            });
        childUl.append(treeView.render().el.childNodes);

        //Checking if the child nodes are visible or not and according toggling the nodes
        if ($toggleButton.hasClass('not')) {
            $toggleButton.removeClass('not');
        } else if (!tree.length) {
            $toggleButton.addClass('not');
        }
        if (!childUl.is(':visible')) {
            childUl.slideToggle();
            wrapper.children().children('.toggle').toggleClass("icon-expand icon-collapse");
        }
        $(".wrapper", childUl).each(function (key, value) {
            $(value).width($(value).find(".node-name").width() + 100);
            $(value).children('.icon-programTree_favorites').css({
                "margin-left": $tree.offset().left - $(value).offset().left + "px"
            });
        });
        $(".pseudo-wrapper")
            .width(_.max($(".wrapper").map(function (a, e) { return $(e).width() + e.offsetLeft; })))
            .css("minWidth", $tree.width());
    };
    return pmTree;

})();