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
    public class StockService : BaseService
    {
        // GET api/StockService
        public List<Stock> getAll()
        {
            return this.db.Stock.ToList();
        }

        // GET api/StockService/5
        public Stock find(long? id)
        {
            return this.db.Stock.Find(id);
        }

        // POST api/StockService
        public Stock saveOrUpdate(Stock s)
        {
            if (s.idProducto > 0)
            {
                db.Entry(s).State = EntityState.Modified;
            }
            else
            {
                s = this.db.Stock.Add(s);
            }
            this.save();

            return s;
        }



        // DELETE api/StockService/5
        public void delete(long id)
        {
            Stock s = this.db.Stock.Find(id);
            this.db.Stock.Remove(s);
            this.save();
        }
    }
}