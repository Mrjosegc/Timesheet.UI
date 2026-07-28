using CRUD.DATA.DAPPER;
using CRUD.ENTIDADES;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRUD.LOGICA.NEGOCIO
{
    public class MantUsuariosBLL
    {

        #region "Constructor"
        //Instancias

        private readonly MantUsuariosDAPPER _MantUsuarioDapper;

        //Constructor

        public MantUsuariosBLL(MantUsuariosDAPPER mantUsuariosDAPPER) 
        {
            
            _MantUsuarioDapper = mantUsuariosDAPPER;

        }


        #endregion

        #region "Funciones"

        //Funciones o métodos

        public Respuesta<List<RolesDto>> ObtenerRoles()
        {
            Respuesta<List<RolesDto>> respuesta = new Respuesta<List<RolesDto>>();

            try
            {
                var resDal = _MantUsuarioDapper.ObtenerRoles();

                if (resDal != null)
                {
                    respuesta = resDal;
                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la capa MantUuarioBLL en el método ObtenerRoles {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;

        }

        public Respuesta<UsuarioDTO> RegistrarUsuarios(UsuarioDTO ObjUsuario)
        {

            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();

            try
            {
                var resDAL = _MantUsuarioDapper.RegistrarUsuarios(ObjUsuario);

                if (resDAL != null)
                {
                    respuesta = resDAL;
                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función RegistrarUsuario {ex.Message}";
            }

            return respuesta;
        }

        public Respuesta<List<UsuarioDTO>> ObtenerUsuarios()
        {
            Respuesta<List<UsuarioDTO>> respuesta = new Respuesta<List<UsuarioDTO>>();

            try
            {
                var resDal = _MantUsuarioDapper.ObtenerUsuarios();

                if (resDal != null)
                {
                    respuesta = resDal;
                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la capa MantUuarioBLL en el método ObtenerUsuarios {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;

        }

        public Respuesta<UsuarioDTO> ObtenerUsuarioPorId(UsuarioDTO ObjUsuario)
        {
            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();

            try
            {
                var resDal = _MantUsuarioDapper.ObtenerUsuarioPorId(ObjUsuario);

                if (resDal != null)
                {
                    respuesta = resDal;
                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la capa MantUuarioBLL en el método ObtenerUsuariosPorId {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;

        }

        public Respuesta<UsuarioDTO> ActualizarUsuarioPorId(UsuarioDTO ObjUsuario)
        {

            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();

            try
            {
                var resDAL = _MantUsuarioDapper.ActualizarUsuarioPorId(ObjUsuario);

                if (resDAL != null)
                {
                    respuesta = resDAL;
                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función ActualizarUsuarioPorId {ex.Message}";
            }

            return respuesta;
        }

        public Respuesta<UsuarioDTO> EliminarUsuarioPorId(UsuarioDTO ObjUsuario)
        {

            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();

            try
            {
                var resDAL = _MantUsuarioDapper.EliminarUsuarioPorId(ObjUsuario);

                if (resDAL != null)
                {
                    respuesta = resDAL;
                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función EliminarUsuarioPorId {ex.Message}";
            }

            return respuesta;
        }

        public Respuesta<UsuarioDTO> RestablecerContrasenaPorId(UsuarioDTO ObjUsuario)
        {
            return _MantUsuarioDapper.RestablecerContrasenaPorId(ObjUsuario);
        }

        public Respuesta<RolesDto> CrearRol(RolesDto ObjRol)
        {

            Respuesta<RolesDto> respuesta = new Respuesta<RolesDto>();

            try
            {
                var resDAL = _MantUsuarioDapper.CrearRol(ObjRol);

                if (resDAL != null)
                {
                    respuesta = resDAL;
                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función CrearRol  {ex.Message}";
            }

            return respuesta;
        }

        public Respuesta<RolesDto> EliminarRolPorId(RolesDto ObjRol)
        {

            Respuesta<RolesDto> respuesta = new Respuesta<RolesDto>();

            try
            {
                var resDAL = _MantUsuarioDapper.EliminarRolPorId(ObjRol);

                if (resDAL != null)
                {
                    respuesta = resDAL;
                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función EliminarRolPorId {ex.Message}";
            }

            return respuesta;
        }

        public Respuesta<RolesDto> EditarRolPorId(RolesDto ObjRol)
        {

            Respuesta<RolesDto> respuesta = new Respuesta<RolesDto>();

            try
            {
                var resDAL = _MantUsuarioDapper.EditarRolPorId(ObjRol);

                if (resDAL != null)
                {
                    respuesta = resDAL;
                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función EditarRolPorId {ex.Message}";
            }

            return respuesta;
        }

        public Respuesta<RolesDto> ObtenerRolPorId(RolesDto ObjRol)
        {
            Respuesta<RolesDto> respuesta = new Respuesta<RolesDto>();

            try
            {
                var resDal = _MantUsuarioDapper.ObtenerRolPorId(ObjRol);

                if (resDal != null)
                {
                    respuesta = resDal;
                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la capa MantUuarioBLL en el método ObtenerRolPorId {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;

        }

        public Respuesta<List<DepartamentosDTO>> ObtenerDepartamentos()
        {
            Respuesta<List<DepartamentosDTO>> respuesta = new Respuesta<List<DepartamentosDTO>>();

            try
            {
                var resDal = _MantUsuarioDapper.ObtenerDepartamentos();

                if (resDal != null)
                {
                    respuesta = resDal;
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la capa MantUsuariosBLL en el método ObtenerDepartamentos {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        public Respuesta<DepartamentosDTO> CrearDepartamento(DepartamentosDTO ObjDepartamento)
        {
            Respuesta<DepartamentosDTO> respuesta = new Respuesta<DepartamentosDTO>();

            try
            {
                var resDAL = _MantUsuarioDapper.CrearDepartamento(ObjDepartamento);

                if (resDAL != null)
                {
                    respuesta = resDAL;
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función CrearDepartamento {ex.Message}";
            }

            return respuesta;
        }

        public Respuesta<DepartamentosDTO> ObtenerDepartamentoPorId(DepartamentosDTO ObjDepartamento)
        {
            Respuesta<DepartamentosDTO> respuesta = new Respuesta<DepartamentosDTO>();

            try
            {
                var resDal = _MantUsuarioDapper.ObtenerDepartamentoPorId(ObjDepartamento);

                if (resDal != null)
                {
                    respuesta = resDal;
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la capa MantUsuariosBLL en el método ObtenerDepartamentoPorId {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        public Respuesta<DepartamentosDTO> EditarDepartamentoPorId(DepartamentosDTO ObjDepartamento)
        {
            Respuesta<DepartamentosDTO> respuesta = new Respuesta<DepartamentosDTO>();

            try
            {
                var resDAL = _MantUsuarioDapper.EditarDepartamentoPorId(ObjDepartamento);

                if (resDAL != null)
                {
                    respuesta = resDAL;
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función EditarDepartamentoPorId {ex.Message}";
            }

            return respuesta;
        }

        public Respuesta<DepartamentosDTO> EliminarDepartamentoPorId(DepartamentosDTO ObjDepartamento)
        {
            Respuesta<DepartamentosDTO> respuesta = new Respuesta<DepartamentosDTO>();

            try
            {
                var resDAL = _MantUsuarioDapper.EliminarDepartamentoPorId(ObjDepartamento);

                if (resDAL != null)
                {
                    respuesta = resDAL;
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función EliminarDepartamentoPorId {ex.Message}";
            }

            return respuesta;
        }

        #endregion

    }
}
