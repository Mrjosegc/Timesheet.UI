using System;
using System.Collections.Generic;
using System.Text;

namespace CRUD.ENTIDADES
{
    public class ReporteMarcasPdfDTO
    {
        public string NombreEmpleado { get; set; } = string.Empty;

        public string NombreDepartamento { get; set; } = string.Empty;

        public string Periodo { get; set; } = string.Empty;

        public DateTime FechaReporte { get; set; }

        public List<TimeSheetDTO> Marcas { get; set; } = new();
    }
}