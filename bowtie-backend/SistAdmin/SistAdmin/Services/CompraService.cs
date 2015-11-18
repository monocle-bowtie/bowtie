using SistAdmin.Models;
using SistAdmin.TransferObjects;
using log4net;
using Mastercard.Exceptions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
namespace SistAdmin.Services
{
    public class CompraService : BaseService
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(ProductoService));

        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        public void RegistrarCompra(RegistrarComprar r)
        {
            Compra c = new Compra();

            c.idCompra = 0;
            c.idProveedor = r.idProveedor;
            c.Total = r.Total;
            c.UsuarioAlta = 1;
            c.FechaAlta = DateTime.Today;
            c.Fecha = r.Fecha;

            c = this.db.Compra.Add(c);
            //this.save();
            ///registrar los productos 
            foreach(CompraDetalle1 cd in r.CompraDetalle)
            {
                Producto p = new Producto();
                if (cd.idProducto > 0)
                {
                    p.idProducto = cd.idProducto;
                    //p.Nombre = cd.NombreProducto;
                    p.UsuarioAlta = 1;
                    p.FechaAlta = DateTime.Today;
                    p.CodigoBarras = "";
                    db.Entry(p).State = EntityState.Modified;
              //      this.save();

                    Stock s = this.db.Stock.Find(p.idProducto);
                    s.Cantidad = s.Cantidad + cd.Cantidad;
                    db.Entry(s).State = EntityState.Modified;
                //    this.save();

                    ProductoPrecio pp = this.db.ProductoPrecio.Find(p.idProducto, r.idProveedor);
                    pp.PrecioCosto = cd.PrecioUnitario;
                    db.Entry(pp).State = EntityState.Modified;
                  //  this.save();

                
                }
                else
                {
                    p.idProducto = cd.idProducto;
                    p.Nombre = cd.NombreProducto;
                    p.UsuarioAlta = 1;
                    p.FechaAlta = DateTime.Today;
                    p.CodigoBarras = "";
                    p = this.db.Producto.Add(p);
                    //this.save();

                    Stock s = new Stock();
                    s.Cantidad = cd.Cantidad;
                    s.idProducto = p.idProducto;
                    s.FechaAlta = DateTime.Today;
                    s.UsuarioAlta = 1;
                    s = this.db.Stock.Add(s);
                    //this.save();

                    ProductoPrecio pp = new ProductoPrecio();
                    pp.idProducto = p.idProducto;
                    pp.idProveedor = r.idProveedor;
                    pp.Estado = "A";
                    pp.FechaAlta = DateTime.Today;
                    pp.UsuarioAlta = 1;
                    pp.PrecioCosto = cd.PrecioUnitario;
                    pp = this.db.ProductoPrecio.Add(pp);
                    //this.save();
                }

                CompraDetalle cp = new CompraDetalle();
                cp.idCompraDetalle = 0;
                cp.idProducto = p.idProducto;
                cp.idCompra = c.idCompra;
                cp.PrecioUnitario = cd.PrecioUnitario;
                cp.PrecioTotal = cd.PrecioTotal;
                cp.UsuarioAlta = 1;
                cp.FechaAlta = DateTime.Today;
                cp = this.db.CompraDetalle.Add(cp);
                this.save();
                
            }
        }

        // POST api/<controller>
        //public void Post([FromBody]string value)
        //{
        //}

        // PUT api/<controller>/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}