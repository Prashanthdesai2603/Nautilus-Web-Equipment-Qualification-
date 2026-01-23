import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import App from "./components/app";
import { Provider } from "react-redux";
import store from "./store";
import { registerLicense } from "@syncfusion/ej2-base";

import EquipmentDashboard from "./components/EquipmentQualification/EquipmentDashboard";
import Database from "./components/database/Database";

// Material Database Pages
import MaterialNew from "./components/database/MaterialDatabase/MaterialNew";
import MaterialEdit from "./components/database/MaterialDatabase/MaterialEdit";
import MaterialView from "./components/database/MaterialDatabase/MaterialView";
import MaterialDuplicate from "./components/database/MaterialDatabase/MaterialDuplicate";

// Mold Database Pages
import MoldNew from "./components/database/MoldDatabase/MoldNew";
import MoldEdit from "./components/database/MoldDatabase/MoldEdit";
import MoldView from "./components/database/MoldDatabase/MoldView";
import MoldDuplicate from "./components/database/MoldDatabase/MoldDuplicate";

// Machine Database Pages
import MachineNew from "./components/database/MachineDatabase/MachineNew";
import MachineEdit from "./components/database/MachineDatabase/MachineEdit";
import MachineView from "./components/database/MachineDatabase/MachineView";
import MachineDuplicate from "./components/database/MachineDatabase/MachineDuplicate";
import ImportMaterial from "./components/database/ImportMaterial/ImportMaterial";
import ImportMachine from "./components/database/ImportMachine/ImportMachine";
import ImportMold from "./components/database/ImportMold/ImportMold";

// Import Stimulsoft for license registration
import { Stimulsoft } from "stimulsoft-reports-js/Scripts/stimulsoft.reports";
import TonnageOptimization from "./components/TonnageOptimization/TonnageOptimization";

// Registering Syncfusion license key
registerLicense(
  "ORg4AjUWIQA/Gnt2UVhhQlVFfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5Qdk1jXX5Zc3xUTmRf"
);

// Registering Stimulsoft license key
if (typeof Stimulsoft !== 'undefined' && Stimulsoft.Base && Stimulsoft.Base.StiLicense) {
  Stimulsoft.Base.StiLicense.key =
    "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHkkkM7//UzWsFVogMty1qWIYwyioHFWOcT0IXfVnOpj6vV1sN" +
    "ZIIXpnI52dKJ0XqyO9t+PSzKaQY5vDG+2tp7BKLBTP7RdTNAxZdVIqKy20Sp49FepLVP+ZpGTMWMiiCT9zlZuzUGm8" +
    "xOjx1ywgOpbzvcHDBm329QzIR2hk2fUz2fSVbVKJIZBkfPUzKXPIU/hPLFtmFIsgR9jxAgRZx0Ai538LEc67paOL2Z" +
    "fKNzlGpdrEopVGCmo66x3dPcFRT0m1JtndmkFFDOL9O3BkDP194kIr5GuLGCUQzILb0R+s0zXMVRLQI/bjPJoH0+Xe" +
    "q0vT51hvOoIGj9Ta15/QgRUO6VGQGmB4vJ90mmdbTTAYQ7KKkBEk2R3D4N5odj6SWN1sJyi9PH3zniWxw/Mfa8Qqsq" +
    "+JKVKtteeZOGRTWS27haEYKbVoMvjythP567DinMEXPbrVCCnDNHJ7MmyFQjItP8qbz3kvWfhYGyPuMfKwLjvPNMBp" +
    "Y8M3C1O4+FHAmx5FmwyJE6u/xMSbdBp8bPKp";
}

const Root = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter basename={`/`}>
          <Switch>
            {/* Redirect root to Tonnage */}
            <Route exact path="/">
              <Redirect to="/Tonnage" />
            </Route>

            {/* Main app with Equipment Dashboard */}
            <App>
              <Route path="/dashboard" component={EquipmentDashboard} />
              <Route exact path="/databases" component={Database} />
              <Route path="/Tonnage" component={TonnageOptimization} />

              {/* Material Database Routes */}
              <Route path="/database/Options/MaterialNew" component={MaterialNew} />
              <Route path="/database/Options/:RowId/MaterialEdit" component={MaterialEdit} />
              <Route path="/database/Options/:RowId/MaterialView" component={MaterialView} />
              <Route path="/database/Options/:RowId/MaterialDuplicate" component={MaterialDuplicate} />

              {/* Mold Database Routes */}
              <Route path="/database/Options/MoldNew" component={MoldNew} />
              <Route path="/database/Options/:RowId/MoldEdit" component={MoldEdit} />
              <Route path="/database/Options/:RowId/MoldView" component={MoldView} />
              <Route path="/database/Options/:RowId/MoldDuplicate" component={MoldDuplicate} />

              {/* Machine Database Routes */}
              <Route path="/database/Options/MachineNew" component={MachineNew} />
              <Route path="/database/Options/:RowId/MachineEdit" component={MachineEdit} />
              <Route path="/database/Options/:RowId/MachineView" component={MachineView} />
              <Route path="/database/Options/:RowId/MachineDuplicate" component={MachineDuplicate} />

              {/* Import Database Routes */}
              <Route path="/database/ImportMaterial" component={ImportMaterial} />
              <Route path="/database/ImportMachine" component={ImportMachine} />
              <Route path="/database/ImportMold" component={ImportMold} />
            </App>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default Root;

ReactDOM.render(<Root />, document.getElementById("root"));
