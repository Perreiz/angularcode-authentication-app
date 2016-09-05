/**
 * Created by Axel on 08/07/2016.
 */
app.factory('localstorage', ['$window', function($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            getArray: function (key) {
                return JSON.parse($window.localStorage[key] || '[]');
            },
            removeItem: function (key) {
                $window.localStorage.removeItem(key);
            },
            disconnection: function () {
                $window.localStorage.removeItem("reports");
                //use this to destroy all data stored in the localstorage. (can be recovered by an other people).
            }
        }

}])