namespace CRUD.ENTIDADES
{
    public class UsuarioDTO
    {
        
        public int IdUsuario { get; set;}
        public string? Correo { get; set;}
        public string? Contrasena { get; set;}
        public DateTime? FechaCreacion { get; set;}
        public int IdRol { get; set;}
        public string? NombreRol { get; set; }
        public string? NombreCompleto { get; set;}
        public string? Nombre    {get; set;}
        public string? Apellido1 {get; set;}
        public string? Apellido2 { get; set;}
        public DateTime? FechaNac { get; set;}
        public string? Genero { get; set;}
        public string? Telefono { get; set;}
        public string? Direccion { get; set; }
        public int IdDepartamento { get; set; }
        public string? NombreDepartamento { get; set; }
    }
}
        
