'use strict';

app.controller('MainCtrl', function($scope, $firebaseObject, $state, Event, Auth) {
	$scope.user = Auth.isAuth();
	if (!$scope.user) {
		$state.go('login');
	}

	var events = Event.get();
	events.then(function(data) {
		$scope.events = data;
	});

	$scope.removeEvent = function(event) {
		Event.delete(event);
		var events = Event.get();
		events.then(function(data) {
			$scope.events = data;
		})
	};

});