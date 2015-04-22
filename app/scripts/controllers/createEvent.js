'use strict';


app.controller('CreateEventCtrl', function($scope, $state, Auth, Event, Geocoder) {

	$scope.user = Auth.isAuth();
	console.log($scope.user);
	if (!$scope.user) {
		$state.go('login');
	}

	$scope.submitEvent = function() {
		var address = $scope.event.address;
		$scope.event.dateString = $scope.event.date.toLocaleDateString();
		$scope.event.timeString = $scope.event.date.toLocaleTimeString();
				
		$scope.event.date = $scope.event.date.toJSON();
		
		//console.log($scope.event.date);
		var geocodingPromise = Geocoder.geocodeAddress(address);
		geocodingPromise.then( function (result) {
			$scope.event.lat = result.lat;
			$scope.event.lng = result.lng;
			$scope.event.address = result.formattedAddress;
			Event.create($scope.event);
			$state.go('/');
		}, function (err) {
			console.log(err);
		});
	};
});