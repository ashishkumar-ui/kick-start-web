/**
 * @file Application Utility Manager
 * @author Ashish Kumar
 */

(function (window, APP, $) {
    "use strict";
    
    /**
     * @method  toDate
     * @desc convert string to date object 
     * @param  dateString
     */
    function toDate(dateString) {
        var monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
            dateArr = [],
            day,
            month,
            year,
            dateObj;

        // Validation functions
        /**
         * @param  {object} input
         */
        function isMonthInDigits(input) {
            return input > 0 && input <= 12;
        }
        /**
         * @param  {object} input
         * @param  {object} {varisMonth=false;for(vari=0
         * @param  {object} lim=monthNames.length;i<lim;i++
         * @param  {object} {if(monthNames[i].toLowerCase(
         * @param  {object} .indexOf(input.toLowerCase(
         * @param  {object} ===0
         */
        function isMonthInAlphabets(input) {
            var isMonth = false;
            for (var i = 0, lim = monthNames.length; i < lim; i++) {
                if (monthNames[i].toLowerCase().indexOf(input.toLowerCase()) === 0) {
                    isMonth = i;
                    break;
                }
            }
            return isMonth;
        }
        /**
         * @param  {object} input
         */
        function isDay(input) {
            return input <= 31;
        }
        /**
         * @param  {object} input
         */
        function isYear(input) {
            return input >= 1900;
        }


        // Filtering out DIGITS only cases
        //dateArr = dateString ? dateString.match(/\d{1,4}|[a-zA-Z]{2,9}/g) : [];
        if (dateString) {
            dateString = dateString.replace(/\//g, "-");
            dateArr = dateString.split("-");
        }

        // Getting date elements from the input
        if (!dateArr || !dateArr.length || dateArr.length < 2) {
            return dateObj;
        } else if (dateArr.length === 2) {
            if (isMonthInDigits(dateArr[0]) && isDay(dateArr[1])) {  // mm-dd
                day = dateArr[1];
                month = dateArr[0] - 1;
            } else if (isMonthInDigits(dateArr[1]) && isDay(dateArr[0])) {  // dd-mm
                day = dateArr[0];
                month = dateArr[1] - 1;
            } else if (isMonthInAlphabets(dateArr[0]) !== false && isDay(dateArr[1])) {  // MMM-dd
                day = dateArr[1];
                month = isMonthInAlphabets(dateArr[0]);
            } else if (isMonthInAlphabets(dateArr[1]) !== false && isDay(dateArr[0])) {  // dd-MMM
                day = dateArr[0];
                month = isMonthInAlphabets(dateArr[1]);
            }

            year = new Date().getFullYear();
        } else if (isMonthInDigits(dateArr[0]) && isDay(dateArr[1]) && isYear(dateArr[2])) { // mm-dd-yyyyy
            day = dateArr[1];
            month = dateArr[0] - 1;
            year = dateArr[2];
        } else if (isMonthInDigits(dateArr[1]) && isDay(dateArr[0]) && isYear(dateArr[2])) { // dd-mm-yyyy
            day = dateArr[0];
            month = dateArr[1] - 1;
            year = dateArr[2];
        } else if (isMonthInDigits(dateArr[1]) && isDay(dateArr[2]) && isYear(dateArr[0])) { // yyyy-MM-dd
            day = dateArr[2];
            month = dateArr[1] - 1;
            year = dateArr[0];
        } else if (isMonthInAlphabets(dateArr[0]) !== false && isDay(dateArr[1]) && isYear(dateArr[2])) { //MMM-dd-yyyy
            day = dateArr[1];
            month = isMonthInAlphabets(dateArr[0]);
            year = dateArr[2];
        } else if (isMonthInAlphabets(dateArr[1]) !== false && isDay(dateArr[0]) && isYear(dateArr[2])) { // dd-MMM-yyyy
            day = dateArr[0];
            month = isMonthInAlphabets(dateArr[1]);
            year = dateArr[2];
        }

        // If OK: go to next step
        if (day && !isNaN(month) && year) {
            dateObj = new Date(year, month, day);
        }
        return dateObj;
    }

    APP.utils = {
        toDate: toDate,
        
        /**
         * @method isTouchDevice
         * @desc flag to check whether device is touch enabled
         */
        isTouchDevice: function () {
            return Modernizr.touch;
        },

        /**
         * @method initLoading
         * @desc Bind and show loader
         * @param  {object} message
         * @param  {object} container
         */
        initLoading: function (message, container) {
            var $loader = $("#dialog-loading");

            $loader.find("p").html(message || l10n("global-loading"));

            //bind dialog
            $loader.dialog({
                appendTo: container,
                autoOpen: true,
                modal: true,
                draggable: false,
                closeText: l10n("global-close"),
                dialogClass: "content-loading",
                //show: 'fade',
                hide: 'fade'
            }).removeClass("hide");
        },

        /**
         * @method closeLoading
         * @desc close loader
         */
        closeLoading: function () {
            $("#dialog-loading").dialog("close");

        },
        dialogConfirm: false,

        /**
         * @method  initConfirmDialog
         * @desc  show confirm doalog 
         * @param  {function(} create
         */
        initConfirmDialog: function () {
            $("#dialog-confirm").dialog({
                autoOpen: false,
                create: function () {
                    var widget = $(this).dialog("widget");
                    $(".ui-dialog-titlebar-close span", widget).prop("title", l10n("rm-global-close"));
                },
                modal: true,
                resizable: false,
                dialogClass: "confirm-dialog",
                closeText: l10n("rm-global-close"),
                width: 400,

                close: function () {
                    APP.utils.dialogConfirm = false;
                },
                buttons: [
                    {
                        text: l10n("global-dialog-btn-yes"),
                        addClass: "btn-ok",
                        click: function () {
                            APP.utils.dialogConfirm = true;
                            $(this).dialog("close");
                            $('select:active').blur();
                        }
                    },
                    {
                        text: l10n("global-dialog-btn-no"),
                        addClass: "btn-no",
                        click: function () {
                            $(this).dialog("close");
                            $('select:active').blur();
                        }
                    }
                ]
            }).removeClass("hide");
        },

        /**
         * @method openConfirm
         * @desc open confirm dialog
         * @param  {object} opts
         */
        openConfirm: function (opts) {
            var defaults = {
                yesText: l10n("global-dialog-btn-yes"),
                noText: l10n("global-dialog-btn-no"),
                message: l10n("global-want-to-delete"),
                modal: true,
                closeText: l10n("global-close"),
                onclose: function () {}
            },
            windowMidHeight,
            $dialogElm = $("#dialog-confirm");

            if ($.isPlainObject(opts)) {
                $.extend(defaults, opts);
            }

            // Updating Content
            $dialogElm
                .unbind("dialogclose")
                .bind("dialogclose", defaults.onclose)
                .find("p").html(defaults.message)
                .end().find(".btn-ok span").text(defaults.yesText)
                .end().find(".btn-no span").text(defaults.noText);

            // Opens Dialog
            $dialogElm.dialog("open");
            windowMidHeight = (($(window).height()) / 2) - 80;
            $(".ui-dialog.ui-widget").css({ "position": "fixed", "top": windowMidHeight });
        },

        /**
         * @method  openAlert
         * @desc open alert dialog box
         * @param  {object} msg
         * @param  {object} options
         */
        openAlert: function (msg, options) {
            var message = msg || "Application Alert!",
                $dialogElm = $("#dialog-alert"),
                windowMidHeight,
                settings = {
                    autoOpen: true,
                    modal: true,
                    resizable: false,
                    closeText: l10n("global-close"),
                    dialogClass: "confirm-dialog",
                    width: 400,
                    buttons: [
                        {
                            text: l10n("global-dialog-btn-ok"),
                            click: function () {
                                $(this).dialog("close");
                                $("body").scrollTop(0);
                            }
                        }
                    ]
                };

            //
            if ($.isPlainObject(options)) {
                $.extend(settings, options);
            }

            // Add Class
            if (settings.dialogClass) {
                if (settings.dialogClass.indexOf("confirm-dialog") === -1) {
                    settings.dialogClass = "confirm-dialog " + settings.dialogClass;
                }
            } else {
                settings.dialogClass = "confirm-dialog";
            }

            // Destroy existing Dialog binding
            if ($dialogElm.hasClass("ui-dialog-content")) {
                $dialogElm.dialog("destroy");
            }

            // Initialize Dialog
            $dialogElm.removeClass("hide").dialog(settings);
            $dialogElm.find("p").html(message).removeClass();
            //$dialogElm.dialog("open");
            windowMidHeight = (($(window).height()) / 2) - 80;
            $(".ui-dialog.ui-widget").css({ "position": "fixed", "top": windowMidHeight });
        },

        
        /**
        * @method isText
        * @desc Whether there is object html element in value entered or not
        * @param { string } elmVal - The value which needs to be checked
        */
        isText: function (elmVal) {
            elmVal = elmVal.replace(/\s{2,}/g, ' ');

            if (elmVal.indexOf("&#") >= 0) {
                return false;
            }
            var dummyDiv = $("<div/>").html(elmVal);
            return (dummyDiv.text().length === elmVal.length);
        },

        /**
         * @method  isNumber
         * @desc validate for number
         * @param  {object} value
         */
        isNumber: function (value) {
            if (APP.utils.isSafe(value)) {
                return (/^\d+$/.test(value));
            }
            return false;
        },

        /**
         * @method FormatNumeric
         * @desc Format numeric values 
         * @param  {object} value
         * @param  {object} sExponentPart
         * @param  {object} iCommaAfterDigits
         * @returns mainValue
         */
        FormatNumeric: function (value, sExponentPart, iCommaAfterDigits) {
            var rgx,
                numberPartials,
                mainValue,
                floatValue,
                isNegative = (value < 0),
                decimalType = $("#decimalFormat").val() || "Period";

            if (value === null) {
                return "";
            }

            if (isNaN(value) || value === "") {

                return "";
            }
            value = Number(value).toFixed(sExponentPart);
            if (isNegative) {
                value = value.split('-')[1];
            }

            value += '';

            // Split Number partial
            numberPartials = value.split('.'),
            mainValue = numberPartials[0],
            floatValue = numberPartials.length > 1 ? '.' + numberPartials[1] : "";

            // Comma placement if any, Default value is: 3
            iCommaAfterDigits = APP.utils.isNumber(iCommaAfterDigits) ? iCommaAfterDigits : 3;
            rgx = new RegExp("(\\d+)(\\d{" + iCommaAfterDigits + "})");

            while (rgx.test(mainValue)) {
                mainValue = mainValue.replace(rgx, '$1' + ',' + '$2');
            }

            // For decimal type Comma
            if (decimalType === "Comma") {
                mainValue = mainValue.replace(/\,/g, ".");
                floatValue = floatValue.replace(/\./, ",");
            }

            return (isNegative) ? ("-" + mainValue + floatValue) : mainValue + floatValue;
        },

        /**
         * @method  {object} value
         * @desc  convert to number
         * @param  {object} value
         * @param  {object} ||"Period"
         */
        toNumber: function (value) {
            var decimalType = $("#decimalFormat").val() || "Period",
                decimalSeparator = (decimalType === "Period" ? "." : ","),
                mailValue,
                floatValue,
                originalVal = value;

            // Convert to number
            if (!value) {
                if ($.trim(value) === "") {
                    value = "";
                } else {
                    value = 0;
                }
            } else {
                value = value + "";
                if (decimalType === "Period") {
                    value = value.replace(/\,/g, "");
                } else {
                    value = value.replace(/\./g, "");
                }
                if ((value + "").indexOf(decimalSeparator) !== -1 || $.isNumeric(value)) {
                    value += ""; // convert to string
                    mailValue = value.split(decimalSeparator)[0];
                    floatValue = value.split(decimalSeparator)[1] || "";

                    if (decimalType === "Period") {
                        mailValue = mailValue.replace(/\,/g, "");
                    } else {
                        mailValue = mailValue.replace(/\./g, "");
                    }

                    //concat number value
                    value = Number(mailValue + "." + floatValue);
                } else {
                    value = originalVal;
                }
            }

            return value;
        },

        /**
         * @method  encodeHTML
         * @desc  JS Encoding - Decoding Methods, Ref: https://code.google.com/p/jsool/source/browse/jsool-site/js/util/Encoder.js?r=176
         * @param  {object} string
         */
        encodeHTML: function (string) {
            return string.replace(/./g, function (chr) {
                return chr.match(/[\w\d]/) ? chr : "&#" + chr.charCodeAt(0) + ";";
            }).replace(/\</g, "&lt;").replace(/\>/g, "&gt;");
        },

        /**
         * @method  decodeHTML
         * @desc  decode html
         * @param  {object} string
         */
        decodeHTML: function (string) {
            return string ? string.replace(/&#[0-9]+;/g, function (text) {
                return String.fromCharCode(text.match(/[0-9]+/)[0]);
            }).replace(/\&lt\;/g, "<").replace(/\&gt\;/g, ">") : "";
        },

        /**
         * @method  decodeJSON
         * @desc  decode JSON
         * @param {object} string
         */
        decodeJSON: function (string) {
            return JSON.parse(string.replace(/&#[0-9]+;/g, function (text) {
                return String.fromCharCode(text.match(/[0-9]+/)[0]);
            }).replace(/\&lt\;/g, "<").replace(/\&gt\;/g, ">"));
        },

        /**
         * @method  decryptedToString
         * @desc  JS Encryption - Decryption Methods
         * @param  {object} decrypted
         */
        decryptedToString: function (decrypted) {
            var chars,
            decryptedArr;
            decryptedArr = decrypted.toString().split('');
            chars = [];
            while (decryptedArr.length !== 0) {
                chars.push(String.fromCharCode(parseInt(decryptedArr.splice(0, 2).join(''), 16)));
            }
            return chars.join('');
        },

        /**
         * @method  encrypt
         * @desc  encrpt string using AES method based
         * @param  {object} inputString
         */
        encrypt: function (inputString) {
            var encrypted = CryptoJS.AES.encrypt(inputString, APP.config.encryption.key, APP.config.encryption.settings).toString(),
                encoded = encodeURIComponent(encrypted);

            return encoded;
        },

        /**
         * @method  decrypt
         * @desc  decrypt string using AES method based
         * @param  {object} encryptedString
         */
        decrypt: function (encryptedString) {
            var decodedString = decodeURIComponent(encryptedString),
                decripted = CryptoJS.AES.decrypt(decodedString, APP.config.encryption.key, APP.config.encryption.settings);

            return $.isNumeric(encryptedString) ? parseInt(encryptedString) : APP.utils.decryptedToString(decripted);
        },

        /**
         * @method  encryptURLComponent
         * @desc  encrpt URI component or URL
         * @param  {object} urlString
         */
        encryptURLComponent: function (urlString) {
            var nodeIds;
            // Encrypt ID with removing the curly braces
            function encryptNodeID(nodeIDString) {
                return APP.utils.encrypt(nodeIDString.replace(/{|}/g, ""));
            }            
            if (urlString) {
                nodeIds = urlString.match(/\{\{[$0-9\}\}\.]+/g); // find out the IDs

                // Search all IDs from the URL and encrypt it
                if (nodeIds) {
                    for (var i = 0; i < nodeIds.length; i++) {
                        urlString = urlString.replace(nodeIds[i], encryptNodeID(nodeIds[i]));
                    }
                }
                return urlString;
            } else {
                return "";
            }
        }

    };
}(window, APP, $));