define(function (require) {
    "use strict";

    var sharedScope = require("sharedScope"),
        http = require("http"),
        serviceConfig = require("serviceConfig"),
        template = require("templateManager");

    // Using Shared Scope
    sharedScope.checkFunction = function () {
        console.log(">> Module2: I am from Shared Scope");
    };

    function loadProducts() {
        var params = {
            url: serviceConfig.global.getProducts,
            successCallback: function (data) {
                $("#container").append(template.repository.externalTemplateExample(data));
            }
        };
        
        // Loading external template
        if (!template.repository.externalTemplateExample) {
            template.load("partial.html", "externalTemplateExample");
        }

        console.log(">> Module 2", template.repository);



        // making rest calls
        http.get(params);

    }

    loadProducts();

    return {};
});