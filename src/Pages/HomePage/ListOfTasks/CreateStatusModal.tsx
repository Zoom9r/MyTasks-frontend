import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { ListOfTasksModel } from '../../../Models/ListOfTasksModel';
import { StatusModel } from '../../../Models/StatusModel';
import './ListOfTasks.scss';

interface Props {
  onFinish: (status: any) => void;
  currentList: ListOfTasksModel
}

export default function CreateStatusModal(props: Props) {

  const { register, handleSubmit, reset } = useForm(
    {
      defaultValues: {
        statusName: ""
      }
    }
  )

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    reset();
  };

  const handleShowCreateModal = () => setShowCreateModal(true);

  const onHandleSubmit = (value: any) => {
    const newStatus: StatusModel = {
      id: 0,
      statusName: value.statusName,
      listOfTasksId: props.currentList.id
    }
    props.onFinish(newStatus);
    setShowCreateModal(false);
    reset();
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
            <Modal.Title className='modalTitleStyles'>Creating new status for '{props.currentList.listName}' list...</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modalBodyStyles'>

            <Form.Group className="mb-3">
              <Form.Label>Status name:</Form.Label>
              <Form.Control
                placeholder="Input name here"
                autoFocus
                pattern="^.{2,40}$"
                required={true}
                defaultValue=''
                {...register("statusName", { required: "Required" })}
              />
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