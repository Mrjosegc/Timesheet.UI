using CRUD.ENTIDADES;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.Globalization;

namespace CRUD.UI.Reportes
{
    public class ReporteTardiasPdf : IDocument
    {
        private readonly ReporteMarcasPdfDTO _reporte;

        public ReporteTardiasPdf(ReporteMarcasPdfDTO reporte)
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

                    column.Item()
                        .AlignRight()
                        .Text($"Fecha del reporte: {_reporte.FechaReporte:dd/MM/yyyy hh:mm tt}");

                    column.Item()
                        .Text("REPORTE DE TARDÍAS")
                        .FontSize(20)
                        .Bold()
                        .AlignCenter();

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

                    column.Item().Table(table =>
                    {
                        table.ColumnsDefinition(columns =>
                        {
                            columns.RelativeColumn(2);
                            columns.RelativeColumn(2);
                            columns.RelativeColumn(2);
                            columns.RelativeColumn(2);
                        });

                        table.Header(header =>
                        {
                            header.Cell().BorderBottom(0.5f).Padding(5).AlignCenter().Text("Fecha").Bold();
                            header.Cell().BorderBottom(0.5f).Padding(5).AlignCenter().Text("Hora Esperada").Bold();
                            header.Cell().BorderBottom(0.5f).Padding(5).AlignCenter().Text("Hora Entrada").Bold();
                            header.Cell().BorderBottom(0.5f).Padding(5).AlignCenter().Text("Minutos Tardía").Bold();
                        });

                        int totalTardias = 0;
                        int totalMinutos = 0;

                        foreach (var marca in _reporte.Marcas.Where(x => x.Tardia))
                        {
                            int minutosTardia = 0;

                            if (marca.HoraEntrada.HasValue)
                            {
                                DateTime horaProgramada = marca.HoraEntrada.Value.Date + marca.HoraEntradaPuesto;

                                minutosTardia = (int)(marca.HoraEntrada.Value - horaProgramada).TotalMinutes;
                            }

                            totalTardias++;
                            totalMinutos += minutosTardia;

                            table.Cell()
                                .BorderBottom(0.5f)
                                .Padding(5)
                                .AlignCenter()
                                .Text(marca.Fecha.ToString("dd/MM/yyyy"));

                            table.Cell()
                                .BorderBottom(0.5f)
                                .Padding(5)
                                .AlignCenter()
                                .Text(marca.HoraEntradaPuesto.ToString(@"hh\:mm"));

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
                                .Text($"{minutosTardia} min");
                        }

                        table.Cell()
                            .ColumnSpan(3)
                            .BorderTop(1)
                            .Padding(5)
                            .AlignRight()
                            .Text($"Total de tardías: {totalTardias}")
                            .Bold();

                        table.Cell()
                            .BorderTop(1)
                            .Padding(5)
                            .AlignCenter()
                            .Text($"{totalMinutos} min")
                            .Bold();
                    });
                });
            });
        }
    }
}