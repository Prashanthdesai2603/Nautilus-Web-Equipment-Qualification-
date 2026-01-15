import React from "react";
import { Table } from "reactstrap";

const CustomFieldsTable = ({ column, handleChange, SelectedMaterialData, ToggleEditModal, Page }) => {
  return (
    <div>
      <div className="row m-2">
        <label> Custom Fields </label>
      </div>

      <div className="row m-2">
        {Page !== "View" ? <button
          className="btn btn-secondary btn-air-secondary mr-2"
          onClick={ToggleEditModal}
        >
          Edit
        </button> : <></>}
      </div>

      <div style={{ border: "1px solid black", width: "255px" }}>
        <Table
          id="Custom_Fields_Table"
          className="table-responsive"
          width={300}
          height={200}
          cellPadding={0}
          cellSpacing={0}
        >
          <thead>
            <tr>
              <th align="center" style={{ width: "160px" }}>
                Name
              </th>

              <th align="center" style={{ width: "160px" }}>
                Value
              </th>
            </tr>
          </thead>

          <tbody>
            {column.map((HeaderName, HeaderKey) => (
              <tr key={HeaderKey}>
                <td align="left" style={{ background: "#e4eae1" }}>
                  <input
                    type="text"
                    className="form-control"
                    style={{ width: "125px" }}
                    value={HeaderName.headerText}
                    readOnly
                  />{" "}
                </td>

                <td align="left" style={{ background: "#e4eae1" }}>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    defaultValue={SelectedMaterialData[HeaderName.field]}
                    name={HeaderName.field} autoComplete="off"
                    onKeyPress={(event) => {
                      const value = event.currentTarget.value;
                      const key = event.key;
                      if (!/[0-9.]/.test(key) || (key === "." && value.includes("."))) {
                        event.preventDefault();
                      }
                    }}
                    onPaste={(event) => {
                      const pastedData = event.clipboardData.getData("text");
                      const value = event.currentTarget.value;
                      if (!/^\d*\.?\d*$/.test(pastedData) || (value.includes(".") && pastedData.includes("."))) {
                        event.preventDefault();
                      }
                    }}
                    style={{ width: "125px" }}
                    {...(Page === "View" ? { readOnly: true } : {})}
                  />{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CustomFieldsTable;
