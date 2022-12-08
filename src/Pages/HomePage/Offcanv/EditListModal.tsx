import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { ListOfTasksModel } from '../../../Models/ListOfTasksModel';
import { ListOfTasksModelDto } from '../../../Models/ListofTasksModelDto';
import { EditList } from '../../../Services/ListOfTasksService'
import './EditList.scss'

interface Props {
  list: ListOfTasksModelDto
  onFinishEdit: () => void;
}

function EditListModal(props: Props) {

  const { register, handleSubmit, reset } = useForm(
    {
      defaultValues: {
        listName: props.list.listName
      }
    }
  )

  const [showEditModal, setShowEditModal] = useState(false);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    reset();
  };

  const handleShowCreateListModal = () => setShowEditModal(true);

  const onHandleSubmit = async (value: any) => {
    const newList: ListOfTasksModel = {
      id: props.list.id,
      listName: value.listName,
      statuses: [],
      tasks: []
    }
    await EditList(newList).then(() => {
      props.onFinishEdit();
      setShowEditModal(false);
      reset();
    });
  }

  return (
    <>
      <Button variant="warning" id='editButton' onClick={handleShowCreateListModal}>
        <span>
          Edit
        </span>
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
                pattern="^.{2,40}$"
                required={true}
                {...register("listName", { required: "Required" })}
              />
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

export default EditListModal;