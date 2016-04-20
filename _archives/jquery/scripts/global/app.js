/**
 * @file Inits applications, set defaults, load module specific/dependencies resources
 * @author Ashish Kumar
 */

(function (window, APP, $, Modernizr, undefined) {
    "use strict";

    $(function () {
        
        // Init Loading
        APP.utils.initLoading();
        
        // Init Global Confirmation Dialog
        APP.utils.initConfirmDialog();
        
        //load functional modules on demand	
        loadModulesOnDemand();

        // IE browser mode compatibility issue fix
        if ((/msie/.test(navigator.userAgent.toLowerCase())) && (document.documentMode === 7)) {
            $('<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>').insertBefore("#page-header");
        }
    });

    function loadModulesOnDemand() {
        // SET: Dev/Prod path url here for scripts
        // NOTE: No need to change anywhere else
        var rootPath = APP.config.urls.scriptRoot;
        
        // Start: Loading content using Modernizr
        $('[data-module]').each(function (index, elem) {
            var module = $(this).attr('data-module'),
                cdnUrl = APP.config.urls.cdn || "",
                coreModule = cdnUrl + rootPath + "modules" + (APP.config.isJsMinified ? "-min" : "") + "/" + module + '.js',
				dependencies = [],
				scriptArray = [coreModule],
				$container = $(this);

            //if there exists any dependencies
            if ($(this).attr('data-module-dependencies')) {

                dependencies = $.map($(this).attr('data-module-dependencies').split(','), function (val) {
                    var path = cdnUrl;

                    // Trim the File Name
                    val = $.trim(val);

                    // Pick the right path for CSS and JS
                    if (val.lastIndexOf(".css") === (val.length - 4)) {

                        // CSS Path
                        path += APP.config.urls.cssRoot;

                    } else {

                        // Pick Modules from Minified path
                        if (APP.config.isJsMinified) {
                            val = val.replace("modules/", "modules-min/");
                        }

                        //
                        path += rootPath;
                    }

                    // Merge: Path + File Name
                    path += val;

                    return path;
                });

                scriptArray = $.merge(dependencies, scriptArray);
            }

            // Load module specific JS and all the dependencies if any with Modernizr
            Modernizr.load({
                load: scriptArray,
                complete: function () {
                    if (APP[module]) {
                        var moduleObj = new APP[module]();
                        moduleObj.init($container);
                        return moduleObj;
                    }
                }
            });
        });
    }

}(window, APP, $, Modernizr));