import{g as O,c as d}from"./index-0fa82e96.js";function A(u,v){for(var l=0;l<v.length;l++){const r=v[l];if(typeof r!="string"&&!Array.isArray(r)){for(const c in r)if(c!=="default"&&!(c in u)){const s=Object.getOwnPropertyDescriptor(r,c);s&&Object.defineProperty(u,c,s.get?s:{enumerable:!0,get:()=>r[c]})}}}return Object.freeze(Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}))}var E={exports:{}};(function(u,v){(function(l,r){r()})(d,function(){function l(e,t){return typeof t>"u"?t={autoBom:!1}:typeof t!="object"&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\uFEFF",e],{type:e.type}):e}function r(e,t,i){var o=new XMLHttpRequest;o.open("GET",e),o.responseType="blob",o.onload=function(){p(o.response,t,i)},o.onerror=function(){console.error("could not download file")},o.send()}function c(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch{}return 200<=t.status&&299>=t.status}function s(e){try{e.dispatchEvent(new MouseEvent("click"))}catch{var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(t)}}var a=typeof window=="object"&&window.window===window?window:typeof self=="object"&&self.self===self?self:typeof d=="object"&&d.global===d?d:void 0,y=a.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),p=a.saveAs||(typeof window!="object"||window!==a?function(){}:"download"in HTMLAnchorElement.prototype&&!y?function(e,t,i){var o=a.URL||a.webkitURL,n=document.createElement("a");t=t||e.name||"download",n.download=t,n.rel="noopener",typeof e=="string"?(n.href=e,n.origin===location.origin?s(n):c(n.href)?r(e,t,i):s(n,n.target="_blank")):(n.href=o.createObjectURL(e),setTimeout(function(){o.revokeObjectURL(n.href)},4e4),setTimeout(function(){s(n)},0))}:"msSaveOrOpenBlob"in navigator?function(e,t,i){if(t=t||e.name||"download",typeof e!="string")navigator.msSaveOrOpenBlob(l(e,i),t);else if(c(e))r(e,t,i);else{var o=document.createElement("a");o.href=e,o.target="_blank",setTimeout(function(){s(o)})}}:function(e,t,i,o){if(o=o||open("","_blank"),o&&(o.document.title=o.document.body.innerText="downloading..."),typeof e=="string")return r(e,t,i);var n=e.type==="application/octet-stream",g=/constructor/i.test(a.HTMLElement)||a.safari,b=/CriOS\/[\d]+/.test(navigator.userAgent);if((b||n&&g||y)&&typeof FileReader<"u"){var m=new FileReader;m.onloadend=function(){var f=m.result;f=b?f:f.replace(/^data:[^;]*;/,"data:attachment/file;"),o?o.location.href=f:location=f,o=null},m.readAsDataURL(e)}else{var j=a.URL||a.webkitURL,w=j.createObjectURL(e);o?o.location=w:location.href=w,o=null,setTimeout(function(){j.revokeObjectURL(w)},4e4)}});a.saveAs=p.saveAs=p,u.exports=p})})(E);var h=E.exports;const L=O(h),S=A({__proto__:null,default:L},[h]);export{S as F};
