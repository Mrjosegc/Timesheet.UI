using CRUD.LOGICA.NEGOCIO;
using CRUD.UI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace CRUD.UI.Controllers
{
    public class HomeController : Controller
    {
        private readonly MantDashboardBLL _mantDashboardBLL;

        public HomeController(MantDashboardBLL mantDashboardBLL)
        {
            _mantDashboardBLL = mantDashboardBLL;
        }

        [AllowAnonymous]
        public IActionResult EnConstruccion()
        {
            return View();
        }

        [AllowAnonymous]
        public IActionResult Index()
        {
            // Redirige al Login
            return RedirectToAction("IniciarSesion", "Inicio");
        }

        public IActionResult Dashboard()
        {
            var puesto = HttpContext.Session.GetString("Puesto");

            if (puesto != "Administrador")
            {
                return RedirectToAction("TimeSheet", "Home");
            }

            ObtenerResumenDashboard();
            return View();
        }

        public void ObtenerResumenDashboard()
        {
            var respuesta = _mantDashboardBLL.ObtenerResumenDashboard();

            if (respuesta != null && respuesta.Ok)
            {
                ViewBag.ResumenDashboard = respuesta.ValorRetorno;
            }
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult TimeSheet()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel
            {
                RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier
            });
        }
    }
}