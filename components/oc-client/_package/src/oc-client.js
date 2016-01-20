"use strict";var oc=oc||{};!function(e,n,r){if(oc.conf=oc.conf||{},oc.cmd=oc.cmd||[],oc.renderedComponents=oc.renderedComponents||{},oc.status=oc.status||!1,oc.status)return oc;oc.status="loading";var o="https://cdnjs.cloudflare.com/ajax/libs/",t=o+"jquery-ajaxtransport-xdomainrequest/1.0.3/jquery.xdomainrequest.min.js",c=o+"handlebars.js/3.0.1/handlebars.runtime.js",a=o+"jade/1.9.2/runtime.min.js",i=o+"jquery/1.11.2/jquery.min.js",d=oc.conf.retryInterval||5e3,u=oc.conf.retryLimit||30,f=oc.conf.retrySendNumber||!0,s=oc.conf.pollingInterval||500,l=oc.conf.tag||"oc-component",m="baseUrl parameter is required",p="Href parameter missing",v="name parameter is required",y="Failed to load {0} component {1} times. Giving up".replace("{1}",u),h="Error getting compiled view: {0}",g="Error rendering component: {0}, error: {1}",j="Failed to retrieve the component. Retrying in {0} seconds...".replace("{0}",d/1e3),q='Error loading component: view engine "{0}" not supported',b="Loading...",C="Component '{0}' correctly rendered",x="Unrendered component found. Trying to retrieve it...",$=oc.conf.debug||!1,w=function(){},E=r.navigator.userAgent,I=!!E.match(/MSIE 8/),O=!!E.match(/MSIE 9/),U=!1,L=!1,M={},k=function(e){return"boolean"==typeof e},H={error:function(e){return console.log(e)},info:function(e){return $?console.log(e):!1}},_=function(e,n,r){return void 0===M[e]&&(M[e]=u),M[e]<=0?r():(setTimeout(function(){n(u-M[e]+1)},d),void M[e]--)},N=function(e,n){if(e&&n){var r=oc.$.param(n);return e.indexOf("?")>-1?e+"&"+r:e+"?"+r}return e};oc.require=function(n,o,t){"function"==typeof o&&(t=o,o=n,n=void 0),"string"==typeof n&&(n=[n]);var c=function(){var e=r;if("undefined"==typeof n)return!0;for(var o=0;o<n.length;o++)if(e=e[n[o]],!e)return!0;return!1},a=function(){var e=r;if("undefined"!=typeof n){for(var o=0;o<n.length;o++)if(e=e[n[o]],!e)return;return e}};c()?e.load(o,function(){t(a())}):t(a())};var T=function(e,n,r){n.id=Math.floor(9999999999*Math.random()),e.html(n.html),e.attr("id",n.id),e.attr("data-rendered",!0),e.attr("data-rendering",!1),e.attr("data-version",n.version),n.key&&e.attr("data-hash",n.key),n.name&&(e.attr("data-name",n.name),oc.renderedComponents[n.name]=n.version,oc.events.fire("oc:rendered",n)),r()};oc.build=function(e){if(!e.baseUrl)throw m;if(!e.name)throw v;var n=function(e){return e=e||"","/"!==e.slice(-1)&&(e+="/"),e},r=n(e.baseUrl)+n(e.name);if(e.version&&(r+=n(e.version)),e.parameters){r+="?";for(var o in e.parameters)e.parameters.hasOwnProperty(o)&&(r+=o+"="+e.parameters[o]+"&");r=r.slice(0,-1)}return I?'<div data-oc-component="true" href="'+r+'"></div>':"<"+l+' href="'+r+'"></'+l+">"},oc.events={},oc.ready=function(e){if(U)return e();if(L)oc.cmd.push(e);else{L=!0;var n=function(e){!I&&!O||oc.$.IE_POLYFILL_LOADED?e():oc.require(t,e)},r=function(){U=!0,L=!1,oc.events=function(){var e=oc.$({});return{fire:function(n,r){return e.trigger(n,r)},on:function(n,r){return e.on(n,r||w)},reset:function(){return e.off()}}}(),e(),oc.events.fire("oc:ready",oc),oc.status="ready";for(var n=0;n<oc.cmd.length;n++)oc.cmd[n](oc);oc.cmd={push:function(e){e(oc)}}};oc.require("jQuery",i,function(e){oc.$=e.noConflict(),n(r)})}},oc.render=function(e,n,r){oc.ready(function(){e.type.match(/jade|handlebars/g)?oc.require(["oc","components",e.key],e.src,function(o){o?"handlebars"===e.type?oc.require("Handlebars",c,function(e){var t=e.template(o,[]);r(null,t(n))}):"jade"===e.type&&oc.require("jade",a,function(e){r(null,o(n))}):r(h.replace("{0}",e.src))}):r(q.replace("{0}",e.type))})},oc.renderNestedComponent=function(e,n){oc.ready(function(){var r=e.attr("data-rendering"),o=e.attr("data-rendered"),t=k(r)?r:"true"===r,c=k(o)?o:"true"===o;t||c?setTimeout(n,s):(H.info(x),e.attr("data-rendering",!0),e.html('<div class="oc-loading">'+b+"</div>"),oc.renderByHref(e.attr("href"),function(r,o){return r||!o?(H.error(r),n()):void T(e,o,n)}))})},oc.renderByHref=function(e,n,r){var o=r,t=n;"function"==typeof n&&(o=n,t=0),oc.ready(function(){if(""===e)return o(g.replace("{1}",p));var n=e;f&&(n=N(n,{__oc_Retry:t})),oc.$.ajax({url:n,headers:{Accept:"application/vnd.oc.unrendered+json"},contentType:"text/plain",crossDomain:!0,async:!0,success:function(e){if("unrendered"===e.renderMode)oc.render(e.template,e.data,function(n,r){return n?o(g.replace("{0}",e.href).replace("{1}",n)):(H.info(C.replace("{0}",e.template.src)),void o(null,{html:r,key:e.template.key,version:e.version,name:e.name}))});else if("rendered"===e.renderMode){if(H.info(C.replace("{0}",e.href)),0===e.html.indexOf("<"+l)){var n=e.html.slice(e.html.indexOf(">")+1),r=n.slice(0,n.lastIndexOf("<"));e.html=r}o(null,{html:e.html,version:e.version,name:e.name})}},error:function(){H.error(j),_(e,function(n){oc.renderByHref(e,n,o)},function(){o(y.replace("{0}",e))})}})})},oc.renderUnloadedComponents=function(){oc.ready(function(){var e=I?"div[data-oc-component=true]":l,n=oc.$(e+"[data-rendered!=true]"),r=n.length,o=function(e){r--,r||oc.renderUnloadedComponents()};if(r>0)for(var t=0;t<n.length;t++)oc.renderNestedComponent(oc.$(n[t]),o)})},oc.load=function(e,n,r){oc.ready(function(){if("function"!=typeof r&&(r=w),oc.$(e)){oc.$(e).html("<"+l+' href="'+n+'" />');var o=oc.$(l,e);oc.renderNestedComponent(o,function(){r(o)})}})},oc.ready(oc.renderUnloadedComponents)}(head,document,window);