using CRUD.DTO;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;

namespace CRUD.DAPPER
{
    public class BitacoraDAPPER
    {
        private readonly IConfiguration _configuration;

        public BitacoraDAPPER(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void RegistrarBitacora(BitacoraDTO ObjBitacora)
        {
            try
            {
                using (SqlConnection conexion = new SqlConnection(_configuration.GetConnectionString("Conexion")))
                {
                    conexion.Execute(
                        "spRegistrarBitacora",
                        new
                        {
                            pIdUsuario = ObjBitacora.IdUsuario,
                            pCorreoUsuario = ObjBitacora.CorreoUsuario,
                            pNombreUsuario = ObjBitacora.NombreUsuario,
                            pModulo = ObjBitacora.Modulo,
                            pAccion = ObjBitacora.Accion,
                            pDescripcion = ObjBitacora.Descripcion,
                            pDireccionIP = ObjBitacora.DireccionIP,
                            pExitoso = ObjBitacora.Exitoso
                        },
                        commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}