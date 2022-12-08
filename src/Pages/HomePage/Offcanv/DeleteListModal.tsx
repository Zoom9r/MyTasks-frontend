import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ListOfTasksModel } from '../../../Models/ListOfTasksModel';
import { ListOfTasksModelDto } from '../../../Models/ListofTasksModelDto';
import { StatusModel } from '../../../Models/StatusModel';
import { TaskModel } from '../../../Models/TaskModel';
import { DeleteList, GetListsDataById } from '../../../Services/ListOfTasksService';
import { DeleteStatus } from '../../../Services/StatusService';
import { DeleteTask } from '../../../Services/TaskService';
import './DeleteList.scss';

interface Props {
    list: ListOfTasksModelDto
    onFinishDelete: () => void;
}

function DeleteListModal(props: Props) {

    const [showDeleteListModal, setShowDeleteListModal] = useState(false);

    const handleCloseDeleteModal = () => setShowDeleteListModal(false);
    const handleShowDeleteModal = () => setShowDeleteListModal(true);

    const fetchListsDataById = async () => {
        const listDataResult = await GetListsDataById(props.list.id);
        onFinishListDelete(listDataResult);
    }

    const onFinishListDelete = async (list: ListOfTasksModel) => {

        list.tasks.map((task: TaskModel) => { DeleteTask(task.id) })
        list.statuses.map((status: StatusModel) => { DeleteStatus(status.id) })

        await DeleteList(props.list.id).then(() => {
            setShowDeleteListModal(false);
            props.onFinishDelete();
        })
    }

    useEffect(() => {

    }, []);

    return (
        <>
            <Button variant="secondary" id='deleteListBtn' onClick={handleShowDeleteModal}>
                Delete
            </Button>

            <Modal show={showDeleteListModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning!</Modal.Title>
                </Modal.Header>
                <Modal.Body><>
                    Are you sure you want to delete  list '{props.list.listName}' and all of existing statuses and tasks in him?
                </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => {
                        fetchListsDataById()
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteListModal;