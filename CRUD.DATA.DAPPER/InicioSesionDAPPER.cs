using CRUD.ENTIDADES;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace CRUD.DATA.DAPPER
{
    public class InicioSesionDAPPER
    {

        #region "Procedimientos almacenados"
        //Procedimientos almacenados

        private const string sp_spIniciarSesion = "dbo.spIniciarSesion";


        #endregion


        //instancias

        private readonly IConfiguration _Config;


        //Constructor

        public InicioSesionDAPPER(IConfiguration configuration)
        {
            _Config = configuration;

        }

        #region "Funciones"


        public Respuesta<UsuarioDTO> IniciarSesion(UsuarioDTO ObjUsuario)
        {

            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();

            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();

                    using (SqlCommand command = new SqlCommand(sp_spIniciarSesion, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pCorreo", SqlDbType.NVarChar, 80) { Value = ObjUsuario.Correo });
                        command.Parameters.Add(new SqlParameter("@pContrasena", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Contrasena });


                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                bool ExisteUsuario = (bool)reader["Existe"];

                                UsuarioDTO DataUsuario = new UsuarioDTO
                                {
                                    IdUsuario = reader["IdUsuario"] == DBNull.Value ? 0 : (int)reader["IdUsuario"],
                                    Correo = (string)reader["Correo"],
                                    NombreCompleto = (string)reader["NombreCompleto"],
                                    NombreRol = reader["NombreRol"] == DBNull.Value ? string.Empty : (string)reader["NombreRol"]
                                };

                                if (ExisteUsuario)
                                {
                                    respuesta.Ok = true;
                                    respuesta.Mensaje = (string)reader["Mensaje"];
                                    respuesta.ValorRetorno = DataUsuario;
                                }
                                else
                                {
                                    respuesta.Ok = false;
                                    respuesta.Mensaje = (string)reader["Mensaje"];
                                    respuesta.ValorRetorno = DataUsuario;
                                }

                            }

                        }

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función IniciarSesion de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;

        }

        #endregion

    }
}
