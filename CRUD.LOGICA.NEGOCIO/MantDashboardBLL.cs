using CRUD.DATA.DAPPER;
using CRUD.ENTIDADES;

namespace CRUD.LOGICA.NEGOCIO
{
    public class MantDashboardBLL
    {
        #region "Constructor"

        private readonly MantDashboardDAPPER _MantDashboardDAPPER;

        public MantDashboardBLL(MantDashboardDAPPER mantDashboardDAPPER)
        {
            _MantDashboardDAPPER = mantDashboardDAPPER;
        }

        #endregion

        #region "Funciones"

        public Respuesta<DashboardDTO> ObtenerResumenDashboard()
        {
            Respuesta<DashboardDTO> respuesta = new Respuesta<DashboardDTO>();

            try
            {
                var ResDAPPER = _MantDashboardDAPPER.ObtenerResumenDashboard();

                if (ResDAPPER != null)
                {
                    respuesta = ResDAPPER;
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la capa BLL en el método ObtenerResumenDashboard. {ex.Message}";
            }

            return respuesta;
        }

        #endregion
    }
}