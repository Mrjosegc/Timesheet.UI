using CRUD.ENTIDADES;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace CRUD.DATA.DAPPER
{
    public class MantUsuariosDAPPER
    {

        #region "Procedimientos almacenados"
        //Procedimientos almacenados

        private const string sp_spObtenerRoles = "spObtenerRoles";
        private const string sp_spRegistrarUsuarios = "spRegistrarUsuarios";
        private const string sp_spObtenerUsuarios = "spObtenerUsuarios";
        private const string sp_spObtenerUsuarioPorId = "spObtenerUsuarioPorId";
        private const string sp_spActualizarUsuarioPorId = "spActualizarUsuarioPorId";
        private const string sp_spEliminarUsuarioPorId = "spEliminarUsuarioPorId";
        private const string sp_spCrearRol = "spCrearRol";
        private const string sp_spEliminarRolPorId = "spEliminarRolPorId";
        private const string sp_spEditarRolPorId = "spEditarRolPorId";
        private const string sp_spObtenerRolPorId = "spObtenerRolPorId";
        private const string sp_spObtenerDepartamentos = "spObtenerDepartamentos";
        private const string sp_spCrearDepartamento = "spCrearDepartamento";
        private const string sp_spObtenerDepartamentoPorId = "spObtenerDepartamentoPorId";
        private const string sp_spEditarDepartamentoPorId = "spEditarDepartamentoPorId";
        private const string sp_spEliminarDepartamentoPorId = "spEliminarDepartamentoPorId";

        #endregion

        #region "Constructor"

        //Instancias

        private readonly IConfiguration _Config;

        //Constructor

        public MantUsuariosDAPPER(IConfiguration configuration)
        {
            _Config = configuration;

        }

        #endregion

        #region "Funciones"

        public Respuesta<List<RolesDto>> ObtenerRoles()
        {

            Respuesta<List<RolesDto>> respuesta = new Respuesta<List<RolesDto>>();
            List<RolesDto> ListaRoles = new List<RolesDto>();
            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();


                    using (SqlCommand command = new SqlCommand(sp_spObtenerRoles, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;

                        //command.Parameters.Add(new SqlParameter("@pCorreo", SqlDbType.NVarChar, 80) { Value = ObjUsuario.Correo });
                        //command.Parameters.Add(new SqlParameter("@pContrasena", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Contrasena });


                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            
                            while (reader.Read())
                            {

                                RolesDto Rol = new RolesDto
                                {
                                    IdRol = (int)reader["IdRol"],
                                    NombreRol = (string)reader["NombreRol"],
                                    DescripcionRol = (string)reader["DescripcionRol"],
                                    EstadoRol = (bool)reader["EstadoRol"],
                                    FechaCreacionRol = (DateTime)reader["FechaCreacionRol"]

                                };

                                ListaRoles.Add(Rol);

                            }
                            
                            respuesta.Ok = true;
                            respuesta.Mensaje = "Se han obtenido los roles de manera exitosa";
                            respuesta.ValorRetorno = ListaRoles;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ObtenerRoles de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;

            }

            return respuesta;

        }

        public Respuesta<UsuarioDTO> RegistrarUsuarios(UsuarioDTO ObjUsuario)
        {

            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();
            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();


                    using (SqlCommand command = new SqlCommand(sp_spRegistrarUsuarios, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pCorreo", SqlDbType.NVarChar, 80) { Value = ObjUsuario.Correo });
                        command.Parameters.Add(new SqlParameter("@pContrasena", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Contrasena });
                        command.Parameters.Add(new SqlParameter("@pIdRol", SqlDbType.Int) { Value = ObjUsuario.IdRol });
                        command.Parameters.Add(new SqlParameter("@pNombre", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Nombre });
                        command.Parameters.Add(new SqlParameter("@pApellido1", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Apellido1 });
                        command.Parameters.Add(new SqlParameter("@pApellido2", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Apellido2 });
                        command.Parameters.Add(new SqlParameter("@pFechaNac", SqlDbType.Date) { Value = ObjUsuario.FechaNac });
                        command.Parameters.Add(new SqlParameter("@pGenero", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Genero });
                        command.Parameters.Add(new SqlParameter("@pTelefono", SqlDbType.NVarChar, 20) { Value = ObjUsuario.Telefono });
                        command.Parameters.Add(new SqlParameter("@pDireccion", SqlDbType.NVarChar, 400) { Value = ObjUsuario.Direccion });
                        command.Parameters.Add(new SqlParameter("@pIdDepartamento", SqlDbType.Int) { Value = ObjUsuario.IdDepartamento });

                        int FilasAfectadas = command.ExecuteNonQuery();

                        if (FilasAfectadas > 0)
                        {
                            respuesta.Ok = true;
                            respuesta.Mensaje = "El usuario ha sido registrado de manera exitosa!";
                            respuesta.ValorRetorno = null;
                        }
                        else
                        {
                            respuesta.Ok = false;
                            respuesta.Mensaje = "Ha ocurrido un error al intentar de registrar el usuario";
                            respuesta.ValorRetorno= null;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función RegistrarUsuarios de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;

            }

            return respuesta;

        }

        public Respuesta<List<UsuarioDTO>> ObtenerUsuarios()
        {

            Respuesta<List<UsuarioDTO>> respuesta = new Respuesta<List<UsuarioDTO>>();
            List<UsuarioDTO> ListaUsuarios = new List<UsuarioDTO>();
            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();


                    using (SqlCommand command = new SqlCommand(sp_spObtenerUsuarios, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;

                        //command.Parameters.Add(new SqlParameter("@pCorreo", SqlDbType.NVarChar, 80) { Value = ObjUsuario.Correo });
                        //command.Parameters.Add(new SqlParameter("@pContrasena", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Contrasena });


                        using (SqlDataReader reader = command.ExecuteReader())
                        {

                            while (reader.Read())
                            {

                                UsuarioDTO Usuario = new UsuarioDTO
                                {
                                    IdUsuario = (int)reader["IdUsuario"],
                                    NombreCompleto = (string)reader["NombreCompleto"],
                                    NombreRol = (string)reader["NombreRol"],
                                    Correo = (string)reader["Correo"],
                                    Telefono = (string)reader["Telefono"],
                                };

                                ListaUsuarios.Add(Usuario);

                            }

                            respuesta.Ok = true;
                            respuesta.Mensaje = "Se han obtenido los usuarios de manera exitosa";
                            respuesta.ValorRetorno = ListaUsuarios;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ObtenerUsuarios de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;

            }

            return respuesta;

        }

        public Respuesta<UsuarioDTO> ObtenerUsuarioPorId(UsuarioDTO ObjUsuario)
        {

            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();
            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();


                    using (SqlCommand command = new SqlCommand(sp_spObtenerUsuarioPorId, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pIdUsuario", SqlDbType.Int) { Value = ObjUsuario.IdUsuario });
                        //command.Parameters.Add(new SqlParameter("@pContrasena", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Contrasena });


                        using (SqlDataReader reader = command.ExecuteReader())
                        {

                            if (reader.Read())
                            {

                                UsuarioDTO Usuario = new UsuarioDTO
                                {
                                    IdUsuario = (int)reader["IdUsuario"],
                                    Nombre = (string)reader["Nombre"],
                                    Apellido1 = (string)reader["Apellido1"],
                                    Apellido2 = (string)reader["Apellido2"],
                                    FechaNac = (DateTime)reader["FechaNacimiento"],
                                    Genero = (string)reader["Genero"],
                                    IdRol = (int)reader["IdRol"],
                                    Correo = (string)reader["Correo"],
                                    Telefono = (string)reader["Telefono"],
                                    Contrasena = (string)reader["Contrasena"],
                                    Direccion = (string)reader["Direccion"],
                                    IdDepartamento = (int)reader["IdDepartamento"]

                                };

                                respuesta.Ok = true;
                                respuesta.Mensaje = "Se han obtenido el usuario de manera exitosa";
                                respuesta.ValorRetorno = Usuario;

                            }

                            
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ObtenerUsuariosPorId de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;

            }

            return respuesta;

        }

        public Respuesta<UsuarioDTO> ActualizarUsuarioPorId(UsuarioDTO ObjUsuario)
        {

            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();
            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();


                    using (SqlCommand command = new SqlCommand(sp_spActualizarUsuarioPorId, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pIdUsuario", SqlDbType.Int) { Value = ObjUsuario.IdUsuario });
                        command.Parameters.Add(new SqlParameter("@pCorreo", SqlDbType.NVarChar, 80) { Value = ObjUsuario.Correo });
                        command.Parameters.Add(new SqlParameter("@pContrasena", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Contrasena });
                        command.Parameters.Add(new SqlParameter("@pIdRol", SqlDbType.Int) { Value = ObjUsuario.IdRol });
                        command.Parameters.Add(new SqlParameter("@pNombre", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Nombre });
                        command.Parameters.Add(new SqlParameter("@pApellido1", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Apellido1 });
                        command.Parameters.Add(new SqlParameter("@pApellido2", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Apellido2 });
                        command.Parameters.Add(new SqlParameter("@pFechaNac", SqlDbType.Date) { Value = ObjUsuario.FechaNac });
                        command.Parameters.Add(new SqlParameter("@pGenero", SqlDbType.NVarChar, 50) { Value = ObjUsuario.Genero });
                        command.Parameters.Add(new SqlParameter("@pTelefono", SqlDbType.NVarChar, 20) { Value = ObjUsuario.Telefono });
                        command.Parameters.Add(new SqlParameter("@pDireccion", SqlDbType.NVarChar, 400) { Value = ObjUsuario.Direccion });
                        command.Parameters.Add(new SqlParameter("@pIdDepartamento", SqlDbType.Int) { Value = ObjUsuario.IdDepartamento });

                        int FilasAfectadas = command.ExecuteNonQuery();

                        if (FilasAfectadas > 0)
                        {
                            respuesta.Ok = true;
                            respuesta.Mensaje = "La información del usuario ha sido actualizada de manera exitosa!";
                            respuesta.ValorRetorno = null;
                        }
                        else
                        {
                            respuesta.Ok = false;
                            respuesta.Mensaje = "Ha ocurrido un error al intentar actualizar la información del usuario.";
                            respuesta.ValorRetorno = null;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ActualizarUsuarioPorId de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;

            }

            return respuesta;

        }

        public Respuesta<UsuarioDTO> EliminarUsuarioPorId(UsuarioDTO ObjUsuario)
        {

            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();
            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();


                    using (SqlCommand command = new SqlCommand(sp_spEliminarUsuarioPorId, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pIdUsuario", SqlDbType.Int) { Value = ObjUsuario.IdUsuario });

                        int FilasAfectadas = command.ExecuteNonQuery();

                        if (FilasAfectadas > 0)
                        {
                            respuesta.Ok = true;
                            respuesta.Mensaje = "El usuario ha sido eliminado permanentemente!";
                            respuesta.ValorRetorno = null;
                        }
                        else
                        {
                            respuesta.Ok = false;
                            respuesta.Mensaje = "Ha ocurrido un error al intentar eliminar la información del usuario.";
                            respuesta.ValorRetorno = null;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función EliminarUsuarioPorId de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;

            }

            return respuesta;

        }

        public Respuesta<RolesDto> CrearRol(RolesDto ObjRol)
        {

            Respuesta<RolesDto> respuesta = new Respuesta<RolesDto>();
            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();


                    using (SqlCommand command = new SqlCommand(sp_spCrearRol, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;
 
                        command.Parameters.Add(new SqlParameter("@pNombreRol", SqlDbType.NVarChar, 50) { Value = ObjRol.NombreRol });
                        command.Parameters.Add(new SqlParameter("@pDescripcionRol", SqlDbType.NVarChar, 50) { Value = ObjRol.DescripcionRol });

                        int FilasAfectadas = command.ExecuteNonQuery();

                        if (FilasAfectadas > 0)
                        {
                            respuesta.Ok = true;
                            respuesta.Mensaje = "El rol ha sido creado de manera exitosa!";
                            respuesta.ValorRetorno = null;
                        }
                        else
                        {
                            respuesta.Ok = false;
                            respuesta.Mensaje = "Ha ocurrido un error al intentar crear el rol";
                            respuesta.ValorRetorno = null;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función CrearRol de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;

            }

            return respuesta;

        }

        public Respuesta<RolesDto> EliminarRolPorId(RolesDto ObjRol)
        {

            Respuesta<RolesDto> respuesta = new Respuesta<RolesDto>();
            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();


                    using (SqlCommand command = new SqlCommand(sp_spEliminarRolPorId, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pIdRol", SqlDbType.Int) { Value = ObjRol.IdRol });

                        int FilasAfectadas = command.ExecuteNonQuery();

                        if (FilasAfectadas > 0)
                        {
                            respuesta.Ok = true;
                            respuesta.Mensaje = "El rol ha sido eliminado permanentemente!";
                            respuesta.ValorRetorno = null;
                        }
                        else
                        {
                            respuesta.Ok = false;
                            respuesta.Mensaje = "Ha ocurrido un error al intentar eliminar la información del rol.";
                            respuesta.ValorRetorno = null;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función EliminarRolPorId de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;

            }

            return respuesta;

        }

        public Respuesta<RolesDto> EditarRolPorId(RolesDto ObjRol)
        {

            Respuesta<RolesDto> respuesta = new Respuesta<RolesDto>();
            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();


                    using (SqlCommand command = new SqlCommand(sp_spEditarRolPorId, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pIdRol", SqlDbType.Int) { Value = ObjRol.IdRol });
                        command.Parameters.Add(new SqlParameter("@pNombreRol", SqlDbType.VarChar, 100) { Value = ObjRol.NombreRol });
                        command.Parameters.Add(new SqlParameter("@pDescripcionRol", SqlDbType.VarChar, 255) { Value = ObjRol.DescripcionRol });
                        command.Parameters.Add(new SqlParameter("@pEstadoRol", SqlDbType.Bit) { Value = ObjRol.EstadoRol });

                        int FilasAfectadas = command.ExecuteNonQuery();

                        if (FilasAfectadas > 0)
                        {
                            respuesta.Ok = true;
                            respuesta.Mensaje = "La información del rol ha sido actualizada de manera exitosa!";
                            respuesta.ValorRetorno = null;
                        }
                        else
                        {
                            respuesta.Ok = false;
                            respuesta.Mensaje = "Ha ocurrido un error al intentar actualizar la información del rol.";
                            respuesta.ValorRetorno = null;
                        }

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función EditarRolPorId de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;

            }

            return respuesta;

        }

        public Respuesta<RolesDto> ObtenerRolPorId(RolesDto ObjRol)
        {

            Respuesta<RolesDto> respuesta = new Respuesta<RolesDto>();
            try
            {

                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {

                    connection.Open();


                    using (SqlCommand command = new SqlCommand(sp_spObtenerRolPorId, connection))
                    {

                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pIdRol", SqlDbType.Int) { Value = ObjRol.IdRol });
                        //command.Parameters.Add(new SqlParameter("@pNombreRol", SqlDbType.NVarChar, 80) { Value = ObjRol.NombreRol });
                        //command.Parameters.Add(new SqlParameter("@pDescripcionRol", SqlDbType.NVarChar, 150) { Value = ObjRol.DescripcionRol });
 
                        using (SqlDataReader reader = command.ExecuteReader())
                        {

                            if (reader.Read())
                            {

                                RolesDto Rol = new RolesDto
                                {
                                    IdRol = (int)reader["IdRol"],
                                    NombreRol = (string)reader["NombreRol"],
                                    DescripcionRol = (string)reader["DescripcionRol"],
                                    EstadoRol = (bool)reader["EstadoRol"],
                                    FechaCreacionRol = (DateTime)reader["FechaCreacionRol"]

                                };

                                respuesta.Ok = true;
                                respuesta.Mensaje = "Se han obtenido el Rol de manera exitosa";
                                respuesta.ValorRetorno = Rol;

                            }

                        }

                    }

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ObtenerRolPorId de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;

            }

            return respuesta;

        }

        public Respuesta<List<DepartamentosDTO>> ObtenerDepartamentos()
        {
            Respuesta<List<DepartamentosDTO>> respuesta = new Respuesta<List<DepartamentosDTO>>();
            List<DepartamentosDTO> ListaDepartamentos = new List<DepartamentosDTO>();

            try
            {
                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(sp_spObtenerDepartamentos, connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                DepartamentosDTO Departamento = new DepartamentosDTO
                                {
                                    IdDepartamento = (int)reader["IdDepartamento"],
                                    NombreDepartamento = (string)reader["NombreDepartamento"],
                                    DescripcionDepartamento = (string)reader["DescripcionDepartamento"],
                                    EstadoDepartamento = (bool)reader["EstadoDepartamento"],
                                    FechaCreacionDepartamento = (DateTime)reader["FechaCreacion"]
                                };

                                ListaDepartamentos.Add(Departamento);
                            }

                            respuesta.Ok = true;
                            respuesta.Mensaje = "Se han obtenido los departamentos de manera exitosa";
                            respuesta.ValorRetorno = ListaDepartamentos;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ObtenerDepartamentos de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        public Respuesta<DepartamentosDTO> CrearDepartamento(DepartamentosDTO ObjDepartamento)
        {
            Respuesta<DepartamentosDTO> respuesta = new Respuesta<DepartamentosDTO>();

            try
            {
                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(sp_spCrearDepartamento, connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pNombreDepartamento", SqlDbType.NVarChar, 100) { Value = ObjDepartamento.NombreDepartamento });
                        command.Parameters.Add(new SqlParameter("@pDescripcionDepartamento", SqlDbType.NVarChar, 250) { Value = ObjDepartamento.DescripcionDepartamento });

                        using (SqlDataReader dr = command.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                respuesta.Ok = Convert.ToInt32(dr["Resultado"]) == 1;
                                respuesta.Mensaje = dr["Mensaje"].ToString();
                                respuesta.ValorRetorno = null;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función CrearDepartamento de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        public Respuesta<DepartamentosDTO> ObtenerDepartamentoPorId(DepartamentosDTO ObjDepartamento)
        {
            Respuesta<DepartamentosDTO> respuesta = new Respuesta<DepartamentosDTO>();

            try
            {
                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(sp_spObtenerDepartamentoPorId, connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pIdDepartamento", SqlDbType.Int) { Value = ObjDepartamento.IdDepartamento });

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                DepartamentosDTO Departamento = new DepartamentosDTO
                                {
                                    IdDepartamento = (int)reader["IdDepartamento"],
                                    NombreDepartamento = (string)reader["NombreDepartamento"],
                                    DescripcionDepartamento = (string)reader["DescripcionDepartamento"],
                                    EstadoDepartamento = (bool)reader["EstadoDepartamento"],
                                    FechaCreacionDepartamento = (DateTime)reader["FechaCreacion"]
                                };

                                respuesta.Ok = true;
                                respuesta.Mensaje = "Se ha obtenido el departamento de manera exitosa";
                                respuesta.ValorRetorno = Departamento;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ObtenerDepartamentoPorId de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        public Respuesta<DepartamentosDTO> EditarDepartamentoPorId(DepartamentosDTO ObjDepartamento)
        {
            Respuesta<DepartamentosDTO> respuesta = new Respuesta<DepartamentosDTO>();

            try
            {
                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(sp_spEditarDepartamentoPorId, connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pIdDepartamento", SqlDbType.Int) { Value = ObjDepartamento.IdDepartamento });
                        command.Parameters.Add(new SqlParameter("@pNombreDepartamento", SqlDbType.NVarChar, 100) { Value = ObjDepartamento.NombreDepartamento });
                        command.Parameters.Add(new SqlParameter("@pDescripcionDepartamento", SqlDbType.NVarChar, 250) { Value = ObjDepartamento.DescripcionDepartamento });
                        command.Parameters.Add(new SqlParameter("@pEstadoDepartamento", SqlDbType.Bit) { Value = ObjDepartamento.EstadoDepartamento });

                        int FilasAfectadas = command.ExecuteNonQuery();

                        if (FilasAfectadas > 0)
                        {
                            respuesta.Ok = true;
                            respuesta.Mensaje = "La información del departamento ha sido actualizada de manera exitosa!";
                            respuesta.ValorRetorno = null;
                        }
                        else
                        {
                            respuesta.Ok = false;
                            respuesta.Mensaje = "Ha ocurrido un error al intentar actualizar la información del departamento.";
                            respuesta.ValorRetorno = null;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función EditarDepartamentoPorId de la capa DAPPER {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        public Respuesta<DepartamentosDTO> EliminarDepartamentoPorId(DepartamentosDTO ObjDepartamento)
        {
            Respuesta<DepartamentosDTO> respuesta = new Respuesta<DepartamentosDTO>();

            try
            {
                var ConexionBD = _Config.GetConnectionString("Conexion");

                using (SqlConnection connection = new SqlConnection(ConexionBD))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(sp_spEliminarDepartamentoPorId, connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        command.Parameters.Add(new SqlParameter("@pIdDepartamento", SqlDbType.Int)
                        {
                            Value = ObjDepartamento.IdDepartamento
                        });

                        using (SqlDataReader dr = command.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                respuesta.Ok = Convert.ToInt32(dr["Resultado"]) == 1;
                                respuesta.Mensaje = dr["Mensaje"].ToString();
                                respuesta.ValorRetorno = null;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función EliminarDepartamentoPorId de la capa DAPPER. {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        #endregion
    }

}
