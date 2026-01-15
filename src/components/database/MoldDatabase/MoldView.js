import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../../App.css";
import LeftInputSection from "./LeftInputSection";
import RightInputSection from "./RightInputSection";
import BreadCrumb from "../CommonSections/BreadCrumb";

const MoldView = () => {
  const history = useHistory();
  const { RowId } = useParams();

  const [moldData, setMoldData] = useState({
    Mold_No: "",
    Material_Id: "",
    Platen_Orientation: "",
    Number_of_Bases: "",
    Hot_Runner_Volume: "",
    Cycle_Time: "",
    Mold_Stack_Height: "",
    Mold_Vertical_Height: "",
    Req_Mold_Open_Stroke: "",
    Mold_Width: "",
    Number_of_Core_Pulls: "",
  });

  const [moldUnitData, setMoldUnitData] = useState({});

  // Unit settings array
  const [StoredUnits] = useState([
    { unit_id: 1, decimals: 0.12, unit_name: "sq cm" },
    { unit_id: 2, decimals: 0.12, unit_name: "sq in" },
    { unit_id: 3, decimals: 0, unit_name: "sec" },
    { unit_id: 4, decimals: 0.1, unit_name: "min" },
    { unit_id: 5, decimals: 0.12, unit_name: "hrs" },
    { unit_id: 6, decimals: 0.1, unit_name: "mm/sec" },
    { unit_id: 7, decimals: 0.12, unit_name: "inches/sec" },
    { unit_id: 21, decimals: 0.12, unit_name: "rpm" },
    { unit_id: 23, unit_name: "cm^3" },
    { unit_id: 8, decimals: 0.12, unit_name: "Gms" },
    { unit_id: 9, decimals: 0.12, unit_name: "oz" },
    { unit_id: 18, unit_name: "US tons" },
    { unit_id: 19, unit_name: "metric ton" },
    { unit_id: 20, unit_name: "kN" },
    { unit_id: 10, decimals: 0.12, unit_name: "mm" },
    { unit_id: 11, decimals: 0.12, unit_name: "in" },
    { unit_id: 22, decimals: 0.12, unit_name: "cm" },
    { unit_id: 12, decimals: 0.12, unit_name: "MPa" },
    { unit_id: 13, decimals: 0, unit_name: "psi" },
    { unit_id: 14, decimals: 0, unit_name: "bar" },
    { unit_id: 15, decimals: 0, unit_name: "kpsi" },
    { unit_id: 16, decimals: 0, unit_name: "deg C" },
    { unit_id: 17, decimals: 0, unit_name: "deg F" },
  ]);

  // Base units organized by category
  const [BaseUnitsArray] = useState({
    Area: [
      { unit_id: 1, decimals: 0.12, unit_name: "sq cm" },
      { unit_id: 2, decimals: 0.12, unit_name: "sq in" },
    ],
    Time: [
      { unit_id: 3, decimals: 0, unit_name: "sec" },
      { unit_id: 4, decimals: 0.1, unit_name: "min" },
      { unit_id: 5, decimals: 0.12, unit_name: "hrs" },
    ],
    Speed: [
      { unit_id: 6, decimals: 0.1, unit_name: "mm/sec" },
      { unit_id: 7, decimals: 0.12, unit_name: "inches/sec" },
      { unit_id: 21, decimals: 0.12, unit_name: "rpm" },
    ],
    Volume: [{ unit_id: 23, unit_name: "cm^3" }],
    Weight: [
      { unit_id: 8, decimals: 0.12, unit_name: "Gms" },
      { unit_id: 9, decimals: 0.12, unit_name: "oz" },
    ],
    Tonnage: [
      { unit_id: 18, unit_name: "US tons" },
      { unit_id: 19, unit_name: "metric ton" },
      { unit_id: 20, unit_name: "kN" },
    ],
    Distance: [
      { unit_id: 10, decimals: 0.12, unit_name: "mm" },
      { unit_id: 11, decimals: 0.12, unit_name: "in" },
      { unit_id: 22, decimals: 0.12, unit_name: "cm" },
    ],
    Pressure: [
      { unit_id: 12, decimals: 0.12, unit_name: "MPa" },
      { unit_id: 13, decimals: 0, unit_name: "psi" },
      { unit_id: 14, decimals: 0, unit_name: "bar" },
      { unit_id: 15, decimals: 0, unit_name: "kpsi" },
    ],
    Temperature: [
      { unit_id: 16, decimals: 0, unit_name: "deg C" },
      { unit_id: 17, decimals: 0, unit_name: "deg F" },
    ],
  });

  useEffect(() => {
    if (RowId) {
      const decodedId = parseInt(atob(RowId));
      const StoredMoldData = JSON.parse(sessionStorage.getItem("MoldData")) || [];
      const mold = StoredMoldData.find((m) => m.id === decodedId);

      if (mold) {
        setMoldData(mold);
        const unitData = {};
        Object.keys(mold).forEach((key) => {
          unitData[key] = { value: mold[key], unit_id: "" };
        });
        setMoldUnitData(unitData);
      }
    }
  }, [RowId]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between ml-3 pt-3 pb-3">
        <BreadCrumb DB_Name={"Mold"} Current_Page={"View"} />
      </div>

      <div className="container-fluid">
        <div className="card p-3 ml-2" style={{ background: "#e4eae1" }}>
          <div className="pt-2 pb-2">
            <button className="btn btn-primary btn-air-primary mr-2" onClick={() => history.push(`/database/Options/${RowId}/MoldEdit`)}>
              Edit
            </button>
            <button className="btn btn-secondary btn-air-secondary mr-2" onClick={() => history.push("/databases")}>
              Back to List
            </button>
          </div>

          <div className="d-flex col-md-12">
            <div className="col-md-6">
              <LeftInputSection 
                SelectedMoldUnitData={moldUnitData} 
                StoredUnits={StoredUnits} 
                BaseUnitsArray={BaseUnitsArray} 
                MaterialData={JSON.parse(sessionStorage.getItem("MaterialData")) || []}
                Page={"View"} 
              />
            </div>
            <div className="col-md-6">
              <RightInputSection 
                SelectedMoldUnitData={moldUnitData} 
                StoredUnits={StoredUnits} 
                BaseUnitsArray={BaseUnitsArray} 
                Page={"View"} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoldView;
