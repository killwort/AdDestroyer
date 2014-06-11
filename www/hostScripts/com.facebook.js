adDestroyer([
{
	on:'immediate',
	action:function($){
		var head=document.getElementsByTagName('head')[0];
		var css=document.createElement('style');
		css.appendChild(document.createTextNode('.ego_column,.pagelet_ego_page{display:none !important}'));
		head.appendChild(css);

//		$('#pagelet_ego_pane,.ego_section,.ego_column').remove();
	}
}
]);