using CRUD.ENTIDADES;
using CRUD.LOGICA.NEGOCIO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.UI.Controllers
{
    [AllowAnonymous]
    public class InicioController : Controller
    {
        //Intancias

        private readonly IniciarSesionBLL _AccesoInicioSesionBLL;

        //Constructor

        public InicioController(IniciarSesionBLL iniciarSesionBLL)
        {
            _AccesoInicioSesionBLL = iniciarSesionBLL;

        }
   
        public IActionResult IniciarSesion()
        {
            return View();
        }

        [HttpPost]
        public Respuesta<UsuarioDTO> IniciarSesion([FromBody] UsuarioDTO ObjUsuario)
        {
            Respuesta<UsuarioDTO> respuesta = new Respuesta<UsuarioDTO>();

            try
            {
                var resBLL = _AccesoInicioSesionBLL.IniciarSesion(ObjUsuario);

                if (resBLL != null)
                {
                    respuesta = resBLL;

                    if (respuesta.Ok && respuesta.ValorRetorno != null)
                    {
                        HttpContext.Session.SetInt32("IdUsuario", respuesta.ValorRetorno.IdUsuario);
                        HttpContext.Session.SetString("NombreUsuario", respuesta.ValorRetorno.NombreCompleto ?? string.Empty);
                        HttpContext.Session.SetString("Correo", respuesta.ValorRetorno.Correo ?? string.Empty);
                        HttpContext.Session.SetString("Puesto", respuesta.ValorRetorno.NombreRol ?? string.Empty);
                        HttpContext.Session.SetString("Puesto", respuesta.ValorRetorno.NombreRol ?? string.Empty);
                    }
                }

            }
            catch (Exception ex)
            {

                respuesta.Ok = false;
                respuesta.Mensaje = $"Ha ocurrido un error en la función IniciarSesion en la clase InicioController {ex.Message}";
            }
            return respuesta;


        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult CerrarSesion()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("IniciarSesion", "Inicio");
        }
    }
}