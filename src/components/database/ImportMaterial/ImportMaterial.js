import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Inject,
} from "@syncfusion/ej2-react-grids";
import { Button, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import BreadCrumb from "../CommonSections/BreadCrumb";
import { toast, ToastContainer } from "react-toastify";

// Helper to check if value is numeric or empty
const isNumeric = (value) => {
    if (value === "" || value === null || value === undefined) return true;
    return !isNaN(parseFloat(value)) && isFinite(value);
};

const ImportMaterial = () => {
    const [gridData, setGridData] = useState([]);
    const [isImporting, setIsImporting] = useState(false);
    const gridRef = useRef(null);
    const history = useHistory();

    const resultTemplate = (props) => {
        if (props.Resul === "Error" || props.Resul === "Fail") {
            return (
                <div className="text-center">
                    <i className="fa fa-times-circle text-danger" style={{ fontSize: "16px" }}></i>
                </div>
            );
        } else if (props.Resul === "Imported" || props.Resul === "Success") {
            return (
                <div className="text-center">
                    <i className="fa fa-check-circle text-success" style={{ fontSize: "16px" }}></i>
                </div>
            );
        }
        return null;
    };

    const columns = [
        { headerText: "Resul", template: resultTemplate, width: 70, textAlign: 'Center', field: "Resul" },
        { field: "Reason", headerText: "Reason", width: 180 },
        { field: "Material_Id", headerText: "Material ID", width: 140 },
        { field: "Base_Resin", headerText: "Base Resin", width: 120 },
        { field: "Manufacturer", headerText: "Manufacturer", width: 120 },
        { field: "Specific_Gravity", headerText: "Specific Gravity", width: 120, textAlign: 'Right' },
        { field: "Min_Melt_Temperature", headerText: "Min Melt Temp", width: 120, textAlign: 'Right' },
        { field: "Max_Melt_Temperature", headerText: "Max Melt Temp", width: 120, textAlign: 'Right' },
        { field: "Min_Mold_Temperature", headerText: "Min Mold Temp", width: 120, textAlign: 'Right' },
        { field: "Max_Mold_Temperature", headerText: "Max Mold Temp", width: 120, textAlign: 'Right' },
        { field: "Drying_Temperature", headerText: "Drying Temp", width: 100, textAlign: 'Right' },
        { field: "Drying_Time_Min", headerText: "Drying Time Min", width: 120, textAlign: 'Right' },
        { field: "Drying_Time_Max", headerText: "Drying Time Max", width: 120, textAlign: 'Right' },
        { field: "Max_Residence_Time", headerText: "Max Residence Time", width: 140, textAlign: 'Right' },
    ];

    const validateRecord = (record, existingData = []) => {
        let errors = [];
        let result = "Pending";
        let reason = "";

        // Check for duplicates
        if (record.Material_Id && existingData.some(ed => ed.Material_Id === record.Material_Id)) {
            result = "Error";
            reason = "Material Id Already Exists.";
        }

        if (!record.Material_Id || record.Material_Id.toString().trim() === "") {
            errors.push("Material ID is mandatory.");
            result = "Error";
            reason = reason ? reason + " Material ID mandatory." : "Material ID mandatory.";
        }

        const numericFields = [
            { key: "Specific_Gravity", name: "Specific Gravity" },
            { key: "Min_Melt_Temperature", name: "Min Melt Temp" },
            { key: "Max_Melt_Temperature", name: "Max Melt Temp" },
            { key: "Min_Mold_Temperature", name: "Min Mold Temp" },
            { key: "Max_Mold_Temperature", name: "Max Mold Temp" },
            { key: "Drying_Temperature", name: "Drying Temp" },
            { key: "Drying_Time_Min", name: "Drying Time Min" },
            { key: "Drying_Time_Max", name: "Drying Time Max" },
            { key: "Max_Residence_Time", name: "Max Residence Time" },
        ];

        numericFields.forEach(field => {
            if (!isNumeric(record[field.key])) {
                errors.push(`${field.name} must be numeric.`);
                result = "Error";
                reason = reason ? reason + ` ${field.name} numeric.` : `${field.name} numeric.`;
            }
        });

        // Logical validations
        if (isNumeric(record.Min_Melt_Temperature) && isNumeric(record.Max_Melt_Temperature)) {
            if (parseFloat(record.Min_Melt_Temperature) > parseFloat(record.Max_Melt_Temperature) && record.Max_Melt_Temperature !== "") {
                errors.push("Min Melt Temp must be <= Max Melt Temp.");
                result = "Error";
                reason = reason ? reason + " Min<=Max Melt." : "Min<=Max Melt.";
            }
        }
        if (isNumeric(record.Min_Mold_Temperature) && isNumeric(record.Max_Mold_Temperature)) {
            if (parseFloat(record.Min_Mold_Temperature) > parseFloat(record.Max_Mold_Temperature) && record.Max_Mold_Temperature !== "") {
                errors.push("Min Mold Temp must be <= Max Mold Temp.");
                result = "Error";
                reason = reason ? reason + " Min<=Max Mold." : "Min<=Max Mold.";
            }
        }
        if (isNumeric(record.Drying_Time_Min) && isNumeric(record.Drying_Time_Max)) {
            if (parseFloat(record.Drying_Time_Min) > parseFloat(record.Drying_Time_Max) && record.Drying_Time_Max !== "") {
                errors.push("Drying Time Min must be <= Drying Time Max.");
                result = "Error";
                reason = reason ? reason + " Min<=Max Drying." : "Min<=Max Drying.";
            }
        }

        return { resul: result, reason: reason };
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 13 });
            const existingData = JSON.parse(sessionStorage.getItem("MaterialData")) || [];

            const parsedData = jsonData.map((row, index) => {
                const record = {
                    id: index + 1,
                    Material_Id: row[0],
                    Base_Resin: row[1] || "",
                    Manufacturer: row[2] || "",
                    Specific_Gravity: row[3] || "",
                    Min_Melt_Temperature: row[4] || "",
                    Max_Melt_Temperature: row[5] || "",
                    Min_Mold_Temperature: row[6] || "",
                    Max_Mold_Temperature: row[7] || "",
                    Drying_Temperature: row[8] || "",
                    Drying_Time_Min: row[9] || "",
                    Drying_Time_Max: row[10] || "",
                    Max_Residence_Time: row[11] || "",
                };

                const validation = validateRecord(record, existingData);
                return {
                    ...record,
                    Resul: validation.resul,
                    Reason: validation.reason,
                };
            });

            setGridData(parsedData);
            toast.success("File loaded successfully.");
        };
        reader.readAsArrayBuffer(file);
    };

    const downloadTemplate = () => {
        const baseUrl = window.location.origin;
        const templateUrl = baseUrl + process.env.PUBLIC_URL + "/templates/Material_DB.xltx";
        const officeUri = `ms-excel:ofv|u|${templateUrl}`;
        window.location.href = officeUri;
    };

    const handleImport = () => {
        const existingData = JSON.parse(sessionStorage.getItem("MaterialData")) || [];
        const validRows = gridData.filter(row => row.Resul === "Pending");

        if (validRows.length === 0) {
            toast.warning("No valid rows to import.");
            return;
        }

        setIsImporting(true);

        setTimeout(() => {
            let nextId = existingData.length > 0 ? Math.max(...existingData.map(d => d.id)) + 1 : 1;

            const updatedGridData = gridData.map(row => {
                if (row.Resul === "Pending") {
                    const isDuplicate = existingData.some(ed => ed.Material_Id === row.Material_Id);
                    if (isDuplicate) {
                        return { ...row, Resul: "Error", Reason: "Material Id Already Exists." };
                    }

                    const newRecord = {
                        ...row,
                        id: nextId++,
                        Specific_Gravity: row.Specific_Gravity ? parseFloat(row.Specific_Gravity) : 0,
                        Min_Melt_Temperature: row.Min_Melt_Temperature ? parseFloat(row.Min_Melt_Temperature) : 0,
                        Max_Melt_Temperature: row.Max_Melt_Temperature ? parseFloat(row.Max_Melt_Temperature) : 0,
                        Min_Mold_Temperature: row.Min_Mold_Temperature ? parseFloat(row.Min_Mold_Temperature) : 0,
                        Max_Mold_Temperature: row.Max_Mold_Temperature ? parseFloat(row.Max_Mold_Temperature) : 0,
                        Drying_Temperature: row.Drying_Temperature ? parseFloat(row.Drying_Temperature) : 0,
                        Drying_Time_Min: row.Drying_Time_Min ? parseFloat(row.Drying_Time_Min) : 0,
                        Drying_Time_Max: row.Drying_Time_Max ? parseFloat(row.Drying_Time_Max) : 0,
                        Max_Residence_Time: row.Max_Residence_Time ? parseFloat(row.Max_Residence_Time) : 0,
                        Avg_Melt_Temperature: (parseFloat(row.Min_Melt_Temperature || 0) + parseFloat(row.Max_Melt_Temperature || 0)) / 2,
                        Avg_Mold_Temperature: (parseFloat(row.Min_Mold_Temperature || 0) + parseFloat(row.Max_Mold_Temperature || 0)) / 2
                    };
                    existingData.push(newRecord);
                    return { ...row, Resul: "Success", Reason: "" };
                }
                return row;
            });

            sessionStorage.setItem("MaterialData", JSON.stringify(existingData));
            setGridData(updatedGridData);
            setIsImporting(false);
            toast.success("Import completed.");
        }, 1000);
    };

    const backToDatabases = () => {
        history.push("/databases");
    };

    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef(null);

    const handleFileBrowse = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            handleFileUpload(e);
        }
    };

    return (
        <div className="container-fluid" style={{ minHeight: "100vh", background: "#f0f2f5", padding: "20px" }}>
            <ToastContainer />
            <style>{`
                /* Syncfusion Grid Toolbar Styling */
                .e-grid .e-toolbar {
                    background-color: #e4eae1 !important;
                    border-bottom: 1px solid #ccc !important;
                }
                .e-grid .e-toolbar-items {
                    background-color: #e4eae1 !important;
                }
                .e-grid .e-toolbar .e-tbar-btn {
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                }
                .e-grid .e-toolbar .e-tbar-btn .e-tbar-btn-text {
                    color: #555 !important;
                    font-size: 13px !important;
                }
                .e-grid .e-toolbar .e-toolbar-item.e-overlay {
                    opacity: 0.5 !important;
                }
                
                /* Grid Header Styling */
                .e-grid .e-gridheader {
                    background-color: #e4eae1 !important;
                    border-bottom: 1px solid #ccc !important;
                }
                .e-grid .e-headercell {
                    background-color: #e4eae1 !important;
                    border-right: 1px solid #999 !important;
                }
                .e-grid .e-headertext {
                    color: #333 !important;
                    font-weight: 600 !important;
                    font-size: 13px !important;
                }
            `}</style>

            {/* Desktop-style Dialog Container */}
            <div className="mx-auto" style={{
                maxWidth: "95vw",
                width: "1000px",
                background: "#f0f2f5",
                border: "1px solid #999",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "4px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
            }}>
                {/* Dialog Header */}
                <div style={{
                    background: "white",
                    padding: "10px 15px",
                    borderBottom: "1px solid #ccc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexShrink: 0
                }}>
                    <div className="d-flex align-items-center">
                        <img src="/favicon.ico" alt="icon" style={{ width: "16px", marginRight: "8px" }} />
                        <span style={{ fontSize: "14px", fontWeight: "400" }}>Import Material Data</span>
                    </div>
                    <div className="d-flex" style={{ fontSize: "16px" }}>
                        <span className="mr-3" style={{ cursor: "pointer" }}>?</span>
                        <span style={{ cursor: "pointer" }} onClick={backToDatabases}>×</span>
                    </div>
                </div>

                {/* Main Content Area */}
                <div style={{ padding: "20px", background: "#f0f2f5", flexGrow: 1, overflowY: "auto" }}>
                    {/* Top Row: File Input and Browse */}
                    <div className="row mb-2">
                        <div className="col-10">
                            <Input
                                type="text"
                                readOnly
                                value={fileName}
                                style={{ background: "white", height: "30px", fontSize: "13px" }}
                            />
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                accept=".xlsx"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="col-2">
                            <Button
                                size="sm"
                                outline
                                color="secondary"
                                style={{ width: "100%", height: "30px", background: "white", color: "black", borderColor: "#ccc" }}
                                onClick={handleFileBrowse}
                            >
                                Browse
                            </Button>
                        </div>
                    </div>

                    {/* Second Row: Template Help and Button */}
                    <div className="row mb-3 align-items-center">
                        <div className="col-10 text-right">
                            <span style={{ fontSize: "13px", color: "#333" }}>Please use default template provided by software.</span>
                        </div>
                        <div className="col-2">
                            <Button
                                size="sm"
                                outline
                                color="secondary"
                                style={{ width: "100%", height: "30px", background: "white", color: "black", borderColor: "#ccc" }}
                                onClick={downloadTemplate}
                            >
                                Template
                            </Button>
                        </div>
                    </div>

                    {/* Grid Area */}
                    <div style={{
                        background: "#b0b0b0",
                        border: "1px solid #777",
                        height: "400px",
                        position: "relative",
                        overflow: "hidden"
                    }}>
                        {gridData.length > 0 && (
                            <GridComponent
                                ref={gridRef}
                                dataSource={gridData}
                                height="400px"
                                gridLines="Both"
                                width="100%"
                            >
                                <ColumnsDirective>
                                    {columns.map((col, idx) => (
                                        <ColumnDirective key={idx} {...col} />
                                    ))}
                                </ColumnsDirective>
                                <Inject services={[]} />
                            </GridComponent>
                        )}
                    </div>
                </div>

                {/* Footer Buttons */}
                <div style={{
                    padding: "10px 15px",
                    background: "#f0f2f5",
                    borderTop: "1px solid #ccc",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    flexShrink: 0
                }}>
                    <Button
                        size="sm"
                        outline
                        color="secondary"
                        style={{ background: "white", color: "black", borderColor: "#ccc", width: "80px" }}
                        onClick={handleImport}
                        disabled={isImporting || !gridData.some(r => r.Resul === "Pending")}
                    >
                        {isImporting ? "..." : "Import"}
                    </Button>
                    <Button
                        size="sm"
                        outline
                        color="secondary"
                        style={{ background: "white", color: "black", borderColor: "#ccc", width: "80px" }}
                        onClick={backToDatabases}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ImportMaterial;
