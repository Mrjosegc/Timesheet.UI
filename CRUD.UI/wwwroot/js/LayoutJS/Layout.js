

jsLayout = {

    controles: {

        TxtContrasenaActual: "#TxtContrasenaActual",
        TxtContrasenaNueva: "#TxtContrasenaNueva",
        TxtConfirmarContrasena: "#TxtConfirmarContrasena",

    },

    botones: {

        BtnCambiarContrasena: "#BtnCambiarContrasena"

    },

    eventos: function () {

        $(jsLayout.botones.BtnCambiarContrasena).on("click", function (event) {

            console.log("Botón cambiar contraseña");

            jsLayout.metodos.CambiarContrasena(event);

        });
        if (sessionStorage.getItem("AbrirCambioContrasena") === "true") {

            sessionStorage.removeItem("AbrirCambioContrasena");

            if (sessionStorage.getItem("CambioObligatorio") === "true") {

                $("#ChangePassModal").modal({
                    backdrop: "static",
                    keyboard: false
                });

                $("#ChangePassModal .btn-close").hide();
                $("#ChangePassModal .btn-secondary").hide();

            }

            $("#ChangePassModal").modal("show");

        }

    },

    metodos: {

        CambiarContrasena: function (event) {

            event.preventDefault();

            try {

                let ObjUsuario = {

                    IdUsuario: $("#IdUsuarioTimeSheet").text().trim(),
                    Contrasena: $(jsLayout.controles.TxtContrasenaActual).val(),
                    ContrasenaNueva: $(jsLayout.controles.TxtContrasenaNueva).val()

                };

                let ConfirmarContrasena = $(jsLayout.controles.TxtConfirmarContrasena).val();

                if (ObjUsuario.Contrasena !== "" && ObjUsuario.ContrasenaNueva !== "" && ConfirmarContrasena !== "") {

                    if (ObjUsuario.ContrasenaNueva != ConfirmarContrasena) {

                        Swal.fire({
                            title: "Advertencia",
                            text: "La nueva contraseña y su confirmación no coinciden.",
                            icon: "warning",
                            confirmButtonText: "Entendido",
                            confirmButtonColor: "#297ea6"
                        });

                        return;
                    }

                    fetch('/Usuario/CambiarContrasena', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(ObjUsuario)
                    })
                        .then(respuesta => respuesta.json())
                        .then(resultado => {

                            Swal.fire({
                                title: resultado.ok ? "Éxito" : "Advertencia",
                                text: resultado.mensaje,
                                icon: resultado.ok ? "success" : "warning",
                                confirmButtonText: "Entendido",
                                confirmButtonColor: "#297ea6"
                            });

                            if (resultado.ok) {

                                setTimeout(() => {

                                    window.location.reload();

                                }, 2000);

                            }

                        });

                } else {

                    Swal.fire({
                        title: "Advertencia",
                        text: "Debe completar todos los campos.",
                        icon: "warning",
                        confirmButtonText: "Entendido",
                        confirmButtonColor: "#297ea6"
                    });

                }

            } catch (e) {

                console.warn("Ha ocurrido un error en la función CambiarContrasena en el JS: ", e);

            }

        },

    }

};

$(function () {

    jsLayout.eventos();

});