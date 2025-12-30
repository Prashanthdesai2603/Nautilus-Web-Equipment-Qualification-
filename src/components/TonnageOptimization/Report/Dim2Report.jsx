import { Stimulsoft } from "stimulsoft-reports-js/Scripts/stimulsoft.reports";

export async function generateDim2Section({
    report,
    data,
    chartImage,
    addPageHeader,
    addPageFooter,
    isCancelled
}) {
    const safeData = Array.isArray(data) ? data : [];

    const tableData = safeData.filter(row => {
        if (!Array.isArray(row)) return false;
        const tonnage = row[0];
        const samples = [row[1], row[2], row[3]];
        const hasTonnage = tonnage !== "" && tonnage !== null && tonnage !== undefined;
        const hasSamples = samples.some(s => s !== "" && s !== null && s !== undefined);
        return hasTonnage && hasSamples;
    }).map(r => ({
        Tonnage: String(r[0] || ""),
        Sample1: r[1] !== "" && r[1] !== null ? parseFloat(r[1]).toFixed(2) : "",
        Sample2: r[2] !== "" && r[2] !== null ? parseFloat(r[2]).toFixed(2) : "",
        Sample3: r[3] !== "" && r[3] !== null ? parseFloat(r[3]).toFixed(2) : "",
        Average: r[4] !== "" && r[4] !== null ? parseFloat(r[4]).toFixed(2) : "",
        Actual: r[5] !== "" && r[5] !== null ? parseFloat(r[5]).toFixed(2) : "",
        Percent: r[6] !== "" && r[6] !== null ? parseFloat(r[6]).toFixed(2) : ""
    }));

    if (tableData.length === 0) return;

    report.regData("Dim2DB", "Dim2DB", { Dim2Table: tableData });
    report.dictionary.synchronize();

    const page = new Stimulsoft.Report.Components.StiPage(report);
    page.orientation = Stimulsoft.Report.Components.StiPageOrientation.Landscape;
    page.pageWidth = 11.69;
    page.pageHeight = 8.27;
    page.margins = new Stimulsoft.Report.Components.StiMargins(0.3, 0.3, 0.3, 0.3);
    report.pages.add(page);

    addPageHeader(page, "Dim2");
    addPageFooter(page);

    if (chartImage) {
        const overlayBand = new Stimulsoft.Report.Components.StiOverlayBand();
        overlayBand.height = 5.0;
        overlayBand.printOn = 1; // 1 = OnlyFirstPage
        page.components.add(overlayBand);

        const chartLeft = 6.0;
        const chartTop = 0.15;
        const chartWidth = 5.0;
        const chartHeight = 4.5;

        const chartLabel = new Stimulsoft.Report.Components.StiText();
        chartLabel.clientRectangle = new Stimulsoft.Base.Drawing.RectangleD(chartLeft, chartTop, 3.5, 0.3);
        chartLabel.text = "Tonnage Dim2 Chart";
        chartLabel.font = new Stimulsoft.System.Drawing.Font("Verdana", 9, Stimulsoft.System.Drawing.FontStyle.Regular);
        chartLabel.border = new Stimulsoft.Base.Drawing.StiBorder(Stimulsoft.Base.Drawing.StiBorderSides.All, Stimulsoft.System.Drawing.Color.black, 1);
        chartLabel.brush = new Stimulsoft.Base.Drawing.StiSolidBrush(Stimulsoft.System.Drawing.Color.LightGray);
        overlayBand.components.add(chartLabel);

        const chartImg = new Stimulsoft.Report.Components.StiImage();
        chartImg.clientRectangle = new Stimulsoft.Base.Drawing.RectangleD(chartLeft, chartTop + 0.35, chartWidth, chartHeight);
        chartImg.file = chartImage;
        chartImg.stretch = true;
        chartImg.border = new Stimulsoft.Base.Drawing.StiBorder(Stimulsoft.Base.Drawing.StiBorderSides.All, Stimulsoft.System.Drawing.Color.black, 1);
        overlayBand.components.add(chartImg);
    }

    const tableHeaderBand = new Stimulsoft.Report.Components.StiHeaderBand();
    tableHeaderBand.height = 0.8;
    tableHeaderBand.printOnAllPages = true;
    page.components.add(tableHeaderBand);

    const dataLabel = new Stimulsoft.Report.Components.StiText();
    dataLabel.clientRectangle = new Stimulsoft.Base.Drawing.RectangleD(0.3, 0.1, 2.5, 0.3);
    dataLabel.text = "Data View";
    dataLabel.font = new Stimulsoft.System.Drawing.Font("Verdana", 9, Stimulsoft.System.Drawing.FontStyle.Regular);
    dataLabel.border = new Stimulsoft.Base.Drawing.StiBorder(Stimulsoft.Base.Drawing.StiBorderSides.All, Stimulsoft.System.Drawing.Color.black, 1);
    dataLabel.brush = new Stimulsoft.Base.Drawing.StiSolidBrush(Stimulsoft.System.Drawing.Color.LightGray);
    tableHeaderBand.components.add(dataLabel);

    const colWidths = [0.7, 0.75, 0.75, 0.75, 0.9, 0.85, 0.85];
    const columns = ["Tonnage", "Sample 1", "Sample 2", "Sample 3", "Avg Dim 2", "Actual Increase", "% Increase"];

    let xOffset = 0.3;
    columns.forEach((col, i) => {
        const headerText = new Stimulsoft.Report.Components.StiText();
        headerText.clientRectangle = new Stimulsoft.Base.Drawing.RectangleD(xOffset, 0.45, colWidths[i], 0.35);
        headerText.text = col;
        headerText.horAlignment = Stimulsoft.Base.Drawing.StiTextHorAlignment.Center;
        headerText.vertAlignment = Stimulsoft.Base.Drawing.StiVertAlignment.Center;
        headerText.font = new Stimulsoft.System.Drawing.Font("Verdana", 7, Stimulsoft.System.Drawing.FontStyle.Bold);
        headerText.brush = new Stimulsoft.Base.Drawing.StiSolidBrush(Stimulsoft.System.Drawing.Color.LightGray);
        headerText.border = new Stimulsoft.Base.Drawing.StiBorder(Stimulsoft.Base.Drawing.StiBorderSides.All, Stimulsoft.System.Drawing.Color.black, 1);
        headerText.wordWrap = true;
        tableHeaderBand.components.add(headerText);
        xOffset += colWidths[i];
    });

    const dataBand = new Stimulsoft.Report.Components.StiDataBand();
    dataBand.dataSourceName = "Dim2Table";
    dataBand.height = 0.35;
    dataBand.canGrow = true;
    dataBand.canShrink = true;
    dataBand.splitType = 2; // 2 = Allow
    dataBand.keepTogether = false;
    page.components.add(dataBand);

    const colKeys = ["Tonnage", "Sample1", "Sample2", "Sample3", "Average", "Actual", "Percent"];
    xOffset = 0.3;
    colKeys.forEach((key, i) => {
        const rowText = new Stimulsoft.Report.Components.StiText();
        rowText.clientRectangle = new Stimulsoft.Base.Drawing.RectangleD(xOffset, 0, colWidths[i], 0.35);
        rowText.text = "{Dim2Table." + key + "}";
        rowText.horAlignment = Stimulsoft.Base.Drawing.StiTextHorAlignment.Center;
        rowText.vertAlignment = Stimulsoft.Base.Drawing.StiVertAlignment.Center;
        rowText.font = new Stimulsoft.System.Drawing.Font("Verdana", 7);
        rowText.border = new Stimulsoft.Base.Drawing.StiBorder(Stimulsoft.Base.Drawing.StiBorderSides.All, Stimulsoft.System.Drawing.Color.black, 1);
        dataBand.components.add(rowText);
        xOffset += colWidths[i];
    });
}
