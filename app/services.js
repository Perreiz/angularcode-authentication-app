/**
 * Created by Axel on 22/07/2016.
 */
app.factory('WS', ['$http','localstorage', function($http, localstorage) {
    return {
        getYearInProgress: function() {
            return $http.get('api/index.php/reports',{header : {'Content-Type' : 'application/json; charset=UTF-8'}})
        },
        useCredentials: function() {
            var authdata = Base64.encode(this.settings().user + ':' + this.settings().password);
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
            return 'email=' + this.settings().email;
        },

        accountsTest: function() {
            return $http.get(this.settings().urlBackend + '/run/accounts-test?' + this.useCredentials(), {});
        },

        accountsRole: function() {
            return $http.get(this.settings().urlBackend + '/run/accounts-role?' + this.useCredentials(), {});
        },

        checkAvailable: function() {
            return $http.get(this.settings().urlBackend + '/run/check-available?' + this.useCredentials(), {});
        },

        isAuthorized: function(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authorizedRoles.indexOf(localstorage.get('role')) !== -1);
        },

        expenseApprove: function() {
            return $http.get(this.settings().urlBackend + '/run/expense-approve?' + this.useCredentials(), {});
        },
        expenseDetails: function() {
            return $http.get(this.settings().urlBackend + '/run/expense-details?' + this.useCredentials(), {});
        },
        expenseCount: function() {
            return $http.get(this.settings().urlBackend + '/run/expense-count?' + this.useCredentials(), {});
        },
        checkListProject: function() {
            return $http.get(this.settings().urlBackend + '/run/checkListProject?' + this.useCredentials(), {});
        },
        checklistActivity: function(project) {
            return $http.get(this.settings().urlBackend + '/run/checkListActivity?project='+ project +'&' + this.useCredentials(), {});
        },
        expenseCreate: function(expense) {
            var targetUrl = this.settings().urlBackend + '/run/expense-create?name=' + expense.name + "&comment=" + expense.comment + "&amount1=" + expense.amount1 + "&type1=" + expense.type1.id + "&amount2=" + expense.amount2 + "&type2=" + expense.type2.id + "&submit=" + expense.submit + "&attachOdm=" + expense.attachOdm + "&project=" + expense.project + "&activity="+ expense.activity +"&"+ this.useCredentials();

            var fd = new FormData();
            if(expense.attachment != null && expense.attachment.content != undefined){
                fd.append('file', expense.attachment.content);
            }else {
                fd.append('file', expense.attachment);
            }
            var respondedCode =  $http.post(targetUrl, fd, {
                transformRequest: angular.identity,
                fileKey: "justificatif",
                fileName: "justificatif.JPG",
                //mimeType: "image/jpg",
                chunkedMode: false,
                headers: {
                    'Content-Type': undefined
                }
            });

            return respondedCode
        },
        myexpensesHistorical: function() {
            return $http.get(this.settings().urlBackend + '/run/myexpenses-historical?' + this.useCredentials(), {});
        },
        myTicketsList: function () {
            return $http.get(this.settings().urlBackend + '/run/mytickets-list?' + this.useCredentials(), {});
        },
        myTicketDetail: function (keyT) {
            return $http.get(this.settings().urlBackend + '/run/myticket-detail?key=' + keyT + '&' + this.useCredentials(), {});
        },
        cancelPendingExpense: function(keyE,comment) {
            return $http.get(this.settings().urlBackend + '/run/cancelPendingExpense?keyE=' + keyE + '&comment='+comment +'&' + this.useCredentials(), {});
        },
        timesheetsApprove: function() {
            return $http.get(this.settings().urlBackend + '/run/team-activity-approve?' + this.useCredentials(), {});
        },
        timesheetsCount: function() {
            return $http.get(this.settings().urlBackend + '/run/team-activity-count?' + this.useCredentials(), {});
        },
        timeSheetsDetails: function() {
            return $http.get(this.settings().urlBackend + '/run/team-activity-details?' + this.useCredentials(), {});
        },
        refuseOneTimesheet: function(id, comment){
            return $http.get(this.settings().urlBackend + '/run/team-activity-refuse-single?id='+id+'&timesheet_value=&import_value=false&type_value=type:TSType;id:1400205708;&correction_value=false&comment='+comment+'&'  + this.useCredentials(),{});
        },
        approveOneTimesheet: function(id){
            return $http.get(this.settings().urlBackend + '/run/team-activity-approve-single?id='+id+'&timesheet_value=&import_value=false&type_value=type:TSType;id:1400205708;&correction_value=false&'  + this.useCredentials(),{});
        },
        approveOneExpense: function(id){
            return $http.get(this.settings().urlBackend + '/run/expense-approve-single?id='+id+'&'  + this.useCredentials(),{});
        },
        refuseOneExpense: function(id){
            return $http.get(this.settings().urlBackend + '/run/expense-refuse-single?id='+id+'&'  + this.useCredentials(),{});
        },
        lpsNotifCount: function() {
            return $http.get(this.settings().urlBackend + '/run/lps-notif-count?' + this.useCredentials(), {});
        },
        lpsApproveAll: function() {
            return $http.get(this.settings().urlBackend + '/run/lps-approve-all?' + this.useCredentials(), {});
        },
        approveOneLps: function(id) {
            console.log(id);
            return $http.get(this.settings().urlBackend + '/run/lps-approve-single?id='+id+'&' + this.useCredentials(), {});
        },
        lpsDetails: function() {
            return $http.get(this.settings().urlBackend + '/run/lps-details?' + this.useCredentials(), {});
        },
        newTimesheet: function(data,date,numTrack) {

            return $http.post(this.settings().urlBackend + '/run/timesheets-new?data=' + 'valeurinutile=e&date_value='+date+'&timesheet_value=&import_value=false&type_value=type:TSType;id:1400205708;&correction_value=false&num_track='+numTrack+'&'  + this.useCredentials(), data);
        },
        deleteTimesheet: function(numTrack) {

            return $http.get(this.settings().urlBackend + '/run/timesheets-delete?data=' + 'valeurinutile=e&num_track='+numTrack+'&'  + this.useCredentials(),{});
        },
        timesheetsInprogress: function() {
            return $http.get(this.settings().urlBackend + '/run/timesheets-make-phantom?' + this.useCredentials(), {});
        },
        timesheetsCodeProjects: function(date) {
            return $http.get(this.settings().urlBackend + '/run/timesheets-post-1?' + 'date_value='+date+'&timesheet_value=&import_value=false&type_value=type:TSType;id:1400205708;&correction_value=false&'+ this.useCredentials(),{});
        }
    }
}])