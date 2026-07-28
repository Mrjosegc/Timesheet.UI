using CRUD.DAPPER;
using CRUD.DTO;
using Microsoft.Extensions.Configuration;

namespace CRUD.BLL
{
    public class BitacoraBLL
    {
        private readonly BitacoraDAPPER _bitacoraDAPPER;

        public BitacoraBLL(IConfiguration configuration)
        {
            _bitacoraDAPPER = new BitacoraDAPPER(configuration);
        }

        public void RegistrarBitacora(BitacoraDTO ObjBitacora)
        {
            _bitacoraDAPPER.RegistrarBitacora(ObjBitacora);
        }

        public void Registrar(
            int? idUsuario,
            string? correo,
            string? nombre,
            string modulo,
            string accion,
            string descripcion,
            bool exitoso,
            string direccionIP = "")
        {
            BitacoraDTO bitacora = new BitacoraDTO
            {
                IdUsuario = idUsuario,
                CorreoUsuario = correo,
                NombreUsuario = nombre,
                Modulo = modulo,
                Accion = accion,
                Descripcion = descripcion,
                DireccionIP = direccionIP,
                Exitoso = exitoso
            };

            _bitacoraDAPPER.RegistrarBitacora(bitacora);
        }
    }
}