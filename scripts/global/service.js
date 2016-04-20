/**
 * @file Keeps a wrapper over jQuery Ajax, Also maintains basic settings which is needed before and after all Ajax calls
 * @author Ashish Kumar
 */

(function (window, APP, $, undefined) {
    "use strict";
    APP.service = (function () {
        function Service() {

            //
            var serviceSettings = {
                dataType: "json",
                async: false,
                beforeSend: function (request) { },
                error: function (xhr, status, err) {
                    var message = l10n("global-error-data-not-loaded");
                    
                    // Handling Basic Errors
                    switch (xhr.status) {
                        
                        //UnAthorized
                        case 401:
                            //APP.utils.signOut();
                            break;
                            
                        // Global 500
                        case 500:
                            // Do something
                            break;
                        
                        // Request URL not found handling
                        case 404:
                            // Do something
                            break;
                    }

                    // Close Loading
                    APP.utils.closeLoading();

                    // Open Alert if already not opened for any specific Error
                    if (xhr.status !== 0) {
                        if (!$("#dialogAlert").is(":visible")) {
                            APP.utils.openAlert(message, { dialogClass: "alert" });
                        }
                    }

                    // Execute if something has been passed as function onError
                    if ($.isFunction(this.errorCallback)) {
                        this.errorCallback();
                    }

                    // Console
                    //console.error("ERROR - APP.SERVICE --> request: ", xhr.status, this.url);
                }
            };


            /**
             * @method
             * @name doAjaxSettings
             * @desc Does the basic settings and Makes the Ajax call
             * @param params {object} All required configs for the ajax call
             * @param type  {string} GET/POST
             * @param headerObj  {object} Options object if anything to be sent in header object
             * @return {object} jQuery promise object
            */
            function doAjaxSettings(params, type, headerObj) {
                var settings = $.extend(true, {}, serviceSettings);

                if ($.isFunction(params.successCallback)) {
                    settings.success = function (data) {
                        if (data.ResultPayload === null) {
                            data.ResultPayload = [];
                        }

                        params.successCallback(data);
                    };
                }

                
                // Inject Header data passed
                if (headerObj) {
                    settings.headers = $.extend({}, settings.headers, headerObj);
                }

                $.extend(settings, {
                    type: type
                }, params);
                
                // Cross-Origin Resource Sharing
                $.support.cors = true; 

                return $.ajax(settings);
            }

            // Appending context token to all ajax calls for rest methods
            $.ajaxPrefilter(function (settings, OriginalOptions, jqxhr) { });

            // IE specific default settings for all AJAX in the application
            if (/msie|trident/.test(navigator.userAgent.toLowerCase())) {
                $.ajaxSetup({
                    cache: false
                });
            }

            /*=================
			public methods
			==================*/

            /**
             * @method
             * @name getData
             * @desc Public method to make GET type ajax calls
             * @param params {object} All required configs for the ajax call
             * @param headerObj  {string} GET/POST
             * @return {object} jQuery promise object
            */
            this.getData = function (params, headerObj) {
                return doAjaxSettings(params, "GET", headerObj);
            };

            /**
             * @method
             * @name postData
             * @desc Public method to make POST type ajax calls
             * @param params {object} All required configs for the ajax call
             * @return {object} jQuery promise object
            */
            this.postData = function (params) {
                return doAjaxSettings(params, "POST");
            };
        }

        return new Service();
    }());
}(window, APP, $));