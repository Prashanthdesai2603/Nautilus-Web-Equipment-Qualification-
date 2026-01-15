import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../../App.css";
import LeftInputSection from "./LeftFormsection";
import RightInputSection from "./RightFormSection";
import BreadCrumb from "../CommonSections/BreadCrumb";

const MachineView = () => {
  const history = useHistory();
  const { RowId } = useParams();

  const [machineData, setMachineData] = useState({
    Machine_Number: "",
    Make: "",
    "Type(Platen_Orientation)": "",
    Tonnage: "",
    Screw_Diameter: "",
    Max_Screw_Rotation_Speed: "",
    Max_Screw_Rotation_Linear_Speed: "",
    Max_Machine_Pressure: "",
    Intensification_Ratio: "",
    Max_Plastic_Pressure: "",
    "Max_shot_Capacity(Wt)": "",
    Max_Melt_Temperature: "",
    Min_allowable_Mold_Stack_Height: "",
    Max_allowable_Mold_Stack_Height: "",
    Max_Mold_Open_Daylight: "",
    "Tiebar_Clearance-Width": "",
    Max_Mold_Vertical_Height: "",
    Max_Mold_Width: "",
    Number_of_Core_Pulls: "",
  });

  const [machineUnitData, setMachineUnitData] = useState({});

  // Default unit settings for temperature calculations
  const [UnitSettings] = useState([
    {
      "unit_id": 1,
      "decimals": 0.12,
      "unit_name": "sq cm"
    },
    {
      "unit_id": 2,
      "decimals": 0.12,
      "unit_name": "sq in"
    },
    {
      "unit_id": 3,
      "decimals": 0,
      "unit_name": "sec"
    },
    {
      "unit_id": 4,
      "decimals": 0.1,
      "unit_name": "min"
    },
    {
      "unit_id": 5,
      "decimals": 0.12,
      "unit_name": "hrs"
    },
    {
      "unit_id": 6,
      "decimals": 0.1,
      "unit_name": "mm/sec"
    },
    {
      "unit_id": 7,
      "decimals": 0.12,
      "unit_name": "inches/sec"
    },
    {
      "unit_id": 21,
      "decimals": 0.12,
      "unit_name": "rpm"
    },
    {
      "unit_id": 23,
      "unit_name": "cm^3"
    },
    {
      "unit_id": 8,
      "decimals": 0.12,
      "unit_name": "Gms"
    },
    {
      "unit_id": 9,
      "decimals": 0.12,
      "unit_name": "oz"
    },
    {
      "unit_id": 18,
      "unit_name": "US tons"
    },
    {
      "unit_id": 19,
      "unit_name": "metric ton"
    },
    {
      "unit_id": 20,
      "unit_name": "kN"
    },
    {
      "unit_id": 10,
      "decimals": 0.12,
      "unit_name": "mm"
    },
    {
      "unit_id": 11,
      "decimals": 0.12,
      "unit_name": "in"
    },
    {
      "unit_id": 22,
      "decimals": 0.12,
      "unit_name": "cm"
    },
    {
      "unit_id": 12,
      "decimals": 0.12,
      "unit_name": "MPa"
    },
    {
      "unit_id": 13,
      "decimals": 0,
      "unit_name": "psi"
    },
    {
      "unit_id": 14,
      "decimals": 0,
      "unit_name": "bar"
    },
    {
      "unit_id": 15,
      "decimals": 0,
      "unit_name": "kpsi"
    },
    {
      "unit_id": 16,
      "decimals": 0,
      "unit_name": "deg C"
    },
    {
      "unit_id": 17,
      "decimals": 0,
      "unit_name": "deg F"
    }
  ]);

  const [BaseUnits] = useState({
    "Area": [
      {
        "unit_id": 1,
        "decimals": 0.12,
        "unit_name": "sq cm"
      },
      {
        "unit_id": 2,
        "decimals": 0.12,
        "unit_name": "sq in"
      }
    ],
    "Time": [
      {
        "unit_id": 3,
        "decimals": 0,
        "unit_name": "sec"
      },
      {
        "unit_id": 4,
        "decimals": 0.1,
        "unit_name": "min"
      },
      {
        "unit_id": 5,
        "decimals": 0.12,
        "unit_name": "hrs"
      }
    ],
    "Speed": [
      {
        "unit_id": 6,
        "decimals": 0.1,
        "unit_name": "mm/sec"
      },
      {
        "unit_id": 7,
        "decimals": 0.12,
        "unit_name": "inches/sec"
      },
      {
        "unit_id": 21,
        "decimals": 0.12,
        "unit_name": "rpm"
      }
    ],
    "Volume": [
      {
        "unit_id": 23,
        "unit_name": "cm^3"
      }
    ],
    "Weight": [
      {
        "unit_id": 8,
        "decimals": 0.12,
        "unit_name": "Gms"
      },
      {
        "unit_id": 9,
        "decimals": 0.12,
        "unit_name": "oz"
      }
    ],
    "Tonnage": [
      {
        "unit_id": 18,
        "unit_name": "US tons"
      },
      {
        "unit_id": 19,
        "unit_name": "metric ton"
      },
      {
        "unit_id": 20,
        "unit_name": "kN"
      }
    ],
    "Distance": [
      {
        "unit_id": 10,
        "decimals": 0.12,
        "unit_name": "mm"
      },
      {
        "unit_id": 11,
        "decimals": 0.12,
        "unit_name": "in"
      },
      {
        "unit_id": 22,
        "decimals": 0.12,
        "unit_name": "cm"
      }
    ],
    "Pressure": [
      {
        "unit_id": 12,
        "decimals": 0.12,
        "unit_name": "MPa"
      },
      {
        "unit_id": 13,
        "decimals": 0,
        "unit_name": "psi"
      },
      {
        "unit_id": 14,
        "decimals": 0,
        "unit_name": "bar"
      },
      {
        "unit_id": 15,
        "decimals": 0,
        "unit_name": "kpsi"
      }
    ],
    "Temperature": [
      {
        "unit_id": 16,
        "decimals": 0,
        "unit_name": "deg C"
      },
      {
        "unit_id": 17,
        "decimals": 0,
        "unit_name": "deg F"
      }
    ]
  });

  useEffect(() => {
    if (RowId) {
      const decodedId = parseInt(atob(RowId));
      const StoredMachineData = JSON.parse(sessionStorage.getItem("MachineData")) || [];
      const machine = StoredMachineData.find((m) => m.id === decodedId);

      if (machine) {
        setMachineData(machine);
        const unitData = {};
        Object.keys(machine).forEach((key) => {
          unitData[key] = { value: machine[key], unit_id: "" };
        });
        setMachineUnitData(unitData);
      }
    }
  }, [RowId]);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between ml-3 pt-3 pb-3">
        <BreadCrumb DB_Name={"Machine"} Current_Page={"View"} />
      </div>

      <div className="container-fluid">
        <div className="card p-3 ml-2" style={{ background: "#e4eae1" }}>
          <div className="pt-2 pb-2">
            <button className="btn btn-primary btn-air-primary mr-2" onClick={() => history.push(`/database/Options/${RowId}/MachineEdit`)}>
              Edit
            </button>
            <button className="btn btn-secondary btn-air-secondary mr-2" onClick={() => history.push("/databases")}>
              Back to List
            </button>
          </div>

          <div className="d-flex col-md-12">
            <div className="col-md-6">
              <LeftInputSection machineUnitData={machineUnitData} StoredUnits={UnitSettings} BaseUnitsArray={BaseUnits} Page={"View"} />
            </div>
            <div className="col-md-6">
              <RightInputSection machineUnitData={machineUnitData} StoredUnits={UnitSettings} BaseUnitsArray={BaseUnits} Page={"View"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineView;
