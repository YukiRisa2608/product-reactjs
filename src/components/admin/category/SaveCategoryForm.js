import React, { useState } from 'react';
import axios from 'axios'; // thư viện thay cho fetch thuần
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Modal } from 'react-bootstrap';

function SaveCategoryForm(props) {
  const { handleClose, onSaveCategory, show } = props;
  const [name, setName] = useState("");

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(val) => setName(val.target.value)}
              type="text"
              placeholder="Category name"
              autoFocus
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {
          onSaveCategory(name);
          setName("")
        }}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SaveCategoryForm;
