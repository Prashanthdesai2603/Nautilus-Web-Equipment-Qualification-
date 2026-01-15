import React from "react";
import { Table } from "reactstrap";

const RightInputSection = ({
  SelectedMoldUnitData,
  BaseUnits,
  handleChange,
  handleDropDownChange,
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
            Cycle Time :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Cycle_Time"
              data-unit={SelectedMoldUnitData.Cycle_Time.unit_id}
              value={SelectedMoldUnitData.Cycle_Time.value}
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
              style={{ width: 70 }} autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            {Page != "View" ? (
              <select
                className="form-control ml-1"
                name="TimeUnit"
                value={SelectedMoldUnitData.Cycle_Time.unit_id}
                onChange={handleDropDownChange}
                style={{ width: 70 }}
                data-fieldname={"Cycle_Time"}
              >
                <option
                  value={
                    BaseUnitsArray.Time ? BaseUnitsArray?.Time[0].unit_id : 0
                  }
                >
                  {BaseUnitsArray.Time
                    ? BaseUnitsArray?.Time[0].unit_name
                    : null}
                </option>
              </select>
            ) : (
              <span className="ml-2">
                {" "}
                {BaseUnitsArray.Time
                  ? BaseUnitsArray?.Time[0].unit_name
                  : null}{" "}
              </span>
            )}
          </td>
        </tr>
        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Mold Stack Height :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Mold_Stack_Height"
              data-unit={SelectedMoldUnitData.Mold_Stack_Height.unit_id}
              value={SelectedMoldUnitData.Mold_Stack_Height.value}
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
              style={{ width: 70 }} autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            {Page != "View" ? (
              <select
                className="form-control ml-1"
                name="DistanceUnit"
                value={SelectedMoldUnitData.Mold_Stack_Height.unit_id}
                onChange={handleDropDownChange}
                style={{ width: 70 }}
                data-fieldname={"Mold_Stack_Height"}
                data-category={"Distance"}
              >
                {BaseUnitsArray.Distance ? (
                  BaseUnitsArray.Distance.map((value, key) => (
                    <option value={value.unit_id} key={key}>
                      {" "}
                      {value.unit_name}{" "}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            ) : (
              <span className="ml-2">
                {
                  BaseUnits?.find(
                    (unit) =>
                      unit.unit_id ===
                      parseInt(SelectedMoldUnitData?.Mold_Stack_Height.unit_id)
                  )?.unit_name
                }
              </span>
            )}
          </td>
        </tr>
        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Mold Vertical Height :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Mold_Vertical_Height"
              data-unit={SelectedMoldUnitData.Mold_Vertical_Height.unit_id}
              value={SelectedMoldUnitData.Mold_Vertical_Height.value}
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
              style={{ width: 70 }} autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <span className="ml-2 pt-1">
              {
                BaseUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(SelectedMoldUnitData?.Mold_Stack_Height.unit_id)
                )?.unit_name
              }
            </span>
          </td>
        </tr>
        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Req Mold Open Stroke :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              data-unit={SelectedMoldUnitData.Req_Mold_Open_Stroke.unit_id}
              name="Req_Mold_Open_Stroke"
              value={SelectedMoldUnitData.Req_Mold_Open_Stroke.value}
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
              style={{ width: 70 }} autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <span className="ml-2 pt-1">
              {
                BaseUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(SelectedMoldUnitData?.Mold_Stack_Height.unit_id)
                )?.unit_name
              }
            </span>
          </td>
        </tr>
        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Mold Width :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            
            <input
              type="text"
              className="form-control b-b-primary"
              data-unit={SelectedMoldUnitData.Mold_Width.unit_id}
              name="Mold_Width"
              value={SelectedMoldUnitData.Mold_Width.value}
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
              style={{ width: 70 }} autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <span className="ml-2 pt-1">
              {
                BaseUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(SelectedMoldUnitData?.Mold_Stack_Height.unit_id)
                )?.unit_name
              }
            </span>
          </td>
        </tr>
        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Number of Core Pulls :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Number_of_Core_Pulls"
              value={SelectedMoldUnitData.Number_of_Core_Pulls.value}
              onChange={handleChange}
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
              style={{ width: 70 }} autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
          </td>
        </tr>
      </Table>
    </div>
  );
};

export default RightInputSection;
