adDestroyer([
{
	on:'domChange',
	action:function($){
		$('#pagelet_ego_pane,.ego_section,.ego_column').remove();
	}
}
]);