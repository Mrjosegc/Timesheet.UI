using CRUD.DATA.DAPPER;
using CRUD.ENTIDADES;
using Microsoft.Extensions.Configuration;

namespace CRUD.BUSSINESLOGIC.BLL
{
    public class MantTimeSheetBLL
    {

        #region Variables

        private readonly MantTimeSheetDAPPER _MantTimeSheetDAPPER;

        #endregion

        #region Constructor

        public MantTimeSheetBLL(IConfiguration config)
        {
            _MantTimeSheetDAPPER = new MantTimeSheetDAPPER(config);
        }

        #endregion

        #region Métodos

        public Respuesta<TimeSheetDTO> RegistrarEntrada(TimeSheetDTO ObjTimeSheet)
        {
            return _MantTimeSheetDAPPER.RegistrarEntrada(ObjTimeSheet);
        }

        public Respuesta<TimeSheetDTO> RegistrarSalida(TimeSheetDTO ObjTimeSheet)
        {
            return _MantTimeSheetDAPPER.RegistrarSalida(ObjTimeSheet);
        }

        public Respuesta<TimeSheetDTO> ObtenerEstadoTimeSheet(int IdUsuario)
        {
            return _MantTimeSheetDAPPER.ObtenerEstadoTimeSheet(IdUsuario);
        }

        public Respuesta<List<TimeSheetDTO>> ObtenerReporteTimeSheet(TimeSheetDTO ObjTimeSheet)
        {
            return _MantTimeSheetDAPPER.ObtenerReporteTimeSheet(ObjTimeSheet);
        }

        public Respuesta<List<TimeSheetDTO>> ObtenerReporteAusencias(TimeSheetDTO ObjTimeSheet)
        {
            Respuesta<List<TimeSheetDTO>> respuesta = new Respuesta<List<TimeSheetDTO>>();

            try
            {
                respuesta = _MantTimeSheetDAPPER.ObtenerReporteAusencias(ObjTimeSheet);
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ObtenerReporteAusencias del BLL. {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        #endregion

    }
}