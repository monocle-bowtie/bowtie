define(['app'], function (app) {
	app.factory('LoginService',  ['$resource', '$http', '$rootScope', 
		function( $resource, $http, $rootScope){
			var baseUrl = 'http://localhost:8080/api/';
			return {
				login: function(callback) {
					//Desde aca se va a ir al backend
					var response = {success: true};
					callback(response);
				},
			}
		}
	]);

});