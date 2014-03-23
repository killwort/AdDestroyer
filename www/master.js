(function(w){
	var destroyerBase='192.168.14.254/sd/';
	var $t=function(t){return document.getElementsByTagName(t);};
	
	var allRules=[];
	var onHandlers={
		domReady:function(){},
		immediate:function(){},
		periodical:function(){},
		click:function(){},
		domChange:function(){}
	};
	window.adDestroyer=function(rules){
		for(var i=0;i<rules.length;i++){
			if(!rules[i].on||!onHandlers[rules[i].on])rules[i].on='domReady';
			rules[i].handler=null;
			allRules.push(rules[i]);
		}
	};

	var hostParts=w.location.host.split('.');
	var hostPart='';
	var head=$t('head')[0];
	for(var i=hostParts.length-1;i>=0;i--){
		hostPart+=hostParts[i]+'.';
		var hostScript=document.createElement('script');
		hostScript.setAttribute('type','text/javascript');
		hostScript.setAttribute('src',w.location.protocol+'//'+destroyerBase+'hostScripts/'+hostPart+'js');
		head.appendChild(hostScript);
	}
})(window);