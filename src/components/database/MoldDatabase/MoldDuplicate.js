import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "../../App.css";
import { useParams, useHistory } from "react-router-dom";
import LeftInputSection from "./LeftInputSection";
import RightInputSection from "./RightInputSection";
import BreadCrumb from "../CommonSections/BreadCrumb";

const MoldDuplicate = () => {
  const history = useHistory();
  const { RowId } = useParams();

  const [SamePage, setSamePage] = useState(false);

  const [moldData, setMoldData] = useState({
    Mold_No: "",
    Material_Id: "",
    Platen_Orientation: "Horizontal",
    Number_of_Bases: "1",
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

  const [ModalStates, setModalStates] = useState({
    MoldIdConfirm: { visibility: false, title: "Confirm Mold No", message: "Mold No is mandatory." },
    MoldIdUnique: { visibility: false, title: "Duplicate Mold No", message: "Mold No should be unique." },
    ConvertConfirm: { visibility: false, title: "Confirm Unit Change", message: "You are changing the units, do you want to change the value accordingly?" },
  });

  const ToggleModalStates = (ModalKey) => {
    setModalStates({
      ...ModalStates,
      [ModalKey]: { ...ModalStates[ModalKey], visibility: !ModalStates[ModalKey].visibility },
    });
  };

  useEffect(() => {
    if (RowId) {
      const decodedId = parseInt(atob(RowId));
      const StoredMoldData = JSON.parse(sessionStorage.getItem("MoldData")) || [];
      const mold = StoredMoldData.find((m) => m.id === decodedId);

      if (mold) {
        setMoldData({ ...mold, Mold_No: "" }); // Clear Mold_No for duplicate
        const unitData = {};
        Object.keys(mold).forEach((key) => {
          unitData[key] = { value: key === "Mold_No" ? "" : mold[key], unit_id: "" };
        });
        setMoldUnitData(unitData);
      }
    }
  }, [RowId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMoldData({ ...moldData, [name]: value });
    setMoldUnitData({ ...moldUnitData, [name]: { value: value, unit_id: "" } });
  };

  const SaveData = () => {
    const StoredMoldData = JSON.parse(sessionStorage.getItem("MoldData")) || [];
    const newId = StoredMoldData.length > 0 ? Math.max(...StoredMoldData.map(m => m.id)) + 1 : 1;
    
    const newMold = { ...moldData, id: newId };
    StoredMoldData.push(newMold);
    sessionStorage.setItem("MoldData", JSON.stringify(StoredMoldData));

    if (SamePage) {
      history.push(`/database/Options/${btoa(newId)}/MoldView`);
    } else {
      history.push({ pathname: "/databases", TabIdx: 1 });
    }
  };

  const SubmitData = () => {
    if (!moldData.Mold_No) {
      ToggleModalStates("MoldIdConfirm");
      return;
    }

    const StoredMoldData = JSON.parse(sessionStorage.getItem("MoldData")) || [];
    const exists = StoredMoldData.some(
      (m) => String(m.Mold_No).toLowerCase() === String(moldData.Mold_No).toLowerCase()
    );

    if (exists) {
      ToggleModalStates("MoldIdUnique");
      return;
    }

    SaveData();
  };

  return (
    <>
      <Modal isOpen={ModalStates.MoldIdConfirm.visibility} centered={true} style={{ width: "400px" }}>
        <ModalHeader>{ModalStates.MoldIdConfirm.title}</ModalHeader>
        <ModalBody>{ModalStates.MoldIdConfirm.message}</ModalBody>
        <ModalFooter><Button color="primary" onClick={() => ToggleModalStates("MoldIdConfirm")}>Close</Button></ModalFooter>
      </Modal>

      <Modal isOpen={ModalStates.MoldIdUnique.visibility} centered={true} style={{ width: "400px" }}>
        <ModalHeader>{ModalStates.MoldIdUnique.title}</ModalHeader>
        <ModalBody>{ModalStates.MoldIdUnique.message}</ModalBody>
        <ModalFooter><Button color="primary" onClick={() => ToggleModalStates("MoldIdUnique")}>Close</Button></ModalFooter>
      </Modal>

      <div className="container-fluid">
        <div className="d-flex justify-content-between ml-3 pt-3 pb-3">
          <BreadCrumb DB_Name={"Mold"} Current_Page={"Duplicate"} />
        </div>

        <div className="container-fluid">
          <div className="card p-3 ml-2" style={{ background: "#e4eae1" }}>
            <div className="d-flex col-md-12">
              <div className="pt-2 pb-2">
                <button className="btn btn-info btn-air-info mr-2" onClick={SubmitData}>
                  {SamePage ? "Save and View" : "Save and Exit"}
                </button>
              </div>
              <div className="pt-2 pb-2">
                <button className="btn btn-secondary btn-air-secondary mr-2" onClick={() => history.push("/databases")}>Cancel</button>
              </div>
              <div className="pt-2 pb-2">
                <label className="ml-3">
                  <input type="checkbox" checked={SamePage} onChange={(e) => setSamePage(e.target.checked)} /> View after save
                </label>
              </div>
            </div>

            <div className="d-flex col-md-12">
              <div className="col-md-6">
                <LeftInputSection 
                  SelectedMoldUnitData={moldUnitData} 
                  handleChange={handleChange} 
                  StoredUnits={StoredUnits} 
                  BaseUnitsArray={BaseUnitsArray}
                  MaterialData={JSON.parse(sessionStorage.getItem("MaterialData")) || []}
                />
              </div>
              <div className="col-md-6">
                <RightInputSection 
                  SelectedMoldUnitData={moldUnitData} 
                  handleChange={handleChange} 
                  StoredUnits={StoredUnits} 
                  BaseUnitsArray={BaseUnitsArray} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoldDuplicate;
