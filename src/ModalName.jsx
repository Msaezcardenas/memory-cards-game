import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalName = ({ showModal, setShowModal, name, setName }) => {
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className='text-center'>
            Hola! Ingresa tu nombre para comenzar a jugar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Control
                type='name'
                placeholder='Juanito'
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='text-center'
            variant='primary'
            onClick={handleClose}
          >
            Jugar!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalName;
