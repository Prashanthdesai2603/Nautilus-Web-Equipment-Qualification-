const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'public', 'templates');

if (!fs.existsSync(templatesDir)) {
    fs.mkdirSync(templatesDir, { recursive: true });
}

const machineHeaders = [
    "Machine Number",
    "Make",
    "Type(Platen_Orientation)",
    "Tonnage",
    "Screw Diameter",
    "Max Screw Rotation Speed",
    "Max Screw Rotation Linear Speed",
    "Max Hydraulic Pressure",
    "Intensification Ratio",
    "Max Plastic Pressure",
    "Max Shot Capacity(Wt)",
    "Max Melt Temperature",
    "Min Allowable Mold Stack Height",
    "Max Allowable Mold Stack Height",
    "Max Mold Open Daylight",
    "Tiebar Clearance-Width",
    "Max Mold Vertical Height",
    "Max Mold Width",
    "Number of Core Pulls"
];

try {
    const wb = XLSX.utils.book_new();
    const data = [];
    // 12 empty rows
    for (let i = 0; i < 12; i++) data.push([]);
    data.push(machineHeaders);
    data.push([]);

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wscols = machineHeaders.map(h => ({ wch: h.length + 5 }));
    ws['!cols'] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Explicitly using .xlsx first to see if it works, then I will rename or check .xltx support
    // Actually, let's stick to .xltx as requested, but catch error specifically
    const filePath = path.join(templatesDir, 'Machine_DB.xlsx');
    XLSX.writeFile(wb, filePath);
    console.log(`Successfully created ${filePath}`);

} catch (error) {
    console.error("CRITICAL ERROR:", error);
}
