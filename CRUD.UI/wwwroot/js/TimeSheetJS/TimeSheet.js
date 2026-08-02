var jsTimeSheet = {

    controles: {

        BtnEntrada: "#BtnEntrada",
        BtnSalida: "#BtnSalida",

        LblHoraEntrada: "#HoraEntradaResumen",
        LblHoraSalida: "#HoraSalidaResumen",

        TituloEstado: "#TituloEstado",
        DescripcionEstado: "#DescripcionEstado",

        IconoEstado: "#IconoEstado",

        TiempoTrabajado: "#TiempoTrabajado",

        EstadoEntrada: "#EstadoEntrada",
        EstadoSalida: "#EstadoSalida",

        btnBuscarEmpleado: "#btnBuscarEmpleado",
        ddlDepartamento: "#ddlDepartamento",
        TxtIdEmpleado: "#txtIdEmpleado",
        TxtEmpleado: "#txtEmpleado",

        BtnGenerarReporte: "#btnGenerarReporte",

        TxtFechaInicio: "#txtFechaInicio",
        TxtFechaFin: "#txtFechaFin",

        BodyReporteTimeSheet: "#BodyReporteTimeSheet",

        ContenedorTablaReporte: "#ContenedorTablaReporte",
        BtnGenerarReporte: "#BtnGenerarReporte",
        BtnExportarPdf: "#BtnExportarPdf",
    },

    iniciar: function () {

        jsTimeSheet.eventos();

        jsTimeSheet.funciones.InicializarTablaBuscarEmpleado();

        // Solo ejecutar estas funciones en la vista TimeSheet
        if (document.getElementById("HoraActual")) {

            jsTimeSheet.funciones.ActualizarReloj();
            setInterval(jsTimeSheet.funciones.ActualizarReloj, 1000);

            jsTimeSheet.funciones.ObtenerEstadoTimeSheet();
        }

    },

    eventos: function () {

        $(jsTimeSheet.controles.BtnEntrada).on("click", function () {

            jsTimeSheet.funciones.RegistrarEntrada();

        });

        $(jsTimeSheet.controles.BtnSalida).on("click", function () {

            jsTimeSheet.funciones.RegistrarSalida();

        });

        $(jsTimeSheet.controles.btnBuscarEmpleado).click(function () {

            jsTimeSheet.funciones.AbrirModalBuscarEmpleado();

        });

        $(document).on("click", ".btnSeleccionarEmpleado", function () {

            let idEmpleado = $(this).data("id");
            let nombreEmpleado = $(this).data("nombre");

            $(jsTimeSheet.controles.TxtIdEmpleado).val(idEmpleado);
            $(jsTimeSheet.controles.TxtEmpleado).val(nombreEmpleado);

            $("#modalBuscarEmpleado").modal("hide");

        });

        $(jsTimeSheet.controles.BtnGenerarReporte).click(function () {

            jsTimeSheet.funciones.GenerarReporte();

        });

        $(jsTimeSheet.controles.BtnExportarPdf).click(function () {

            jsTimeSheet.funciones.ExportarReportePdf();

        });
        $(jsTimeSheet.controles.ddlDepartamento).change(function () {

            $(jsTimeSheet.controles.TxtIdEmpleado).val("0");
            $(jsTimeSheet.controles.TxtEmpleado).val("");

        });
    },

    funciones: {

        ActualizarReloj: function () {

            const ahora = new Date();

            //=========================
            // Hora
            //=========================

            const hora = ahora.toLocaleTimeString("es-CR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            });

            const partesHora = hora.split(" ");

            document.getElementById("HoraActual").textContent = partesHora[0];

            if (partesHora.length > 1) {
                document.getElementById("PeriodoActual").textContent =
                    partesHora.slice(1).join(" ");
            }

            //=========================
            // Fecha
            //=========================

            const fecha = ahora.toLocaleDateString("es-CR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            });

            document.getElementById("FechaActual").textContent =
                fecha.charAt(0).toUpperCase() + fecha.slice(1);

        },

        ObtenerEstadoTimeSheet: function () {

            let IdUsuario = parseInt($("#IdUsuarioTimeSheet").text());

            fetch("/TimeSheet/ObtenerEstadoTimeSheet", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(IdUsuario)

            })
                .then(response => response.json())
                .then(data => {

                    if (data.ok) {

                        if (data.valorRetorno != null) {

                            let TimeSheet = data.valorRetorno;

                            //=========================
                            // Estado de la jornada
                            //=========================

                            if (TimeSheet.horaEntrada != null && TimeSheet.horaSalida == null) {

                                $(jsTimeSheet.controles.TituloEstado).text("En jornada");
                                $(jsTimeSheet.controles.DescripcionEstado).text("Has registrado tu entrada. No olvides marcar tu salida.");
                                $(jsTimeSheet.controles.IconoEstado).removeClass().addClass("fa-solid fa-user-check");
                                $(jsTimeSheet.controles.EstadoEntrada).text("Registrada");
                                $(jsTimeSheet.controles.EstadoSalida).text("Pendiente");

                            }
                            else if (TimeSheet.horaEntrada != null && TimeSheet.horaSalida != null) {

                                $(jsTimeSheet.controles.TituloEstado).text("Jornada finalizada");
                                $(jsTimeSheet.controles.DescripcionEstado).text("Has completado tu jornada laboral de hoy.");
                                $(jsTimeSheet.controles.IconoEstado).removeClass().addClass("fa-solid fa-circle-check");
                                $(jsTimeSheet.controles.EstadoEntrada).text("Registrada");
                                $(jsTimeSheet.controles.EstadoSalida).text("Registrada");

                            }
                            else {
                                $(jsTimeSheet.controles.TituloEstado).text("Sin marcar");
                                $(jsTimeSheet.controles.DescripcionEstado).text("Aún no has registrado tu entrada.");
                                $(jsTimeSheet.controles.IconoEstado).removeClass().addClass("fa-solid fa-user-clock");
                                $(jsTimeSheet.controles.EstadoEntrada).text("Pendiente");
                                $(jsTimeSheet.controles.EstadoSalida).text("Pendiente");
                            }

                            //=========================
                            // Hora de entrada
                            //=========================

                            let HoraEntrada = null;
                            let HoraSalida = null;
                            if (TimeSheet.horaEntrada != null) {

                                HoraEntrada = new Date(TimeSheet.horaEntrada);

                                $(jsTimeSheet.controles.LblHoraEntrada).text(

                                    HoraEntrada.toLocaleTimeString("es-CR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: true
                                    })

                                );

                            }

                            //=========================
                            // Hora de salida
                            //=========================

                            if (TimeSheet.horaSalida != null) {

                                HoraSalida = new Date(TimeSheet.horaSalida);

                                $(jsTimeSheet.controles.LblHoraSalida).text(

                                    HoraSalida.toLocaleTimeString("es-CR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: true
                                    })

                                );

                            }

                            //=========================
                            // Tiempo trabajado
                            //=========================

                            if (HoraEntrada != null && HoraSalida != null) {

                                let Diferencia = HoraSalida.getTime() - HoraEntrada.getTime();

                                let TotalMinutos = Math.floor(Diferencia / 60000);

                                let Horas = Math.floor(TotalMinutos / 60);
                                let Minutos = TotalMinutos % 60;

                                $(jsTimeSheet.controles.TiempoTrabajado).text(
                                    `${Horas} h ${Minutos} min`
                                );

                            }
                            else {

                                $(jsTimeSheet.controles.TiempoTrabajado).text("--");

                            }

                            //=========================
                            // Botones
                            //=========================

                            if (TimeSheet.horaEntrada != null &&
                                TimeSheet.horaSalida == null) {

                                $(jsTimeSheet.controles.BtnEntrada).prop("disabled", true);
                                $(jsTimeSheet.controles.BtnSalida).prop("disabled", false);

                            }

                            else if (TimeSheet.horaEntrada != null &&
                                TimeSheet.horaSalida != null) {

                                $(jsTimeSheet.controles.BtnEntrada).prop("disabled", true);
                                $(jsTimeSheet.controles.BtnSalida).prop("disabled", true);

                            }

                        }
                        else {

                            $(jsTimeSheet.controles.TituloEstado).text("Sin marcar");
                            $(jsTimeSheet.controles.DescripcionEstado).text("Aún no has registrado tu entrada.");
                            $(jsTimeSheet.controles.IconoEstado).removeClass().addClass("fa-solid fa-user-clock");

                            $(jsTimeSheet.controles.LblHoraEntrada).text("--:--");
                            $(jsTimeSheet.controles.LblHoraSalida).text("--:--");
                            $(jsTimeSheet.controles.TiempoTrabajado).text("00:00");

                            $(jsTimeSheet.controles.BtnEntrada).prop("disabled", false);
                            $(jsTimeSheet.controles.BtnSalida).prop("disabled", true);

                        }

                    }
                    else {

                        Swal.fire({
                            icon: "warning",
                            title: "Aviso",
                            text: data.mensaje
                        });

                    }

                })
                .catch(error => {

                    console.error(error);

                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un error al consultar el estado del TimeSheet."
                    });

                });

        },

        RegistrarEntrada: function () {

            let ObjTimeSheet = {

                IdUsuario: parseInt($("#IdUsuarioTimeSheet").text()),
                Fecha: new Date(),
                HoraEntrada: new Date()

            };

            fetch("/TimeSheet/RegistrarEntrada", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(ObjTimeSheet)

            })
                .then(response => response.json())
                .then(data => {

                    if (data.ok) {

                        Swal.fire({
                            icon: "success",
                            title: "Éxito",
                            text: data.mensaje,
                            timer: 4000,
                            showConfirmButton: false,
                            timerProgressBar: true
                        });

                        jsTimeSheet.funciones.ObtenerEstadoTimeSheet();

                    }
                    else {

                        Swal.fire({
                            icon: "warning",
                            title: "Aviso",
                            text: data.mensaje
                        });

                    }

                })
                .catch(error => {

                    console.error(error);

                    Swal.fire({
                        icon: "error",
                        title: "Aviso",
                        text: "Ha ocurrido un error al intentar registrar la entrada."
                    });

                });

        },

        RegistrarSalida: function () {

            let ObjTimeSheet = {

                IdUsuario: parseInt($("#IdUsuarioTimeSheet").text())

            };

            fetch("/TimeSheet/RegistrarSalida", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(ObjTimeSheet)

            })
                .then(response => response.json())
                .then(data => {

                    if (data.ok) {

                        Swal.fire({
                            icon: "success",
                            title: "Éxito",
                            text: data.mensaje,
                            timer: 4000,
                            showConfirmButton: false,
                            timerProgressBar: true
                        });

                        jsTimeSheet.funciones.ObtenerEstadoTimeSheet();

                    }
                    else {

                        Swal.fire({
                            icon: "warning",
                            title: "Aviso",
                            text: data.mensaje
                        });

                    }

                })
                .catch(error => {

                    console.error(error);

                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ha ocurrido un error al registrar la salida."
                    });

                });

        },

        AbrirModalBuscarEmpleado: function () {

            let idDepartamento = $(jsTimeSheet.controles.ddlDepartamento).val();

            let tabla = $("#TbBuscarEmpleado").DataTable();

            if (idDepartamento == "0") {

                tabla.search("").draw();

            } else {

                $.fn.dataTable.ext.search = [];

                $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {

                    let fila = tabla.row(dataIndex).node();
                    let departamento = $(fila).data("departamento");

                    return departamento == idDepartamento;

                });

                tabla.draw();

            }

            $("#modalBuscarEmpleado").modal("show");

        },

        GenerarReporte: async function () {

            try {

                if ($(jsTimeSheet.controles.TxtIdEmpleado).val() == "0") {

                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Debe seleccionar un empleado."
                    });

                    return;
                }

                if ($(jsTimeSheet.controles.TxtFechaInicio).val() == "" ||
                    $(jsTimeSheet.controles.TxtFechaFin).val() == "") {

                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Debe seleccionar un rango de fechas."
                    });

                    return;
                }

                let idUsuario = parseInt($("#IdUsuarioTimeSheet").text());

                if ($(jsTimeSheet.controles.TxtIdEmpleado).length > 0) {

                    let idSeleccionado = parseInt($(jsTimeSheet.controles.TxtIdEmpleado).val());

                    if (idSeleccionado > 0) {
                        idUsuario = idSeleccionado;
                    }

                }

                let ObjTimeSheet = {

                    IdUsuario: idUsuario,

                    FechaInicio: $(jsTimeSheet.controles.TxtFechaInicio).val(),

                    FechaFin: $(jsTimeSheet.controles.TxtFechaFin).val()

                };

                let respuesta = await fetch("/TimeSheet/ObtenerReporteTimeSheet", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(ObjTimeSheet)

                });

                let resultado = await respuesta.json();

                if (!resultado.ok) {

                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: resultado.mensaje
                    });

                    return;

                }

                $(jsTimeSheet.controles.BodyReporteTimeSheet).empty();

                if (resultado.valorRetorno.length == 0) {

                    $(jsTimeSheet.controles.ContenedorTablaReporte).hide();

                    Swal.fire({
                        icon: "info",
                        title: "Sin resultados",
                        text: "No existen registros para la búsqueda realizada."
                    });

                    return;
                }
                //==================================================
                // ENCABEZADO DEL REPORTE
                //==================================================

                let primerRegistro = resultado.valorRetorno[0];

                $("#LblEmpleadoReporte").text(primerRegistro.nombreCompleto);

                $("#LblDepartamentoReporte").text(primerRegistro.nombreDepartamento);

                // Formatear período
                let fechaInicio = $(jsTimeSheet.controles.TxtFechaInicio).val().split("-").reverse().join("/");

                let fechaFin = $(jsTimeSheet.controles.TxtFechaFin).val().split("-").reverse().join("/");

                $("#LblPeriodoReporte").text(`${fechaInicio} al ${fechaFin}`);

                // Fecha y hora de generación del reporte
                $("#LblFechaReporte").text(
                    new Date().toLocaleString("es-CR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                    })
                );

                resultado.valorRetorno.forEach(function (item) {

                    let fecha = new Date(item.fecha).toLocaleDateString("es-CR");

                    let entrada = "";

                    if (item.horaEntrada != null) {

                        entrada = new Date(item.horaEntrada).toLocaleTimeString("es-CR", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                        });

                    }

                    let salida = "";

                    if (item.horaSalida != null) {

                        salida = new Date(item.horaSalida).toLocaleTimeString("es-CR", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                        });

                    }

                    let horasTrabajadas = "";

                    if (item.minutosTrabajados != null) {

                        let horas = Math.floor(item.minutosTrabajados / 60);
                        let minutos = item.minutosTrabajados % 60;

                        horasTrabajadas = `${horas}h ${minutos}m`;

                    }

                    let horasExtra = "";

                    if (item.minutosExtra != null) {

                        let horas = Math.floor(item.minutosExtra / 60);
                        let minutos = item.minutosExtra % 60;

                        horasExtra = `${horas}h ${minutos}m`;

                    }

                    let estado = "";

                    if (item.tardia) {
                        estado += `<span class="badge bg-warning text-dark me-1">Tardía</span>`;
                    }

                    if (item.horaSalida == null) {
                        estado += `<span class="badge bg-warning text-dark me-1">Sin salida</span>`;
                    }

                    if (!item.tardia && item.horaSalida != null) {
                        estado += `<span class="badge bg-success">Completo</span>`;
                    }

                    let fila = `
                    <tr>

                        <td>${fecha}</td>

                        <td>${entrada}</td>

                        <td>${salida}</td>

                        <td>${horasTrabajadas}</td>

                        <td>${horasExtra}</td>

                        <td>${estado}</td>

                    </tr>
            `;
                    $("#MensajeInicialReporte").hide();
                    $(jsTimeSheet.controles.BodyReporteTimeSheet).append(fila);

                });

                $(jsTimeSheet.controles.ContenedorTablaReporte).show();

            }
            catch (e) {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: e
                });

            }

        },

        ExportarReportePdf: async function () {

            try {

                if ($(jsTimeSheet.controles.TxtIdEmpleado).val() == "0") {

                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Debe seleccionar un empleado."
                    });

                    return;
                }

                if ($(jsTimeSheet.controles.TxtFechaInicio).val() == "" ||
                    $(jsTimeSheet.controles.TxtFechaFin).val() == "") {

                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Debe seleccionar un rango de fechas."
                    });

                    return;
                }

                let idUsuario = parseInt($("#IdUsuarioTimeSheet").text());

                if ($(jsTimeSheet.controles.TxtIdEmpleado).length > 0) {

                    let idSeleccionado = parseInt($(jsTimeSheet.controles.TxtIdEmpleado).val());

                    if (idSeleccionado > 0) {
                        idUsuario = idSeleccionado;
                    }
                }

                let ObjTimeSheet = {

                    IdUsuario: idUsuario,

                    FechaInicio: $(jsTimeSheet.controles.TxtFechaInicio).val(),

                    FechaFin: $(jsTimeSheet.controles.TxtFechaFin).val()

                };

                let respuesta = await fetch("/TimeSheet/ExportarReportePdf", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(ObjTimeSheet)

                });

                if (!respuesta.ok) {

                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No fue posible generar el PDF."
                    });

                    return;
                }

                const blob = await respuesta.blob();

                const url = window.URL.createObjectURL(blob);

                window.open(url, "_blank");

            }
            catch (e) {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: e
                });

            }

        },

        InicializarTablaBuscarEmpleado: function () {

            if ($.fn.DataTable.isDataTable("#TbBuscarEmpleado")) {
                return;
            }

            $("#TbBuscarEmpleado").DataTable({

                pageLength: 10,
                lengthChange: false,
                ordering: true,
                searching: true,
                info: true,
                autoWidth: false,

                language: {
                    url: "https://cdn.datatables.net/plug-ins/2.3.2/i18n/es-ES.json"
                }

            });

        },

    }

}

$(document).ready(function () {

    jsTimeSheet.iniciar();

});

