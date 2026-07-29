using CRUD.BUSSINESLOGIC.BLL;
using CRUD.ENTIDADES;
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
        public Respuesta<List<TimeSheetDTO>> ObtenerReporteTimeSheet()
        {
            Respuesta<List<TimeSheetDTO>> respuesta = new Respuesta<List<TimeSheetDTO>>();

            try
            {
                respuesta = _MantTimeSheetBLL.ObtenerReporteTimeSheet();
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ObtenerReporteTimeSheet del Controller. {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        #endregion
    }
}