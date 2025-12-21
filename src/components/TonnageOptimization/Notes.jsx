import React, { useRef } from "react";
import {
  RichTextEditorComponent,
  Toolbar,
  Link,
  HtmlEditor,
  Inject
} from "@syncfusion/ej2-react-richtexteditor";
import "./tonnage.css";

const Notes = ({ sessionId }) => {
  const rteRef = useRef(null);
  const storageKey = sessionId ? `notesData_${sessionId}` : "notesData";

  /* ---------- LOAD SAVED NOTES ---------- */
  const onCreated = () => {
    const saved = localStorage.getItem(storageKey);
    if (saved && rteRef.current) {
      rteRef.current.value = saved; // ✅ correct Syncfusion API
    }
  };

  /* ---------- SAVE ---------- */
  const handleSave = () => {
    if (!rteRef.current) return;
    const content = rteRef.current.value;
    localStorage.setItem(storageKey, content);
    alert("Notes saved successfully");
  };

  /* ---------- PRINT ---------- */
  const handlePrint = () => {
    if (!rteRef.current) return;
    const content = rteRef.current.value;
    const win = window.open("", "", "width=900,height=600");
    win.document.write(`<html><body>${content}</body></html>`);
    win.document.close();
    win.print();
  };

  return (
    <div className="notes-container">
      <RichTextEditorComponent
        ref={rteRef}
        height={300}
        created={onCreated}
        placeholder="Enter notes here..."
        toolbarSettings={{
          items: [
            "Undo", "Redo",
            "|",
            "FontName", "FontSize",
            "|",
            "Bold", "Italic", "Underline",
            "|",
            "Formats", "Alignments",
            "|",
            "OrderedList", "UnorderedList",
            "|",
            "CreateLink"
          ]
        }}
      >
        <Inject services={[Toolbar, Link, HtmlEditor]} />
      </RichTextEditorComponent>

      <div className="notes-footer">
        <button className="primary" onClick={handleSave}>
          Save
        </button>
        <button onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
};

export default Notes;
