using SistAdmin.Models;
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
    public class VentaService : BaseService
    {
        // GET api/VentaService
        public List<Venta> getAll()
        {
            return this.db.Venta.ToList();
        }

        // GET api/VentaService/5
        public Venta find(long? id)
        {
            return this.db.Venta.Find(id);
        }

        // POST api/VentaService
        public Venta saveOrUpdate(Venta v)
        {
            if (v.idVenta > 0)
            {
                db.Entry(v).State = EntityState.Modified;
            }
            else
            {
                v = this.db.Venta.Add(v);
            }
            this.save();

            return v;
        }



        // DELETE api/VentaService/5
        public void delete(long id)
        {
            Venta v = this.db.Venta.Find(id);
            this.db.Venta.Remove(v);
            this.save();
        }
    }
}