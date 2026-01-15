import React from "react";
import { useHistory } from "react-router-dom";

const BreadCrumb = ({ Current_Page, DB_Name, TabIdx }) => {
  const history = useHistory();

  return (
    <div className="d-flex">
      <div>
        <span
          className="BreadCrum"
          style={{ fontSize: "14px", color: "blue" }}
          onClick={() => {
            history.push({
              pathname: "/database/Database",
              TabIdx: 0,
            });
          }}
        >
          {" "}
          Database{" "}
        </span>
      </div>
      <div>
        <span className="BreadCrum" style={{ fontSize: "16px" }}>
          {" "}
          {">"}{" "}
        </span>
      </div>
      <div>
        <span
          className="BreadCrum"
          style={{ fontSize: "14px", color: "blue" }}
          onClick={() => {
            history.push({
              pathname: "/database/Database",
              TabIdx: TabIdx,
            });
          }}
        >
          {" "}
          {DB_Name} Database{" "}
        </span>
      </div>
      <div>
        <span className="BreadCrum" style={{ fontSize: "16px" }}>
          {" "}
          {">"}{" "}
        </span>
      </div>
      <div>
        <span style={{ fontSize: "14px" }}>
          {" "}
          {Current_Page} {DB_Name}{" "}
        </span>
      </div>
    </div>
  );
};

export default BreadCrumb;
