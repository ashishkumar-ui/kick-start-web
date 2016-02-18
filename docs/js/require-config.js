/* global requirejs */
require.config({
    baseUrl: "js",
    paths: {
        jquery: "vendors/jquery-2.2.0.min",
        handlebar: "vendors/handlebars-v4.0.5",
        underscore: "vendors/underscore-min",
        
        templateManager: "globals/template-manager",
        translationManager: "globals/translation-manager",
        http: "globals/http-service",
        appConfig: "globals/app-config",
        serviceConfig: "globals/service-config",
        utils : "globals/utils",
        sharedScope: "globals/shared-scope"
    }
});