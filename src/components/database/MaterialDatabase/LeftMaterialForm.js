import React from "react";
import { Table } from "reactstrap";

const LeftMaterialForm = ({
  SelectedMaterialsUnitData,
  handleChange,
  handleDropDownChange,
  UpdateInputCalculations,
  StoredUnits,
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
            Material ID :
          </td>

          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Material_Id"
              defaultValue={SelectedMaterialsUnitData?.Material_Id.value}
              onChange={handleChange}
              style={{ width: 160 }} autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Base Resin :
          </td>

          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Base_Resin"
              defaultValue={SelectedMaterialsUnitData?.Base_Resin.value}
              onChange={handleChange}
              style={{ width: 160 }} autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Manufacturer :
          </td>

          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Manufacturer"
              defaultValue={SelectedMaterialsUnitData?.Manufacturer.value}
              onChange={handleChange}
              style={{ width: 160 }} autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Specific Gravity :
          </td>

          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Specific_Gravity"
              defaultValue={SelectedMaterialsUnitData?.Specific_Gravity.value}
              onChange={handleChange}
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
              style={{ width: 80 }} autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Min Melt Temperature :
          </td>

          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Min_Melt_Temperature"
              data-fieldname={"Min_Melt_Temperature"}
              data-category={"Melt"}
              data-unit={
                SelectedMaterialsUnitData?.Min_Melt_Temperature.unit_id
              }
              defaultValue={SelectedMaterialsUnitData.Min_Melt_Temperature.value}
              onBlur={() => UpdateInputCalculations("Melt")}
              onChange={handleChange}
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
              style={{ width: 80 }} autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <select
              className="form-control ml-1"
              width="70"
              name="MeltTempUnit"
              onChange={handleDropDownChange}
              value={SelectedMaterialsUnitData?.Min_Melt_Temperature.unit_id}
              data-fieldname={"Min_Melt_Temperature"}
              data-category={"Melt"}
            >
              {BaseUnitsArray.Temperature ? (
                BaseUnitsArray.Temperature.map((value, key) => (
                  <option value={value.unit_id} key={key}>
                    {" "}
                    {value.unit_name}{" "}
                  </option>
                ))
              ) : (
                <></>
              )}
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Max Melt Temperature :
          </td>

          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              data-unit={
                SelectedMaterialsUnitData?.Max_Melt_Temperature.unit_id
              }
              name="Max_Melt_Temperature"
              data-category={"Melt"}
              data-fieldname={"Max_Melt_Temperature"}
              defaultValue={SelectedMaterialsUnitData.Max_Melt_Temperature.value}
              onBlur={() => UpdateInputCalculations("Melt")}
              onChange={handleChange}
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
              style={{ width: 80 }} autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <span className="ml-3 pt-1">
              {
                StoredUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(
                      SelectedMaterialsUnitData?.Max_Melt_Temperature.unit_id
                    )
                )?.unit_name
              }
            </span>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Avg Melt Temperature :
          </td>

          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Avg_Melt_Temperature"
              data-fieldname={"Avg_Melt_Temperature"}
              defaultValue={
                SelectedMaterialsUnitData?.Avg_Melt_Temperature.value
                  ? parseFloat(
                    SelectedMaterialsUnitData?.Avg_Melt_Temperature.value
                  )
                  : ""
              }
              style={{ width: 80 }}
              readOnly
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <span className="ml-3 pt-1">
              {" "}
              {
                StoredUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(
                      SelectedMaterialsUnitData?.Avg_Melt_Temperature.unit_id
                    )
                )?.unit_name
              }{" "}
            </span>
          </td>
        </tr>
      </Table>
    </div>
  );
};

export default LeftMaterialForm;
