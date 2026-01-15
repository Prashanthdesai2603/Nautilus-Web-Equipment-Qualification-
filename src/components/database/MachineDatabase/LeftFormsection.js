import { Table } from "reactstrap";

const LeftFormsection = ({
  SelectedMachinesUnitData,
  handleChange,
  handleDropDownChange,
  UnitSettings,
  Page,
  BaseUnitsArray, setMax_Screw_Rotation_Linear_Speed, Max_Screw_Rotation_Linear_Speed
}) => {

  // console.log( Max_Screw_Rotation_Linear_Speed )

  setMax_Screw_Rotation_Linear_Speed(
    (SelectedMachinesUnitData?.Screw_Diameter?.unit_id === '11' || SelectedMachinesUnitData?.Screw_Diameter?.unit_id === 11) &&
      !isNaN(parseFloat(SelectedMachinesUnitData?.Screw_Diameter?.value)) &&
      !isNaN(
        parseFloat(SelectedMachinesUnitData?.Max_Screw_Rotation_Speed?.value)
      )
      ? (
        (3.14 *
          parseFloat(SelectedMachinesUnitData.Screw_Diameter.value) *
          parseFloat(
            SelectedMachinesUnitData.Max_Screw_Rotation_Speed.value
          )) /
        60
      ).toFixed(2)
      : (
        (3.14 *
          (parseFloat(SelectedMachinesUnitData.Screw_Diameter.value) / 25.4) *
          parseFloat(
            SelectedMachinesUnitData.Max_Screw_Rotation_Speed.value
          )) /
        60
      ).toFixed(2)
  )

  // console.log( Max_Screw_Rotation_Linear_Speed )

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
            Machine Number:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Machine_Number"
              value={SelectedMachinesUnitData?.Machine_Number.value}
              onChange={handleChange}
              style={{ width: 160 }}
              autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Make:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Make"
              value={SelectedMachinesUnitData?.Make.value}
              onChange={handleChange}
              style={{ width: 160 }}
              autoComplete="off"
              {...(Page === "View" ? { readOnly: true } : {})}
            />
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Type(Platen Orientation):
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <select
              className="form-control ml-1"
              name="Type(Platen_Orientation)"
              onChange={handleChange}
              value={SelectedMachinesUnitData["Type(Platen_Orientation)"].value}
              style={{ width: 160 }}
            >
              <option>Horizontal</option>
              <option>Vertical</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Tonnage:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Tonnage"
              data-unit={
                UnitSettings.TonnageUnit
                  ? UnitSettings.TonnageUnit.unit_id
                  : BaseUnitsArray.Tonnage
                    ? BaseUnitsArray.Tonnage[0].unit_id
                    : ""
              }
              value={SelectedMachinesUnitData?.Tonnage.value}
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
              name="TonnageUnit"
              onChange={handleDropDownChange}
              style={{ width: 80 }}
              value={SelectedMachinesUnitData?.Tonnage.unit_id}
              data-fieldname={"Tonnage"}
              data-category={"Tonnage"}
            >
              {BaseUnitsArray.Tonnage ? (
                BaseUnitsArray.Tonnage.map((value, key) => (
                  <option value={value.unit_id} key={value.unit_id}>
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
            Screw Diameter:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Screw_Diameter"
              data-unit={UnitSettings?.ScrewDistanceUnit.unit_id}
              value={SelectedMachinesUnitData?.Screw_Diameter.value}
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
              name="ScrewDistanceUnit"
              onChange={handleDropDownChange}
              data-fieldname={"Screw_Diameter"}
              data-category={"ScrewDistance"}
              value={SelectedMachinesUnitData?.Screw_Diameter.unit_id}
              style={{ width: 70 }}
            >
              {BaseUnitsArray.Distance ? (
                BaseUnitsArray.Distance.map((value, key) =>
                  value.unit_id !== 22 ? (
                    <option value={value.unit_id} key={value.unit_id}>
                      {value.unit_name}
                    </option>
                  ) : (
                    <></>
                  )
                )
              ) : (
                <></>
              )}
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Max Screw Rotation Speed:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Max_Screw_Rotation_Speed"
              value={SelectedMachinesUnitData?.Max_Screw_Rotation_Speed.value}
              data-unit={
                BaseUnitsArray.Speed ? BaseUnitsArray?.Speed[2].unit_id : 0
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
              name="SpeedUnit"
              onChange={handleDropDownChange}
              data-fieldname={"Max_Screw_Rotation_Speed"}
              value={
                BaseUnitsArray.Speed ? BaseUnitsArray?.Speed[2].unit_id : 0
              }
              style={{ width: 70 }}
            >
              <option
                value={
                  BaseUnitsArray.Speed ? BaseUnitsArray?.Speed[2].unit_id : 0
                }
              >
                {BaseUnitsArray.Speed ? BaseUnitsArray?.Speed[2].unit_name : ""}
              </option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Max Screw Rotation Linear Speed:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Max_Screw_Rotation_Linear_Speed"
              data-unit={UnitSettings?.LinearSpeedUnit.unit_id}
              value={
                isNaN(Max_Screw_Rotation_Linear_Speed)
                  ? ""
                  : Max_Screw_Rotation_Linear_Speed
              }
              onChange={handleChange}
              autoComplete="off"
              style={{ width: 80 }}
              readOnly
              {...(Page === "View" ? { readOnly: true } : {})}
            />
            <span className="ml-2 pt-1">
              {" "}
              {UnitSettings?.LinearSpeedUnit.unit_name}{" "}
            </span>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Max Machine Pressure:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Max_Machine_Pressure"
              data-unit={UnitSettings?.PressureUnit.unit_id}
              value={SelectedMachinesUnitData?.Max_Machine_Pressure.value}
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
              name="PressureUnit"
              onChange={handleDropDownChange}
              data-fieldname={"Max_Machine_Pressure"}
              data-category={"Pressure"}
              value={
                Page === "New"
                  ? UnitSettings?.PressureUnit.unit_id
                  : SelectedMachinesUnitData?.Max_Machine_Pressure.unit_id
              }
              style={{ width: 70 }}
            >
              {BaseUnitsArray.Pressure ? (
                BaseUnitsArray.Pressure.map((value, key) =>
                  value.unit_id !== 15 ? (
                    <option value={value.unit_id} key={value.unit_id}>
                      {" "}
                      {value.unit_name}{" "}
                    </option>
                  ) : (
                    <></>
                  )
                )
              ) : (
                <></>
              )}
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Max Injection Speed:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Max_Injection_Speed"
              data-unit={UnitSettings?.SpeedUnit.unit_id}
              value={SelectedMachinesUnitData?.Max_Injection_Speed.value}
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
              name="SpeedUnit"
              onChange={handleDropDownChange}
              data-fieldname={"Max_Injection_Speed"}
              data-category={"Speed"}
              value={
                Page === "New"
                  ? UnitSettings?.SpeedUnit.unit_id
                  : SelectedMachinesUnitData?.Max_Injection_Speed.unit_id
              }
              style={{ width: 80 }}
            >
              {BaseUnitsArray.Speed ? (
                BaseUnitsArray.Speed.map((value, key) =>
                  value.unit_id !== 21 ? (
                    <option value={value.unit_id} key={value.unit_id}>
                      {" "}
                      {value.unit_name}{" "}
                    </option>
                  ) : (
                    <></>
                  )
                )
              ) : (
                <></>
              )}
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" style={{ background: "#e4eae1" }}>
            Intensification Ratio:
          </td>
          <td align="left" style={{ background: "#e4eae1" }}>
            <input
              type="text"
              className="form-control b-b-primary"
              name="Intensification_Ratio"
              value={SelectedMachinesUnitData?.Intensification_Ratio.value}
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

export default LeftFormsection;
