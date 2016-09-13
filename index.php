<!DOCTYPE html>
<html lang="en" ng-app="myApp">

  <head>
    <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
          <title>AngularJS Authentication App</title>
          <!-- Bootstrap -->
              <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
            <link href="css/custom.css" rel="stylesheet">
              <link href="css/toaster.css" rel="stylesheet">
              <link href="css/style.css" rel="stylesheet">
                <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
                <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
                <!--[if lt IE 9]><link href= "css/bootstrap-theme.css"rel= "stylesheet" >

<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
              </head>

  <body ng-cloak="" ng-controller="indexController">
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="row">
          <div class="navbar-header col-md-8">
            <button type="button" class="navbar-toggle" toggle="collapse" target=".navbar-ex1-collapse">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <h1 class="title">My Year App</h1>
          </div>
          <!--
          <div class="navbar-header col-md-2">
            <a class="navbar-brand" rel="home" title="AngularJS Authentication Tutorial" href="http://www.angularcode.com/user-authentication-using-angularjs-php-mysql">Tutorial</a>
          </div>
          -->
          <div class="navbar-header col-md-2">
          <span ng-if="authenticated == true" class="row">
            <span class="brand" > Connected as {{name}}</span>
            <a class="brand orangeA" rel="home" title="Download" ng-click="logout()">Logout</a>
          </span>
            <a ng-if="authenticated == false" class="brand orangeA row" rel="home" title="Login In" href="login">Sign In</a>
          </div>
        </div>
      </div>
    </div>
    <div >
      <div class="container" style="margin-top:40px; padding-left: 5%; padding-right:5%">

        <div data-ng-view="" id="ng-view" class="slide-animation"></div>

      </div>
    </body>
  <toaster-container toaster-options="{'time-out': 3000}"></toaster-container>
  <!-- Libs -->
        <script src="https://code.angularjs.org/1.5.7/angular.min.js"></script>
        <script src="https://code.angularjs.org/1.5.7/angular-route.min.js"></script>

        <script type="text/javascript" src="http://code.angularjs.org/1.5.7/angular-animate.js"></script>
        <script src="bootstrap-gh-pages/ui-bootstrap-tpls-1.3.3.min.js"></script>

  <script src="js/toaster.js"></script>
  <script src="app/app.js"></script>
  <script src="app/data.js"></script>
  <script src="app/directives.js"></script>
  <script src="app/factories.js"></script>
  <script src="app/services.js"></script>
    <script src="js/controller/indexController.js"></script>

  <script src="app/authCtrl.js"></script>
  <script src="js/controller/yearInProgressController.js"></script>
</html>

