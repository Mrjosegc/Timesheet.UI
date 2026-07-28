using System;
using System.Collections.Generic;
using System.Text;

namespace CRUD.ENTIDADES
{
    public class TimeSheetDTO
    {
        public int IdTimeSheet { get; set; }

        public int IdUsuario { get; set; }

        public DateTime Fecha { get; set; }

        public DateTime? HoraEntrada { get; set; }

        public DateTime? HoraSalida { get; set; }
    }
}