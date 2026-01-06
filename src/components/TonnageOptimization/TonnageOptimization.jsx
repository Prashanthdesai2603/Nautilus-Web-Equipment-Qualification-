import { useState, useEffect } from "react";
import NewSessionModal from "./NewSessionModal";
import SessionListModal from "./SessionListModal";

import TonnageReport from "./Report/TonnageReport";
import Tabs from "./Tabs";

import "./tonnage.css";
import { setHeaderTitle } from "../../actions/header";
import { connect } from "react-redux";

const TonnageOptimization = ({ setHeaderTitle }) => {

  useEffect(() => {
    setHeaderTitle("Tonnage Optimization");
  }, [setHeaderTitle]);

  // Report view toggle
  const [ShowPrintPart, setShowPrintPart] = useState(false);

  // Session & Mold details (aligns with EQ pattern)
  // Report section selection

  const [showNewModal, setShowNewModal] = useState(false);
  const [showSessionList, setShowSessionList] = useState(false);
  const [session, setSession] = useState(null);


  // Load session from localStorage on mount if exists
  useEffect(() => {
    const savedSessionId = localStorage.getItem("currentTonnageSessionId");
    if (savedSessionId) {
      const allSessions = JSON.parse(localStorage.getItem("tonnageSessions") || "[]");
      const foundSession = allSessions.find(s => s.id === savedSessionId);
      if (foundSession) {
        setSession(foundSession);
      }
    }
  }, []);

  const openNewSession = () => {
    setShowNewModal(true);
  };

  const openSessionList = () => {
    setShowSessionList(true);
  };

  const handleCreateSession = (data) => {
    // Create session with unique ID
    const newSession = {
      id: Date.now().toString(),
      name: data.name,
      date: data.date,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const allSessions = JSON.parse(localStorage.getItem("tonnageSessions") || "[]");
    allSessions.push(newSession);
    localStorage.setItem("tonnageSessions", JSON.stringify(allSessions));
    localStorage.setItem("currentTonnageSessionId", newSession.id);

    setSession(newSession);
    setShowNewModal(false);
  };

  const handleSelectSession = (selectedSession) => {
    localStorage.setItem("currentTonnageSessionId", selectedSession.id);
    setSession(selectedSession);
    setShowSessionList(false);
  };

  const handleCloseSession = () => {
    localStorage.removeItem("currentTonnageSessionId");
    setSession(null);

  };



  return (
    <div className="tonnage-root container-fluid">
      {/* HEADER - Matching EQ style */}
      <div className="d-flex justify-content-between ml-3 pt-3 pb-3">
        <div className="d-flex">
          <div>
            <span style={{ fontSize: "14px", fontWeight: "bold" }}>
              Tonnage Optimization
            </span>
          </div>
        </div>

        {session && (
          <div className="d-flex mr-4" style={{ border: "1px solid #808080" }}>
            <div className="pl-1 pr-1">
              <span>
                Session Name:
                <span style={{ fontSize: "15px", fontWeight: "bold", color: "#3f5e55" }}> {session.name} </span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* NEW SESSION MODAL */}
      {showNewModal && (
        <NewSessionModal
          onCreate={handleCreateSession}
          onCancel={() => setShowNewModal(false)}
        />
      )}

      {/* SESSION LIST MODAL */}
      {showSessionList && (
        <SessionListModal
          onSelect={handleSelectSession}
          onCancel={() => setShowSessionList(false)}
        />
      )}

      {/* WORKSPACE */}
      <div className="d-flex">
        <div className={ShowPrintPart ? "col-md-12" : "col-md-10"}>
          {session ? (
            !ShowPrintPart ? (
              <Tabs session={session} onCloseSession={handleCloseSession} />
            ) : (
              <TonnageReport
                session={session}
                SessionName={session ? session.name : "Default Session"}
                MoldName={"Sample Mold"}
                selectedPrintSections={{
                  StudyWeight: true,
                  Dim1: true,
                  Dim2: true,
                  Notes: true
                }}
                onClose={() => setShowPrintPart(false)}
              />
            )
          ) : (
            /* If no session, show options to start/view sessions */
            <div className="p-4">
              <h4>Please start or select a session to proceed.</h4>
              <div className="mt-3">
                <button className="btn btn-primary mr-2" onClick={openNewSession}>
                  New Session
                </button>
                <button className="btn btn-secondary" onClick={openSessionList}>
                  View Sessions
                </button>
              </div>
            </div>
          )}
        </div>

        {!ShowPrintPart && session && (
          <div className="col-md-2 text-right">
            <button
              className="btn btn-secondary btn-air-secondary m-0"
              type="button"
              onClick={() => setShowPrintPart(true)}
            >
              Report
            </button>

            <button
              className="btn btn-secondary btn-air-secondary mr-2 ml-2"
              type="button"
              onClick={() => window.print()}
            >
              Print
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default connect(null, { setHeaderTitle })(TonnageOptimization);


