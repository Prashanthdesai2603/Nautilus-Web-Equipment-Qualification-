import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Table } from "reactstrap";

const AddandEditCustomHeader = ({ EditModal,
    EmptyAlert,
    DuplicateValue,
    addHeader,
    header,
    addColumn,
    column,
    editColumnHeader,
    editColumn,
    DeleteColumnId,
    toggleEditHeader,
    ToggleModalStates,
    ToggleEditModal,
    modal }) => {
  return (
    <div>
      <Modal isOpen={EditModal} centered={true} style={{ width: "250px" }}>
          <ModalHeader> Add Custom Fields </ModalHeader>
          <ModalBody>
            {EmptyAlert ? (
              <span style={{ color: "red" }}> *Please enter field name </span>
            ) : (
              ""
            )}
            {DuplicateValue ? (
              <span style={{ color: "red" }}> *Field name already exists </span>
            ) : (
              ""
            )}
            <div className="mb-1">
              <label>Field Name</label>
              <input
                type="text"
                className="form-control b-b-primary"
                style={{ width: "150px" }}
                onChange={addHeader}
                value={header.header}
              />
            </div>
            <div>
              <Button color="primary" onClick={addColumn} className="mt-2 mb-4">
                Add To List
              </Button>
            </div>

            <div>
              <label>Available Categories</label>

              <div style={{ border: "1px solid black", width: "160px" }}>
                <Table
                  id="Custom_Fields_Table"
                  className="table-responsive"
                  width={300}
                  height={200}
                  cellPadding={0}
                  cellSpacing={0}
                >
                  <thead>
                    <tr>
                      <th colSpan={2} align="center" style={{ width: "160px" }}>
                        Name
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {column.map((HeaderName, HeaderKey) => (
                      <tr key={HeaderKey} onBlur={editColumnHeader}>
                        <td align="left" style={{ background: "#fff" }}>
                          <input
                            type="text"
                            className="form-control b-b-primary"
                            style={{ width: "155px" }}
                            onChange={addHeader}
                            value={HeaderName.headerText}
                            onFocus={() => editColumn(HeaderName.id)}
                            onClick={() => DeleteColumnId(HeaderName)}
                            readOnly
                          />{" "}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="warning" onClick={toggleEditHeader}>
              {" "}
              Edit{" "}
            </Button>
            <Button
              color="warning"
              onClick={() => ToggleModalStates("DeleteConfirm")}
            >
              {" "}
              Delete{" "}
            </Button>
            <Button color="primary" onClick={ToggleEditModal}>
              {" "}
              Close{" "}
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modal} centered={true} style={{ width: "330px" }}>
          <ModalHeader toggle={toggleEditHeader}>
            {"Edit Custom Fields"}
          </ModalHeader>

          <ModalBody>
            {column.map((value, key) => (
              <div className="row" key={key}>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-1">
                      <label className="lbl_style">{key + 1}:</label>
                    </div>
                    <div className="col-md-8 mt-1" onBlur={editColumnHeader}>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter new header"
                        defaultValue={value.headerText}
                        onChange={addHeader}
                        onFocus={() => editColumn(value, key)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button className="btn btn-primary" onClick={toggleEditHeader}>
              {" "}
              Update & Close{" "}
            </Button>
          </ModalFooter>
        </Modal>
    </div>
  )
}

export default AddandEditCustomHeader
