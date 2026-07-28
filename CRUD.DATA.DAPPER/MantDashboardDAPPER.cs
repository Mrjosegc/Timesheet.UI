using CRUD.ENTIDADES;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace CRUD.DATA.DAPPER
{
    public class MantDashboardDAPPER
    {
        #region "Constructor"

        private readonly IConfiguration _Config;

        public MantDashboardDAPPER(IConfiguration config)
        {
            _Config = config;
        }

        #endregion

        #region "Funciones"

        public Respuesta<DashboardDTO> ObtenerResumenDashboard()
        {
            Respuesta<DashboardDTO> respuesta = new Respuesta<DashboardDTO>();

            try
            {
                using (SqlConnection conn = new SqlConnection(_Config.GetConnectionString("Conexion")))
                {
                    SqlCommand cmd = new SqlCommand("spObtenerResumenDashboard", conn);
                    cmd.CommandType = CommandType.StoredProcedure;

                    conn.Open();

                    SqlDataReader dr = cmd.ExecuteReader();

                    DashboardDTO dashboard = new DashboardDTO();

                    if (dr.Read())
                    {
                        dashboard.TotalUsuarios = Convert.ToInt32(dr["TotalUsuarios"]);
                        dashboard.TotalRoles = Convert.ToInt32(dr["TotalRoles"]);
                        dashboard.TotalDepartamentos = Convert.ToInt32(dr["TotalDepartamentos"]);

                    }

                    respuesta.Ok = true;
                    respuesta.Mensaje = "Resumen obtenido correctamente.";
                    respuesta.ValorRetorno = dashboard;
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ObtenerResumenDashboard de la capa DAPPER. {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        #endregion
    }
}