using System;
using System.Collections.Generic;
using System.Text;

namespace CRUD.DTO
{
    public class BitacoraDTO
    {
        public int IdBitacora { get; set; }

        public DateTime FechaHora { get; set; }

        public int? IdUsuario { get; set; }

        public string CorreoUsuario { get; set; }

        public string NombreUsuario { get; set; }

        public string Modulo { get; set; }

        public string Accion { get; set; }

        public string Descripcion { get; set; }

        public string DireccionIP { get; set; }

        public bool Exitoso { get; set; }
    }
}
