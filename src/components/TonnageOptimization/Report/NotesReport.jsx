import { Stimulsoft } from "stimulsoft-reports-js/Scripts/stimulsoft.reports";

export async function generateNotesSection({
    report,
    data,
    addPageHeader,
    addPageFooter,
    isCancelled
}) {
    if (!data) return;

    // Register Data using standard JSON objects
    report.regData("NotesDB", "NotesDB", { NotesTable: [{ Content: data }] });
    report.dictionary.synchronize();

    const page = new Stimulsoft.Report.Components.StiPage(report);
    page.orientation = Stimulsoft.Report.Components.StiPageOrientation.Landscape;
    page.pageWidth = 11.69;
    page.pageHeight = 8.27;
    page.margins = new Stimulsoft.Report.Components.StiMargins(0.3, 0.3, 0.3, 0.3);
    report.pages.add(page);

    // Header & Footer
    addPageHeader(page, "Notes");
    addPageFooter(page);

    // --- DATA BAND ---
    const dataBand = new Stimulsoft.Report.Components.StiDataBand();
    dataBand.dataSourceName = "NotesTable";
    dataBand.height = 1.0;
    dataBand.canGrow = true;
    dataBand.canShrink = true;
    dataBand.splitType = 2; // 2 = Allow
    page.components.add(dataBand);

    // Notes Text
    const text = new Stimulsoft.Report.Components.StiText();
    text.clientRectangle = new Stimulsoft.Base.Drawing.RectangleD(0, 0, 11.09, 1.0);
    text.text = "{NotesTable.Content}";
    text.font = new Stimulsoft.System.Drawing.Font("Verdana", 9);
    text.canGrow = true;
    text.canBreak = true; // Crucial for multi-page text
    text.wordWrap = true;
    text.allowHtmlTags = true;
    dataBand.components.add(text);
}
