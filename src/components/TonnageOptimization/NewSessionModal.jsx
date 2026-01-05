import React, { useState } from "react";

const NewSessionModal = ({ onCreate, onCancel }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleCreate = () => {
    if (!name.trim()) {
      alert("Please enter session name");
      return;
    }

    onCreate({
      name,
      date,
    });
  };return (
    <div className="modal-backdrop">
      <div className="eq-modal">

        <h2 className="eq-modal-title">Tonnage Optimization</h2>
        <div className="eq-modal-subtitle">New Session</div>

        <div className="eq-form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter session name"
          />
        </div>

        <div className="eq-form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="eq-modal-actions">
          <button
            className="eq-btn primary"
            onClick={() => onCreate({ name, date })}
          >
            Create
          </button>
          <button className="eq-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default NewSessionModal;
