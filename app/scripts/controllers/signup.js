'use strict';

app.controller('SignupCtrl', function(Auth, $scope) {
	$scope.message = null;

	$scope.signup = function(em,pwd) {
		$scope.message = null;
	    Auth.ref().createUser( {
	      email: em,
	      password: pwd
	    }, function(error,user) {
		      if (!error) {
		        console.log(user);
		        Auth.createProfile(user,em);
		        $scope.message = "Your account has been created successfully!";
		        $scope.$apply();
		      }
		      else {
		        console.log("Error creating user: ", error);
		        //console.log(error.message);
		        $scope.message = error.message;
		        $scope.$apply();
		      } 
		});
	};

	$scope.$watch($scope.message);
	//$scope.watch($scope.successMessage, $scope.signup());


});