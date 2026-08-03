using CRUD.ENTIDADES;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.Globalization;

namespace CRUD.UI.Reportes
{
    public class ReporteMarcasPdf : IDocument
    {
        private readonly ReporteMarcasPdfDTO _reporte;

        public ReporteMarcasPdf(ReporteMarcasPdfDTO reporte)
        {
            _reporte = reporte;
        }

        public DocumentMetadata GetMetadata()
            => DocumentMetadata.Default;

        public void Compose(IDocumentContainer container)
        {
            container.Page(page =>
            {
                page.Size(PageSizes.Letter);
                page.Margin(30);

                page.Content().Column(column =>
                {
                    column.Spacing(15);

                    // Fecha del reporte
                    column.Item()
                        .AlignRight()
                        .Text($"Fecha del reporte: {_reporte.FechaReporte.ToString("dd/MM/yyyy hh:mm tt", new CultureInfo("es-CR"))}");

                    // Título
                    column.Item()
                        .Text("REPORTE DE MARCAS")
                        .FontSize(20)
                        .Bold()
                        .AlignCenter();

                    // Encabezado
                    column.Item().Row(row =>
                    {
                        row.RelativeItem().Column(col =>
                        {
                            col.Item().Text($"Empleado: {_reporte.NombreEmpleado}");
                            col.Item().Text($"Cédula: {_reporte.Cedula}");
                        });

                        row.RelativeItem().Column(col =>
                        {
                            col.Item().Text($"Departamento: {_reporte.NombreDepartamento}");
                            col.Item().Text($"Período: {_reporte.Periodo}");
                        });
                    });

                    // Tabla
                    column.Item().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn(2); // Fecha
                            columns.RelativeColumn(2); // Entrada
                            columns.RelativeColumn(2); // Salida
                            columns.RelativeColumn(2); // Horas Trabajadas
                            columns.RelativeColumn(2); // Horas Extra
                            columns.RelativeColumn(3); // Estado
                        });

                        table.Header(header =>
                        {
                            header.Cell().BorderBottom(0.5f).Padding(5).AlignCenter().Text("Fecha").Bold();
                            header.Cell().BorderBottom(0.5f).Padding(5).AlignCenter().Text("Entrada").Bold();
                            header.Cell().BorderBottom(0.5f).Padding(5).AlignCenter().Text("Salida").Bold();
                            header.Cell().BorderBottom(0.5f).Padding(5).AlignCenter().Text("Horas Trabajadas").Bold();
                            header.Cell().BorderBottom(0.5f).Padding(5).AlignCenter().Text("Horas Extra").Bold();
                            header.Cell().BorderBottom(0.5f).Padding(5).AlignCenter().Text("Estado").Bold();
                        });

                        foreach (var marca in _reporte.Marcas)
                        {
                            //==========================================================
                            // ESTADO
                            //==========================================================

                            string estado = "";

                            if (marca.Tardia)
                            {
                                estado += "Tardía";
                            }

                            if (marca.HoraSalida == null)
                            {
                                if (!string.IsNullOrEmpty(estado))
                                {
                                    estado += " | ";
                                }

                                estado += "Sin salida";
                            }

                            if (marca.HoraSalida != null)
                            {
                                if (!string.IsNullOrEmpty(estado))
                                {
                                    estado += " | ";
                                }

                                estado += "Completo";
                            }

                            table.Cell()
                                .BorderBottom(0.5f)
                                .Padding(5)
                                .AlignCenter()
                                .Text(marca.Fecha.ToString("dd/MM/yyyy"));

                            table.Cell()
                                .BorderBottom(0.5f)
                                .Padding(5)
                                .AlignCenter()
                                .Text(
                                    marca.HoraEntrada.HasValue
                                        ? marca.HoraEntrada.Value.ToString("hh:mm tt", new CultureInfo("es-CR"))
                                        : "-"
                                );

                            table.Cell()
                                .BorderBottom(0.5f)
                                .Padding(5)
                                .AlignCenter()
                                .Text(
                                    marca.HoraSalida.HasValue
                                        ? marca.HoraSalida.Value.ToString("hh:mm tt", new CultureInfo("es-CR"))
                                        : "-"
                                );

                            table.Cell()
                                .BorderBottom(0.5f)
                                .Padding(5)
                                .AlignCenter()
                                .Text(
                                    marca.MinutosTrabajados.HasValue
                                        ? TimeSpan.FromMinutes(marca.MinutosTrabajados.Value).ToString(@"hh\:mm")
                                        : "-"
                                );

                            table.Cell()
                                .BorderBottom(0.5f)
                                .Padding(5)
                                .AlignCenter()
                                .Text(
                                    marca.MinutosExtra.HasValue
                                        ? TimeSpan.FromMinutes(marca.MinutosExtra.Value).ToString(@"hh\:mm")
                                        : "-"
                                );

                            table.Cell()
                                .BorderBottom(0.5f)
                                .Padding(5)
                                .AlignCenter()
                                .Text(estado);
                        }

                    });
                });
            });
        }
    }
}