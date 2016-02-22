/* global define */

define(function (require) {
    "use strict";
    
    var $ = require("jquery"),
        template = require("templateManager"),
        http = require("http"),
        serviceConfig = require("serviceConfig"),
        utils = require("utils"),
        sharedScope = require("sharedScope"),
        translationManager = require("translationManager"),
        bootstrap;
    
    $(function(){
        bootstrap = require("bootstrap");
    });
    
    function renderHeader() {
        var params;
        
        $("#container").html(template.repository.test({
            title: "My New Post",
            body: "This is my first post!"
        }));
        
        params = {
            url: serviceConfig.testModule.getPrograms,
            data: {
                name: "Ashish Kumar",
                id: 89
            },
            successCallback: function (resp) {
                $("#container").append(template.repository.programList(resp));
            }
        };
        
        // making rest calls
        http.get(params);
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