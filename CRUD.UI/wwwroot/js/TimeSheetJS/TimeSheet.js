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

        btnBuscarEmpleado: "#btnBuscarEmpleado"
    },

    iniciar: function () {

        jsTimeSheet.eventos();

        jsTimeSheet.funciones.ActualizarReloj();
        setInterval(jsTimeSheet.funciones.ActualizarReloj, 1000);

        jsTimeSheet.funciones.ObtenerEstadoTimeSheet();

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

            $("#modalBuscarEmpleado").modal("show");

        },
    }

}

$(document).ready(function () {

    jsTimeSheet.iniciar();

});

