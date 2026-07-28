// Write your JavaScript code.
/// <summary>
/// JavaScript para la pantalla de Mantenimiento de categorias
/// </summary>
/// <createdate>14/07/2026</createdate>
/// <author>Jose Garro Campos</author>
/// <lastmodificationdate></lastmodificationdate>
/// <lastmodificationdescription></lastmodificationdescription>
/// <lastmodifierauthor></lastmodifierauthor>



jsMantCategorias = {

    objetos: {

    },
    controles: {

        InputNombreCategoria: '#InputNombreCategoria',
        InputDescripcionCategoria: '#InputDescripcionCategoria',


        //Modal Editar Usuarios

        btnObtenerCategorias: '.btnObtenerCategorias',
        btnObtenerCategoriaPorId: '.btnObtenerCategoriaPorId',
        ModalInputIdCategoria: '#ModalInputIdCategoria',
        ModalInputNombreCategoria: '#ModalInputNombreCategoria',
        ModalInputDescripcionCategoria: '#ModalInputDescripcionCategoria',
        ModalInputEstadoCategoria: '#ModalInputEstadoCategoria',

    },

    Modals: {

    },

    Tablas: {

    },

    botones: {
        btnCrearCategoria: '#btnCrearCategoria',
        btnObtenerCategorias: '.btnObtenerCategorias',
        ModalbtnGuardarCategoria: '#ModalbtnGuardarCategoria',
        btnEliminarCategoria: '.btnEliminarCategoria',
    },

    variables: {

    },
    metodos: {

        ObtenerCategorias: function (event) {

            try {

                let button = $(event.currentTarget);

                let IdCategoriaBoton = button.data("idCategoria")

                let ObjCategoria = {

                    IdCategoria: IdCategoriaBoton
                };

                fetch('../Categorias/ObtenerCategorias', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ObjCategoria)
                })
                    .then(respuesta => respuesta.json())
                    .then(resultado => {

                        if (resultado.ok) {
                            $(jsMantCategorias.controles.ModalInputIdCategoria).val(resultado.valorRetorno.IdCategoria)
                            $(jsMantCategorias.controles.ModalInputNombreCategoria).val(resultado.valorRetorno.nombreCategoria)
                            $(jsMantCategorias.controles.ModalInputDescripcionCategoria).val(resultado.valorRetorno.descripcionCategoria)
                            $(jsMantCategorias.controles.ModalInputEstadoCategoria).val(resultado.valorRetorno.estadoCategoria)
                            $(jsMantCategorias.controles.ModalInputFechaCreaciontegoria).val(resultado.valorRetorno.fechaCreacionCategoria)

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
                console.log("Ha ocurrido un error al obtener la categoria en el metodo Obtener en el JS")
            }
        },

        CrearCategoria: function () {
            event.preventDefault();
            try {
                let ObjCategoria = {

                    NombreCategoria: $(jsMantCategorias.controles.InputNombreCategoria).val(),
                    DescripcionCategoria: $(jsMantCategorias.controles.InputDescripcionCategoria).val(),

                }
                if (ObjCategoria.NombreCategoria != "" && ObjCategoria.DescripcionCategoria !== "") {
                    console.log("Antes del fetch");
                    fetch('../Categorias/CrearCategoria', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(ObjCategoria)
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
                                }, 3000)
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
                console.log("Ha ocurrido un error en el método CrearCategoria en el JS: ", e)
            }
        },

        ObtenerCategoriaPorId: function (event) {

            try {
                let button = $(event.currentTarget);
                
                let IdCategoriaBoton = button.data("idcategoria")

                let ObjCategoria = {

                    IdCategoria: IdCategoriaBoton
                };
                fetch('../Categorias/ObtenerCategoriaPorId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(ObjCategoria)
                })
                    .then(respuesta => respuesta.json())
                    .then(resultado => {
                        
                        if (resultado.ok) {
                            $(jsMantCategorias.controles.ModalInputIdCategoria).val(resultado.valorRetorno.idCategoria)
                            $(jsMantCategorias.controles.ModalInputNombreCategoria).val(resultado.valorRetorno.nombreCategoria)
                            $(jsMantCategorias.controles.ModalInputDescripcionCategoria).val(resultado.valorRetorno.descripcionCategoria)
                            $(jsMantCategorias.controles.ModalInputEstadoCategoria).val(resultado.valorRetorno.estadoCategoria ? "1" : "0");
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
                console.log("Ha ocurrido un error al obtener el usuario en el metodo ObtenerCategoriaPorId en el JS")
            }
        },

        ActualizarCategoriaPorId: function (event) {
            event.preventDefault();
            try {
                let ObjCategoria = {
                    IdCategoria: $(jsMantCategorias.controles.ModalInputIdCategoria).val(),
                    NombreCategoria: $(jsMantCategorias.controles.ModalInputNombreCategoria).val(),
                    DescripcionCategoria: $(jsMantCategorias.controles.ModalInputDescripcionCategoria).val(),
                    EstadoCategoria: $(jsMantCategorias.controles.ModalInputEstadoCategoria).val() == 1,

                };

                if (ObjCategoria.IdCategoria !== "0" && ObjCategoria.NombreCategoria !== "" && ObjCategoria.DescripcionCategoria !== "") {

                    Swal.fire({
                        title: "Estás seguro que quieres editar esta categoria?",
                        text: "Esta acción es irreversible!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#297ea6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Sí, Editar!",
                        cancelButtonText: 'No'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            fetch('../Categorias/PruebaActualizar', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(ObjCategoria)
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
                console.warn("Ha ocurrido un errro en la función ActualizarCategoriaPorId en el JS: ", e)

            }
        },

        EliminarCatPorId: function (event) {
            
            event.preventDefault();

            try {
                let ObjCat = {
                    
                    IdCategoria: $(event.currentTarget).data("idcategoria"),
                };
                Swal.fire({
                    title: "Estás seguro que quieres Eliminar esta categoría?",
                    text: "Esta acción es irreversible!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#297ea6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, Eliminar!",
                    cancelButtonText: 'No'
                }).then((result) => {
                    
                    if (result.isConfirmed) {
                        
                        fetch('../Categorias/EliminarCatPorId', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(ObjCat)
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
                                    }, 3000)
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
                console.warn("Ha ocurrido un errro en la función EliminarCatPorId en el JS: ", e);
            }
        },

    },

    eventos: function () {
        

        $(jsMantCategorias.controles.btnObtenerCategorias).on('click', function (event) {

            jsMantCategorias.metodos.ObtenerCategorias(event);

        });

        $(jsMantCategorias.botones.btnCrearCategoria).on('click', function () {

            jsMantCategorias.metodos.CrearCategoria();

        });
        $(jsMantCategorias.controles.btnObtenerCategoriaPorId).on('click', function (event) {
            
            jsMantCategorias.metodos.ObtenerCategoriaPorId(event);

        });
        $(jsMantCategorias.botones.ModalbtnGuardarCategoria).on('click', function (event) {

            jsMantCategorias.metodos.ActualizarCategoriaPorId(event);

        });

        $(jsMantCategorias.botones.btnEliminarCategoria).on('click', function (event) {
            console.log("boton bien")
            jsMantCategorias.metodos.EliminarCatPorId(event);

        });




    }
}

$(function () {
    jsMantCategorias.eventos();
});

