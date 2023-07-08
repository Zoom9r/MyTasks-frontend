import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { ListOfTasksModel } from '../../Models/ListOfTasksModel';
import { createList } from '../../Services/ListOfTasksService';
import { useContext } from 'react';
import { ToastContext } from '../../Context/ToastContext';

interface Props {
  onFinishCreate: () => void;
}

export default function CreateListModal(props: Props) {

  const toast = useContext(ToastContext);

  const [showCreateModal, setShowCreateModal] = useState(false);
  // useState for validating what user enters
  const [validatedTitle, setValidatedTitle] = useState(false);

  const { register, handleSubmit, reset } = useForm(
    {
      defaultValues: {
        listName: ''
      }
    }
  )

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    reset();
  };

  const handleShowCreateListModal = () => setShowCreateModal(true);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const titleRegex: RegExp = /^.{1,20}$/;

  const onHandleSubmit = async (value: any) => {
    if (titleRegex.test(value.listName.toString())) {

      const newList: ListOfTasksModel = {
        id: 0,
        listName: value.listName,
        statuses: [],
        tasks: []
      };

      await createList(newList)
        .then(() => {
          toast.setMessage(`List '${value.listName}' was created!`);
          toast.setToastState(true);
          props.onFinishCreate();
          setShowCreateModal(false);
          reset();
        })
    }
    else {
      setValidatedTitle(true);
      sleep(5000).then(() => { setValidatedTitle(false) });
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShowCreateListModal}>
        <span className='buttonStyleContainer'>
          +
        </span>
      </Button>
      <Form >
        <Modal
          className='modalContainer'
          show={showCreateModal}
          onHide={handleCloseCreateModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header>
            <Modal.Title className='modalTitleStyles'>Creating new list...</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modalBodyStyles'>
            <Form.Group className="mb-3">
              <Form.Label>List name:</Form.Label>
              <Form.Control
                placeholder="Input name here"
                autoFocus
                required={true}
                defaultValue=''
                isInvalid={validatedTitle}
                {...register("listName")}
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



