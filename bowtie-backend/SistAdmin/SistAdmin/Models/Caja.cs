//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SistAdmin.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Caja
    {
        public int idCaja { get; set; }
        public int idConcepto { get; set; }
        public string TipoMovimiento { get; set; }
        public string Descripcion { get; set; }
        public string Estado { get; set; }
        public System.DateTime FechaAlta { get; set; }
        public int UsuarioAlta { get; set; }
        public Nullable<int> UsuarioBaja { get; set; }
        public Nullable<System.DateTime> FechaBaja { get; set; }
        public Nullable<decimal> Monto { get; set; }
    
        public virtual Concepto Concepto { get; set; }
    }
}
