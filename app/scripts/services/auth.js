'use strict';

app.factory('Auth', function($firebase, FIREBASE_URL) {
	var ref = new Firebase(FIREBASE_URL);

	return {
		isAuth: function() {
			return ref.getAuth();
		},
		ref: function() {
			return ref;
		},
		createProfile: function(user,email) {
			return ref.child('profile').child(user.uid).set( {email:email});
		}
	};

});
