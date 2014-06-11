adDestroyer([
{
	on:'immediate',
	action:function($){
		var head=document.getElementsByTagName('head')[0];
		var css=document.createElement('style');
		css.appendChild(document.createTextNode('body{background:black !important} iframe[width="240"],div.banner,.banner,img[width="1200"],#container div[style]:first-child{display:none !important}'));
		head.appendChild(css);
	}
},
{
	on:'domReady',
	action:function($){
/*		$('img[width="1200"]').closest('div').remove();
		$('iframe[width="240"],div.banner').remove();
		$('body').css('background','black');*/
	}
}]);