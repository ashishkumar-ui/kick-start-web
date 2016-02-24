define(function (require) {
    "use strict";

    var sharedScope = require("sharedScope"),
        http = require("http"),
        serviceConfig = require("serviceConfig"),
        template = require("templateManager"),
        utils = require("utils");

    // Using Shared Scope
    sharedScope.checkFunction = function () {
        console.log(">> Module1: I am from Shared Scope");
    };

    //
    template.api.registerHelper("currencyFormat", utils.currencyFormat);

    function loadProducts() {
        var params = {
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

    loadProducts();

    return {};
});