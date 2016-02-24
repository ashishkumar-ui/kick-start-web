define(function (require) {
    "use strict";

    var bootstrap = require("bootstrap"), // using this also give reference of jQuery as $
        template = require("templateManager"),
        http = require("http"),
        serviceConfig = require("serviceConfig"),
        utils = require("utils"),
        sharedScope = require("sharedScope"),
        translationManager = require("translationManager");

    function renderHeader() {
        $("#header").html(template.repository.test({
            title: "My New Post",
            body: "This is my first post!"
        }));
    }

    // Using translation manager
    translationManager.init();

    // Using Utility
    utils.test();

    // Using Shared Scope available function set from other module
    sharedScope.checkFunction();

    // Exposing stuffs outside
    return {
        init: renderHeader
    };
});