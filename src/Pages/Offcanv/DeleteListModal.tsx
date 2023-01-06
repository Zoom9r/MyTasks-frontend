import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ListOfTasksModel } from '../../Models/ListOfTasksModel';
import { ListOfTasksModelDto } from '../../Models/ListofTasksModelDto';
import { StatusModel } from '../../Models/StatusModel';
import { TaskModel } from '../../Models/TaskModel';
import { deleteList, getListsDataById } from '../../Services/ListOfTasksService';
import { deleteStatus } from '../../Services/StatusService';
import { deleteTask } from '../../Services/TaskService';
import './DeleteList.scss';
import { useContext } from 'react';
import { ListContext } from '../../Context/ListContext';
import { ToastContext } from '../../Context/ToastContext';

interface Props {
    list: ListOfTasksModelDto
    onFinishDelete: () => void;
}

export default function DeleteListModal(props: Props) {

    const listt = useContext(ListContext);
    const toast = useContext(ToastContext);

    const [showDeleteListModal, setShowDeleteListModal] = useState(false);

    const handleCloseDeleteModal = () => setShowDeleteListModal(false);
    const handleShowDeleteModal = () => setShowDeleteListModal(true);

    const fetchListsDataById = async () => {
        const listDataResult = await getListsDataById(props.list.id);
        onFinishListDelete(listDataResult);
    }

    const onFinishListDelete = async (list: ListOfTasksModel) => {

        deleteAllListTasks(list).then(() => {
            deleteAllListStatuses(list)
                .then(() => {
                    listt.setCurrentList(new ListOfTasksModel());
                    deleteList(props.list.id)
                        .then(() => {
                            setShowDeleteListModal(false);
                            toast.setMessage(`List '${props.list.listName}' was deleted`);
                            toast.setToastState(true);
                            props.onFinishDelete();
                        })
                })
        })
    }

    const deleteAllListTasks = async (list: ListOfTasksModel) => {
        return list.tasks.map(async (task: TaskModel) => { await deleteTask(task.id) });
    }

    const deleteAllListStatuses = async (list: ListOfTasksModel) => {
        return list.statuses.map(async (status: StatusModel) => { await deleteStatus(status.id) });
    }

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

