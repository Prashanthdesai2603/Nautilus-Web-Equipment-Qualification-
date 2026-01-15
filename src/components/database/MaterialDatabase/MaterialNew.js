import { useState } from "react";
import "../../App.css";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";
import ConvertCalcfunctions from "./ConvertInputFields";
import LeftMaterialForm from "./LeftMaterialForm";
import RightMaterialForm from "./RightMaterialForm";
import CustomFieldsTable from "./CustomFieldsTable";
import BreadCrumb from "../CommonSections/BreadCrumb";
import ButtonSection from "./ButtonSection";
import AddandEditCustomHeader from "./AddandEditCustomHeader";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const MaterialNew = () => {
  const history = useHistory();

  const [EditModal, setEditModal] = useState(false);
  const [header, setHeader] = useState({ header: "", key: null });
  const [column, setColumn] = useState([]);
  const [DuplicateValue, setDuplicatetValue] = useState(false);
  const [EmptyAlert, setEmptyAlert] = useState(false);
  const [isColumnId, setIsColumnId] = useState(null);
  const [isDeleteId, setIsDeleteId] = useState(null);
  const [SamePage, setSamePage] = useState(false);
  const [modal, setModal] = useState();

  const toggleEditHeader = () => setModal(!modal);

  const [materialData, setMaterialData] = useState({
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

  const [materialUnitData, setmaterialUnitData] = useState({
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

  const [ModalStates, setModalStates] = useState({
    MaterialIdConfirm: {
      visibility: false,
      title: "Confirm Material Id",
      message: "Material Id is mandatory.",
    },
    DeleteConfirm: {
      visibility: false,
      title: "Confirm Field Deletion",
      message: "The field may have data associated with it. Do you want to continue deleting?",
    },
    MaterialIdUnique: {
      visibility: false,
      title: "Duplicate Material ID",
      message: "Material Id should be unique. This Material Id already exists.",
    },
  });

  const ToggleModalStates = (ModalKey) => {
    setModalStates({
      ...ModalStates,
      [ModalKey]: {
        ...ModalStates[ModalKey],
        visibility: !ModalStates[ModalKey].visibility,
      },
    });
  };

  const handleChange = (event) => {
    const { name, value, dataset } = event.target;
    setMaterialData({
      ...materialData,
      [name]: value === "" ? null : isNaN(value) ? value : parseFloat(parseFloat(value).toFixed(2)),
    });

    setmaterialUnitData({
      ...materialUnitData,
      [name]: { value: value, unit_id: dataset.unit || null },
    });
  };

  const SaveData = () => {
    const StoredMaterialData = JSON.parse(sessionStorage.getItem("MaterialData")) || [];
    const newId = StoredMaterialData.length > 0
      ? Math.max(...StoredMaterialData.map(m => m.id)) + 1
      : 1;

    const newMaterial = {
      id: newId,
      ...materialData,
    };

    StoredMaterialData.push(newMaterial);
    sessionStorage.setItem("MaterialData", JSON.stringify(StoredMaterialData));

    if (SamePage) {
      const RowId = btoa(newId);
      history.push(`/database/Options/${RowId}/MaterialView`);
    } else {
      history.push("/databases");
    }
  };

  const CheckForMaterialId = () => {
    return new Promise((resolve) => {
      if (!materialData["Material_Id"]) {
        ToggleModalStates("MaterialIdConfirm");
      } else {
        resolve();
      }
    });
  };

  const CheckForDuplicateMaterialId = () => {
    return new Promise((resolve) => {
      const StoredMaterialData = JSON.parse(sessionStorage.getItem("MaterialData")) || [];
      const exists = StoredMaterialData.some(
        (m) => String(m.Material_Id).toLowerCase() === String(materialData["Material_Id"]).toLowerCase()
      );

      if (!exists) {
        resolve();
      } else {
        ToggleModalStates("MaterialIdUnique");
      }
    });
  };

  const SubmitData = () => {
    CheckForMaterialId().then(() => {
      CheckForDuplicateMaterialId().then(() => {
        SaveData();
      });
    });
  };

  const ToggleEditModal = () => {
    setEditModal(!EditModal);
    setHeader({ header: "", key: null });
    setEmptyAlert(false);
    setDuplicatetValue(false);
  };

  const addHeader = (e) => {
    setHeader({
      header: e.target.value,
      key: column.length > 0 ? column[column.length - 1].field.slice(5) : 0,
    });
    setEmptyAlert(false);
    setDuplicatetValue(false);
  };

  const addColumn = () => {
    if (!header.header) {
      setEmptyAlert(true);
    } else {
      const exists = column.some(
        (h) => h.headerText?.toLowerCase() === header.header.toLowerCase()
      );
      if (!exists) {
        const newColumn = {
          id: nanoid(),
          field: `value${parseInt(header.key) + 1}`,
          headerText: header.header,
          width: 100,
        };
        setColumn([...column, newColumn]);
        setHeader({ header: "", key: null });
        setEmptyAlert(false);
        setDuplicatetValue(false);
      } else {
        setDuplicatetValue(true);
        setHeader({ header: "", key: null });
      }
    }
  };

  const editColumn = (data, key) => setIsColumnId({ data, key });
  const DeleteColumnId = (HeaderData) => setIsDeleteId(HeaderData);

  const editColumnHeader = () => {
    if (header && isColumnId) {
      setColumn(
        column.map((element) =>
          element.id === isColumnId.data.id ? { ...element, headerText: header.header } : element
        )
      );
      setHeader({ header: "", key: null });
      setIsColumnId(null);
    }
  };

  const deleteColumn = () => {
    setColumn((prev) => prev.filter((h) => h.id !== isDeleteId.id));
    if (materialData[isDeleteId.field]) {
      delete materialData[isDeleteId.field];
    }
    setIsDeleteId(null);
    ToggleModalStates("DeleteConfirm");
  };

  const UpdateInputCalculations = (category) => {
    ConvertCalcfunctions.UpdateCalculations({
      UnitSettings,
      category,
      SelectedMaterialData: materialData,
      setSelectedMaterialData: setMaterialData,
      setSelectedMaterialsUnitData: setmaterialUnitData,
      SelectedMaterialsUnitData: materialUnitData,
    });
  };

  return (
    <>
      <Modal isOpen={ModalStates.MaterialIdConfirm.visibility} centered={true} style={{ width: "400px" }}>
        <ModalHeader>{ModalStates.MaterialIdConfirm.title}</ModalHeader>
        <ModalBody>{ModalStates.MaterialIdConfirm.message}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => ToggleModalStates("MaterialIdConfirm")}>Close</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={ModalStates.MaterialIdUnique.visibility} centered={true} style={{ width: "400px" }}>
        <ModalHeader>{ModalStates.MaterialIdUnique.title}</ModalHeader>
        <ModalBody>{ModalStates.MaterialIdUnique.message}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => ToggleModalStates("MaterialIdUnique")}>Close</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={ModalStates.DeleteConfirm.visibility} centered={true} style={{ width: "400px" }}>
        <ModalHeader>{ModalStates.DeleteConfirm.title}</ModalHeader>
        <ModalBody>{ModalStates.DeleteConfirm.message}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={deleteColumn}>Delete</Button>
          <Button color="secondary" onClick={() => ToggleModalStates("DeleteConfirm")}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <div className="container-fluid">
        <div className="d-flex justify-content-between ml-3 pt-3 pb-3">
          <BreadCrumb DB_Name={"Material"} Current_Page={"New"} />
        </div>

        <div className="container-fluid">
          <div className="card p-3 ml-2" style={{ background: "#e4eae1" }}>
            <ButtonSection
              SubmitData={SubmitData}
              history={history}
              SamePage={SamePage}
              setSamePage={setSamePage}
            />

            <div className="d-flex col-md-12">
              <div className="col-md-4">
                <div className="form-inline">
                  <LeftMaterialForm
                    SelectedMaterialsUnitData={materialUnitData}
                    handleChange={handleChange}
                    StoredUnits={UnitSettings}
                    BaseUnitsArray={BaseUnits}
                    UpdateInputCalculations={UpdateInputCalculations}
                  />
                </div>
              </div>

              <div className="ml-1 col-md-4">
                <div className="form-inline">
                  <RightMaterialForm
                    SelectedMaterialsUnitData={materialUnitData}
                    handleChange={handleChange}
                    StoredUnits={UnitSettings}
                    BaseUnitsArray={BaseUnits}
                    UpdateInputCalculations={UpdateInputCalculations}
                  />
                </div>
              </div>

              <div className="ml-3 col-md-4">
                <CustomFieldsTable
                  column={column}
                  handleChange={handleChange}
                  SelectedMaterialData={materialData}
                  ToggleEditModal={ToggleEditModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <AddandEditCustomHeader
          EditModal={EditModal}
          EmptyAlert={EmptyAlert}
          DuplicateValue={DuplicateValue}
          addHeader={addHeader}
          header={header}
          addColumn={addColumn}
          column={column}
          editColumnHeader={editColumnHeader}
          editColumn={editColumn}
          DeleteColumnId={DeleteColumnId}
          toggleEditHeader={toggleEditHeader}
          ToggleModalStates={ToggleModalStates}
          ToggleEditModal={ToggleEditModal}
          modal={modal}
        />
      </div>
    </>
  );
};

export default MaterialNew;
