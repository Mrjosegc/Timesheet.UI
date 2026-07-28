using System;
using System.Collections.Generic;
using System.Text;

namespace CRUD.ENTIDADES
{
    public class DepartamentosDTO
    {
        public int IdDepartamento { get; set; }

        public string NombreDepartamento { get; set; }

        public string DescripcionDepartamento { get; set; }

        public bool EstadoDepartamento { get; set; }

        public DateTime FechaCreacionDepartamento { get; set; }
    }
}
