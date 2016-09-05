app.controller('authCtrl', function ($scope, $rootScope, $routeParams, $location, $http, Data, localstorage) {
    //initially set those objects to null to avoid undefined error
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function (customer) {
        Data.post('login', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                console.log('laaaaa 222 :');
                console.log(results);
                getYIP(results.uid);
            }
        });
    };
    
    getYIP = function (uid) {
        console.log(uid);
        Data.post('getYIP', {
            uid: uid
        }).then(function (results) {
            Data.toast(results);        // MAYBE AN ERROR
            console.log("results : ");
            console.log(results);
            console.log("status de get YIP : ");
            if (results.status == "success") {
                console.log("status de get YIP : ");
                console.log(results);
            }
            $rootScope.reports = results.core;
            localstorage.set("reports", $rootScope.reports);
            console.log("en dessous");
            console.log($rootScope.reports);
            console.log("au dessus");
            $location.path('year');

        })
    }
    $scope.signup = {email:'',password:'',name:'',phone:'',address:''};
    $scope.signUp = function (customer) {
        Data.post('signUp', {
            customer: customer
        }).then(function (results) {
            Data.toast(results);
            if (results.status == "success") {
                $location.path('dashboard');
            }
        });
    };
    $scope.logout = function () {
        Data.get('logout').then(function (results) {
            Data.toast(results);
            $location.path('login');
        });
    }
});