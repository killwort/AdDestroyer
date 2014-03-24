adDestroyer([{
	on:'domReady',
	action: function ($) {
	    $('div.bCenter,iframe').remove();
	}
}]);