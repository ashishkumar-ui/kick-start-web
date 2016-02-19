require(["require-config"], function () {
    "use strict";
    
    require(["js/modules/header.js", "js/modules/module2.js"], function (modHeader, module2) {
        modHeader.init();
    });
});