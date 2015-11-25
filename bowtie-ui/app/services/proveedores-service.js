define(['app'], function (app) {
	app.factory('ProveedoresService',  ['$http', '$q', '$rootScope', '$resource',
		function( $http, $q, $rootScope, $resource) {

			var service = {};

			service.getProveedores = getProveedores;
			service.saveProveedores = saveProveedores;

        	return service;

	        function getProveedores() {
	        	var callback = $q.defer();
        		$http({
					  method: 'GET',
					  url: 'http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/proveedor/get'
					}).then(function successCallback(response) 
					{						
			      		callback.resolve(response.data);
					});
				return callback.promise;
	        }

	        function saveProveedores(proveedor) {
	        	return $http.post("http://ec2-52-11-118-155.us-west-2.compute.amazonaws.com/api/proveedor/post",
			        proveedor)
			        .then(function (response) {
			            return response;
			        });
	        }
		}
	]);

});