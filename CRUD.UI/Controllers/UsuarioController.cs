using CRUD.ENTIDADES;
using CRUD.LOGICA.NEGOCIO;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.UI.Controllers
{
    public class UsuarioController : Controller
    {
        #region "Constructor"
        //Instancias

        private readonly MantUsuariosBLL _MantUsuarioBLL;

        //Constructor

        public UsuarioController(MantUsuariosBLL mantUsuariosBLL)
        {
            _MantUsuarioBLL = mantUsuariosBLL;

        }
        #endregion

        #region "Funciones"
        //Funciones

        public IActionResult MantUsuarios()
        {
            var puesto = HttpContext.Session.GetString("Puesto");

            if (puesto != "Administrador")
            {
                return RedirectToAction("Dashboard", "Home");
            }

            ObtenerRoles();
            ObtenerUsuarios();
            ObtenerDepartamentos();

            return View();
        }

        // Mantenimiento de Roles
        public IActionResult MantRoles()
        {
            ObtenerRoles();
            return View();
        }

        public IActionResult MantDepartamentos()
        {
            ObtenerDepartamentos();
            return View();
        }

        public Respuesta<List<RolesDto>> ObtenerRoles()
        {
            Respuesta<List<RolesDto>> respuesta = new Respuesta<List<RolesDto>>();

            try
            {
                var ResBLL = _MantUsuarioBLL.ObtenerRoles();

                if (ResBLL != null)
                {
                    respuesta = ResBLL;

                    ViewBag.ListaRoles = respuesta.ValorRetorno;
                }
            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la capa UsuarioController en el método ObtenerRoles {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        [HttpPost]
        public Respuesta<UsuarioDTO> RegistrarUsuarios([FromBody]UsuarioDTO ObjUsuario)
        {
            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();

            try
            {
                var resBLL = _MantUsuarioBLL.RegistrarUsuarios(ObjUsuario);

                if (resBLL != null)
                {
                    respuesta = resBLL;

                }




            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en el método RegistrarUsuarios en el controlador de Usuario {ex.Message}";
                respuesta.ValorRetorno= null;
            }

            return respuesta;




        }

        public Respuesta<List<UsuarioDTO>> ObtenerUsuarios()
        {
            Respuesta<List<UsuarioDTO>> respuesta = new Respuesta<List<UsuarioDTO>>();

            try
            {
                var ResBLL = _MantUsuarioBLL.ObtenerUsuarios();

                if (ResBLL != null)
                {
                    respuesta = ResBLL;

                    ViewBag.ListaUsuarios = respuesta.ValorRetorno;
                }
            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la capa UsuarioController en el método ObtenerUsuarios {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        public Respuesta<UsuarioDTO> ObtenerUsuarioPorId([FromBody] UsuarioDTO ObjUsuario)
        {
            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();
            
            try
            {
                var ResBLL = _MantUsuarioBLL.ObtenerUsuarioPorId(ObjUsuario);

                if (ResBLL != null)
                {
                    respuesta = ResBLL;

                }
            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la capa UsuarioController en el método ObtenerUsuarioPorId {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        public Respuesta<UsuarioDTO> ActualizarUsuarioPorId([FromBody] UsuarioDTO ObjUsuario)
        {
            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();

            try
            {
                var resBLL = _MantUsuarioBLL.ActualizarUsuarioPorId(ObjUsuario);

                if (resBLL != null)
                {
                    respuesta = resBLL;

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en el método ActualizarUsuarioPorId en el controlador de Usuario {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;

        }

        [HttpPost]
        public Respuesta<UsuarioDTO> EliminarUsuarioPorId([FromBody] UsuarioDTO  ObjUsuario)
        {
            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();

            try
            {
                var resBLL = _MantUsuarioBLL.EliminarUsuarioPorId(ObjUsuario);

                if (resBLL != null)
                {
                    respuesta = resBLL;

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en el método EliminarUsuarioPorId en el controlador de Usuario {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;

        }

        [HttpPost]
        public IActionResult RestablecerContrasenaPorId([FromBody] UsuarioDTO ObjUsuario)
        {
            try
            {
                var respuesta = _MantUsuarioBLL.RestablecerContrasenaPorId(ObjUsuario);

                return Json(new
                {
                    ok = respuesta.Ok,
                    mensaje = respuesta.Mensaje
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    ok = false,
                    mensaje = $"Ha ocurrido un error en el método RestablecerContrasenaPorId del controlador. {ex.Message}"
                });
            }
        }

        [HttpPost]
        public Respuesta<UsuarioDTO> CambiarContrasena([FromBody] UsuarioDTO ObjUsuario)
        {
            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();

            try
            {
                var resBLL = _MantUsuarioBLL.CambiarContrasena(ObjUsuario);

                if (resBLL != null)
                {
                    respuesta = resBLL;
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en el método CambiarContrasena en el controlador de Usuario. {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        [HttpPost]
        public Respuesta<RolesDto> CrearRol([FromBody] RolesDto ObjRol)
        {
            Respuesta<RolesDto> respuesta = new Respuesta<RolesDto>();

            try
            {
                var resBLL = _MantUsuarioBLL.CrearRol(ObjRol);

                if (resBLL != null)
                {
                    respuesta = resBLL;

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en el método CrearRol en el controlador de Usuario {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;

        }

        [HttpPost]
        public Respuesta<RolesDto> EliminarRolPorId([FromBody] RolesDto ObjRol)
        {
            Respuesta<RolesDto> respuesta = new Respuesta<RolesDto>();

            try
            {
                var resBLL = _MantUsuarioBLL.EliminarRolPorId(ObjRol);

                if (resBLL != null)
                {
                    respuesta = resBLL;

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en el método EliminarRolPorId en el controlador de Usuario {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;

        }

 
        public Respuesta<RolesDto> EditarRolPorId([FromBody] RolesDto ObjRol)
        {
            Respuesta<RolesDto> respuesta = new Respuesta<RolesDto>();

            try
            {
                var resBLL = _MantUsuarioBLL.EditarRolPorId(ObjRol);

                if (resBLL != null)
                {
                    respuesta = resBLL;

                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en el método EditarRolPorId en el controlador de Usuario {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;

        }

        public Respuesta<RolesDto> ObtenerRolPorId([FromBody] RolesDto ObjRol)
        {
            Respuesta<RolesDto> respuesta = new Respuesta<RolesDto>();

            try
            {
                var ResBLL = _MantUsuarioBLL.ObtenerRolPorId(ObjRol);

                if (ResBLL != null)
                {
                    respuesta = ResBLL;

                }
            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la capa UsuarioController en el método ObtenerRolPorId {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        public Respuesta<List<DepartamentosDTO>> ObtenerDepartamentos()
        {
            Respuesta<List<DepartamentosDTO>> respuesta = new Respuesta<List<DepartamentosDTO>>();

            try
            {
                var ResBLL = _MantUsuarioBLL.ObtenerDepartamentos();

                if (ResBLL != null)
                {
                    respuesta = ResBLL;
                    ViewBag.ListaDepartamentos = respuesta.ValorRetorno;
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la capa UsuarioController en el método ObtenerDepartamentos {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        [HttpPost]
        public Respuesta<DepartamentosDTO> CrearDepartamento([FromBody] DepartamentosDTO ObjDepartamento)
        {
            Respuesta<DepartamentosDTO> respuesta = new Respuesta<DepartamentosDTO>();

            try
            {
                var resBLL = _MantUsuarioBLL.CrearDepartamento(ObjDepartamento);

                if (resBLL != null)
                {
                    respuesta = resBLL;
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en el método CrearDepartamento en el controlador de Usuario {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }
        [HttpPost]
        public Respuesta<DepartamentosDTO> ObtenerDepartamentoPorId([FromBody] DepartamentosDTO ObjDepartamento)
        {
            Respuesta<DepartamentosDTO> respuesta = new Respuesta<DepartamentosDTO>();

            try
            {
                var ResBLL = _MantUsuarioBLL.ObtenerDepartamentoPorId(ObjDepartamento);

                if (ResBLL != null)
                {
                    respuesta = ResBLL;
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la capa UsuarioController en el método ObtenerDepartamentoPorId {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        [HttpPost]
        public Respuesta<DepartamentosDTO> EditarDepartamentoPorId([FromBody] DepartamentosDTO ObjDepartamento)
        {
            Respuesta<DepartamentosDTO> respuesta = new Respuesta<DepartamentosDTO>();

            try
            {
                var resBLL = _MantUsuarioBLL.EditarDepartamentoPorId(ObjDepartamento);

                if (resBLL != null)
                {
                    respuesta = resBLL;
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en el método EditarDepartamentoPorId en el controlador de Usuario {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        [HttpPost]
        public Respuesta<DepartamentosDTO> EliminarDepartamentoPorId([FromBody] DepartamentosDTO ObjDepartamento)
        {
            Respuesta<DepartamentosDTO> respuesta = new Respuesta<DepartamentosDTO>();

            try
            {
                var resBLL = _MantUsuarioBLL.EliminarDepartamentoPorId(ObjDepartamento);

                if (resBLL != null)
                {
                    respuesta = resBLL;
                }
            }
            catch (Exception ex)
            {
                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en el método EliminarDepartamentoPorId en el controlador de Usuario {ex.Message}";
                respuesta.ValorRetorno = null;
            }

            return respuesta;
        }

        #endregion

    }
}
