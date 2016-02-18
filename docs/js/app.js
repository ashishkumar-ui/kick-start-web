require(["require-config"], function(){
	require(["js/modules/header.js", "js/modules/module2.js"], function(modHeader, module2){
		modHeader.init();
	});
});