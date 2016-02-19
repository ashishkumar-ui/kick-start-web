define(function (require) {
    "use strict";

    return {
        test: function (msg) {
            var testMsg = msg || ">> Utils: I am a test utility function";

            console.log(testMsg);
            return testMsg;
        }
    };
});