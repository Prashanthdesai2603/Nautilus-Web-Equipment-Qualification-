import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Inject,
    Edit,
    Toolbar,
} from "@syncfusion/ej2-react-grids";
import { Button, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import BreadCrumb from "../CommonSections/BreadCrumb";

// Helper to check if value is numeric or empty
const isNumeric = (value) => {
    if (value === "" || value === null || value === undefined) return true;
    return !isNaN(parseFloat(value)) && isFinite(value);
};

const ImportMold = () => {
    const [gridData, setGridData] = useState([]);
    const [isImporting, setIsImporting] = useState(false);
    const [showStatusColumns, setShowStatusColumns] = useState(false);
    const gridRef = useRef(null);
    const history = useHistory();

    const hasImportResults =
        showStatusColumns && gridData.some((r) => r.Resul === "Success" || r.Resul === "Imported" || r.Resul === "Error" || r.Resul === "Pending");

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
        { headerText: "Resul", template: resultTemplate, width: 70, textAlign: 'Center', field: "Resul", visible: showStatusColumns, allowEditing: false },
        { field: "Reason", headerText: "Reason", width: 180, visible: showStatusColumns, allowEditing: false },
        { field: "id", headerText: "ID", visible: false, isPrimaryKey: true },
        { field: "Mold_No", headerText: "Mold No", width: 120 },
        { field: "Material_Name", headerText: "Material ID", width: 110 },
        { field: "Platen_Orientation", headerText: "Orientation", width: 100 },
        { field: "Number_of_Bases", headerText: "Num Bases", width: 90, textAlign: 'Right', editType: 'numericedit' },
        { field: "Cycle_Time", headerText: "Cycle Time", width: 90, textAlign: 'Right', editType: 'numericedit' },
        { field: "Mold_Stack_Height", headerText: "Stack Ht", width: 90, textAlign: 'Right', editType: 'numericedit' },
        { field: "Mold_Vertical_Height", headerText: "Vertical Ht", width: 100, textAlign: 'Right', editType: 'numericedit' },
        { field: "Mold_Width", headerText: "Mold Width", width: 100, textAlign: 'Right', editType: 'numericedit' },
        { field: "Number_of_Core_Pulls", headerText: "Core Pulls", width: 90, textAlign: 'Right', editType: 'numericedit' },
        { field: "Hot_Runner_Volume", headerText: "HR Vol", width: 90, textAlign: 'Right', editType: 'numericedit' },
        { field: "Req_Mold_Open_Stroke", headerText: "Req Stroke", width: 110, textAlign: 'Right', editType: 'numericedit' },
    ];

    const validateRecord = (record, existingData = []) => {
        let result = "Pending";
        let reason = "";

        // Check for duplicates
        if (record.Mold_No && existingData.some(ed => ed.Mold_No === record.Mold_No)) {
            result = "Error";
            reason = "Mold No Already Exists.";
        }

        if (!record.Mold_No || record.Mold_No.toString().trim() === "") {
            result = "Error";
            reason = reason ? reason + " Mold No mandatory." : "Mold No mandatory.";
        }

        if (!record.Material_Name || record.Material_Name.toString().trim() === "") {
            // Treat Material ID as mandatory based on general logic, though user requirement only explicitly listed Mold ID. 
            // Adding this for safety, can assume it's like a foreign key.
        }

        const numericFields = [
            { key: "Number_of_Bases", name: "Number of Bases" },
            { key: "Cycle_Time", name: "Cycle Time" },
            { key: "Mold_Stack_Height", name: "Mold Stack Height" },
            { key: "Mold_Vertical_Height", name: "Mold Vertical Height" },
            { key: "Mold_Width", name: "Mold Width" },
            { key: "Number_of_Core_Pulls", name: "Number of Core Pulls" },
            { key: "Hot_Runner_Volume", name: "Hot Runner Volume" },
            { key: "Req_Mold_Open_Stroke", name: "Required Mold Open Stroke" },
        ];

        numericFields.forEach(field => {
            if (!isNumeric(record[field.key])) {
                result = "Error";
                reason = reason ? reason + ` ${field.name} numeric.` : `${field.name} numeric.`;
            } else if (parseFloat(record[field.key]) < 0) {
                result = "Error";
                reason = reason ? reason + ` ${field.name} cannot be negative.` : `${field.name} cannot be negative.`;
            }
        });

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

            // Raw data mapping
            const parsedData = jsonData.map((row, index) => {
                if (row.length === 0) return null;
                return {
                    id: index + 1,
                    Mold_No: row[0],
                    Material_Name: row[1] || "",
                    Platen_Orientation: row[2] || "",
                    Number_of_Bases: row[3] || "",
                    Cycle_Time: row[4] || "",
                    Mold_Stack_Height: row[5] || "",
                    Mold_Vertical_Height: row[6] || "",
                    Mold_Width: row[7] || "",
                    Number_of_Core_Pulls: row[8] || "",
                    Hot_Runner_Volume: row[9] || "",
                    Req_Mold_Open_Stroke: row[10] || "",
                    Resul: "",
                    Reason: ""
                };
            }).filter(row => row !== null);

            setGridData(parsedData);
            setShowStatusColumns(false);
            toast.success("File loaded. Review data and click Import.");
        };
        reader.readAsArrayBuffer(file);
    };

    const downloadTemplate = () => {
        const baseUrl = window.location.origin;
        const templateUrl = baseUrl + process.env.PUBLIC_URL + "/templates/Mold_DB.xlsx";
        const officeUri = `ms-excel:ofv|u|${templateUrl}`;
        window.location.href = officeUri;
    };

    const handleImport = () => {
        if (!gridData || gridData.length === 0) {
            toast.warning("No data to import.");
            return;
        }

        setIsImporting(true);
        setShowStatusColumns(true);

        const existingData = JSON.parse(sessionStorage.getItem("MoldData")) || [];
        let nextId = existingData.length > 0 ? Math.max(...existingData.map(d => d.id)) + 1 : 1;
        let successCount = 0;
        let errorCount = 0;

        const updatedGridData = gridData.map(row => {
            if (row.Resul === "Success" || row.Resul === "Imported") {
                return row;
            }

            const validation = validateRecord(row, existingData);

            if (validation.resul === "Error") {
                errorCount++;
                return { ...row, Resul: "Error", Reason: validation.reason };
            }

            const newRecord = {
                ...row,
                id: nextId++,
                Number_of_Bases: row.Number_of_Bases ? parseFloat(row.Number_of_Bases) : 0,
                Cycle_Time: row.Cycle_Time ? parseFloat(row.Cycle_Time) : 0,
                Mold_Stack_Height: row.Mold_Stack_Height ? parseFloat(row.Mold_Stack_Height) : 0,
                Mold_Vertical_Height: row.Mold_Vertical_Height ? parseFloat(row.Mold_Vertical_Height) : 0,
                Mold_Width: row.Mold_Width ? parseFloat(row.Mold_Width) : 0,
                Number_of_Core_Pulls: row.Number_of_Core_Pulls ? parseFloat(row.Number_of_Core_Pulls) : 0,
                Hot_Runner_Volume: row.Hot_Runner_Volume ? parseFloat(row.Hot_Runner_Volume) : 0,
                Req_Mold_Open_Stroke: row.Req_Mold_Open_Stroke ? parseFloat(row.Req_Mold_Open_Stroke) : 0,
            };

            // Remove internal UI keys if necessary, but consistent approach means just pushing as is mostly fine unless keys conflict.
            // Clean up:
            delete newRecord.Resul;
            delete newRecord.Reason;

            existingData.push(newRecord);
            successCount++;
            return { ...row, Resul: "Success", Reason: "Data Imported." };
        });

        sessionStorage.setItem("MoldData", JSON.stringify(existingData));
        setGridData(updatedGridData);
        setIsImporting(false);

        if (errorCount > 0) {
            toast.warning(`Import finished: ${successCount} imported, ${errorCount} failed.`);
        } else {
            toast.success(`Import successful: ${successCount} rows imported.`);
        }
    };

    const handleRemoveImportedRows = () => {
        if (!gridData || gridData.length === 0) return;

        const keptRows = gridData.filter((row) => row.Resul !== "Success" && row.Resul !== "Imported");
        const removedCount = gridData.length - keptRows.length;

        setGridData(keptRows);
        toast.info(removedCount > 0 ? `Removed ${removedCount} imported row(s).` : "No imported rows to remove.");
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

    const handleActionBegin = (args) => {
        if (args.requestType === 'beginEdit' || args.requestType === 'delete') {
            const row = args.rowData || args.data[0];
            if (row && (row.Resul === 'Success' || row.Resul === 'Imported')) {
                args.cancel = true;
                toast.info("Imported rows cannot be edited or deleted.");
            }
        }
    };

    return (
        <div className="container-fluid">
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

            <div className="d-flex justify-content-between ml-3 pt-3 pb-3">
                <BreadCrumb DB_Name={"Mold"} Current_Page={"Import"} />
            </div>

            <div className="card p-3 ml-2" style={{ background: "#e4eae1" }}>
                <div style={{ padding: "20px", flexGrow: 1, overflowY: "auto" }}>
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
                        position: "relative"
                    }}>
                        {hasImportResults && (
                            <div style={{ padding: "8px 8px 0 8px", display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    size="sm"
                                    outline
                                    color="secondary"
                                    style={{ background: "white", color: "black", borderColor: "#ccc" }}
                                    onClick={handleRemoveImportedRows}
                                    disabled={isImporting}
                                >
                                    Remove Imported Data Rows
                                </Button>
                            </div>
                        )}
                        {gridData.length > 0 && (
                            <GridComponent
                                key={showStatusColumns ? "post-import" : "pre-import"}
                                ref={gridRef}
                                dataSource={gridData}
                                height="400px"
                                gridLines="Both"
                                width="100%"
                                allowScrolling={true}
                                editSettings={{ allowEditing: true, allowDeleting: true, mode: 'Normal', showConfirmDialog: true }}
                                toolbar={['Delete', 'Update', 'Cancel']}
                                actionBegin={handleActionBegin}
                            >
                                <ColumnsDirective>
                                    {columns.map((col, idx) => (
                                        <ColumnDirective key={idx} {...col} />
                                    ))}
                                </ColumnsDirective>
                                <Inject services={[Edit, Toolbar]} />
                            </GridComponent>
                        )}
                    </div>
                </div>

                {/* Footer Buttons */}
                <div style={{
                    padding: "10px 15px",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                }}>
                    <Button
                        size="sm"
                        outline
                        color="secondary"
                        style={{ background: "white", color: "black", borderColor: "#ccc", width: "80px" }}
                        onClick={handleImport}
                        disabled={isImporting}
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

export default ImportMold;
