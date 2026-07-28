// Write your JavaScript code.

/// <summary>
/// JavaScript para la pantalla de Mantenimiento de Productos
/// </summary>
/// <createdate>16/07/2026</createdate>
/// <author>Jose Garro Campos</author>
/// <lastmodificationdate></lastmodificationdate>
/// <lastmodificationdescription></lastmodificationdescription>
/// <lastmodifierauthor></lastmodifierauthor>



var jsMantProductos = {

    controles: {

        //Inputs

        InputCodBar: "#InputCodBar",
        InputNombreProducto: "#InputNombreProducto",
        InputDescripcionProducto: "#InputDescripcionProducto",
        InputCategoria: "#InputCategoria",
        InputProveedor: "#InputProveedor",
        InputPrecioCompra: "#InputPrecioCompra",
        InputPrecioVenta: "#InputPrecioVenta",
        InputStock: "#InputStock",
        InputUE: "#InputUE",
        InputLote: "#InputLote",
        InputFechaVencimiento: "#InputFechaVencimiento",

        // Modal

        ModalInputIdProducto: "#ModalInputIdProducto",
        ModalInputCodBar: "#ModalInputCodBar",
        ModalInputNombreProducto: "#ModalInputNombreProducto",
        ModalInputDescripcionProducto: "#ModalInputDescripcionProducto",
        ModalInputCategoria: "#ModalInputCategoria",
        ModalInputProveedor: "#ModalInputProveedor",
        ModalInputPrecioCompra: "#ModalInputPrecioCompra",
        ModalInputPrecioVenta: "#ModalInputPrecioVenta",
        ModalInputStock: "#ModalInputStock",
        ModalInputUE: "#ModalInputUE",
        ModalInputLote: "#ModalInputLote",
        ModalInputFechaVencimiento: "#ModalInputFechaVencimiento",

        // Botón del modal

        ModalbtnGuardarProducto: "#ModalbtnGuardarProducto",

        //Botones

        btnRegistrarProducto: "#btnRegistrarProducto",

        //Tabla

        TbProductos: "#TbProductos"

        //Modal



    },

    funciones: {

        RegistrarProducto: function () {

            event.preventDefault();

            try {

                let ObjProducto = {

                    CodBar: $(jsMantProductos.controles.InputCodBar).val(),
                    NombreProducto: $(jsMantProductos.controles.InputNombreProducto).val(),
                    DescripcionProducto: $(jsMantProductos.controles.InputDescripcionProducto).val(),
                    IdCategoria: $(jsMantProductos.controles.InputCategoria).val(),
                    IdProveedor: $(jsMantProductos.controles.InputProveedor).val(),
                    PrecioCompra: $(jsMantProductos.controles.InputPrecioCompra).val(),
                    PrecioVenta: $(jsMantProductos.controles.InputPrecioVenta).val(),
                    Stock: $(jsMantProductos.controles.InputStock).val(),
                    UE: $(jsMantProductos.controles.InputUE).val(),
                    Lote: $(jsMantProductos.controles.InputLote).val(),
                    FechaVencimiento: $(jsMantProductos.controles.InputFechaVencimiento).val()

                };

                if (
                    ObjProducto.CodBar !== "" &&
                    ObjProducto.NombreProducto !== "" &&
                    ObjProducto.DescripcionProducto !== "" &&
                    ObjProducto.IdCategoria !== "0" &&
                    ObjProducto.IdProveedor !== "0" &&
                    ObjProducto.PrecioCompra !== "" &&
                    ObjProducto.PrecioVenta !== "" &&
                    ObjProducto.Stock !== "" &&
                    ObjProducto.UE !== "" &&
                    ObjProducto.Lote !== "" &&
                    ObjProducto.FechaVencimiento !== ""
                ) {

                    fetch("../Productos/RegistrarProducto", {

                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(ObjProducto)

                    })
                        .then(response => response.json())
                        .then(data => {

                            if (data.ok) {

                                Swal.fire({
                                    icon: "success",
                                    title: "Éxito",
                                    text: data.mensaje
                                }).then(() => {

                                    location.reload();

                                });

                            }
                            else {

                                Swal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: data.mensaje
                                });

                            }

                        });

                }
                else {

                    Swal.fire({
                        icon: "warning",
                        title: "Campos incompletos",
                        text: "Debe completar todos los campos."
                    });

                }

            }
            catch (e) {

                console.log(e);

            }

        },

        EliminarProductoPorId: function (IdProducto) {

            event.preventDefault();

            Swal.fire({
                title: "¿Desea eliminar este producto?",
                text: "Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar"
            }).then((result) => {

                if (result.isConfirmed) {

                    fetch("../Productos/EliminarProductoPorId", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            IdProducto: IdProducto
                        })
                    })
                        .then(response => response.json())
                        .then(data => {

                            if (data.ok) {

                                Swal.fire({
                                    icon: "success",
                                    title: "Éxito",
                                    text: data.mensaje
                                }).then(() => {
                                    location.reload();
                                });

                            }
                            else {

                                Swal.fire("Error", data.mensaje, "error");

                            }

                        });

                }

            });

        },

        ObtenerProductoPorId: function (IdProducto) {

            event.preventDefault();

            try {

                fetch("../Productos/ObtenerProductoPorId", {

                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        IdProducto: IdProducto
                    })

                })
                    .then(response => response.json())
                    .then(data => {

                        if (data.ok) {

                            $(jsMantProductos.controles.ModalInputIdProducto).val(data.valorRetorno.idProducto);
                            $(jsMantProductos.controles.ModalInputCodBar).val(data.valorRetorno.codBar);
                            $(jsMantProductos.controles.ModalInputNombreProducto).val(data.valorRetorno.nombreProducto);
                            $(jsMantProductos.controles.ModalInputDescripcionProducto).val(data.valorRetorno.descripcionProducto);
                            $(jsMantProductos.controles.ModalInputCategoria).val(data.valorRetorno.idCategoria);
                            $(jsMantProductos.controles.ModalInputProveedor).val(data.valorRetorno.idProveedor);
                            $(jsMantProductos.controles.ModalInputPrecioCompra).val(data.valorRetorno.precioCompra);
                            $(jsMantProductos.controles.ModalInputPrecioVenta).val(data.valorRetorno.precioVenta);
                            $(jsMantProductos.controles.ModalInputStock).val(data.valorRetorno.stock);
                            $(jsMantProductos.controles.ModalInputUE).val(data.valorRetorno.ue);
                            $(jsMantProductos.controles.ModalInputLote).val(data.valorRetorno.lote);
                            $(jsMantProductos.controles.ModalInputFechaVencimiento).val(data.valorRetorno.fechaVencimiento.substring(0, 10));

                            $("#modalEditarProducto").modal("show");

                        }
                        else {

                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: data.mensaje
                            });

                        }

                    });

            }
            catch (e) {

                console.log(`Ha ocurrido un error en MantProductos.js en el método ObtenerProductoPorId: ${e}`);

            }

        },

        ActualizarProductoPorId: function () {

            event.preventDefault();

            try {

                let ObjProducto = {

                    IdProducto: $(jsMantProductos.controles.ModalInputIdProducto).val(),
                    CodBar: $(jsMantProductos.controles.ModalInputCodBar).val(),
                    NombreProducto: $(jsMantProductos.controles.ModalInputNombreProducto).val(),
                    DescripcionProducto: $(jsMantProductos.controles.ModalInputDescripcionProducto).val(),
                    IdCategoria: $(jsMantProductos.controles.ModalInputCategoria).val(),
                    IdProveedor: $(jsMantProductos.controles.ModalInputProveedor).val(),
                    PrecioCompra: $(jsMantProductos.controles.ModalInputPrecioCompra).val(),
                    PrecioVenta: $(jsMantProductos.controles.ModalInputPrecioVenta).val(),
                    Stock: $(jsMantProductos.controles.ModalInputStock).val(),
                    UE: $(jsMantProductos.controles.ModalInputUE).val(),
                    Lote: $(jsMantProductos.controles.ModalInputLote).val(),
                    FechaVencimiento: $(jsMantProductos.controles.ModalInputFechaVencimiento).val()

                };

                if (
                    ObjProducto.CodBar !== "" &&
                    ObjProducto.NombreProducto !== "" &&
                    ObjProducto.DescripcionProducto !== "" &&
                    ObjProducto.IdCategoria !== "0" &&
                    ObjProducto.IdProveedor !== "0" &&
                    ObjProducto.PrecioCompra !== "" &&
                    ObjProducto.PrecioVenta !== "" &&
                    ObjProducto.Stock !== "" &&
                    ObjProducto.UE !== "" &&
                    ObjProducto.Lote !== "" &&
                    ObjProducto.FechaVencimiento !== ""
                ) {

                    Swal.fire({
                        title: "¿Desea actualizar este producto?",
                        text: "Se modificará la información del producto.",
                        icon: "question",
                        showCancelButton: true,
                        confirmButtonText: "Sí, actualizar",
                        cancelButtonText: "Cancelar"
                    }).then((result) => {

                        if (result.isConfirmed) {

                            fetch("../Productos/ActualizarProductoPorId", {

                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },

                                body: JSON.stringify(ObjProducto)

                            })
                                .then(response => response.json())
                                .then(data => {

                                    if (data.ok) {

                                        Swal.fire({
                                            icon: "success",
                                            title: "Éxito",
                                            text: data.mensaje
                                        }).then(() => {

                                            location.reload();

                                        });

                                    }
                                    else {

                                        Swal.fire({
                                            icon: "error",
                                            title: "Error",
                                            text: data.mensaje
                                        });

                                    }

                                });

                        }

                    });

                }
                else {

                    Swal.fire({
                        icon: "warning",
                        title: "Campos incompletos",
                        text: "Debe completar todos los campos."
                    });

                }

            }
            catch (e) {

                console.log(
                    `Ha ocurrido un error en MantProductos.js en el método ActualizarProductoPorId: ${e}`
                );

            }

        },

        ActualizarEstadoProducto: function (IdProducto, EstadoProducto) {

            event.preventDefault();

            try {

                let Mensaje = EstadoProducto
                    ? "¿Desea activar este producto?"
                    : "¿Desea inactivar este producto?";

                let MensajeProceso = EstadoProducto
                    ? "El producto será activado."
                    : "El producto será inactivado.";

                Swal.fire({
                    title: Mensaje,
                    text: MensajeProceso,
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "Sí",
                    cancelButtonText: "Cancelar"
                }).then((result) => {

                    if (result.isConfirmed) {

                        fetch("../Productos/ActualizarEstadoProducto", {

                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({
                                IdProducto: IdProducto,
                                EstadoProducto: EstadoProducto
                            })

                        })
                            .then(response => response.json())
                            .then(data => {

                                if (data.ok) {

                                    Swal.fire({
                                        icon: "success",
                                        title: "Éxito",
                                        text: data.mensaje
                                    }).then(() => {

                                        location.reload();

                                    });

                                }
                                else {

                                    Swal.fire({
                                        icon: "error",
                                        title: "Error",
                                        text: data.mensaje
                                    });

                                }

                            });

                    }

                });

            }
            catch (e) {

                console.log(`Ha ocurrido un error en MantProductos.js en el método ActualizarEstadoProducto: ${e}`);

            }

        },

    }

};

$(function () {

    $(jsMantProductos.controles.btnRegistrarProducto).on("click", function () {

        jsMantProductos.funciones.RegistrarProducto();

    });

//Eventos

    $(document).on("click", ".btnEliminarProducto", function () {

        let IdProducto = $(this).attr("data-IdProducto");

        jsMantProductos.funciones.EliminarProductoPorId(IdProducto);

    });

    $(document).on("click", ".btnObtenerProductoPorId", function () {

        let IdProducto = $(this).attr("data-IdProducto");

        jsMantProductos.funciones.ObtenerProductoPorId(IdProducto);

    });
    $(document).on("click", ".btnInactivarProducto", function () {

        let IdProducto = $(this).attr("data-IdProducto");

        jsMantProductos.funciones.ActualizarEstadoProducto(IdProducto, false);

    });

    $(document).on("click", ".btnActivarProducto", function () {

        let IdProducto = $(this).attr("data-IdProducto");

        jsMantProductos.funciones.ActualizarEstadoProducto(IdProducto, true);

    });

    $(jsMantProductos.controles.ModalbtnGuardarProducto).on("click", function () {

        jsMantProductos.funciones.ActualizarProductoPorId();

    });

    const tablaProductos = new DataTable('#TbProductos', {

        language: {

            decimal: ",",
            thousands: ".",
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No se encontraron productos",
            info: "Mostrando del _START_ al _END_ de _TOTAL_ productos",
            infoEmpty: "Mostrando 0 de 0 productos",
            infoFiltered: "(filtrado de _MAX_ productos)",
            search: "Buscar:",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior"
            }

        }

    });
    $("#FiltroCategoria").on("change", function () {

        tablaProductos
            .column(3)
            .search($(this).val())
            .draw();

    });


});
