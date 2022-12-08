import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { StatusModel } from '../../../../../Models/StatusModel';
import { TaskModel } from '../../../../../Models/TaskModel';
import { DeleteStatus } from '../../../../../Services/StatusService';
import { DeleteTask } from '../../../../../Services/TaskService';
import { AiFillDelete } from 'react-icons/ai';
import './DeleteStatus.scss'

interface Props {
  status: StatusModel
  listTasks: TaskModel[]
  updateListData: () => void;
}

function DeleteStatusModal(props: Props) {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tasks, setTasks] = useState<TaskModel[]>([new TaskModel()]);


  const fetchTasksData = async () => {
    setTasks(props.listTasks);
  }
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);


  const onFinishDelete = async () => {
    fetchTasksData().then(() => {
      tasks.map(async (task) => {
        if (task.statusId == props.status.id) {
          await DeleteTask(task.id);
        }
      })
    }).then(() => {
      DeleteStatus(props.status.id).then(() => {
        setShowDeleteModal(false);
        props.updateListData();
      })
    })
  }

  return (
    <>
      <Button variant="outline-danger" id='deleteBtn' onClick={handleShowDeleteModal}>
        <h4><AiFillDelete /></h4>
      </Button>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this status and all his tasks?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onFinishDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteStatusModal;