using CRUD.BLL;
using CRUD.DATA.DAPPER;
using CRUD.DTO;
using CRUD.ENTIDADES;

namespace CRUD.LOGICA.NEGOCIO
{
    public class IniciarSesionBLL
    {

        //Instancias

        private readonly InicioSesionDAPPER _AccesoInicioSesionDAPPER;
        private readonly BitacoraBLL _bitacoraBLL;

        //Constructor
        public IniciarSesionBLL(InicioSesionDAPPER inicioSesionDAPPER, BitacoraBLL bitacoraBLL)
        {
            _AccesoInicioSesionDAPPER = inicioSesionDAPPER;
            _bitacoraBLL = bitacoraBLL;
        }

        public Respuesta<UsuarioDTO> IniciarSesion(UsuarioDTO ObjUsuario)
        {
            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();

            try
            {
                var resDAL = _AccesoInicioSesionDAPPER.IniciarSesion(ObjUsuario);

                if (resDAL != null)
                {
                    respuesta = resDAL;

                    if (respuesta.Ok && respuesta.ValorRetorno != null)
                    {
                        _bitacoraBLL.Registrar(
                            respuesta.ValorRetorno.IdUsuario,
                            respuesta.ValorRetorno.Correo,
                            respuesta.ValorRetorno.NombreCompleto,
                            "Inicio de Sesión",
                            "Login",
                            "Inicio de sesión exitoso.",
                            true
                        );
                    }
                    else
                    {
                        _bitacoraBLL.Registrar(
                            null,
                            ObjUsuario.Correo,
                            "",
                            "Inicio de Sesión",
                            "Login",
                            "Intento de inicio de sesión fallido.",
                            false
                        );
                    }
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función IniciarSesion de la capa IniciarSesionBLL {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }


    }
}
