import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { ListOfTasksModel } from '../../../Models/ListOfTasksModel';
import { CreateList } from '../../../Services/ListOfTasksService';

interface Props {
  onFinishCreate: () => void;
}

export default function CreateListModal(props: Props) {

  const { register, handleSubmit, reset } = useForm(
    {
      defaultValues: {
        listName: ""
      }
    }
  )

  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    reset();
  };

  const handleShowCreateListModal = () => setShowCreateModal(true);

  const onHandleSubmit = async (value: any) => {
    const newList: ListOfTasksModel = {
      id: 0,
      listName: value.listName,
      statuses: [],
      tasks: []
    }
    await CreateList(newList).then(() => {

      props.onFinishCreate();
      setShowCreateModal(false);
      reset();
    })
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
                pattern="^.{2,40}$"
                required={true}
                defaultValue=''
                {...register("listName", { required: "Required" })}
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