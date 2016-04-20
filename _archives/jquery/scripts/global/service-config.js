/**
 * @file Maintains the mapping of Ajax Call URLS to be made module-wise
 * @author Ashish Kumar
 */

/* Rest Service config  */
(function (window, APP, $, undefined) {
    "use strict";
    APP.serviceConfig = {
        global:{
            localization: "data/getLocalization"
        },
        
        // User Module
        user: {
            getUserNotifications: "data/getUserProfile"
        },
        
        // Some module
        module1: {
            
        }
    };
}(window, APP, $));