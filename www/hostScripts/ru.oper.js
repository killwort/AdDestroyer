adDestroyer([{
	on:'domReady',
	action:function($){
		$('img[width="1200"]').closest('div').remove();
		$('iframe[width="240"],div.banner').remove();
		$('body').css('background','black');
	}
}]);