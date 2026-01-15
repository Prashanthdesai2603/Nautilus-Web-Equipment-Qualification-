import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const AlertModals = ({ ModalStates, ToggleModalStates, UpdateInputConversions, deleteColumn }) => {
  
  return (
    <div>
      <Modal
        isOpen={ModalStates.MaterialIdConfirm.visibility}
        centered={true}
        style={{ width: "400px" }}
      >
        <ModalHeader> 
        {/* Nautilus  */}
        {ModalStates.MaterialIdConfirm.title}
        {/* Confirm Mold Id */}
        </ModalHeader>
        <ModalBody>
           {ModalStates.MaterialIdConfirm.message} 
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => ToggleModalStates("MaterialIdConfirm")}
          >
            {" "}
            Close{" "}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={ModalStates.DeleteConfirm.visibility}
        centered={true}
        style={{ width: "400px" }}
      >
        <ModalHeader> 
        {/* Nautilus  */}
        {ModalStates.DeleteConfirm.title}
        {/* Confirm Delete */}
        </ModalHeader>
        <ModalBody>
           {ModalStates.DeleteConfirm.message} 
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={deleteColumn}>
            {" "}
            Delete{" "}
          </Button>
          <Button
            color="primary"
            onClick={() => ToggleModalStates("DeleteConfirm")}
          >
            {" "}
            Close{" "}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={ModalStates.MaterialIdUnique.visibility}
        centered={true}
        style={{ width: "400px" }}
      >
        <ModalHeader> 
        {/* Nautilus */}
         {ModalStates.MaterialIdUnique.title}
         {/* Duplicate Material ID */}
        </ModalHeader>
        <ModalBody>
          {ModalStates.MaterialIdUnique.message} 
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => ToggleModalStates("MaterialIdUnique")}
          >
            {" "}
            Close{" "}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={ModalStates.ConvertConfirm.visibility}
        centered={true}
        style={{ width: "400px" }}
      >
        <ModalHeader>
         {/* Nautilus  */}
          {ModalStates.ConvertConfirm.title}
          {/* Confirm Modal Id Deletion */}
         </ModalHeader>
        <ModalBody>
          {ModalStates.ConvertConfirm.message} 
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={UpdateInputConversions}>
            {" "}
            Yes{" "}
          </Button>
          <Button
            color="primary"
            onClick={() => ToggleModalStates("ConvertConfirm")}
          >
            {" "}
            No{" "}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default AlertModals;
