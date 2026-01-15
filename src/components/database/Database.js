import { useState, useRef, useEffect } from "react";
import "../App.css";
import "./database.css"
import { Button, Input, Label } from "reactstrap";

// Tab view component from syncfusion to navigate through six steps study
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";

import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { setHeaderTitle } from "../../actions/header";
import MaterialDatabase from "./MaterialDatabase/Materialdb";
import MoldDatabase from "./MoldDatabase/MoldDB";
import MachineDatabase from "./MachineDatabase/Machinedb";

import { useHistory } from "react-router-dom";
import { ModalHeader } from "reactstrap";
import DatabasePrintable from "./DatabasePrintable";

const Database = ({
  setHeaderTitle,
  ...props
}) => {

  const tabInstance = useRef(null);
  let { TabIdx } = props.location || {};
  let TabName = ["Material Database", "Mold Database", "Machine Database"];

  const [ActiveTab, setActiveTab] = useState(TabName[0]);

  useEffect(() => {
    setHeaderTitle("Databases");
  }, [setHeaderTitle]);

  const materialData = useRef({
    GridColumn: [],
    GridData: []
  });
  const moldData = useRef({
    GridColumn: [],
    GridData: []
  });
  const machineData = useRef({
    GridColumn: [],
    GridData: []
  });

  const [selectedDatabases, setSelectedDatabases] = useState({
    material: false,
    mold: false,
    machine: false,
  });

  const [ShowPrintPart, setShowPrintPart] = useState(false)

  // Handle Checkbox Change
  const handleCheckboxChange = (e) => {
    setSelectedDatabases((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const history = useHistory();

  const BackToDashboard = () => {
    history.push("/dashboard");
  };

  let headertext = [
    { text: "Material Database" },
    { text: "Mold Database" },
    { text: "Machine Database" },
  ];

  const content0 = () => {
    return (
      <div id="material-table">
        <div>
          <MaterialDatabase materialData={materialData} />
        </div>
      </div>
    );
  }

  const content1 = () => {
    return (
      <div id="mold-table">
        <MoldDatabase moldData={moldData} />
      </div>
    );
  }

  const content2 = () => {
    return (
      <div id="machine-table">
        <MachineDatabase machineData={machineData} />
      </div>
    )
  }

  const tabSelected = (args) => {
    setActiveTab(TabName[args.selectedIndex]);
  };

  useEffect(() => {
    if (TabIdx !== undefined && tabInstance.current) {
      tabInstance.current.select(TabIdx);
      setActiveTab(TabName[TabIdx]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TabIdx]);

  useEffect(() => {
    sessionStorage.removeItem("SelectedMoldData");
  }, []);

  // Event to close the saving confirmation dialog
  const closeDialog = () => {
    const dialogBox = document.getElementById("dialogBox");
    dialogBox.classList.add("hidden");
  }

  const handlePrint = async () => {
    closeDialog();
    tabInstance.current.select(0);
    setShowPrintPart(true);

    // Simple print functionality without PDF generation
    setTimeout(() => {
      window.print();
      setSelectedDatabases({
        material: false,
        mold: false,
        machine: false,
      });
      setShowPrintPart(false);
    }, 500);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-between ml-3 pt-3 pb-3">
          <div className="d-flex">
            <span
              onClick={BackToDashboard}
              className="BreadCrum"
              style={{ fontSize: "14px", color: "blue", cursor: "pointer" }}
            >
              Dashboard
            </span>
            <span className="BreadCrum" style={{ fontSize: "16px" }}>
              {" > "}
            </span>
            <span style={{ fontSize: "14px" }}> {ActiveTab} </span>
          </div>
        </div>

        <div className="position-relative">
          <div className="d-flex">
            <div className="col-md-12">
              {!ShowPrintPart ? <TabComponent
                ref={tabInstance}
                heightAdjustMode="Auto"
                id="defaultTab" animation={{ previous: { effect: "None" }, next: { effect: "None" } }}
                selected={tabSelected}
              >
                <TabItemsDirective>
                  <TabItemDirective header={headertext[0]} content={content0} />
                  <TabItemDirective header={headertext[1]} content={content1} />
                  <TabItemDirective header={headertext[2]} content={content2} />
                </TabItemsDirective>
              </TabComponent> :
                <div className="m-2" id="PrintablePart">
                  <DatabasePrintable
                    materialData={materialData.current}
                    moldData={moldData.current}
                    machineData={machineData.current}
                    selectedDatabases={selectedDatabases}
                  />
                </div>
              }
            </div>
          </div>
        </div>

      </div>

      {/* To alert while going back to sessions page */}
      <div id="dialogBox" className="hidden" style={{ padding: "0px" }}>
        <ModalHeader>
          Select Databases to Print
        </ModalHeader>
        <div className="dialog-content" style={{ paddingLeft: "20px", paddingRight: "20px", paddingBottom: "20px" }}>
          <div className="form-check">
            <Input
              type="checkbox"
              name="material"
              id="material"
              checked={selectedDatabases.material}
              onChange={handleCheckboxChange}
            />
            <Label for="material" className="form-check-label ml-3">
              Material Database
            </Label>
          </div>
          <div className="form-check">
            <Input
              type="checkbox"
              name="mold"
              id="mold"
              checked={selectedDatabases.mold}
              onChange={handleCheckboxChange}
            />
            <Label for="mold" className="form-check-label  ml-3">
              Mold Database
            </Label>
          </div>
          <div className="form-check">
            <Input
              type="checkbox"
              name="machine"
              id="machine"
              checked={selectedDatabases.machine}
              onChange={handleCheckboxChange}
            />
            <Label for="machine" className="form-check-label  ml-3">
              Machine Database
            </Label>
          </div>

          <div className="d-flex justify-content-end col-md-12">
            <div className="col-md-5">
              <Button className="" color="secondary" onClick={handlePrint}>
                Print Selected
              </Button>
            </div>
            <div className="col-md-4">
              <Button color="secondary" onClick={closeDialog}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default connect(null, {
  setHeaderTitle,
})(Database);
