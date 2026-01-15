import { Table } from "reactstrap";

const RightMaterialForm = ({
  SelectedMaterialsUnitData,
  handleChange,
  handleDropDownChange,
  UpdateInputCalculations,
  StoredUnits,
  Page,
  BaseUnitsArray,
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
            Min Mold Temperature :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              data-unit={
                SelectedMaterialsUnitData?.Min_Mold_Temperature.unit_id
              }
              name="Min_Mold_Temperature"
              data-category={"Mold"}
              data-fieldname={"Min_Mold_Temperature"}
              defaultValue={
                SelectedMaterialsUnitData.Min_Mold_Temperature.value
              }
              onChange={handleChange}
              onBlur={() => UpdateInputCalculations("Mold")}
              style={{ width: 80 }}
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
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <select
              className="form-control ml-1"
              width="70"
              name="MoldTempUnit"
              onChange={handleDropDownChange}
              value={SelectedMaterialsUnitData?.Min_Mold_Temperature.unit_id}
              data-fieldname={"Min_Mold_Temperature"}
              data-category={"Mold"}
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
            Max Mold Temperature :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              data-unit={
                SelectedMaterialsUnitData?.Max_Mold_Temperature.unit_id
              }
              name="Max_Mold_Temperature"
              data-fieldname={"Max_Mold_Temperature"}
              data-category={"Mold"}
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
              defaultValue={
                SelectedMaterialsUnitData.Max_Mold_Temperature.value
              }
              onChange={handleChange}
              onBlur={() => UpdateInputCalculations("Mold")}
              style={{ width: 80 }}
              autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <span className="ml-3 pt-1">
              {" "}
              {
                StoredUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(
                      SelectedMaterialsUnitData?.Max_Mold_Temperature.unit_id
                    )
                )?.unit_name
              }{" "}
            </span>
          </td>
        </tr>
        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Avg Mold Temperature :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Avg_Mold_Temperature"
              defaultValue={
                SelectedMaterialsUnitData?.Avg_Mold_Temperature.value
                  ? parseFloat(
                      SelectedMaterialsUnitData?.Avg_Mold_Temperature.value
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
                      SelectedMaterialsUnitData?.Avg_Mold_Temperature.unit_id
                    )
                )?.unit_name
              }{" "}
            </span>
          </td>
        </tr>
        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Drying Temperature :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Drying_Temperature"
              data-fieldname={"Drying_Temperature"}
              data-category={"Drying"}
              data-unit={SelectedMaterialsUnitData?.Drying_Temperature.unit_id}
              value={SelectedMaterialsUnitData?.Drying_Temperature.value}
              onChange={handleChange}
              style={{ width: 80 }}
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
              autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <select
              className="form-control ml-1"
              width="70"
              name="DryingTempUnit"
              onChange={handleDropDownChange}
              value={SelectedMaterialsUnitData?.Drying_Temperature.unit_id}
              data-fieldname={"Drying_Temperature"}
              data-category={"Drying"}
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
            Drying Time Min :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Drying_Time_Min"
              data-fieldname={"Drying_Time_Min"}
              data-unit={SelectedMaterialsUnitData?.Drying_Time_Min.unit_id}
              defaultValue={SelectedMaterialsUnitData?.Drying_Time_Min.value}
              onChange={handleChange}
              style={{ width: 80 }}
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
              autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <span className="ml-3 pt-1">
              {" "}
              {
                StoredUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(SelectedMaterialsUnitData?.Drying_Time_Min.unit_id)
                )?.unit_name
              }{" "}
            </span>
          </td>
        </tr>
        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Drying Time Max :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Drying_Time_Max"
              data-fieldname={"Drying_Time_Max"}
              data-unit={SelectedMaterialsUnitData?.Drying_Time_Max.unit_id}
              defaultValue={SelectedMaterialsUnitData?.Drying_Time_Max.value}
              onChange={handleChange}
              style={{ width: 80 }}
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
              autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <span className="ml-3 pt-1">
              {" "}
              {
                StoredUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(SelectedMaterialsUnitData?.Drying_Time_Max.unit_id)
                )?.unit_name
              }{" "}
            </span>
          </td>
        </tr>
        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Max Residence Time :
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Max_Residence_Time"
              data-fieldname={"Max_Residence_Time"}
              data-unit={SelectedMaterialsUnitData?.Max_Residence_Time.unit_id}
              defaultValue={SelectedMaterialsUnitData?.Max_Residence_Time.value}
              onChange={handleChange}
              style={{ width: 80 }}
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
              autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <span className="ml-3 pt-1">
              {" "}
              {
                StoredUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(
                      SelectedMaterialsUnitData?.Max_Residence_Time.unit_id
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

export default RightMaterialForm;
