using CRUD.ENTIDADES;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using Microsoft.Data.SqlClient;

namespace CRUD.DATA.DAPPER
{
    public class MantTimeSheetDAPPER
    {

        #region Variables

        private readonly IConfiguration _Config;

        private const string sp_spRegistrarEntrada = "spRegistrarEntrada";
        private const string sp_spRegistrarSalida = "spRegistrarSalida";
        private const string sp_spObtenerEstadoTimeSheet = "spObtenerEstadoTimeSheet";

        #endregion

        #region Constructor

        public MantTimeSheetDAPPER(IConfiguration config)
        {
            _Config = config;
        }

        #endregion

        #region Métodos

        public Respuesta<TimeSheetDTO> RegistrarEntrada(TimeSheetDTO ObjTimeSheet)
        {

            Respuesta<TimeSheetDTO> respuesta = new Respuesta<TimeSheetDTO>();

            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();

                    using (SqlCommand command = new SqlCommand(sp_spRegistrarEntrada, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pIdUsuario", SqlDbType.Int) { Value = ObjTimeSheet.IdUsuario });

                        command.ExecuteNonQuery();

                        respuesta.Ok = true;
                        respuesta.Mensaje = "La entrada ha sido registrada correctamente.";
                        respuesta.ValorRetorno = null;

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función RegistrarEntrada de la capa DAPPER. {ex.Message}";
                respuesta.ValorRetorno = null;

            }

            return respuesta;

        }

        public Respuesta<TimeSheetDTO> RegistrarSalida(TimeSheetDTO ObjTimeSheet)
        {

            Respuesta<TimeSheetDTO> respuesta = new Respuesta<TimeSheetDTO>();

            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();

                    using (SqlCommand command = new SqlCommand(sp_spRegistrarSalida, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pIdUsuario", SqlDbType.Int) { Value = ObjTimeSheet.IdUsuario });

                        command.ExecuteNonQuery();

                        respuesta.Ok = true;
                        respuesta.Mensaje = "La salida ha sido registrada correctamente.";
                        respuesta.ValorRetorno = null;

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función RegistrarSalida de la capa DAPPER. {ex.Message}";
                respuesta.ValorRetorno = null;

            }

            return respuesta;

        }

        public Respuesta<TimeSheetDTO> ObtenerEstadoTimeSheet(int IdUsuario)
        {

            Respuesta<TimeSheetDTO> respuesta = new Respuesta<TimeSheetDTO>();

            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();

                    using (SqlCommand command = new SqlCommand(sp_spObtenerEstadoTimeSheet, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pIdUsuario", SqlDbType.Int) { Value = IdUsuario });
                        command.Parameters.Add(new SqlParameter("@pFecha", SqlDbType.Date) { Value = DateTime.Today });

                        using (SqlDataReader reader = command.ExecuteReader())
                        {

                            if (reader.Read())
                            {

                                respuesta.Ok = true;
                                respuesta.Mensaje = "Estado obtenido correctamente.";

                                respuesta.ValorRetorno = new TimeSheetDTO
                                {
                                    IdTimeSheet = Convert.ToInt32(reader["IdTimeSheet"]),
                                    IdUsuario = Convert.ToInt32(reader["IdUsuario"]),
                                    Fecha = Convert.ToDateTime(reader["Fecha"]),
                                    HoraEntrada = reader["HoraEntrada"] == DBNull.Value ? null : Convert.ToDateTime(reader["HoraEntrada"]),
                                    HoraSalida = reader["HoraSalida"] == DBNull.Value ? null : Convert.ToDateTime(reader["HoraSalida"])
                                };

                            }
                            else
                            {
                                respuesta.Ok = true;
                                respuesta.Mensaje = string.Empty;
                                respuesta.ValorRetorno = null;
                            }

                        }

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ObtenerEstadoTimeSheet de la capa DAPPER. {ex.Message}";
                respuesta.ValorRetorno = null;

            }

            return respuesta;

        }

        #endregion

    }

}