/**
 * @file Translation manager & Configuration
 * @author Ashish Kumar
 */

(function (window, APP, $, undefined) {
    "use strict";

    window.localizedStrings = {};
 
    APP.translationConfig = window.localizedStrings;

    APP.translationMgr = {
        init: function (context) {
            $("[data-l10n]", (context || "body")).each(function () {
                var $this = $(this),
                    key = 'translationKey',
                    propMap = [],
                    keyMap = $this.data("l10n").split('.');

                if (keyMap.length) {
                    key = keyMap[0];
                    propMap = keyMap.slice(1);

                    if (propMap.length) {
                        $.each(propMap, function (index, prop) {
                            if ($.isFunction($this[prop])) {
                                $this[prop](l10n(key));
                            } else {
                                $this.attr(prop, l10n(key));
                            }
                        });
                    } else {
                        $this.text(l10n(key));
                    }
                }
            });
        },
        translate: function (key) {
            if (APP.translationConfig[key] === "&") {
                return "&";
            } else {
                return $("<div></div>").html(APP.translationConfig[key]).text() || key;
            }
            
        }
    };

    /** @global */
    window.l10n = APP.translationMgr.translate;

    //trigger translation on dom ready
    $(function () {
        if (!APP.config.skipStaticTranslation) {
            APP.translationMgr.init();
        }
    });


}(window, APP, $));