import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { StatusModel } from '../../../Models/StatusModel';
import { useContext } from 'react';
import { ListContext } from '../../../Context/ListContext';
import { createStatus } from '../../../Services/StatusService';
import { ToastContext } from '../../../Context/ToastContext';
import './ListOfTasks.scss';

export default function CreateStatusModal() {

  const listContext = useContext(ListContext);
  const toastContext = useContext(ToastContext);

  const [showCreateModal, setShowCreateModal] = useState(false);
  // useState for validating what user enters
  const [validatedTitle, setValidatedTitle] = useState(false);

  const { register, handleSubmit, reset } = useForm(
    {
      defaultValues: {
        statusName: ""
      }
    }
  )

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    reset();
  };

  const handleShowCreateModal = () => setShowCreateModal(true);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const titleRegex: RegExp = /^.{1,20}$/;

  const onHandleSubmit = (value: any) => {
    if (titleRegex.test(value.statusName.toString())) {
      const newStatus: StatusModel = {
        id: 0,
        statusName: value.statusName,
        listOfTasksId: listContext.currentList.id
      };

      createStatus(newStatus).then(() => {
        toastContext.setMessage(`Status '${value.statusName}' was created!`);
        toastContext.setToastState(true);
        listContext.fetchCurrentListData();
        setShowCreateModal(false);
        reset();
      })
    }
    else {
      setValidatedTitle(true);
      sleep(5000).then(() => { setValidatedTitle(false) });
    }
  }

  return (
    <>
      <Button onClick={handleShowCreateModal} id='createStatusBtn' variant="outline-primary">
        Create new status
      </Button>
      <Form >
        <Modal
          className='modalContainer'
          show={showCreateModal}
          onHide={handleCloseCreateModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header>
            <Modal.Title className='modalTitleStyles'>Creating new status for '{listContext.currentList.listName}' list...</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modalBodyStyles'>

            <Form.Group className="mb-3">
              <Form.Label>Status name:</Form.Label>
              <Form.Control
                placeholder="Input name here"
                autoFocus
                required={true}
                defaultValue=''
                isInvalid={validatedTitle}
                {...register("statusName")}
              />
              <Form.Control.Feedback type="invalid">
                The field must contain between 1 and 20 characters
              </Form.Control.Feedback>
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCreateModal}>
              Close
            </Button>
            <Button type="submit" onClick={handleSubmit(onHandleSubmit)}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
}