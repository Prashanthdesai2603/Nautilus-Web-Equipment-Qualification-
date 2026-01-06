import React, { useEffect, useRef, useState } from 'react';
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.reports';
import 'stimulsoft-reports-js/Scripts/stimulsoft.viewer';

import { generateStudyWeightSection } from "./StudyWeightReport";
import { generateDim1Section } from "./Dim1Report";
import { generateDim2Section } from "./Dim2Report";
import { generateNotesSection } from "./NotesReport";
import { captureTonnageChart } from "./TonnageChartUtils";

import "./report.css";

const TonnageReport = ({
    session,
    SessionName,
    MoldName,
    selectedPrintSections,
    onClose
}) => {
    const viewerRef = useRef(null);
    const [error, setError] = useState(null);

    // Data State
    const [studyWeightData, setStudyWeightData] = useState(null);
    const [dim1Data, setDim1Data] = useState(null);
    const [dim2Data, setDim2Data] = useState(null);
    const [notesData, setNotesData] = useState(null);

    // Load Data Effect
    useEffect(() => {
        try {
            const sessionId = session?.id || "";
            const swKey = sessionId ? `studyWeightData_${sessionId}` : "studyWeightData";
            const d1Key = sessionId ? `dim1Data_${sessionId}` : "dim1Data";
            const d2Key = sessionId ? `dim2Data_${sessionId}` : "dim2Data";
            const nKey = sessionId ? `notesData_${sessionId}` : "notesData";

            setStudyWeightData(JSON.parse(localStorage.getItem(swKey)));
            setDim1Data(JSON.parse(localStorage.getItem(d1Key)));
            setDim2Data(JSON.parse(localStorage.getItem(d2Key)));
            setNotesData(localStorage.getItem(nKey));

        } catch (e) {
            console.error("Error loading report data", e);
        }
    }, [session]);

    // Report Generation Effect
    useEffect(() => {
        const originalMargin = document.body.style.margin;
        const originalPadding = document.body.style.padding;
        const originalOverflow = document.body.style.overflow;

        // document.body.style.margin = '0';
        // document.body.style.padding = '0';
        // document.body.style.overflow = 'hidden';

        let isCancelled = false;

        // Chart Data Helper
        const prepareChartData = (dataRows, title, yAxisLabel) => {
            if (!dataRows || !Array.isArray(dataRows) || dataRows.length === 0) return null;

            // Filter valid rows
            const valid = dataRows.filter(r => r && r[0] !== "" && r[4] !== ""); // Tonnage and Average valid
            if (valid.length === 0) return null;

            // Sort by Tonnage
            const sorted = [...valid].sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));

            const xValues = sorted.map(r => r[0]); // Tonnage
            const yValues = sorted.map(r => r[4]); // Average (Weight/Dim)

            return {
                data: [{
                    x: xValues,
                    y: yValues,
                    text: yValues.map(v => String(v)), // Display values
                    textposition: 'top center',
                    type: 'scatter',
                    mode: 'lines+markers+text',
                    marker: {
                        color: 'white',
                        size: 8,
                        line: { color: 'orange', width: 2 }
                    },
                    line: { color: 'orange', width: 3 },
                    name: 'Average Weight' // Legend name
                }],
                layout: {
                    title: { text: title, font: { size: 16 } },
                    xaxis: { title: '<b>Tonnage</b>', gridcolor: '#d3d3d3', zeroline: true },
                    yaxis: { title: '<b>' + yAxisLabel + '</b>', gridcolor: '#d3d3d3', zeroline: true }, // Bold title
                    plot_bgcolor: 'white',
                    paper_bgcolor: '#E0E0E0', // Light gray background for the container
                    margin: { l: 50, r: 20, t: 40, b: 80 }, // Increase bottom margin for legend
                    width: 800,
                    height: 600,
                    showlegend: true,
                    legend: {
                        orientation: 'h',
                        x: 0.5,
                        xanchor: 'center',
                        y: -0.2 // Below plot
                    }
                }
            };
        };

        const generateReport = async () => {
            try {
                // 1. Generate Charts First
                let swChart = "";
                let d1Chart = "";
                let d2Chart = "";

                if (selectedPrintSections.StudyWeight && studyWeightData) {
                    const chartConfig = prepareChartData(studyWeightData, "Tonnage Study Weight Chart", "Average Weight");
                    if (chartConfig) swChart = await captureTonnageChart(chartConfig);
                }
                if (selectedPrintSections.Dim1 && dim1Data) {
                    const chartConfig = prepareChartData(dim1Data, "Tonnage Dim1 Chart", "Average Dim 1");
                    if (chartConfig) d1Chart = await captureTonnageChart(chartConfig);
                }
                if (selectedPrintSections.Dim2 && dim2Data) {
                    const chartConfig = prepareChartData(dim2Data, "Tonnage Dim2 Chart", "Average Dim 2");
                    if (chartConfig) d2Chart = await captureTonnageChart(chartConfig);
                }

                if (isCancelled) return;

                // 2. Stimulsoft Setup
                const report = new Stimulsoft.Report.StiReport();
                report.reportUnit = Stimulsoft.Report.StiReportUnitType.Inches;
                report.pages.clear();

                const currentDate = new Date().toLocaleString("en-GB", {
                    day: '2-digit', month: '2-digit', year: 'numeric'
                });

                // --- HELPER: HEADER (PDF 2x2 Grid Style) ---
                const addPageHeader = (page, sectionTitle) => {
                    const headerBand = new Stimulsoft.Report.Components.StiPageHeaderBand();
                    headerBand.height = 2.0;
                    page.components.add(headerBand);

                    // 1. Main Section Title (Centered)
                    const title = new Stimulsoft.Report.Components.StiText();
                    title.clientRectangle = new Stimulsoft.Base.Drawing.RectangleD(0, 0.2, page.width, 0.4);
                    title.text = "Tonnage Study " + sectionTitle + " Report"; // e.g. "Tonnage Study Weight Report"
                    if (sectionTitle === "Notes") title.text = "Notes Report";

                    title.horAlignment = Stimulsoft.Base.Drawing.StiTextHorAlignment.Center;
                    title.font = new Stimulsoft.System.Drawing.Font("Verdana", 12, Stimulsoft.System.Drawing.FontStyle.Bold);
                    headerBand.components.add(title);

                    // 2. 2x2 Metadata Grid 
                    // Layout:
                    // Row 1: Date | User Name
                    // Row 2: Mold No | Session Name
                    const gridTop = 0.8;
                    const rowHeight = 0.35;
                    const gridWidth = 10; // Fixed width centered ~ish
                    const gridLeft = (page.width - gridWidth) / 2;
                    const colWidth = gridWidth / 2;

                    const border = new Stimulsoft.Base.Drawing.StiBorder(Stimulsoft.Base.Drawing.StiBorderSides.All, Stimulsoft.System.Drawing.Color.black, 1);
                    const font = new Stimulsoft.System.Drawing.Font("Verdana", 9, Stimulsoft.System.Drawing.FontStyle.Regular);

                    // Helper to create cell
                    const addCell = (text, x, y, align = Stimulsoft.Base.Drawing.StiTextHorAlignment.Center) => {
                        const cell = new Stimulsoft.Report.Components.StiText();
                        cell.clientRectangle = new Stimulsoft.Base.Drawing.RectangleD(x, y, colWidth, rowHeight);
                        cell.text = text;
                        cell.font = font;
                        cell.horAlignment = align;
                        cell.vertAlignment = Stimulsoft.Base.Drawing.StiVertAlignment.Center;
                        cell.border = border;
                        headerBand.components.add(cell);
                    };

                    // Row 1
                    addCell(`Date: ${currentDate}`, gridLeft, gridTop);
                    addCell(`User Name: ${session?.userName || "Admin"}`, gridLeft + colWidth, gridTop);

                    // Row 2
                    addCell(`Mold No: ${MoldName}`, gridLeft, gridTop + rowHeight);
                    addCell(`Session Name: ${SessionName}`, gridLeft + colWidth, gridTop + rowHeight);

                    return headerBand;
                };

                // --- HELPER: FOOTER ---
                const addPageFooter = (page) => {
                    const footerBand = new Stimulsoft.Report.Components.StiPageFooterBand();
                    footerBand.height = 0.6;
                    page.components.add(footerBand);

                    const fontSmall = new Stimulsoft.System.Drawing.Font("Verdana", 8, Stimulsoft.System.Drawing.FontStyle.Regular);

                    // Page Number
                    const pageNumText = new Stimulsoft.Report.Components.StiText();
                    pageNumText.clientRectangle = new Stimulsoft.Base.Drawing.RectangleD(page.width - 4.2, 0.1, 4, 0.4);
                    pageNumText.text = "Page {PageNumber} of {TotalPageCount}";
                    pageNumText.horAlignment = Stimulsoft.Base.Drawing.StiTextHorAlignment.Right;
                    pageNumText.font = fontSmall;
                    footerBand.components.add(pageNumText);
                };

                // Generate Sections
                if (selectedPrintSections.StudyWeight) {
                    await generateStudyWeightSection({
                        report,
                        data: studyWeightData,
                        chartImage: swChart,
                        addPageHeader,
                        addPageFooter,
                        isCancelled
                    });
                }

                if (selectedPrintSections.Dim1) {
                    await generateDim1Section({
                        report,
                        data: dim1Data,
                        chartImage: d1Chart,
                        addPageHeader,
                        addPageFooter,
                        isCancelled
                    });
                }

                if (selectedPrintSections.Dim2) {
                    await generateDim2Section({
                        report,
                        data: dim2Data,
                        chartImage: d2Chart,
                        addPageHeader,
                        addPageFooter,
                        isCancelled
                    });
                }

                if (selectedPrintSections.Notes && notesData) {
                    // Check for actual content (strip HTML)
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = notesData;
                    const textContent = tempDiv.textContent || tempDiv.innerText || "";

                    if (textContent.trim().length > 0) {
                        await generateNotesSection({
                            report,
                            data: notesData,
                            addPageHeader,
                            addPageFooter,
                            isCancelled
                        });
                    }
                }

                if (isCancelled) return;

                report.renderAsync(() => {
                    if (isCancelled) return;
                    const options = new Stimulsoft.Viewer.StiViewerOptions();
                    options.toolbar.showDesignButton = false;
                    options.appearance.viewMode = 'Continuous';
                    options.appearance.scrollbarsMode = 'Auto';
                    options.width = '100%';
                    options.height = '100%';
                    const viewer = new Stimulsoft.Viewer.StiViewer(options, 'StiViewer', false);
                    report.reportName = "Tonnage_Optimization_Report";
                    viewer.report = report;
                    if (viewerRef.current) viewer.renderHtml(viewerRef.current);
                });

            } catch (err) {
                if (!isCancelled) setError(err.message);
            }
        };

        generateReport();

        return () => {
            isCancelled = true;
            // document.body.style.margin = originalMargin;
            // document.body.style.padding = originalPadding;
            // document.body.style.overflow = originalOverflow;
        };
    }, [studyWeightData, dim1Data, dim2Data, notesData, SessionName, MoldName, selectedPrintSections, session]);

    if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

    return (
        <div className="report-root" style={{ width: '100%', height: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column', background: '#fff' }}>
            <div className="report-toolbar" style={{ padding: '8px', background: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
                <button onClick={onClose} className="btn btn-secondary" style={{ padding: '4px 12px' }}>Close Report</button>
            </div>
            <div ref={viewerRef} style={{ flex: 1, width: '100%', position: 'relative' }}></div>
        </div>
    );
};

export default TonnageReport;
