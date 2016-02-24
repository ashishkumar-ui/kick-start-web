require(["require-config"], function () {
    "use strict";

    console.log(">> App: loaded require config...");
    require(["js/modules/header.js", "js/modules/module2.js"], function (modHeader, module2) {
        console.log("loading app...");
        modHeader.init();
    });
});