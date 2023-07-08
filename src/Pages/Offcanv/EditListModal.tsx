import { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { ListOfTasksModel } from '../../Models/ListOfTasksModel';
import { ListOfTasksModelDto } from '../../Models/ListofTasksModelDto';
import { editList } from '../../Services/ListOfTasksService'
import { ToastContext } from '../../Context/ToastContext';
import './EditList.scss';

interface Props {
  list: ListOfTasksModelDto
  onFinishEdit: () => void;
}

export default function EditListModal(props: Props) {

  const toast = useContext(ToastContext);

  const [showEditModal, setShowEditModal] = useState(false);
  // useState for validating what user enters
  const [validatedTitle, setValidatedTitle] = useState(false);

  const { register, handleSubmit, reset } = useForm(
    {
      defaultValues: {
        listName: props.list.listName
      }
    }
  );

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    reset();
  };

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const titleRegex: RegExp = /^.{1,20}$/;

  const handleShowCreateListModal = () => setShowEditModal(true);

  const onHandleSubmit = async (value: any) => {
    if (titleRegex.test(value.listName.toString())) {

      const newList: ListOfTasksModel = {
        id: props.list.id,
        listName: value.listName,
        statuses: [],
        tasks: []
      };
      await editList(newList)
        .then(() => {
          if (props.list.listName != value.listName) {
            toast.setMessage(`List name '${props.list.listName}' was changed to ${value.listName}`);
            toast.setToastState(true);
          }
          props.onFinishEdit();
          setShowEditModal(false);
        });
    }
    else {
      setValidatedTitle(true);
      sleep(5000).then(() => { setValidatedTitle(false) });
    }
  }

  return (
    <>
      <Button variant="warning" id='editButton' onClick={handleShowCreateListModal}>
        <span>Edit</span>
      </Button>
      <Form >
        <Modal
          className='modalContainer'
          show={showEditModal}
          onHide={handleCloseEditModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <Modal.Header>
            <Modal.Title className='modalTitleStyles'>Editing list '{props.list.listName}'...</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modalBodyStyles'>
            <Form.Group className="mb-3">
              <Form.Label>List name:</Form.Label>
              <Form.Control
                placeholder="Input new name here"
                autoFocus
                required={true}
                isInvalid={validatedTitle}
                {...register("listName")}
              />
              <Form.Control.Feedback type="invalid">
                The field must contain between 1 and 20 characters
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button type="submit" onClick={handleSubmit(onHandleSubmit)}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
}

