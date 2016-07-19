/* jshint unused: false */
/* global define */

define(function (require) {
    "use strict";

    var $ = require("jquery"),
        appConfig = require("appConfig"),
        defaultSettings = {
            dataType: "json",
            async: true
        };

    //
    defaultSettings.beforeSend = function (request) {

        // Prepend REST rool to all the request URLs
        this.url = appConfig.urls.restRoot + this.url;
    };

    //
    defaultSettings.error = function (xhr, status, err) {
        // Common Error Handling for all REST calls
        //

        // Execute if something has been passed as function onError
        if ($.isFunction(this.errorCallback)) {
            this.errorCallback();
        }
    };

    // Making the REST call
    function doAjax(ajaxParam, type) {
        // set defaults
        var settings = $.extend(true, {}, defaultSettings);
        
        // Correct URLs
        if(!ajaxParam.url.match(/^((http|https):)?\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/)){
            ajaxParam.url = appConfig.urls.restRoot[ajaxParam.source || 'api'] + ajaxParam.url;
        }

        // If user defined success callback
        if ($.isFunction(ajaxParam.successCallback)) {
            settings.success = function (resp) {
                // Do something if required commonly to do in all REST calls
                //

                // Execute user defined success callback
                ajaxParam.successCallback(resp);
            };
        }

        // Extend the ajax settings if there is something user defined
        $.extend(settings, {
            type: type
        }, ajaxParam);

        // Cross-Origin Resource Sharing
        $.support.cors = true;

        // Return with jQuery Promise object
        return $.ajax(settings);
    }

    // Get Service
    function get(ajaxParam) {
        return doAjax(ajaxParam, "GET");
    }

    // Post Service
    function post(ajaxParam) {
        return doAjax(ajaxParam, "POST");
    }

    // Exposing GET/POST services
    return {
        get: get,
        post: post
    };
});
