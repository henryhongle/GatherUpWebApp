'use strict';

app.controller('NavCtrl', function($scope,Auth) {
  	$scope.isAuth = Auth.isAuth;  
});