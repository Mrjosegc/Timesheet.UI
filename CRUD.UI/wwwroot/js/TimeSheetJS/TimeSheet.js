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
        SelectTipoReporte: "#SelectTipoReporte",
        ddlDepartamento: "#ddlDepartamento",
        TxtIdEmpleado: "#txtIdEmpleado",
        TxtEmpleado: "#txtEmpleado",

        TxtFechaInicio: "#txtFechaInicio",
        TxtFechaFin: "#txtFechaFin",

        BodyReporteTimeSheet: "#BodyReporteTimeSheet",

        ContenedorReporteMarcas: "#ContenedorReporteMarcas",
        ContenedorReporteAusencias: "#ContenedorReporteAusencias",
        ContenedorReporteTardias: "#ContenedorReporteTardias",
        TituloReporte: "#TituloReporte",
        BtnGenerarReporte: "#BtnGenerarReporte",
        BtnExportarPdf: "#BtnExportarPdf",

        LblEmpleadoReporteTardias: "#LblEmpleadoReporteTardias",
        LblDepartamentoReporteTardias: "#LblDepartamentoReporteTardias",
        LblPeriodoReporteTardias: "#LblPeriodoReporteTardias",
        LblFechaReporteTardias: "#LblFechaReporteTardias",

        MensajeInicialReporteTardias: "#MensajeInicialReporteTardias",
        ContenidoReporteTardias: "#ContenidoReporteTardias",

        BodyReporteTardias: "#BodyReporteTardias",
    },

    iniciar: function () {

        jsTimeSheet.eventos();

        jsTimeSheet.funciones.InicializarTablaBuscarEmpleado();

        jsTimeSheet.funciones.CambiarTipoReporte();

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

            switch ($(jsTimeSheet.controles.SelectTipoReporte).val()) {

                case "Marcas":
                    jsTimeSheet.funciones.GenerarReporteMarcas();
                    break;

                case "Ausencias":
                    jsTimeSheet.funciones.GenerarReporteAusencias();
                    break;

                case "Tardias":
                    jsTimeSheet.funciones.GenerarReporteTardias();
                    break;
            }

        });

        $(jsTimeSheet.controles.BtnExportarPdf).click(function () {

            switch ($(jsTimeSheet.controles.SelectTipoReporte).val()) {

                case "Marcas":

                    jsTimeSheet.funciones.ExportarReporteMarcasPdf();

                    break;

                case "Ausencias":

                    jsTimeSheet.funciones.ExportarReporteAusenciasPdf();

                    break;

                case "Tardias":

                    jsTimeSheet.funciones.ExportarReporteTardiasPdf();

                    break;

            }

        });

        $(jsTimeSheet.controles.ddlDepartamento).change(function () {

            $(jsTimeSheet.controles.TxtIdEmpleado).val("0");
            $(jsTimeSheet.controles.TxtEmpleado).val("");

        });

        $(jsTimeSheet.controles.SelectTipoReporte).change(function () {

            let tipoReporte = $(this).val();

            console.log(tipoReporte);

        });

        $(jsTimeSheet.controles.SelectTipoReporte).change(function () {

            jsTimeSheet.funciones.CambiarTipoReporte();

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

        GenerarReporteMarcas: async function () {

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

                    $("#MensajeInicialReporte").show();
                    $("#ContenidoReporteMarcas").hide();

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

                $("#MensajeInicialReporte").hide();
                $("#ContenidoReporteMarcas").show();

            }
            catch (e) {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: e
                });

            }

        },

        GenerarReporteTardias: async function () {

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

                $(jsTimeSheet.controles.BodyReporteTardias).empty();

                if (resultado.valorRetorno.length == 0) {

                    $("#MensajeInicialReporteTardias").show();
                    $("#ContenidoReporteTardias").hide();

                    Swal.fire({
                        icon: "info",
                        title: "Sin resultados",
                        text: "No existen registros para la búsqueda realizada."
                    });

                    return;
                }

                let primerRegistro = resultado.valorRetorno[0];

                $("#LblEmpleadoReporteTardias").text(primerRegistro.nombreCompleto);

                $("#LblDepartamentoReporteTardias").text(primerRegistro.nombreDepartamento);

                let fechaInicio = $(jsTimeSheet.controles.TxtFechaInicio).val().split("-").reverse().join("/");

                let fechaFin = $(jsTimeSheet.controles.TxtFechaFin).val().split("-").reverse().join("/");

                $("#LblPeriodoReporteTardias").text(`${fechaInicio} al ${fechaFin}`);

                $("#LblFechaReporteTardias").text(
                    new Date().toLocaleString("es-CR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                    })
                );

                let totalDiasTardia = 0;
                let totalMinutosTardia = 0;

                resultado.valorRetorno
                    .filter(x => x.tardia)
                    .forEach(function (item) {
                        let fecha = new Date(item.fecha).toLocaleDateString("es-CR");

                        let horaEsperada = "";

                        if (item.horaEntradaPuesto != null) {

                            horaEsperada = item.horaEntradaPuesto.substring(0, 5);

                        }

                        let horaEntrada = "";

                        if (item.horaEntrada != null) {

                            horaEntrada = new Date(item.horaEntrada).toLocaleTimeString("es-CR", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true
                            });

                        }

                        let minutosTardia = 0;

                        if (item.horaEntrada != null && item.horaEntradaPuesto != null) {

                            let entrada = new Date(item.horaEntrada);

                            let partes = item.horaEntradaPuesto.split(":");

                            let horaProgramada = new Date(item.horaEntrada);

                            horaProgramada.setHours(parseInt(partes[0]));
                            horaProgramada.setMinutes(parseInt(partes[1]));
                            horaProgramada.setSeconds(0);

                            minutosTardia = Math.floor((entrada - horaProgramada) / 60000);

                        }

                        totalDiasTardia++;
                        totalMinutosTardia += minutosTardia;

                        let fila = `
                        <tr>

                            <td>${fecha}</td>

                            <td>${horaEsperada}</td>

                            <td>${horaEntrada}</td>

                            <td>${minutosTardia} min</td>

                        </tr>
                        `;

                        $("#MensajeInicialReporteTardias").hide();

                        $(jsTimeSheet.controles.BodyReporteTardias).append(fila);

                    });
                    let filaResumen = `
                        <tr class="table-primary fw-bold text-center">

                            <td colspan="3" class="text-end">
                                Total de tardías:
                                <strong>4</strong>
                            </td>

                            <td>
                                <strong>1616 min</strong>
                            </td>

                        </tr>
                        `;

                $(jsTimeSheet.controles.BodyReporteTardias).append(filaResumen);

                $("#MensajeInicialReporteTardias").hide();

                $("#ContenidoReporteTardias").show();

            }
            catch (e) {

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: e
                });

            }

        },

        GenerarReporteAusencias: async function () {

            Swal.fire({
                icon: "info",
                title: "Próximamente",
                text: "Reporte de Ausencias"
            });

        },

        ExportarReporteMarcasPdf: async function () {

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

        ExportarReporteTardiasPdf: async function () {

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

                let respuesta = await fetch("/TimeSheet/ExportarReporteTardiasPdf", {

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

        ExportarReporteAusenciasPdf: function () {

            Swal.fire({
                icon: "info",
                title: "Próximamente",
                text: "Exportar Reporte de Ausencias"
            });

        },

        CambiarTipoReporte: function () {

            let tipoReporte = $(jsTimeSheet.controles.SelectTipoReporte).val();

            $("#ContenedorReporteMarcas").hide();
            $("#ContenedorReporteAusencias").hide();
            $("#ContenedorReporteTardias").hide();

            switch (tipoReporte) {

                case "Marcas":

                    $("#TituloReporte").text("Reporte de Marcas");
                    $("#ContenedorReporteMarcas").show();

                    break;

                case "Ausencias":

                    $("#TituloReporte").text("Reporte de Ausencias");
                    $("#ContenedorReporteAusencias").show();

                    break;

                case "Tardias":

                    $("#TituloReporte").text("Reporte de Tardías");
                    $("#ContenedorReporteTardias").show();

                    break;
            }

        },

    }

}

$(document).ready(function () {

    jsTimeSheet.iniciar();

});

