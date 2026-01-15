import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";

const LeftInputSection = ({
  SelectedMoldUnitData,
  MaterialData,
  handleChange,
  ToggleImgModal,
  BaseUnitsArray,
  Page,
}) => {
  return (
    <div>
      <Table
        className="table-bordernone table-responsive"
        style={{ background: "#e4eae1" }}
        cellPadding="0"
        cellSpacing="0"
        color="none"
      >
        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Mold No :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Mold_No"
              value={SelectedMoldUnitData.Mold_No.value}
              onChange={handleChange}
              style={{ width: 140 }}
              autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Material ID :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <select
              className="form-control b-b-primary"
              name="Material_Id"
              value={SelectedMoldUnitData.Material_Id.value}
              onChange={handleChange}
              style={{ width: 140 }}
              autoComplete="off"
              data-fieldname={"Material_Id"}
            >
              <option value={null}> Select a material </option>
              {MaterialData.map((item, key) => (
                <option value={item.id} key={key}>
                  {" "}
                  {item.Material_Id}{" "}
                </option>
              ))}
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Platen Orientation :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <select
              className="form-control b-b-primary"
              name="Platen_Orientation"
              value={SelectedMoldUnitData.Platen_Orientation.value}
              onChange={handleChange}
              style={{ width: 140 }}
            >
              <option value="Horizontal">Horizontal</option>
              <option value="Vertical">Vertical</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Number of Bases :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Number_of_Bases"
              value={SelectedMoldUnitData.Number_of_Bases.value}
              onChange={handleChange}
              style={{ width: 70 }}
              autoComplete="off"
              onKeyPress={(event) => {
                const value = event.currentTarget.value;
                const key = event.key;
                if (!/[0-9]/.test(key) || (key === "." && value.includes("."))) {
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
              {...(SelectedMoldUnitData.Platen_Orientation.value ===
                "Horizontal"
                ? { readOnly: true }
                : {})}
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <button
              type="button"
              className="form-control b-b-primary ml-1 text-center"
              style={{ width: 40, cursor: "pointer" }}
              onClick={ToggleImgModal}
            >
              ?
            </button>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Hot Runner Volume :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              data-unit={SelectedMoldUnitData.Hot_Runner_Volume.value}
              className="form-control b-b-primary"
              name="Hot_Runner_Volume"
              value={SelectedMoldUnitData.Hot_Runner_Volume.value}
              onChange={handleChange}
              autoComplete="off"
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
              style={{ width: 70 }}
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <span className="ml-2 pt-1">
              {" "}
              {BaseUnitsArray.Volume
                ? BaseUnitsArray?.Volume[0].unit_name
                : ""}{" "}
            </span>
          </td>
        </tr>
      </Table>
    </div>
  );
};

export default LeftInputSection;
