using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CRUD.UI.Filters
{
    public class ValidarSesionAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {

            var PermiteSinSesion = context.ActionDescriptor.EndpointMetadata
                .OfType<IAllowAnonymous>()
                .Any()
                || context.Filters.OfType<IAllowAnonymous>().Any();

            if (PermiteSinSesion)
            {
                base.OnActionExecuting(context);
                return;

            }

            var idUsuario = context.HttpContext.Session.GetInt32("IdUsuario");

            if (idUsuario == null)
            {
                context.Result = new RedirectToActionResult("Index", "Home", null);
                return;
            }
            base.OnActionExecuting(context);

        }
    }
}
