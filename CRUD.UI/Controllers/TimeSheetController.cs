using CRUD.BUSSINESLOGIC.BLL;
using CRUD.ENTIDADES;
using QuestPDF.Fluent;
using CRUD.UI.Reportes;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.UI.Controllers
{
    public class TimeSheetController : Controller
    {
        #region Variables

        private readonly MantTimeSheetBLL _MantTimeSheetBLL;

        #endregion

        #region Constructor

        public TimeSheetController(IConfiguration config)
        {
            _MantTimeSheetBLL = new MantTimeSheetBLL(config);
        }

        public IActionResult ReporteMensual()
        {
            return View();
        }

        #endregion

        #region Métodos

        [HttpPost]
        public Respuesta<TimeSheetDTO> RegistrarEntrada([FromBody] TimeSheetDTO ObjTimeSheet)
        {
            Respuesta<TimeSheetDTO> respuesta = new Respuesta<TimeSheetDTO>();

            try
            {
                respuesta = _MantTimeSheetBLL.RegistrarEntrada(ObjTimeSheet);
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función RegistrarEntrada del Controller. {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        [HttpPost]
        public Respuesta<TimeSheetDTO> RegistrarSalida([FromBody] TimeSheetDTO ObjTimeSheet)
        {
            Respuesta<TimeSheetDTO> respuesta = new Respuesta<TimeSheetDTO>();

            try
            {
                respuesta = _MantTimeSheetBLL.RegistrarSalida(ObjTimeSheet);
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función RegistrarSalida del Controller. {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        [HttpPost]
        public Respuesta<TimeSheetDTO> ObtenerEstadoTimeSheet([FromBody] int IdUsuario)
        {
            Respuesta<TimeSheetDTO> respuesta = new Respuesta<TimeSheetDTO>();

            try
            {
                respuesta = _MantTimeSheetBLL.ObtenerEstadoTimeSheet(IdUsuario);
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ObtenerEstadoTimeSheet del Controller. {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        [HttpPost]
        public Respuesta<List<TimeSheetDTO>> ObtenerReporteTimeSheet([FromBody] TimeSheetDTO ObjTimeSheet)
        {
            Respuesta<List<TimeSheetDTO>> respuesta = new Respuesta<List<TimeSheetDTO>>();

            try
            {
                respuesta = _MantTimeSheetBLL.ObtenerReporteTimeSheet(ObjTimeSheet);
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ObtenerReporteTimeSheet del Controller. {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        [HttpPost]
        public IActionResult ExportarReportePdf([FromBody] TimeSheetDTO ObjTimeSheet)
        {
            try
            {
                var respuesta = _MantTimeSheetBLL.ObtenerReporteTimeSheet(ObjTimeSheet);

                if (!respuesta.Ok)
                {
                    return BadRequest(respuesta.Mensaje);
                }

                if (respuesta.ValorRetorno == null || respuesta.ValorRetorno.Count == 0)
                {
                    return BadRequest("No existen datos para generar el reporte.");
                }

                var primerRegistro = respuesta.ValorRetorno.First();

                var reporte = new ReporteMarcasPdfDTO
                {
                    NombreEmpleado = primerRegistro.NombreCompleto,
                    NombreDepartamento = primerRegistro.NombreDepartamento,
                    Periodo = $"{ObjTimeSheet.FechaInicio:dd/MM/yyyy} al {ObjTimeSheet.FechaFin:dd/MM/yyyy}",
                    FechaReporte = DateTime.Now,
                    Marcas = respuesta.ValorRetorno
                };

                var documento = new ReporteMarcasPdf(reporte);

                byte[] pdf = documento.GeneratePdf();

                return File(pdf, "application/pdf", "ReporteMarcas.pdf");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion
    }
}