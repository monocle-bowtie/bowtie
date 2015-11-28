define(['app'], function (app) {
	app.factory('HomeService',  ['$http', '$q', '$rootScope', '$resource',
		function( $http, $q, $rootScope, $resource) {

			var service = {};
			service.getUltimosMovimientos = getUltimosMovimientos;

        	return service;

        	function getUltimosMovimientos() {
	        	var callback = $q.defer();
        		$http({
					  method: 'GET',
					  url: 'http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/caja/get'
					}).then(function successCallback(response) 
					{						
			      		callback.resolve(response.data);
					});
				return callback.promise;
	        }
		}
	]);

});