import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../../App.css";
import BreadCrumb from "../CommonSections/BreadCrumb";
import LeftMaterialForm from "./LeftMaterialForm";
import RightMaterialForm from "./RightMaterialForm";
import CustomFieldsTable from "./CustomFieldsTable";

const MaterialView = () => {
  const history = useHistory();
  const { RowId } = useParams();

  const [column, setColumn] = useState([]);

  const [SelectedMaterialData, setSelectedMaterialData] = useState({
    Material_Id: "",
    Base_Resin: "",
    Manufacturer: "",
    Specific_Gravity: "",
    Min_Melt_Temperature: "",
    Max_Melt_Temperature: "",
    Avg_Melt_Temperature: "",
    Min_Mold_Temperature: "",
    Max_Mold_Temperature: "",
    Avg_Mold_Temperature: "",
    Drying_Temperature: "",
    Drying_Time_Min: "",
    Drying_Time_Max: "",
    Max_Residence_Time: "",
  });

  const [SelectedMaterialsUnitData, setSelectedMaterialsUnitData] = useState({
    Material_Id: { value: "", unit_id: "" },
    Base_Resin: { value: "", unit_id: "" },
    Manufacturer: { value: "", unit_id: "" },
    Specific_Gravity: { value: "", unit_id: "" },
    Min_Melt_Temperature: { value: "", unit_id: "" },
    Max_Melt_Temperature: { value: "", unit_id: "" },
    Avg_Melt_Temperature: { value: "", unit_id: "" },
    Min_Mold_Temperature: { value: "", unit_id: "" },
    Max_Mold_Temperature: { value: "", unit_id: "" },
    Avg_Mold_Temperature: { value: "", unit_id: "" },
    Drying_Temperature: { value: "", unit_id: "" },
    Drying_Time_Min: { value: "", unit_id: "" },
    Drying_Time_Max: { value: "", unit_id: "" },
    Max_Residence_Time: { value: "", unit_id: "" },
  });

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

  const GoToEdit = () => {
    history.push(`/database/Options/${RowId}/MaterialEdit`);
  };

  // Load data on mount
  useEffect(() => {
    if (RowId) {
      const decodedId = parseInt(atob(RowId));
      const StoredMaterialData = JSON.parse(sessionStorage.getItem("MaterialData")) || [];
      const material = StoredMaterialData.find((m) => m.id === decodedId);

      if (material) {
        setSelectedMaterialData(material);

        // Set unit data from material data
        const unitData = {};
        Object.keys(material).forEach((key) => {
          unitData[key] = { value: material[key], unit_id: "" };
        });
        setSelectedMaterialsUnitData({ ...SelectedMaterialsUnitData, ...unitData });
      }
    }
  }, [RowId]);

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between ml-3 pt-3 pb-3">
          <BreadCrumb DB_Name={"Material"} Current_Page={"View"} />
        </div>

        <div className="container-fluid">
          <div className="card p-3 ml-2" style={{ background: "#e4eae1" }}>
            <div className="pt-2 pb-2">
              <button className="btn btn-primary btn-air-primary mr-2" onClick={GoToEdit}>
                Edit
              </button>
              <button className="btn btn-secondary btn-air-secondary mr-2" onClick={() => history.push("/databases")}>
                Back to List
              </button>
            </div>

            <div className="d-flex col-md-12">
              <div className="col-md-4">
                <div className="form-inline">
                  <LeftMaterialForm
                    SelectedMaterialsUnitData={SelectedMaterialsUnitData}
                    StoredUnits={UnitSettings}
                    BaseUnitsArray={BaseUnits}
                    Page={"View"}
                  />
                </div>
              </div>

              <div className="ml-1 col-md-4">
                <div className="form-inline">
                  <RightMaterialForm
                    SelectedMaterialsUnitData={SelectedMaterialsUnitData}
                    StoredUnits={UnitSettings}
                    BaseUnitsArray={BaseUnits}
                    Page={"View"}
                  />
                </div>
              </div>

              <div className="ml-3 col-md-4">
                <CustomFieldsTable
                  column={column}
                  SelectedMaterialData={SelectedMaterialData}
                  Page={"View"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialView;
