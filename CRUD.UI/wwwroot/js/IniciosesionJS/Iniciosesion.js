// Write your JavaScript code.
/// <summary>
/// JavaScript para la pantalla de Inicio de sesión
/// </summary>
/// <createdate>27/02/2026</createdate>
/// <author>Jose Francisco Garro Campos</author>
/// <lastmodificationdate></lastmodificationdate>
/// <lastmodificationdescription></lastmodificationdescription>
/// <lastmodifierauthor></lastmodifierauthor>

jsIniciarSesion = {

    objetos: {

    },
    controles: {

        Correo: '#InputCorreo',
        Contrasena: '#InputContrasena'     

    },

    Tablas: {


    },

    botones: {

        btnIniciarSesion: '#btnIniciarSesion'

    },

    variables: {


    },
    metodos: {


        IniciarSesion: function () {
            console.log("Entró al método IniciarSesion");
            event.preventDefault();


            try {

                let ObjUsuario = {

                    Correo: $(jsIniciarSesion.controles.Correo).val(),
                    Contrasena: $(jsIniciarSesion.controles.Contrasena).val()

                }

                if (ObjUsuario.Correo !== "" && ObjUsuario.Contrasena !== "") {

                    fetch('../Inicio/IniciarSesion', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(ObjUsuario)
                    })
                        .then(respuesta => respuesta.json())
                        .then(resultado => {

                            if (resultado.ok) {


                                Swal.fire({

                                    toast: true,

                                    position: "top-end",

                                    icon: "success",

                                    title: "Sesión iniciada",

                                    showConfirmButton: false,

                                    timer: 2000,

                                    timerProgressBar: true

                                });

                                setTimeout(function () {


                                    window.location.href = '/Home/Dashboard';

                                }, 2000)


                            } else {
                                Swal.fire({

                                    toast: true,

                                    position: "top-end",

                                    icon: "error",

                                    title: "Correo o contraseña incorrectos.",

                                    showConfirmButton: false,

                                    timer: 4000,

                                    timerProgressBar: true

                                });

                            }

                        })

                } else {
                    
                    Swal.fire({

                        toast: true,

                        position: "top-end",

                        icon: "warning",

                        title: "Debe rellenar todos los campos.",

                        showConfirmButton: false,

                        timer: 4000,

                        timerProgressBar: true

                    });

                }

            } catch (ex) {

                console.log("Ha ocurido un error en el método JS llamado IniciarSesion ", ex)
                Swal.fire({
                    title: "Advertencia!",
                    text: "Ha ocurido un error en el JS",
                    icon: "error",
                    confirmButtonText: 'Entendido',
                    confirmButtonColor: '#297ea6'
                });
            }

        },

        MostrarOcultarContrasena: function () {

            let input = $(jsIniciarSesion.controles.Contrasena);
            let icono = $("#IconoContrasena");

            if (input.attr("type") === "password") {

                input.attr("type", "text");
                icono.removeClass("fa-eye").addClass("fa-eye-slash");

            } else {

                input.attr("type", "password");
                icono.removeClass("fa-eye-slash").addClass("fa-eye");

            }

        },

    },
    eventos:
        function () {

            $(jsIniciarSesion.botones.btnIniciarSesion).on('click', function () {

                jsIniciarSesion.metodos.IniciarSesion();

            });
            $("#btnMostrarContrasena").on("click", function () {

                jsIniciarSesion.metodos.MostrarOcultarContrasena();

            });

            $("#InputCorreo, #InputContrasena").on("keydown", function (e) {
                if (e.key === "Enter") {
                    e.preventDefault();
                    $("#btnIniciarSesion").click();
                }
            });

        }

}

$(function () {
    jsIniciarSesion.eventos();
});