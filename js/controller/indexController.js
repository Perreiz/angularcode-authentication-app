/**
 * Created by axel on 01/09/2016.
 */


app.controller('indexController', function ($scope, $location, localstorage, Data) {
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
        localstorage.disconnection();
    }

});
