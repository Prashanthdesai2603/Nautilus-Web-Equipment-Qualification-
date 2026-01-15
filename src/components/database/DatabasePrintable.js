import React, { useMemo } from "react";
import { GridComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-grids";
import "./DatabasePrintable.css"; // Add CSS for styling

const DatabasePrintable = ({ materialData, moldData, machineData, selectedDatabases }) => {

    // Calculate grid width dynamically (150px per column)
    const calculateGridWidth = (columns) => `${columns.length * 150}px`;

    // console.log(materialData, moldData, machineData)

    // Function to determine max width based on the largest dataset
    const getMaxWidth = useMemo(() => {
        const columnCounts = [
            materialData.GridColumn.length,
            moldData.GridColumn.length,
            machineData.GridColumn.length
        ]
        const maxColumns = Math.max(...columnCounts); // Get the largest column count
        return `${maxColumns * 150}px`; // Set width dynamically (150px per column)
    }, [materialData.GridColumn, moldData.GridColumn, machineData.GridColumn]);

    return (
        <div
            id="DatabasePrintable"
            style={{ border: "1px grey solid", width: "3500px" }}
            >
            {/* Material Database */}
            {selectedDatabases.material ? <div className="m-2">
                <div>
                    <h3> Material Database </h3>
                </div>
                <div className="table-container">
                    <GridComponent
                        id="MaterialPrintGrid"
                        dataSource={materialData.GridData}
                        width={calculateGridWidth(materialData.GridColumn)} // Dynamic width
                        allowTextWrap={true}
                    >
                        <ColumnsDirective>
                            {materialData.GridColumn.map((col, index) => (
                                <ColumnDirective key={index} field={col.field} headerText={col.headerText} width="150" />
                            ))}
                        </ColumnsDirective>
                    </GridComponent>
                </div>
            </div> : <></>}

            {/* Mold Database */}
            {selectedDatabases.mold ? <div className="m-2">
                <div>
                    <h3> Mold Database </h3>
                </div>
                <div className="table-container">
                    <GridComponent
                        id="MoldPrintGrid"
                        dataSource={moldData.GridData}
                        width={calculateGridWidth(moldData.GridColumn)} // Dynamic width
                        allowTextWrap={true}
                    >
                        <ColumnsDirective>
                            {moldData.GridColumn.map((col, index) => (
                                <ColumnDirective key={index} field={col.field} headerText={col.headerText} width="150" />
                            ))}
                        </ColumnsDirective>
                    </GridComponent>
                </div>
            </div> : <></>}

            {/* Machine Database */}
            {selectedDatabases.machine ? <div className="m-2">
                <div>
                    <h3> Machine Database </h3>
                </div>
                <div className="table-container">
                    <GridComponent
                        id="MachinePrintGrid"
                        dataSource={machineData.GridData}
                        width={calculateGridWidth(machineData.GridColumn)} // Dynamic width
                        allowTextWrap={true}
                    >
                        <ColumnsDirective>
                            {machineData.GridColumn.map((col, index) => (
                                <ColumnDirective key={index} field={col.field} headerText={col.headerText} width="150" />
                            ))}
                        </ColumnsDirective>
                    </GridComponent>
                </div>
            </div> : <></>}
        </div>
    );
};

export default DatabasePrintable;
