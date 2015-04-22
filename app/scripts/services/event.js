'use strict';

app.factory('Event', function($firebase, Auth,FIREBASE_URL, $firebaseArray, $firebaseObject,$q, Geocoder) {
	var ref = new Firebase(FIREBASE_URL);
	//var geo = ref.child("geo");
	var geoFire = new GeoFire(ref.child("geo"));
	var events = $firebaseArray(ref.child("events"));
	var userEventsRef = ref.child("user_events");
	//var user = Auth.isAuth();

	return {

		geoFire: function() {
			return geoFire;
		},

		create: function(event) {
			var user = Auth.isAuth();
			event.creatorID = user.uid;
			event.comments = ["No comment yet"];
			event.num_comment = 0;
			var e = ref.child("events").push(event);
			var userlistID = ref.child('user_events').child(event.creatorID).push(e.key());
			ref.child("events").child(e.key()).update( {listID: userlistID.key()});
			geoFire.set(e.key(), [event.lat, event.lng]).then(function() {
				console.log("Provided key has been added to GeoFire")
			}, function(error) {
				 console.log("Error: " + error);
			});
		},

		get: function() {
			var user = Auth.isAuth();
			var defer = $q.defer();
			var list = $firebaseArray(ref.child("user_events").child(user.uid));
			list.$loaded().then( function (data) {
				var userEvents =[];
				data.forEach(function(e) {
					var key = e.$value;
					var event = events.$getRecord(key);
					userEvents.push(event);
				});
				defer.resolve(userEvents);
			});
			return defer.promise;
		},

		edit: function(eventID) {
			var obj = $firebaseObject(ref.child("events").child(eventID));
			return obj;
		},

		delete: function(event) {
			var user = Auth.isAuth();
			var list_id = event.listID;
			console.log(event.$id);
			ref.child("user_events").child(user.uid).child(list_id).remove();
			ref.child("geo").child(event.$id).remove();
			events.$remove(event);
		}
	};
});