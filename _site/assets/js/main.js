function lockBody(){return body[0].style.overflow="hidden",!0}function unlockBody(){return body[0].style.overflowY="scroll",!0}function checkPage(e){return body[0].className.indexOf(e)!==-1}var window_width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,body=document.getElementsByTagName("body");if(!function e(t,n,r){function i(o,s){if(!n[o]){if(!t[o]){var c="function"==typeof require&&require;if(!s&&c)return c(o,!0);if(a)return a(o,!0);throw new Error("Cannot find module '"+o+"'")}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return i(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(e,t,n){"use strict";function r(e,t){var n=t.length,r=e.length;if(r>n)return!1;if(r===n)return e===t;e:for(var i=0,a=0;i<r;i++){for(var o=e.charCodeAt(i);a<n;)if(t.charCodeAt(a++)===o)continue e;return!1}return!0}t.exports=r},{}],2:[function(e,t,n){"use strict";function r(e,t){var n=a();n.open("GET",e,!0),n.onreadystatechange=i(n,t),n.send()}function i(e,t){return function(){if(4===e.readyState&&200===e.status)try{t(null,JSON.parse(e.responseText))}catch(e){t(e,null)}}}function a(){return window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP")}t.exports={load:r}},{}],3:[function(e,t,n){"use strict";t.exports=function e(t){function n(e){return!!e&&void 0!==e.required&&e.required instanceof Array}if(!n(t))throw new Error("-- OptionsValidator: required options missing");if(!(this instanceof e))return new e(t);var r=t.required;this.getRequiredOptions=function(){return r},this.validate=function(e){var t=[];return r.forEach(function(n){void 0===e[n]&&t.push(n)}),t}}},{}],4:[function(e,t,n){"use strict";function r(e){return o(e)?c(e):s(e)?l(e):void 0}function i(){return w.length=0,w}function a(){return w}function o(e){return!!e&&"[object Object]"===Object.prototype.toString.call(e)}function s(e){return!!e&&"[object Array]"===Object.prototype.toString.call(e)}function c(e){return w.push(e),w}function l(e){for(var t=[],n=0;n<e.length;n++)o(e[n])&&t.push(c(e[n]));return t}function u(e){return e?m(w,e,y.searchStrategy,y):[]}function d(e){y=e||{},y.fuzzy=e.fuzzy||!1,y.limit=e.limit||10,y.searchStrategy=e.fuzzy?p:_}function m(e,t,n,r){for(var i=[],a=0;a<e.length&&i.length<r.limit;a++){var o=f(e[a],t,n,r);o&&i.push(o)}return i}function f(e,t,n,r){for(var i in e)if(!h(e[i],r.exclude)&&n.matches(e[i],t))return e}function h(e,t){var n=!1;t=t||[];for(var r=0;r<t.length;r++){var i=t[r];!n&&new RegExp(e).test(i)&&(n=!0)}return n}t.exports={put:r,clear:i,get:a,search:u,setOptions:d};var p=e("./SearchStrategies/FuzzySearchStrategy"),_=e("./SearchStrategies/LiteralSearchStrategy"),w=[],y={};y.fuzzy=!1,y.limit=10,y.searchStrategy=y.fuzzy?p:_},{"./SearchStrategies/FuzzySearchStrategy":5,"./SearchStrategies/LiteralSearchStrategy":6}],5:[function(e,t,n){"use strict";function r(){this.matches=function(e,t){return i(t,e)}}var i=e("fuzzysearch");t.exports=new r},{fuzzysearch:1}],6:[function(e,t,n){"use strict";function r(){this.matches=function(e,t){return"string"==typeof e&&(e=e.trim(),e.toLowerCase().indexOf(t.toLowerCase())>=0)}}t.exports=new r},{}],7:[function(e,t,n){"use strict";function r(e){a.pattern=e.pattern||a.pattern,a.template=e.template||a.template,"function"==typeof e.middleware&&(a.middleware=e.middleware)}function i(e){return a.template.replace(a.pattern,function(t,n){var r=a.middleware(n,e[n],a.template);return void 0!==r?r:e[n]||t})}t.exports={compile:i,setOptions:r};var a={};a.pattern=/\{(.*?)\}/g,a.template="",a.middleware=function(){}},{}],8:[function(e,t,n){!function(t,n,r){"use strict";function i(e){_.put(e),c()}function a(e){w.load(e,function(t,n){t&&m("failed to get JSON ("+e+")"),i(n)})}function o(){f.resultsContainer.innerHTML=""}function s(e){f.resultsContainer.innerHTML+=e}function c(){f.searchInput.addEventListener("keyup",function(e){var t=e.which;if(d(t)){o();var n=e.target.value;u(n)&&l(_.search(n))}})}function l(e){if(0===e.length)return s(f.noResultsText);for(var t=0;t<e.length;t++)s(p.compile(e[t]))}function u(e){return e&&e.length>0}function d(e){return[13,16,20,37,38,39,40,91].indexOf(e)===-1}function m(e){throw new Error("SimpleJekyllSearch --- "+e)}var f={searchInput:null,resultsContainer:null,json:[],searchResultTemplate:'<li><a href="{url}" title="{desc}">{title}</a></li>',templateMiddleware:function(){},noResultsText:"No results found",limit:10,fuzzy:!1,exclude:[]},h=["searchInput","resultsContainer","json"],p=e("./Templater"),_=e("./Repository"),w=e("./JSONLoader"),y=e("./OptionsValidator")({required:h}),g=e("./utils");t.SimpleJekyllSearch=function(e){var t=y.validate(e);t.length>0&&m("You must specify the following required options: "+h),f=g.merge(f,e),p.setOptions({template:f.searchResultTemplate,middleware:f.templateMiddleware}),_.setOptions({fuzzy:f.fuzzy,limit:f.limit}),g.isJSON(f.json)?i(f.json):a(f.json)},t.SimpleJekyllSearch.init=t.SimpleJekyllSearch,"function"==typeof t.SimpleJekyllSearchInit&&t.SimpleJekyllSearchInit.call(this,t.SimpleJekyllSearch)}(window,document)},{"./JSONLoader":2,"./OptionsValidator":3,"./Repository":4,"./Templater":7,"./utils":9}],9:[function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)n[r]=e[r],void 0!==t[r]&&(n[r]=t[r]);return n}function i(e){try{return!!(e instanceof Object&&JSON.parse(JSON.stringify(e)))}catch(e){return!1}}t.exports={merge:r,isJSON:i}},{}]},{},[8]),checkPage("home")){var about__intro=document.getElementsByClassName("about__intro");window_width>1024&&window.addEventListener("scroll",function(){var e=250-window.pageYOffset/2;window.pageYOffset/2==0&&(e=0),about__intro[0].style.transform="translateY(-"+e+"px)"})}if(!checkPage("article")){var header=document.getElementsByClassName("header"),header__wrapper=header[0].querySelector(".header__wrapper");window.addEventListener("scroll",function(){header__wrapper.style.paddingTop=window.pageYOffset/2+"px"})}var menu=document.getElementsByClassName("menu"),menu__icon=menu[0].childNodes[1],menu__search=menu[0].childNodes[3],menu__wrapper=document.getElementsByClassName("menu__wrapper"),menu__close=document.getElementsByClassName("menu__wrapper_close"),search=document.getElementsByClassName("search"),search_title=document.getElementsByClassName("search__form_title"),close_search=search_title[0].childNodes[1];if(menu__icon.addEventListener("click",function(){menu__wrapper[0].className.indexOf("active")==-1&&(menu__wrapper[0].className+=" active")}),window_width<760&&(menu__close[0]=menu__wrapper[0].childNodes[1].childNodes[1]),menu__close[0].addEventListener("click",function(){menu__wrapper[0].className="menu__wrapper"}),window_width<760&&document.getElementsByClassName("menu__wrapper_close-mobile")[0].addEventListener("click",function(){menu__wrapper[0].className="menu__wrapper"}),menu__search.addEventListener("click",function(){search[0].style.marginTop=0,lockBody()}),close_search.addEventListener("click",function(){search[0].style.marginTop="-100vh",unlockBody()}),checkPage("home")||checkPage("about")){var projects_section=document.getElementsByClassName("projects");if(checkPage("home")){for(var projects__item=projects_section[0].getElementsByClassName("projects__item"),item_width=projects__item[0].clientWidth,new_width=total_width=item_counter=displayed=0,total_items=projects__item.length,i=0;i<projects__item.length;i++)total_width+=projects__item[i].clientWidth;window_width>1280?displayed=4:window_width>760?displayed=3:displayed=0,total_width>=window_width&&setInterval(function(){if(new_width+=item_width,item_counter++,item_counter<total_items-displayed)for(var e=0;e<projects__item.length;e++)projects__item[e].style.transform="translateX(-"+new_width+"px)";else for(var e=0;e<projects__item.length;e++)projects__item[e].style.transform="translateX(0)",new_width=item_counter=0},3e3)}else{for(var games_section=document.getElementsByClassName("about__games_list"),games__item=games_section[0].getElementsByClassName("about__games_list-item"),item_width=games__item[0].clientWidth,new_width=total_width=item_counter=displayed=0,total_items=games__item.length,i=0;i<games__item.length;i++)total_width+=games__item[i].clientWidth;window_width>1280?displayed=4:window_width>760?displayed=3:displayed=0,total_width>=window_width&&setInterval(function(){if(new_width+=item_width,item_counter++,item_counter<total_items-displayed)for(var e=0;e<games__item.length;e++)games__item[e].style.transform="translateX(-"+new_width+"px)";else for(var e=0;e<games__item.length;e++)games__item[e].style.transform="translateX(0)",new_width=item_counter=0;console.log("yeah")},3e3)}}SimpleJekyllSearch({searchInput:document.getElementById("search_input"),resultsContainer:document.getElementById("search_results"),json:"/search.json",searchResultTemplate:'<li><a href="{url}">{title}</a></li>',noResultsText:"<span>Ops! Anything was found, try again!</span>"});