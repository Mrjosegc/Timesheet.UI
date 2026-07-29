// Write your JavaScript code.
/// <summary>
/// JavaScript para la pantalla de Mantenimiento de usuarios
/// </summary>
/// <createdate>23/06/2026</createdate>
/// <author>Jose Garro Campos</author>
/// <lastmodificationdate></lastmodificationdate>
/// <lastmodificationdescription></lastmodificationdescription>
/// <lastmodifierauthor></lastmodifierauthor>



jsMantUsuario = {

    objetos: {

    },
    controles: {
        InputCorreo: '#InputCorreo',
        InputContrasena: '#InputContrasena',
        InputRol: '#InputRol',
        InputNombre: '#InputNombre',
        InputApellido1: '#InputApellido1',
        InputApellido2: '#InputApellido2',
        InputFechaNac: '#InputFechaNac',
        InputGenero: '#InputGenero',
        InputTelefono: '#InputTelefono',
        InputDireccion: '#InputDireccion',
        InputIdDepartamento: '#InputIdDepartamento',

        //Modal Editar Usuarios

        btnObtenerRoles: '.btnObtenerRoles',
        btnObtenerUsuarioPorId: '.btnObtenerUsuarioPorId',

        ModalInputIdUsuario: '#ModalInputIdUsuario',
        ModalInputCorreo: '#ModalInputCorreo',
        ModalInputContrasena: '#ModalInputContrasena',
        ModalInputRol: '#ModalInputRol',
        ModalInputNombre: '#ModalInputNombre',
        ModalInputApellido1: '#ModalInputApellido1',
        ModalInputApellido2: '#ModalInputApellido2',
        ModalInputFechaNac: '#ModalInputFechaNac',
        ModalInputGenero: '#ModalInputGenero',
        ModalInputTelefono: '#ModalInputTelefono',
        ModalInputDireccion: '#ModalInputDireccion',
        ModalInputDepartamento: '#ModalInputDepartamento',
        ModalInputIdDepartamento: '#ModalInputIdDepartamento',
        ModalbtnRestablecerContrasena: '#ModalbtnRestablecerContrasena',

    },

    Modals: {

    },

    Tablas: {

    },

    botones: {
        btnCrearUsuario: '#btnCrearUsuario',
        btnCancelar: '#btnCancelar',
        ModalbtnGuardarUsuario: '#ModalbtnGuardarUsuario',
        ModalbtnEliminarUsuario: '#ModalbtnEliminarUsuario',
        btnEliminarUsuario: '.btnEliminarUsuario',

    },

    variables: {

    },
    metodos: {
        RegistrarUsuario: function () {
            event.preventDefault();
            try {
                let ObjUsr = {
                    Correo: $(jsMantUsuario.controles.InputCorreo).val(),
                    Contrasena: "Abc123.",
                    IdRol: $(jsMantUsuario.controles.InputRol).val(),
                    Nombre: $(jsMantUsuario.controles.InputNombre).val(),
                    Apellido1: $(jsMantUsuario.controles.InputApellido1).val(),
                    Apellido2: $(jsMantUsuario.controles.InputApellido2).val(),
                    FechaNac: $(jsMantUsuario.controles.InputFechaNac).val(),
                    Genero: $(jsMantUsuario.controles.InputGenero).val(),
                    Telefono: $(jsMantUsuario.controles.InputTelefono).val(),
                    Direccion: $(jsMantUsuario.controles.InputDireccion).val(),
                    IdDepartamento: $(jsMantUsuario.controles.InputIdDepartamento).val()
                }
                if (ObjUsr.Correo != "" && ObjUsr.Contrasena !== "" && ObjUsr.IdRol != "0" && ObjUsr.Nombre !== "" && ObjUsr.Apellido1 !== "" && ObjUsr.Apellido2 !== "" && ObjUsr.FechaNac !== "" && ObjUsr.Genero !== "0" && ObjUsr.Telefono !== "" && ObjUsr.Direccion !== "" && ObjUsr.IdDepartamento !== "") {
                    fetch('../Usuario/RegistrarUsuarios', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(ObjUsr)
                    })
                        .then(respuesta => respuesta.json())
                        .then(resultado => {
                            if (resultado.ok) {
                                Swal.fire({
                                    title: "Exito",
                                    text: `${resultado.mensaje}`,
                                    icon: "success",
                                    confirmButtonText: "Entendido",
                                    confirmButtonColor: "#297ea6"
                                });
                                setTimeout(() => {
                                    window.location.reload();
                                }, 10000)
                            } else {
                                Swal.fire({
                                    title: "Error",
                                    text: resultado.mensaje,
                                    icon: "error",
                                    confirmButtonText: "Entendido",
                                    confirmButtonColor: "#297ea6"
                                });
                            }
                        })
                } else {
                    Swal.fire({
                        title: "Advertencia",
                        text: `Debe rellenar todos los campos`,
                        icon: "warning",
                        confirmButtonText: "Entendido",
                        confirmButtonColor: "#297ea6"
                    });
                }
            } catch (e) {
                console.log("Ha ocurrido un error en el método RegistrarUsuario en el JS: ", e)
            }
        },

        ObtenerUsuarioPorId: function (event) {
            try {
                let button = $(event.currentTarget);

                let IdUsuarioBoton = button.data("idusuario")

                let ObjUsuario = {

                    IdUsuario: IdUsuarioBoton
                };
                fetch('../Usuario/ObtenerUsuarioPorId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ObjUsuario)
                })
                    .then(respuesta => respuesta.json())
                    .then(resultado => {
                        if (resultado.ok) {
                            $(jsMantUsuario.controles.ModalInputIdUsuario).val(resultado.valorRetorno.idUsuario)
                            $(jsMantUsuario.controles.ModalInputCorreo).val(resultado.valorRetorno.correo)
                            $(jsMantUsuario.controles.ModalInputContrasena).val(resultado.valorRetorno.contrasena)
                            $(jsMantUsuario.controles.ModalInputRol).val(resultado.valorRetorno.idRol)
                            $(jsMantUsuario.controles.ModalInputNombre).val(resultado.valorRetorno.nombre)
                            $(jsMantUsuario.controles.ModalInputApellido1).val(resultado.valorRetorno.apellido1)
                            $(jsMantUsuario.controles.ModalInputApellido2).val(resultado.valorRetorno.apellido2)
                            $(jsMantUsuario.controles.ModalInputFechaNac).val(resultado.valorRetorno.fechaNac.split('T')[0])
                            //$(jsMantUsuario.controles.ModalInputGenero).val(resultado.valorRetorno.genero)
                            $(jsMantUsuario.controles.ModalInputTelefono).val(resultado.valorRetorno.telefono)
                            $(jsMantUsuario.controles.ModalInputDireccion).val(resultado.valorRetorno.direccion)
                            $(jsMantUsuario.controles.ModalInputDepartamento).val(resultado.valorRetorno.idDepartamento)


                            if (resultado.valorRetorno.genero === "Masculino") {

                                $(jsMantUsuario.controles.ModalInputGenero).val("1")
                            } else if (resultado.valorRetorno.genero === "Femenino") {
                                $(jsMantUsuario.controles.ModalInputGenero).val("2")
                            } else if (resultado.valorRetorno.genero === "Prefiero no decirlo") {
                                $(jsMantUsuario.controles.ModalInputGenero).val("3")
                            } else {
                                $(jsMantUsuario.controles.ModalInputGenero).val("Error!")
                            }
                        } else {
                            Swal.fire({
                                title: "Advertencia",
                                text: `${resultado.mensaje}`,
                                icon: "warning",
                                confirmButtonText: "Entendido",
                                confirmButtonColor: "#297ea6"
                            });
                        }
                    })
            } catch (e) {
                console.log("Ha ocurrido un error al obtener el usuario en el metodo ObtenerUsuarioPorId en el JS")
            }

        },

        ActualizarUsuarioPorId: function () {

            event.preventDefault();

            try {
                let ObjUsuario = {

                    IdUsuario: $(jsMantUsuario.controles.ModalInputIdUsuario).val(),
                    Correo: $(jsMantUsuario.controles.ModalInputCorreo).val(),
                    Contrasena: $(jsMantUsuario.controles.ModalInputContrasena).val(),
                    IdRol: $(jsMantUsuario.controles.ModalInputRol).val(),
                    Nombre: $(jsMantUsuario.controles.ModalInputNombre).val(),
                    Apellido1: $(jsMantUsuario.controles.ModalInputApellido1).val(),
                    Apellido2: $(jsMantUsuario.controles.ModalInputApellido2).val(),
                    FechaNac: $(jsMantUsuario.controles.ModalInputFechaNac).val(),
                    Genero: $(jsMantUsuario.controles.ModalInputGenero).val(),
                    Telefono: $(jsMantUsuario.controles.ModalInputTelefono).val(),
                    Direccion: $(jsMantUsuario.controles.ModalInputDireccion).val(),
                    IdDepartamento: $(jsMantUsuario.controles.ModalInputDepartamento).val(),
                };

                if (ObjUsuario.Correo !== "" && ObjUsuario.Contrasena !== "" && ObjUsuario.IdRol !== "0" && ObjUsuario.Nombre !== "" && ObjUsuario.Apellido1 !== "" &&
                    ObjUsuario.Apellido2 !== "" && ObjUsuario.FechaNac !== "" && ObjUsuario.Genero !== "0" && ObjUsuario.Telefono !== "" && ObjUsuario.Direccion !== "" && ObjUsuario.Departamento !== "") {

                    Swal.fire({
                        title: "Estás seguro que quieres editar este usuario?",
                        text: "Esta acción es irreversible!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#297ea6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Sí, Editar!",
                        cancelButtonText: 'No'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            fetch('../Usuario/ActualizarUsuarioPorId', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(ObjUsuario)
                            })
                                .then(respuesta => respuesta.json())
                                .then(resultado => {

                                    Swal.fire({
                                        title: "Exito",
                                        text: `${resultado.mensaje}`,
                                        icon: "success",
                                        confirmButtonText: "Entendido",
                                        confirmButtonColor: "#297ea6"
                                    });

                                    setTimeout(() => {

                                        window.location.reload();

                                    }, 2100)

                                })
                        } 
                    });

                } else {
                    Swal.fire({
                        title: "Advertencia",
                        text: `Debe rellenar todos los campos`,
                        icon: "warning",
                        confirmButtonText: "Entendido",
                        confirmButtonColor: "#297ea6"
                    });
                }

            } catch (e) {
                console.warn("Ha ocurrido un error en la función ActualizarUsuarioPorId en el JS: ", e)

            }
        },

        EliminarUsuarioPorId: function () {

            event.preventDefault();

            try {
                let ObjUsuario = {

                    IdUsuario: $(jsMantUsuario.controles.ModalInputIdUsuario).val(),
                };
                Swal.fire({
                    title: "Estás seguro que quieres Eliminar este usuario?",
                    text: "Esta acción es irreversible!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#297ea6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, Eliminar!",
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log("JSON:", JSON.stringify(ObjUsuario));
                        fetch('../Usuario/EliminarUsuarioPorId', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(ObjUsuario)
                        })
                            .then(respuesta => respuesta.json())
                            .then(resultado => {
                                Swal.fire({
                                    title: "Exito",
                                    text: `${resultado.mensaje}`,
                                    icon: "success",
                                    confirmButtonText: "Entendido",
                                    confirmButtonColor: "#297ea6"
                                });
                                setTimeout(() => {
                                    window.location.reload();
                                }, 5000);
                            });
                    }
                });

            } catch (e) {
                console.warn("Ha ocurrido un errro en la función EliminarUsuarioPorId en el JS: ", e);
            }    
        },

        RestablecerContrasenaPorId: function () {

            Swal.fire({
                title: "¿Restablecer contraseña?",
                html: "La contraseña del usuario será restablecida a la contraseña temporal <b>Abc123.</b><br><br>El usuario deberá cambiarla la próxima vez que inicie sesión.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, restablecer",
                cancelButtonText: "Cancelar",
                reverseButtons: true
            }).then((result) => {

                if (!result.isConfirmed)
                    return;

                let ObjUsuario = {

                    IdUsuario: $(jsMantUsuario.controles.ModalInputIdUsuario).val(),
                    Contrasena: "Abc123."

                };

                fetch('../Usuario/RestablecerContrasenaPorId', {
                    
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(ObjUsuario)

                })
                    .then(response => response.json())

                    .then(data => {

                        if (data.ok) {

                            Swal.fire({
                                icon: "success",
                                title: "Proceso completado",
                                text: data.mensaje
                            });

                        }
                        else {

                            Swal.fire({
                                icon: "error",
                                title: "Atención",
                                text: data.mensaje
                            });

                        }

                    })

                    .catch(error => {

                        console.error(error);

                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Ha ocurrido un error al restablecer la contraseña."
                        });

                    });

            });

        },


    },

    eventos: function () {

        $(jsMantUsuario.botones.btnCrearUsuario).on('click', function () {

            jsMantUsuario.metodos.RegistrarUsuario();

        });

        $(jsMantUsuario.controles.btnObtenerUsuarioPorId).on('click', function (event) {

            jsMantUsuario.metodos.ObtenerUsuarioPorId(event);

        });

        $(jsMantUsuario.botones.ModalbtnGuardarUsuario).on('click', function (event) {

            jsMantUsuario.metodos.ActualizarUsuarioPorId(event);

        });

        $(jsMantUsuario.botones.ModalbtnEliminarUsuario).on('click', function (event) {

            jsMantUsuario.metodos.EliminarUsuarioPorId(event);

        });

        $(jsMantUsuario.botones.btnEliminarUsuario).on('click', function (event) {
            $(jsMantUsuario.controles.ModalInputIdUsuario).val($(this).data('idusuario'));
            jsMantUsuario.metodos.EliminarUsuarioPorId(event);

        });

        $(jsMantUsuario.controles.ModalbtnRestablecerContrasena).on("click", function () {

            jsMantUsuario.metodos.RestablecerContrasenaPorId();
        });

    }
}

$(function () {
    jsMantUsuario.eventos();
});






