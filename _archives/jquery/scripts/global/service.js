/**
 * @file Keeps a wrapper over jQuery Ajax, Also maintains basic settings which is needed before and after all Ajax calls
 * @author Ashish Kumar
 */

(function (window, BCG, $, undefined) {
    "use strict";
    BCG.service = (function () {
        function Service() {

            //
            var serviceSettings = {
                dataType: "json",
                async: false,
                beforeSend: function (request) { },
                error: function (xhr, status, err) {
                    
                    // Handling Basic Errors
                    switch (xhr.status) {
                        
                        //UnAthorized
                        case 401:
                            //BCG.utils.signOut();
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
                    BCG.utils.closeLoading();

                    //Close PM Tree Loading
                    $("#tree-loader").hide();
                  

                    // Open Alert if already not opened for any specific Error
                    if (xhr.status !== 0) {
                        if (!$("#dialogAlert").is(":visible")) {
                            BCG.utils.openAlert(message, { dialogClass: "alert" });
                        }
                    }

                    // Execute if something has been passed as function onError
                    if ($.isFunction(this.errorCallback)) {
                        this.errorCallback();
                    }

                    // Console
                    //console.error("ERROR - BCG.SERVICE --> request: ", xhr.status, this.url);
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
                var settings = $.extend(true, {}, serviceSettings),
                    programDropDown = $("#allPrograms,#programDD,.tree-dropdown-container>.select"),
                    defaultProgramValue = programDropDown.data("value");

                if ($.isFunction(params.successCallback)) {
                    settings.success = function (data) {
                        if (data.ResultPayload === null) {
                            data.ResultPayload = [];
                        }
                        if (typeof data.ResultMessage !== "undefined" && data.ResultMessage === BCG.config.unAuthKey) {
                            BCG.utils.showMessages({
                                message: l10n("rm-global-msg-unAuthAttempt"),
                                isVisible: true,
                                className: "msg-error"
                            });
                            BCG.utils.closeLoading();
                            BCG.utils.noPermission();
                            return;
                        }

                        params.successCallback(data);
                    };
                }

                if (type === "POST" && $("#antiForgeryToken").length) {
                    settings.headers = {};
                    settings.headers['__RequestVerificationToken'] = $("#antiForgeryToken").data("ngInit");
                }
                if (programDropDown && programDropDown.length && defaultProgramValue && defaultProgramValue + "" !== $.cookie("PROG_CURRENT") && params.url.indexOf(BCG.serviceConfig.userManagement.getPrograms) === -1) {
                    BCG.utils.openAlert(l10n("rm-global-msg-defaultprogramchanged"), { dialogClass: "alert" });
                    BCG.config.loaderOpenedByProgramDifference = true;
                    return;
                }

                // Inject Header data passed
                if (headerObj) {
                    settings.headers = $.extend({}, settings.headers, headerObj);
                }

                $.extend(settings, {
                    type: type
                }, params);
                $.support.cors = true; // Cross-Origin Resource Sharing

                return $.ajax(settings);
            }

            // On Complete of Ajax Request
            $(document).ajaxComplete(function (event, xhr, settings) {
                //console.log(settings.type + ": " + settings.url);
                if (settings.url.indexOf(BCG.serviceConfig.userManagement.getPrograms) > -1 || settings.url.indexOf(BCG.serviceConfig.reports.getPrograms) > -1) {
                    $("#allPrograms,#programDD").attr("data-value", $("#allPrograms,#programDD").val());
                }
                // Reset Session
                if ($.isFunction(BCG.utils.resetSession)) {
                    //session increase
                    var newDate = (new Date().getTime()); // currentTime in second
                    if ((typeof (Storage) !== "undefined")) {
                        localStorage.timeout = newDate + ($("#sessionExpireTime").val() * 60 * 1000);
                    }

                    BCG.utils.resetSession();
                }
            });

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
                return doAjaxSettings(params, "GET", headerObj).always(function (data) {
                    if (data.ResultMessage && data.ResultMessage === BCG.config.unAuthKey) {
                        BCG.utils.showMessages({
                            message: l10n("rm-global-msg-unAuthAttempt"),
                            isVisible: true,
                            className: "msg-error"
                        });
                    }
                });
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
}(window, BCG, $));