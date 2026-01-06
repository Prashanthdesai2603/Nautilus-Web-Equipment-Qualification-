import React, { useState, useRef } from "react";
import {
  HtmlEditor,
  RichTextEditorComponent,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-richtexteditor";

const Notes = ({ sessionId, onClose }) => {
  const storageKey = sessionId ? `notesData_${sessionId}` : "notesData";
  const rteRef = useRef(null);

  /* ================= STATE ================= */

  const [comment, setComment] = useState(() => {
    return localStorage.getItem(storageKey) || "";
  });

  /* ================= HANDLERS ================= */

  // Editor change
  const getComment = (e) => {
    const value = e?.value ?? "";
    setComment(value);
    localStorage.setItem(storageKey, value);
  };

  // Save
  const handleSave = () => {
    localStorage.setItem(storageKey, comment);
    alert("Notes saved successfully");
  };

  /* ================= TOOLBAR ================= */

  const toolbarSettings = {
    items: [
      "Bold",
      "Italic",
      "Underline",
      "|",
      "FontSize",
      "FontColor",
      "BackgroundColor",
      "|",
      "Alignments",
      "OrderedList",
      "UnorderedList",
      "|",
      "Undo",
      "Redo",
    ],
  };

  /* ================= UI ================= */

  return (
    <div
      className="card equipmentDash p-3 ml-2"
      style={{
        backgroundColor: "#e4eae1",
        height: "calc(100vh - 210px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TOP BAR - Matching EQ style */}
      <div className="pt-2 pb-2 pr-2 pl-1 mb-2">
        <div className="d-flex col-md-12">
          <div className="col-md-9 d-flex align-items-center">
            <h6 className="mb-0">Notes</h6>
          </div>
        </div>
      </div>

      {/* EDITOR (SCROLLABLE AREA) */}
      <div style={{ flex: 1, overflow: "hidden", border: "1px solid #ccc", backgroundColor: "#fff" }}>
        <RichTextEditorComponent
          ref={rteRef}
          value={comment}
          change={getComment}
          toolbarSettings={toolbarSettings}
          height="100%"
        >
          <Inject services={[Toolbar, HtmlEditor]} />
        </RichTextEditorComponent>
      </div>

      {/* ACTION BUTTONS - FOOTER */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "10px",
          padding: "10px",
          borderTop: "1px solid #ccc",
          backgroundColor: "#f5f5f5",
          marginTop: "10px"
        }}
      >
        <button
          className="btn btn-secondary btn-air-secondary"
          onClick={handleSave}
        >
          Save
        </button>

        <button
          className="btn btn-secondary btn-air-secondary"
          onClick={() => {
            if (onClose) onClose();
          }}
        >
          Close
        </button>
      </div>

    </div>
  );
};

export default Notes;

