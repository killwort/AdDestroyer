(function(w,d){
	var destroyerBase='ad-destroyer.local/';
	var ignoreDomains=['www'];
	var $t=function(t){return d.getElementsByTagName(t);};
	
	var allRules = [];
    var $$ = function(a) {
        this.elems = [];
        this.elems.push.apply(this.elems,a && a.nodeType ? [a] : '' + a === a ? d.querySelectorAll(a) : 'prototype');
        var me = this;
        this.each = function(action) {
            for (var i = 0; i < me.elems.length; i++)
                action(me.elems[i]);
        };
        this.remove = function() {
            me.each(function(e) { e.parentNode.removeChild(e); });
        };
	this.closest = function(a){
		var rv=new $$('body');
		rv.elems=[];
		a=a.toUpperCase();
		me.each(function(e){
			while(e){
				if(e.tagName==a)break;
				e=e.parentNode;
			}
			if(e)rv.elems.push(e);
		});
		return rv;
	}
        this.css = function() {
		var a=arguments;
		if(a.length==1){
			for(var k in a[0]){
				me.css(k,a[0][k]);
			}
		}else{
			me.each(function(e){
				for(var i=0;i<a.length;i+=2){
					e.style.removeProperty(a[i]);
					e.style.setProperty(a[i],a[i+1]);
				}
			});
		}
            //console.log(arguments);
        };
    };
    var $ = function (selector) {
        return new $$(selector);
    };
	var invokeAction = function (rule) {
	    rule.action($);
	};
	var isDomReady = /^loaded|^i|^c/.test(d.readyState);
    var domReadyActions = [];
    var domReadyHandler;
    d.addEventListener('DOMContentLoaded', domReadyHandler=function () {
        d.removeEventListener('DOMContentLoaded', domReadyHandler);
        isDomReady = true;
        for (var i = 0; i < domReadyActions.length; i++) {
            invokeAction(domReadyActions[i]);
        }
        domReadyActions=[];
    });
    var inDomChangeObserver=false;
    var domChangeActions = [];
    var observer = new MutationObserver(function(m) {
        if (inDomChangeObserver) return;
        inDomChangeObserver = true;
        try {
            for (var i = 0; i < domChangeActions.length; i++) {
                invokeAction(domChangeActions[i]);
            }
        } finally {
            inDomChangeObserver = false;
        }
    });

	var onHandlers={
		domReady:function(rule) {
		    if (isDomReady)invokeAction(rule);
		    else domReadyActions.push(rule);
		},
		immediate:function(rule){invokeAction(rule);},
		periodical:function(rule){},
		click: function (rule) {},
		domChange: function (rule) { domChangeActions.push(rule); }
	};
	onHandlers.domReady({action:function(){observer.observe(document.querySelector('body'), { attributes: true, childList: true, subtree: true });}});
	window.adDestroyer=function(rules){
		for(var i=0;i<rules.length;i++){
			if(!rules[i].on||!onHandlers[rules[i].on])rules[i].on='domReady';
			allRules.push(rules[i]);
			onHandlers[rules[i].on](rules[i]);
		}		
	};

	var hostParts=w.location.host.toLowerCase().split('.');
	var hostPart='';
	var head=$t('head')[0];
	
	for(var i=hostParts.length-1;i>=0;i--){
		//Do not add ignored domains to path (except for strange 2nd level domains like www.com)
		if(ignoreDomains.indexOf(hostParts[i])!=-1&&hostPart.length)continue;
		hostPart+=hostParts[i]+'.';
		//Do not try to include host script for TLD
		if(i==hostParts.length-1)continue;
		var hostScript=d.createElement('script');
		hostScript.setAttribute('type','text/javascript');
		hostScript.setAttribute('src',w.location.protocol+'//'+destroyerBase+'hostScripts/'+hostPart+'js');
		head.appendChild(hostScript);
	}
})(window,document);