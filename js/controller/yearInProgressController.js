/**
 * Created by axel on 08/07/2016.
 */
app.controller('yearInProgressCtrl', ['$location','$rootScope', '$scope', '$http', '$uibModal', 'localstorage', "WS", "Data", function ($location, $rootScope, $scope, $http, $uibModal, localstorage, WS, Data) {
    $scope.semesterContent = undefined;
    $scope.changes = false;
    $scope.onlyNumbers = /^\d+$/;
    $scope.ueContent = undefined;
    $scope.templateType = undefined;
    $scope.template = "partials/template_include/firstForNewYear.html";
    $scope.templateYearForm = undefined;
    $scope.semesterForm = undefined;
    $scope.newNote = {};
    $scope.newYear = {"moyenne":"N/A", "changes":false};
    $scope.newSemester = {
        "moyenne": "N/A"
    };

    $scope.newUE = {
        "moyenne": "N/A",
        "subject": []
    };
    $scope.newSubject = {
        "moyenne": "N/A",
        "isOpen": false,
        "notes": []
    };
    console.log("aaaaaaaah")
    $scope.popoverAdding = {
        note: {
            templateUrl: 'partials/popover/adding_note.html',
            isOpen: false
        },
        ue: {

            templateUrl: 'partials/popover/adding_ue.html',
            isOpen: false
        },
        subject: {
            templateUrl: 'partials/popover/adding_subject.html',
            isOpen: false
        },
        semester: {
            templateUrl: 'partials/popover/adding_semester.html',
            isOpen: false
        }
    };

    displayTemplate = function (type) {
        if (type == 'S-UE') {
            $scope.templateType = 'partials/template_include/YIP/S-UE.html';
        }else if (type == 'S-SU') {
            $scope.templateType = 'partials/template_include/YIP/S-SU.html';
        }else if (type == 'T-UE') {
            $scope.templateType = 'partials/template_include/YIP/T-UE.html';
        }else if (type == 'T-SU') {
            $scope.templateType = 'partials/template_include/YIP/T-SU.html';
        }else if (type == 'CY-UE') {
            $scope.templateType = 'partials/template_include/YIP/CY-UE.html';
        }else if (type == 'CY-SU') {
            $scope.templateType = 'partials/template_include/YIP/CY-SU.html';
        }
    };


    $scope.subjectDetails = function (subject) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'partials/modal/subject_content.html',
            controller: 'ModalInstanceSubjectCtrl',
            resolve: {
                subject: function () {
                    return subject;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };

    getReports = function () {
        console.log("la : ");
        console.log($rootScope.uid);
        Data.post('getYIP', {
            uid: $rootScope.uid
        }).then(function (results) {
            Data.toast(results);        // MAYBE AN ERROR
            if (results.status == "success") {
                console.log(results);
                $rootScope.reports = results.core;
            }
        })


        /*
        console.log("try");
        WS.getYearInProgress().success(function(data) {
            console.log("SUCESS");

            if(data.length > 0){
                console.log(JSON.parse(data[0].core));
                console.log(data);
                $rootScope.reports = JSON.parse(data[0].core);
            }else{
                emptyReports();
            }
            console.log($rootScope.reports);
            localstorage.setObject("reports", $rootScope.reports);
        }).error(function(data, status, headers, config) {
            console.log("error contact the developper");
        }).finally(function() {
           console.log("finally");
        });

        return;
        */
       /*
        {

            $scope.result.tr.splice($scope.result.tr.indexOf(item), 1);
            localstorage.setObject('loadtimesheets', $scope.result);
            timesheets.tr = $scope.result;
        }).error(function(data, status, headers, config) {
            $ionicPopup.alert({
                title: 'Error',
                template: 'Code : ' + status + '<br/>Please contact us : ' + data
            });
        }).finally(function() {
            $ionicLoading.hide();
        });
        */


        localstorage.setObject("reports", $rootScope.reports);

    };

    emptyReports = function () {
        console.log("empty");
        $rootScope.reports = [{
            "year": {
                "moyenne":"N/A"
            }
        }];
    }

    $scope.showSemesterContent = function (semester) {
        $scope.semesterContent = semester ;
        $scope.ueContent = undefined ;

        console.log($scope.semesterContent);
    };

    $scope.showUeContent = function (ue) {
        $scope.ueContent = ue ;
        console.log($scope.ueContent);
        console.log(JSON.stringify($rootScope.reports));
    };

    $scope.addNote = function (subject) {
        subject.isOpen = false;
        subject.notes.push($scope.newNote);
        $scope.newNote = {};
        calculMoyenneNote(subject);
        calculMoyenneUe();
        calculMoyenneSemester();
        calculMoyenneYear();
        $rootScope.reports[0].year.changes = true;
        localstorage.setObject("reports", $rootScope.reports);
    };

    $scope.addUE = function () {
        $scope.popoverAdding.ue.isOpen = false;
        console.log($scope.semesterContent);
        if($scope.semesterContent.UE == undefined)
            $scope.semesterContent.UE = [];
        $scope.semesterContent.UE.push($scope.newUE);
        $scope.newUE = {
            "moyenne": "N/A",
            "subject": []
        };    };

    $scope.addSubject = function () {
        $scope.popoverAdding.subject.isOpen = false;
        console.log($scope.ueContent);
        $scope.ueContent.subject.push($scope.newSubject);
        $scope.newSubject = {
            "moyenne": "N/A",
            "isOpen": false,
            "notes": []
        };
        localstorage.setObject("reports", $rootScope.reports);
    };

    $scope.addSemester = function (report) {
        $scope.popoverAdding.semester.isOpen = false;
        console.log(report);
        report.year.content.push($scope.newSemester);
        $scope.newSemester = {
            "moyenne": "N/A"
        };
        localstorage.setObject("reports", $rootScope.reports);
    };


    $scope.addYear = function (report) {
        $scope.template = "partials/template_include/secondForNewYear.html";
    };

    $scope.addYearForm = function (yearForm) {
        $scope.isCollapsed = false;
        console.log(yearForm);
        if(yearForm == 'Semesters') {
            $scope.templateYearForm = 'partials/template_include/semesterForm.html';
            $scope.newYear.content = [];
            $scope.newYear.type = 'S';
            console.log($scope.newYear);
        }else if(yearForm == 'CompleteYear'){
            $scope.templateYearForm = 'partials/template_include/completeYearForm.html';
            $scope.newYear.type = 'CY';
            console.log($scope.newYear);

        }else if(yearForm == 'Trimesters') {
            $scope.templateYearForm = 'partials/template_include/trimesterForm.html';
            $scope.newYear.content = [];
            $scope.newYear.type = 'T';
            console.log($scope.newYear);
        }
    };

    $scope.addSemesterForm = function (semesterForm) {
      console.log("la");
        if(semesterForm == "UEs"){
            $scope.newYear.type += "-UE";
        }else if(semesterForm == "Subjects"){
            $scope.newYear.type += "-SU";
        }
        $rootScope.reports[0].year = $scope.newYear;
        displayTemplate($rootScope.reports[0].year.type);
        console.log($scope.newYear);
    };

    calculMoyenneNote = function (subject) {
        var total = 0;
        var coef = 0;
        angular.forEach(subject.notes, function(i) {
            total += parseFloat(i.note) * parseFloat(i.coef);
            coef += parseFloat(i.coef);
        });
        subject.moyenne = (total / coef).toString();
        console.log(subject.moyenne);
    };

    calculMoyenneUe = function () {
        var total = 0;
        var coef = 0;
        console.log($scope.ueContent);
        angular.forEach($scope.ueContent.subject, function(i) {
            if (i.moyenne != "N/A") {
                total += parseFloat(i.moyenne) * parseFloat(i.coef);
                coef += parseFloat(i.coef);
            }
        });
        $scope.ueContent.moyenne = (total / coef).toString();
        console.log($scope.ueContent.moyenne);
        console.log($rootScope.reports);
    };

    calculMoyenneSemester = function () {
        var total = 0;
        var coef = 0;
        console.log($scope.semesterContent);
        angular.forEach($scope.semesterContent.UE, function(i) {
            if (i.moyenne != "N/A") {
                total += parseFloat(i.moyenne) * parseFloat(i.coef);
                coef += parseFloat(i.coef);
            }
        });
        $scope.semesterContent.moyenne = (total / coef).toString();
        console.log($scope.semesterContent.moyenne);
        console.log($rootScope.reports);
    };

    calculMoyenneYear = function () {
        var total = 0;
        var count = 0;
        angular.forEach($rootScope.reports[0].year.content, function(i) {
            if (i.moyenne != "N/A") {
                total += parseFloat(i.moyenne);
                count +=1
            }
        });
        $rootScope.reports[0].year.moyenne = (total / count).toString();
        console.log($rootScope.reports[0].year.moyenne);
    };

    $scope.saveChanges = function () {
        var element = {};
        console.log(JSON.stringify($rootScope.reports));
        element.reports = JSON.stringify($rootScope.reports);
        element.uid = $rootScope.uid;
        Data.post('updateYIP', {
            elem: element
        }).then(function (results) {
            Data.toast(results);
        });
    };
    
    console.log("getObject");
    console.log(localstorage.getObject('reports'));

    if(localstorage.get('reports') != undefined ){
        $rootScope.reports = localstorage.getObject('reports');
        displayTemplate($rootScope.reports[0].year.type);
    }else{
        $location.path('login');
    }

    console.log($rootScope.reports);
    
}]);

app.controller('ModalInstanceSubjectCtrl', function ($scope, $uibModalInstance, subject) {

    $scope.subject = subject;
    $scope.selected = {
        item: $scope.subject[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };


});


/* DIRECTIVE BELOW :  */

app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

[{"year":{"name":"Year 1", "type":"S-UE","content":[{"name":"Semester 1","moyenne":"10.0","UE":[{"name":"UE 1","moyenne":"10.0","coef":"1.5","subject":[{"moyenne":"12.0","coef":"2.0","name":"MAthematiques","isOpen":false,"notes":[{"name":"note1","note":"10.0","coef":"1.0"},{"name":"note2","note":"14.0","coef":"1.5"}]},{"moyenne":"11.0","coef":"3.0","name":"Français","isOpen":false,"notes":[{"name":"note3","note":"18.0","coef":"2.0"},{"name":"note4","note":"14.0","coef":"1.0"}]},{"moyenne":"11.0","coef":"3.0","name":"Français","isOpen":false,"notes":[{"name":"note3","note":"18.0","coef":"2.0"},{"name":"note4","note":"14.0","coef":"1.0"}]},{"moyenne":"11.0","coef":"3.0","name":"Français","isOpen":false,"notes":[{"name":"note3","note":"18.0","coef":"2.0"},{"name":"note4","note":"14.0","coef":"1.0"}]},{"moyenne":"11.0","coef":"3.0","name":"Français","isOpen":false,"notes":[{"name":"note3","note":"18.0","coef":"2.0"},{"name":"note4","note":"14.0","coef":"1.0"}]},{"moyenne":"11.0","coef":"3.0","name":"Français","isOpen":false,"notes":[{"name":"note3","note":"18.0","coef":"2.0"},{"name":"note4","note":"14.0","coef":"1.0"}]}]},{"name":"UE 2","moyenne":"10.0","coef":"1.5","subject":[{"moyenne":"16.0","coef":"2.0","name":"Anglais","isOpen":false,"notes":[{"name":"note1","note":"1.0","coef":"1.0"},{"name":"note2","note":"4.0","coef":"1.5"}]},{"moyenne":"11.0","coef":"3.0","name":"Eco","isOpen":false,"notes":[{"name":"note3","note":"18.0","coef":"2.0"},{"name":"note4","note":"14.0","coef":"1.0"}]}]}]},{"name":"Semester 2","moyenne":"10.0","UE":[{"name":"UE 1","coef":"1.5","moyenne":"10.0","subject":[{"moyenne":"12.0","coef":"2.0","name":"MAthemazeazeazeaeatiques","isOpen":false,"notes":[{"name":"note1","note":"10.0","coef":"12.0"},{"name":"note2","note":"14.0","coef":"1.5"}]},{"moyenne":"11.0","coef":"3.0","name":"Français","isOpen":false,"notes":[{"name":"note3","note":"14.0","coef":"2.0"},{"name":"note4","note":"14.0","coef":"1.0"}]}]},{"name":"UE 2","moyenne":"10.0","coef":"1.5","subject":[{"moyenne":"12.0","coef":"2.0","name":"MAtheeeeeeeeeeeeques","isOpen":false,"notes":[{"name":"note1","note":"10.0","coef":"1.0"},{"name":"note2","note":"14.0","coef":"1.5"}]},{"moyenne":"11.0","coef":"3.0","name":"bateau","isOpen":false,"notes":[{"name":"note3","note":"18.0","coef":"2.0"},{"name":"note4","note":"14.0","coef":"1.0"}]}]}]}]}}]