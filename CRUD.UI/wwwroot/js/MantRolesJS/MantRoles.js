// Write your JavaScript code.
/// <summary>
/// JavaScript para la pantalla de Inicio de sesión
/// </summary>
/// <createdate>23/06/2026</createdate>
/// <author>Jose Garro Campos</author>
/// <lastmodificationdate></lastmodificationdate>
/// <lastmodificationdescription></lastmodificationdescription>
/// <lastmodifierauthor></lastmodifierauthor>



jsMantRoles = {

    objetos: {


    },
    controles: {
       
        InputIdRol: '#InputIdRol',
        InputNombreRol: '#InputNombreRol',
        InputDescripcionRol: '#InputDescripcionRol',

        //Modal Editar Roles
        btnObtenerRoles: '.btnObtenerRoles',
        btnObtenerRolPorId: '.btnObtenerRolPorId',

        ModalInputIdRol: '#ModalInputIdRol',
        ModalInputNombreRol: '#ModalInputNombreRol',
        ModalInputDescripcionRol: '#ModalInputDescripcionRol',
        ModalSelectEstadoRol: '#ModalSelectEstadoRol',
    },


    Modals: {



    },


    Tablas: {


    },


    botones: {
        btnCrearRol: '#btnCrearRol',
        btnCancelar: '#btnCancelar',
        btnEliminarRol: '.btnEliminarRol',
        ModalbtnGuardarRol: '#ModalbtnGuardarRol',
        ModalbtnEliminarRol: '#ModalbtnEliminarRol',

    },

    variables: {


    },
    metodos: {

        CrearRol: function () {
            event.preventDefault();
            try {

                let ObjRol = {

                    NombreRol: $(jsMantRoles.controles.InputNombreRol).val(),
                    DescripcionRol: $(jsMantRoles.controles.InputDescripcionRol).val(),
                }

                if (ObjRol.NombreRol !== "" && ObjRol.DescripcionRol != "") {

                    fetch('../Usuario/CrearRol', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(ObjRol)
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
                                }, 2100)
                            } else {
                                Swal.fire({
                                    title: "Advertencia",
                                    text: resultado.mensaje,
                                    icon: "warning",
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
                console.log("Ha ocurrido un error en el método CrearRol en el JS: ", e)
            }
        },

        ObtenerRoles: function (event) {

            try {

                let button = $(event.currentTarget);

                let IdRolBoton = button.data("idrol")

                let ObjRol = {

                    IdRol: IdRolBoton
                };

                fetch('../Usuario/ObtenerRoles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ObjRol)
                })
                    .then(respuesta => respuesta.json())
                    .then(resultado => {

                        if (resultado.ok) {
                            $(jsMantRoles.controles.ModalInputIdRol).val(resultado.valorRetorno.idRol)
                            $(jsMantRoles.controles.ModalInputNombreRol).val(resultado.valorRetorno.nombreRol)
                            $(jsMantRoles.controles.ModalInputDescripcionRol).val(resultado.valorRetorno.descripcionRol)

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
                console.log("Ha ocurrido un error al obtener el puesto en el metodo ObtenerRoles en el JS")
            }
        },

        EliminarRolPorId: function (event) {

            event.preventDefault();

            try {
                let ObjRol = {

                    IdRol: $(event.currentTarget).data("idrol"),
                };
                Swal.fire({
                    title: "Estás seguro que quieres Eliminar este puesto?",
                    text: "Esta acción es irreversible!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#297ea6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, Eliminar!",
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetch('../Usuario/EliminarRolPorId', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(ObjRol)
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
                                    }, 5000)
                                } else {
                                    Swal.fire({
                                        title: "Error",
                                        text: resultado.mensaje,
                                        icon: "error",
                                        confirmButtonColor: "#297ea6"
                                    });
                                }
                            });
                    }
                });

            } catch (e) {
                console.warn("Ha ocurrido un errro en la función EliminarRolPorId en el JS: ", e);
            }

        },

        EditarRolPorId: function () {
            event.preventDefault();
            try {
                let ObjRol = {

                    IdRol: $(jsMantRoles.controles.ModalInputIdRol).val(),
                    NombreRol: $(jsMantRoles.controles.ModalInputNombreRol).val(),
                    DescripcionRol: $(jsMantRoles.controles.ModalInputDescripcionRol).val(),
                    EstadoRol: $(jsMantRoles.controles.ModalSelectEstadoRol).val() === "true"
                };

                if (ObjRol.IdRol !== "0" && ObjRol.NombreRol !== "0" && ObjRol.DescripcionRol !== "") {

                    Swal.fire({
                        title: "Estás seguro que quieres editar este puesto?",
                        text: "Esta acción es irreversible!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#297ea6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Sí, Editar!",
                        cancelButtonText: 'No'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            fetch('../Usuario/EditarRolPorId', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(ObjRol)
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
                                        }, 2000)
                                    } else {
                                        Swal.fire({
                                            title: "Error",
                                            text: resultado.mensaje,
                                            icon: "error",
                                            confirmButtonColor: "#297ea6"
                                        });
                                    }
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
                console.warn("Ha ocurrido un error en la función EditarRolPorId en el JS: ", e)

            }
        },

        ObtenerRolPorId: function (event) {

            try {
                let button = $(event.currentTarget);

                let IdRolBoton = button.data("idrol")

                let ObjRol = {

                    IdRol: IdRolBoton
                };
                fetch('../Usuario/ObtenerRolPorId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ObjRol)
                })
                    .then(respuesta => respuesta.json())
                    .then(resultado => {
                        if (resultado.ok) {
                            $(jsMantRoles.controles.ModalInputIdRol).val(resultado.valorRetorno.idRol)
                            $(jsMantRoles.controles.ModalInputNombreRol).val(resultado.valorRetorno.nombreRol)
                            $(jsMantRoles.controles.ModalInputDescripcionRol).val(resultado.valorRetorno.descripcionRol)
                            $(jsMantRoles.controles.ModalSelectEstadoRol).val(resultado.valorRetorno.estadoRol.toString());
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
                console.log("Ha ocurrido un error al obtener el puesto en el metodo ObtenerRolPorId en el JS")
            }
        },
    },

    eventos: function () {

        $(jsMantRoles.botones.btnCrearRol).on('click', function () {

            jsMantRoles.metodos.CrearRol();

        });

        $(jsMantRoles.controles.btnObtenerRoles).on('click', function (event) {

            jsMantRoles.metodos.ObtenerRoles(event);

        });

        $(jsMantRoles.botones.btnEliminarRol).on('click', function (event) {

            jsMantRoles.metodos.EliminarRolPorId(event);

        });

        $(jsMantRoles.botones.ModalbtnGuardarRol).on('click', function (event) {

            jsMantRoles.metodos.EditarRolPorId(event);

        });

        $(jsMantRoles.controles.btnEditarRolPorId).on('click', function (event) {

            jsMantRoles.metodos.ObtenerRoles(event);

        });

        $(jsMantRoles.controles.btnObtenerRolPorId).on('click', function (event) {

            jsMantRoles.metodos.ObtenerRolPorId(event);

        });

    }
}

$(function () {
    jsMantRoles.eventos();
});






