var local = (function() {

    var q = {
        set: function(key, content) {

            if(typeof(content) == 'object') {

                localStorage[key] = JSON.stringify(content);
                return true;
            }
            return false;

        },
        get: function(key) {

            if(localStorage[key] === undefined) {
                return false;
            } else {
                return JSON.parse(localStorage[key]);
            }

        },
        remove: function(key) {
            localStorage.removeItem(key);
        }

    };
    return q;

})();