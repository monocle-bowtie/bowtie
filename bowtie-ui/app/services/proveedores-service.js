define(['app'], function (app) {
	app.factory('ProveedoresService',  ['$http', '$q', '$rootScope', '$resource',
		function( $http, $q, $rootScope, $resource) {

			var service = {};

			service.getProveedores = getProveedores;

        	return service;

	        function getProveedores() {
	        	var callback = $q.defer();
        		$http({
					  method: 'GET',
					  url: 'http://localhost:8080/api/proveedores.json'
					}).then(function successCallback(response) 
					{						
			      		callback.resolve(response.data);
					});
				return callback.promise;
	        }
		}
	]);

});