/*
Shared mobile code, loads before jQuery Mobile but after jQuery
*/
window.name = "index_Mobile";

$(document).bind("mobileinit", function () {
	$.mobile.ajaxEnabled = false;
});

//force ajax page reload on all child pages... //https://gist.github.com/921920
//jQuery('div').live('pagehide', function (event, ui) {
//	var page = jQuery(event.target);
//	page.remove();
//});