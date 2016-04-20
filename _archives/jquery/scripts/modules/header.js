/**
 * @file Keeps all the event binding/functionalities of the header module been used commonly in all the pages
 * @author Ashish Kumar
 */

(function (window, APP, $, undefined) {
	"use strict";

    /** @class */
	APP.header = (function () {
		function Header(){
		   
		    //===== Private Vars
		    var $container;

		    /**
		     * @method
		     * @name bindUIActions
		     * @description Binds all the Events to DOM in within the module
		     */
			function bindUIActions(){
			    /*$container
                    .on("click", "#user-name", toggleUserMenu)
                    .on("click", ".go-to-enablement", goToEnablement);
                */
			}

		    /**
		     * @method
		     * @name init
		     * @description Inits the module
		     */
			this.init = function (container){
				$container = container;
				bindUIActions();
                APP.utils.closeLoading();
                
                //
                console.log("Header Initiated");
			};
		}

		return Header;
	}());

}(window, APP, $));