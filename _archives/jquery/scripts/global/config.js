/**
 * @file Manages the global configuration settings for the application.
 * @author Ashish Kumar
 */
(function (window, BCG, $, undefined) {
    "use strict";

    var rootPath = "/",
        encrytionKey = $("#encryptionKey").val() || "KjU87G@905K#jhKH",
        encryptionIV = $("#encryptionIV").val() || "HKhj#K509@G78UjK";

    window.BCG.config = {

        // App URL configurations
        urls: {
            appRoot: rootPath,
            restRoot: rootPath,
            scriptRoot: rootPath + "scripts/",
            cssRoot: rootPath + "css/",
            logoutScreen: rootPath + "Home/SignOut",
            cdn: ""
        },

        // date format mapping: .net returns in services vs name which jQuery UI Datepicker plugin accepts
        dateFormat: {
            "MMM-dd-yyyy": "M-dd-yy",
            "dd-MMM-yyyy": "dd-M-yy",
            "dd-MM-yyyy": "dd-mm-yy",
            "MM-dd-yyyy": "mm-dd-yy",
            "MM/dd/yyyy": "mm/dd/yy"
        },
        
        // Encryption settings for URL in Program Management Module
        encryption: {
            key: encrytionKey,
            settings: {
                keySize: 128 / 8,
                iv: CryptoJS.enc.Utf8.parse(encryptionIV),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        },
        
        //
        isJsMinified: false
    };


}(window, window.BCG = window.BCG || {}, $));