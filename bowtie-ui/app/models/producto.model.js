define(['app'], function (app) {
	app.factory('ProductoModel',  function() 
	{
		function Producto() {};

		Producto.prototype = 
		{
			NombreProducto 		: "",
	        costo  		        : "",
	        cantidad 	        : "",
	        
	        clearProducto		: function() 
	        {
	        	this.NombreProducto = "";
		        this.costo  = "";
		        this.cantidad = "";
	        }
		};

		return Producto;
	});	
});
