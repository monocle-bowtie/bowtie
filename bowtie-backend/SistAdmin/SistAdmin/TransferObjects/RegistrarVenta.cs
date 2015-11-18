using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SistAdmin.TransferObjects
{
    public class RegistrarVenta
    {
        public int idVenta { get; set; }
        public int idVendedor { get; set;}
        public int idCliente { get; set; }
        public DateTime fecha { get; set; }
        public decimal total { get; set; }
        public char estado { get; set; }
        public DateTime fechaalta { get; set; }
        public int usuarioalta { get; set; }
        public DateTime fechabaja { get; set; }
    }
}