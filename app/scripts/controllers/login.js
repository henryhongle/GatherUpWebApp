'use strict';

app.controller('LoginCtrl', function($scope, $state, Auth) {
  $scope.errorMessage = null;
	$scope.user = Auth.isAuth();
	if ($scope.user) {
		$state.go('/');
	}
	//console.log('hello');

	$scope.login = function(em,pwd) {
  		$scope.errorMessage = null;

  		Auth.ref().authWithPassword({
  			email: em,
  			password: pwd
  		}, function(error, authData) {
  			if (error === null) {
  				console.log('User ID: ' + authData.uid + ', Provider: ' + authData.provider);
  				$scope.errorMessage = null;
  				$scope.$apply();
          		$state.go('/');
  			}
  			else {
  				$scope.errorMessage ='Wrong email/password combination';
  				console.log('Error authenticating user:', error);
  				$scope.$apply();
  			}
  		});
  	};

});