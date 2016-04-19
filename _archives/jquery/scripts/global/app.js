/**
 * @file Inits applications, set defaults, load module specific/dependencies resources
 * @author Ashish Kumar
 */

(function (window, BCG, $, Modernizr, undefined) {
    "use strict";

    $(function () {
        
        // Init Loading
        BCG.utils.initLoading();
        
        // Init Global Confirmation Dialog
        BCG.utils.initConfirmDialog();
        
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
        var rootPath = BCG.config.urls.scriptRoot;
        
        // Start: Loading content using Modernizr
        $('[data-module]').each(function (index, elem) {
            var module = $(this).attr('data-module'),
                cdnUrl = BCG.config.urls.cdn || "",
                coreModule = cdnUrl + rootPath + "modules" + (BCG.config.isJsMinified ? "-min" : "") + "/" + module + '.js',
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
                        path += BCG.config.urls.cssRoot;

                    } else {

                        // Pick Modules from Minified path
                        if (BCG.config.isJsMinified) {
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
                    if (BCG[module]) {
                        var moduleObj = new BCG[module]();
                        moduleObj.init($container);
                        return moduleObj;
                    }
                }
            });
        });
    }

}(window, BCG, $, Modernizr));