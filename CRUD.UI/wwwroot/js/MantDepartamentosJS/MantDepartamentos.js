// Write your JavaScript code.
/// <summary>
/// JavaScript para la pantalla de Inicio de sesión
/// </summary>
/// <createdate>23/06/2026</createdate>
/// <author>Jose Garro Campos</author>
/// <lastmodificationdate></lastmodificationdate>
/// <lastmodificationdescription></lastmodificationdescription>
/// <lastmodifierauthor></lastmodifierauthor>



jsMantDepartamentos = {

    objetos: {


    },
    controles: {
       
        InputIdDepartamento: '#InputIdDepartamento',
        InputNombreDepartamento: '#InputNombreDepartamento',
        InputDescripcionDepartamento: '#InputDescripcionDepartamento',

        //Modal Editar Departamentos
        btnObtenerDepartamentos: '.btnObtenerDepartamentos',
        btnObtenerDepartamentoPorId: '.btnObtenerDepartamentoPorId',

        ModalInputIdDepartamento: '#ModalInputIdDepartamento',
        ModalInputNombreDepartamento: '#ModalInputNombreDepartamento',
        ModalInputDescripcionDepartamento: '#ModalInputDescripcionDepartamento',
        ModalSelectEstadoDepartamento: '#ModalSelectEstadoDepartamento',
    },


    Modals: {



    },


    Tablas: {


    },


    botones: {
        btnCrearDepartamento: '#btnCrearDepartamento',
        btnCancelar: '#btnCancelar',
        btnEliminarDepartamento: '.btnEliminarDepartamento',
        ModalbtnGuardarDepartamento: '#ModalbtnGuardarDepartamento',
        ModalbtnEliminarDepartamento: '#ModalbtnEliminarDepartamento',
        btnEditarDepartamentoPorId: '.btnEditarDepartamentoPorId',

    },

    variables: {


    },
    metodos: {

        CrearDepartamento: function () {
            event.preventDefault();
            try {

                let ObjDepartamento = {

                    NombreDepartamento: $(jsMantDepartamentos.controles.InputNombreDepartamento).val(),
                    DescripcionDepartamento: $(jsMantDepartamentos.controles.InputDescripcionDepartamento).val(),
                }

                if (ObjDepartamento.NombreDepartamento !== "" && ObjDepartamento.DescripcionDepartamento != "") {

                    fetch('../Usuario/CrearDepartamento', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(ObjDepartamento)
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
                console.log("Ha ocurrido un error en el método CrearDepartamento en el JS: ", e)
            }
        },

        ObtenerDepartamentos: function (event) {

            try {

                let button = $(event.currentTarget);

                let IdDepartamentoBoton = button.data("idDepartamento")

                let ObjDepartamento = {

                    IdDepartamento: IdDepartamentoBoton
                };

                fetch('../Usuario/ObtenerDepartamentos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ObjDepartamento)
                })
                    .then(respuesta => respuesta.json())
                    .then(resultado => {

                        if (resultado.ok) {
                            $(jsMantDepartamentos.controles.ModalInputIdDepartamento).val(resultado.valorRetorno.idDepartamento)
                            $(jsMantDepartamentos.controles.ModalInputNombreDepartamento).val(resultado.valorRetorno.nombreDepartamento)
                            $(jsMantDepartamentos.controles.ModalInputDescripcionDepartamento).val(resultado.valorRetorno.descripcionDepartamento)

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
                console.log("Ha ocurrido un error al obtener el Departamento en el metodo ObtenerDepartamentos en el JS")
            }
        },

        EliminarDepartamentoPorId: function (event) {

            event.preventDefault();

            try {
                let ObjDepartamento = {

                    IdDepartamento: $(event.currentTarget).data("idDepartamento"),
                };
                Swal.fire({
                    title: "Estás seguro que quieres Eliminar este Departamento?",
                    text: "Esta acción es irreversible!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#297ea6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, Eliminar!",
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        fetch('../Usuario/EliminarDepartamentoPorId', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(ObjDepartamento)
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
                console.warn("Ha ocurrido un errro en la función EliminarDepartamentoPorId en el JS: ", e);
            }

        },

        EditarDepartamentoPorId: function () {
            event.preventDefault();
            try {
                let ObjDepartamento = {

                    IdDepartamento: $(jsMantDepartamentos.controles.ModalInputIdDepartamento).val(),
                    NombreDepartamento: $(jsMantDepartamentos.controles.ModalInputNombreDepartamento).val(),
                    DescripcionDepartamento: $(jsMantDepartamentos.contDepartamentoes.ModalInputDescripcionDepartamento).val(),
                    EstadoDepartamento: $(jsMantDepartamentos.controles.ModalSelectEstadoDepartamento).val() === "true"
                };

                if (ObjDepartamento.IdDepartamento !== "0" && ObjDepartamento.NombreDepartamento !== "0" && ObjDepartamento.DescripcionDepartamento !== "") {

                    Swal.fire({
                        title: "Estás seguro que quieres editar este Departamento?",
                        text: "Esta acción es irreversible!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#297ea6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Sí, Editar!",
                        cancelButtonText: 'No'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            fetch('../Usuario/EditarDepartamentoPorId', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(ObjDepartamento)
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
                console.warn("Ha ocurrido un errro en la función EditarDepartamentoPorId en el JS: ", e)

            }
        },

        ObtenerDepartamentoPorId: function (event) {

            try {
                let button = $(event.currentTarget);

                let IdDepartamentoBoton = button.attr("data-id-departamento")
                console.log(button);
                console.log(IdDepartamentoBoton);
                console.log(IdDepartamentoBoton);
                let ObjDepartamento = {

                    IdDepartamento: IdDepartamentoBoton
                };
                fetch('../Usuario/ObtenerDepartamentoPorId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ObjDepartamento)
                })
                    .then(respuesta => respuesta.json())
                    .then(resultado => {
                        if (resultado.ok) {
                            $(jsMantDepartamentos.controles.ModalInputIdDepartamento).val(resultado.valorRetorno.idDepartamento)
                            $(jsMantDepartamentos.controles.ModalInputNombreDepartamento).val(resultado.valorRetorno.nombreDepartamento)
                            $(jsMantDepartamentos.controles.ModalInputDescripcionDepartamento).val(resultado.valorRetorno.descripcionDepartamento)
                            $(jsMantDepartamentos.controles.ModalSelectEstadoDepartamento).val(resultado.valorRetorno.estadoDepartamento.toString());
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
                console.log("Ha ocurrido un error al obtener el usuario en el metodo ObtenerDepartamentoPorId en el JS")
            }
        },
    },

    eventos: function () {

        $(jsMantDepartamentos.botones.btnCrearDepartamento).on('click', function () {

            jsMantDepartamentos.metodos.CrearDepartamento();

        });

        $(jsMantDepartamentos.controles.btnObtenerDepartamentos).on('click', function (event) {

            jsMantDepartamentos.metodos.ObtenerDepartamentos(event);

        });

        $(jsMantDepartamentos.botones.btnEliminarDepartamento).on('click', function (event) {

            jsMantDepartamentos.metodos.EliminarDepartamentoPorId(event);

        });

        $(jsMantDepartamentos.botones.ModalbtnGuardarDepartamento).on('click', function (event) {

            jsMantDepartamentos.metodos.EditarDepartamentoPorId(event);

        });

        $(jsMantDepartamentos.controles.btnEditarDepartamentoPorId).on('click', function (event) {

            jsMantDepartamentos.metodos.ObtenerDepartamentoPorId(event);

        });

        $(jsMantDepartamentos.controles.btnObtenerDepartamentoPorId).on('click', function (event) {

            jsMantDepartamentos.metodos.ObtenerDepartamentoPorId(event);

        });

    }
}

$(function () {
    jsMantDepartamentos.eventos();
});






