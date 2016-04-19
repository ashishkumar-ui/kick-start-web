/**
 * @file Translation manager & Configuration
 * @author Ashish Kumar
 */

(function (window, BCG, $, undefined) {
    "use strict";

    window.localizedStrings = {};
 
    BCG.translationConfig = window.localizedStrings;

    BCG.translationMgr = {
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
            if (BCG.translationConfig[key] === "&") {
                return "&";
            } else {
                return $("<div></div>").html(BCG.translationConfig[key]).text() || key;
            }
            
        }
    };

    /** @global */
    window.l10n = BCG.translationMgr.translate;

    //trigger translation on dom ready
    $(function () {
        if (!BCG.config.skipStaticTranslation) {
            BCG.translationMgr.init();
        }
    });


}(window, BCG, $));