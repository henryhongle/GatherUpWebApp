'use strict';

app.controller('editEventCtrl', function($scope, $stateParams, Event, $state, Geocoder) {
	$scope.event = Event.edit($stateParams.id);
	//var date = new Date($scope.event.date);
	//$scope.event.date = date;
	//console.log($scope.event.date);

	$scope.submitEvent = function() {
		//console.log($scope.event.date);
		console.log($scope.event.date);	

		var geoFire = Event.geoFire();
		var date = new Date($scope.event.date);
		//$scope.event.date = date;
		console.log(date);
		var address = $scope.event.address;
		//var date = new Date($scope.event.date);
		$scope.event.dateString = date.toLocaleDateString();
		$scope.event.timeString = date.toLocaleTimeString();		
		$scope.event.date = date.toJSON();
		var geocodingPromise = Geocoder.geocodeAddress(address);
		geocodingPromise.then( function (result) {
			$scope.event.lat = result.lat;
			$scope.event.lng = result.lng;
			$scope.event.address = result.formattedAddress;
			$scope.event.$save();
			
			//console.log($scope.event);
			geoFire.set($scope.event.$id, [result.lat, result.lng]).then(function() {
				//console.log("Provided key has been updated to GeoFire")
			}, function(error) {
				 //console.log("Error: " + error);
			});

			$state.go('/');		
			
		}, function (err) {
			//console.log(err);
		});
	}
});