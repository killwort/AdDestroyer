AdDestroyer
===========

#SYNOPSIS
AdDestoryer is last resort ad blocker. It supposed to be used system-wide when all other blocking methods fails (i.e. filtering proxies cannot filter dynamic content).

#INSTALLATION
Installation must be performed in two not-so-simple steps:

1. Deploy www folder to any accessible HTTP server. Do not forget to update hostname/virtual path in master.js:2.
2. Use any injection method to inject master.js into all pages.

Injection can be performed using one of the following methods:

* **Easy-install** Use greasemonkey/tampermonkey userscript
```
// ==UserScript==
// @name        Ad destroyer HTTPS injector
// @namespace   http://tempuri.org/ad-destroyer
// @include     *
// @version     1
// @grant       none
// ==/UserScript==
var hostScript=document.createElement('script');
hostScript.setAttribute('type','text/javascript');
hostScript.setAttribute('src',window.location.protocol+'//<your host for adDestroyer goes here>/master.js');
document.getElementsByTagName('head')[0].appendChild(hostScript);
```
* **Recomended** Use system-wide filtering proxy (like [Privoxy](http://www.privoxy.org/)). Configuration file examples are supplied in proxy-configs folder.
