using CRUD.ENTIDADES;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace CRUD.UI.Reportes
{
    public class ReporteAusenciasPdf : IDocument
    {
        private readonly ReporteMarcasPdfDTO _reporte;

        public ReporteAusenciasPdf(ReporteMarcasPdfDTO reporte)
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
                        .Text("REPORTE DE AUSENCIAS")
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
                            columns.RelativeColumn(3);
                            columns.RelativeColumn(2);
                        });

                        table.Header(header =>
                        {
                            header.Cell().BorderBottom(0.5f).Padding(5).AlignCenter().Text("Fecha").Bold();
                            header.Cell().BorderBottom(0.5f).Padding(5).AlignCenter().Text("Estado").Bold();
                        });

                        int totalAusencias = 0;

                        foreach (var ausencia in _reporte.Marcas)
                        {
                            totalAusencias++;

                            table.Cell()
                                .BorderBottom(0.5f)
                                .Padding(5)
                                .AlignCenter()
                                .Text(ausencia.Fecha.ToString("dd/MM/yyyy"));

                            table.Cell()
                                .BorderBottom(0.5f)
                                .Padding(5)
                                .AlignCenter()
                                .Text("Ausente");
                        }

                        table.Cell()
                            .ColumnSpan(1)
                            .BorderTop(1)
                            .Padding(5)
                            .AlignRight()
                            .Text("Total de ausencias:")
                            .Bold();

                        table.Cell()
                            .BorderTop(1)
                            .Padding(5)
                            .AlignCenter()
                            .Text(totalAusencias.ToString())
                            .Bold();
                    });
                });
            });
        }
    }
}