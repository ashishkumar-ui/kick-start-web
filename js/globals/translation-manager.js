define(function (require) {
    "use strict";

    var $ = require("jquery"),
        $http = require("http"),
        handlebar = require("handlebar"),
        localizationObj = {};

    // Get all internatiolization data
    function getLocalizationData() {
        var params = {
            url: "i18n-ES.json",
            successCallback: function (resp) {
                if (resp) {
                    localizationObj = resp;
                }
            }
        };

        // Make Call
        $http.get(params);
    }

    // Utility function to localize things
    function i18n(labelKey) {
        return localizationObj[labelKey] || labelKey;
    }

    // Initialize internatiolization in static HTML content
    function doPageLocalization() {
        $("[data-i18n]").each(function () {
            var $this = $(this),
                settings = $this.data("i18n").split("."),
                labelName,
                types,
                localizedText;

            // Check for internatiolization configuration for this element
            if (settings.length) {
                labelName = settings[0];
                localizedText = i18n(labelName);
                types = settings.slice(1);

                // Check if any standing instruction is there for this element
                // like to put the localized key as text or html or as some attribute
                if (types.length) {
                    $.each(types, function (index, type) {

                        // If found as method in jQuery as text/html
                        // otherwise attribute
                        if ($.isFunction($this[type])) {
                            $this[type](localizedText);
                        } else {
                            $this.attr(type, localizedText);
                        }
                    });
                } else {
                    // If no such configuration found, put localized key simply as text
                    $this.text(localizedText);
                }
            }
        });
    }

    // Inits Template Manager
    function init() {
        // Register i18n as helper in handlebar
        handlebar.registerHelper("i18n", i18n);

        // Fetch data
        getLocalizationData();

        // Init internatiolization on page
        doPageLocalization();
    }

    // Exposing stuffs
    return {
        init: init
    };
});