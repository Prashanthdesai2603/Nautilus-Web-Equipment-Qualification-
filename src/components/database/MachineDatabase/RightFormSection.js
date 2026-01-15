import { Table } from "reactstrap";

const RightFormSection = ({
  SelectedMachinesUnitData,
  UnitSettings,
  BaseUnitsArray,
  handleChange,
  handleDropDownChange,
  StoredUnits,
  Page,
}) => {

  // console.log(SelectedMachinesUnitData)
  // console.log(UnitSettings)

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
            Max Plastic Pressure:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Max_Plastic_Pressure"
              value={
                isNaN(
                  parseFloat(
                    SelectedMachinesUnitData?.Max_Machine_Pressure.value
                  ) *
                  parseFloat(
                    SelectedMachinesUnitData?.Intensification_Ratio.value
                  )
                )
                  ? ""
                  : parseFloat(
                    SelectedMachinesUnitData?.Max_Machine_Pressure.value
                  ) *
                  parseFloat(
                    SelectedMachinesUnitData?.Intensification_Ratio.value
                  )
              }
              style={{ width: 80 }}
              autoComplete="off"
              readOnly
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <span className="ml-2 pt-1">

              {Page === "Edit" || Page === "Duplicate" || Page === "View" ? StoredUnits?.find(
                (unit) =>
                  unit.unit_id ===
                  parseInt(
                    SelectedMachinesUnitData?.Max_Plastic_Pressure
                      .unit_id
                  )
              )?.unit_name : UnitSettings?.PressureUnit.unit_name}

            </span>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Max shot Capacity(Wt):
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Max_shot_Capacity(Wt)"
              data-unit={UnitSettings?.WeightUnit.unit_id}
              value={SelectedMachinesUnitData["Max_shot_Capacity(Wt)"].value}
              onChange={handleChange}
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
              name="WeightUnit"
              onChange={handleDropDownChange}
              data-fieldname={"Max_shot_Capacity(Wt)"}
              data-category={"Weight"}
              value={
                Page === "New"
                  ? UnitSettings?.WeightUnit.unit_id
                  : SelectedMachinesUnitData["Max_shot_Capacity(Wt)"].unit_id
              }
              style={{ width: 70 }}
            >
              {BaseUnitsArray.Weight ? (
                BaseUnitsArray.Weight.map((value, key) => (
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
            Max Melt Temperature:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Max_Melt_Temperature"
              data-unit={UnitSettings?.TemperatureUnit.unit_id}
              value={SelectedMachinesUnitData?.Max_Melt_Temperature.value}
              onChange={handleChange}
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
              name="TemperatureUnit"
              onChange={handleDropDownChange}
              data-fieldname={"Max_Melt_Temperature"}
              data-category={"Temperature"}
              value={
                Page === "New"
                  ? UnitSettings?.TemperatureUnit.unit_id
                  : SelectedMachinesUnitData?.Max_Melt_Temperature.unit_id
              }
              style={{ width: 70 }}
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
            Min allowable Mold Stack Height:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Min_allowable_Mold_Stack_Height"
              data-unit={UnitSettings?.DistanceUnit.unit_id}
              value={
                SelectedMachinesUnitData?.Min_allowable_Mold_Stack_Height.value
              }
              onChange={handleChange}
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
              name="DistanceUnit"
              onChange={handleDropDownChange}
              data-fieldname={"Min_allowable_Mold_Stack_Height"}
              data-category={"Distance"}
              value={
                SelectedMachinesUnitData?.Min_allowable_Mold_Stack_Height
                  .unit_id
              }
              style={{ width: 70 }}
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
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Max allowable Mold Stack Height:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Max_allowable_Mold_Stack_Height"
              data-unit={UnitSettings?.DistanceUnit.unit_id}
              value={
                SelectedMachinesUnitData?.Max_allowable_Mold_Stack_Height.value
              }
              onChange={handleChange}
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
            <span className="ml-2 pt-1">
              {
                StoredUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(
                      SelectedMachinesUnitData?.Min_allowable_Mold_Stack_Height
                        .unit_id
                    )
                )?.unit_name
              }{" "}
            </span>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Max Mold Open Daylight:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Max_Mold_Open_Daylight"
              data-unit={UnitSettings?.DistanceUnit.unit_id}
              value={SelectedMachinesUnitData?.Max_Mold_Open_Daylight.value}
              onChange={handleChange}
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
            <span className="ml-2 pt-1">
              {
                StoredUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(
                      SelectedMachinesUnitData?.Min_allowable_Mold_Stack_Height
                        .unit_id
                    )
                )?.unit_name
              }{" "}
            </span>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Tiebar Clearance-Width:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Tiebar_Clearance-Width"
              data-unit={UnitSettings?.DistanceUnit.unit_id}
              value={SelectedMachinesUnitData["Tiebar_Clearance-Width"].value}
              onChange={handleChange}
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
            <span className="ml-2 pt-1">
              {
                StoredUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(
                      SelectedMachinesUnitData?.Min_allowable_Mold_Stack_Height
                        .unit_id
                    )
                )?.unit_name
              }{" "}
            </span>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Max Mold Vertical Height:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              data-unit={UnitSettings?.DistanceUnit.unit_id}
              name="Max_Mold_Vertical_Height"
              value={SelectedMachinesUnitData?.Max_Mold_Vertical_Height.value}
              onChange={handleChange}
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
            <span className="ml-2 pt-1">
              {
                StoredUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(
                      SelectedMachinesUnitData?.Min_allowable_Mold_Stack_Height
                        .unit_id
                    )
                )?.unit_name
              }{" "}
            </span>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Max Mold Width:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Max_Mold_Width"
              value={SelectedMachinesUnitData?.Max_Mold_Width.value}
              data-unit={SelectedMachinesUnitData?.Max_Mold_Width.unit_id}
              onChange={handleChange}
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
            <span className="ml-2 pt-1">
              {
                StoredUnits?.find(
                  (unit) =>
                    unit.unit_id ===
                    parseInt(
                      SelectedMachinesUnitData?.Min_allowable_Mold_Stack_Height
                        .unit_id
                    )
                )?.unit_name
              }{" "}
            </span>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Number of Core Pulls:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Number_of_Core_Pulls"
              value={SelectedMachinesUnitData?.Number_of_Core_Pulls.value}
              onChange={handleChange}
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
          </td>
        </tr>
      </Table>
    </div>
  );
};

export default RightFormSection;
