using System;
using System.Collections.Generic;
using System.Text;

namespace CRUD.ENTIDADES
{
    public class RolesDto
    {
        public int IdRol { get; set; }

        public string? NombreRol { get; set; }

        public string? DescripcionRol { get; set; }

        public bool EstadoRol { get; set; }

        public DateTime FechaCreacionRol { get; set; }
    }
}
