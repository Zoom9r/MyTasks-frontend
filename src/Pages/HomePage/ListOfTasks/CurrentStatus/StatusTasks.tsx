import { useState, useContext } from "react";
import { Button, Card, Form, ListGroup, Row } from "react-bootstrap";
import { StatusModel } from "../../../../Models/StatusModel";
import { TaskModel } from "../../../../Models/TaskModel";
import { editStatus } from "../../../../Services/StatusService";
import { deleteTask, editTask } from "../../../../Services/TaskService";
import EditTaskForm from "./EditTaskForm/EditTaskForm";
import DeleteStatusModal from "./DeleteStatusModal/DeleteStatusModal";
import EditStatusForm from "./EditStatusForm/EditStatusForm";
import { AiOutlineSwap } from "react-icons/ai";
import { ListContext } from '../../../../Context/ListContext';
import { ToastContext } from '../../../../Context/ToastContext';
import './StatusTasks.scss';
import '../../HomePage.scss';

export default function StatusTasks() {

    const listContext = useContext(ListContext);
    const toastContext = useContext(ToastContext);

    const [editTaskFormVisible, setEditTaskFormVisible] = useState(false);
    const [taskToChange, setTaskToChange] = useState<TaskModel>(new TaskModel);
    const [statusToChange, setStatusToChange] = useState<StatusModel>(new StatusModel);

    const onFinishDeleteTask = (task: TaskModel) => {
        deleteTask(task.id).then(() => {
            toastContext.setMessage(`Task '${task.title}' was deleted.`);
            toastContext.setToastState(true);
            listContext.fetchCurrentListData();
        });
    };

    const onFinishEditTask = async (values: any) => {
        await editTask(values).then(() => {
            listContext.fetchCurrentListData()
                .then(() => { setEditTaskFormVisible(false); });
        });
    };

    const onFinishEditStatus = async (values: any) => {
        await editStatus(values).then(() => {
            listContext.fetchCurrentListData();
        });
    };

    const updateListData = () => {
        listContext.fetchCurrentListData();
    };

    return (
        <>
            {listContext.currentList.statuses.map((status) => (
                <div key={status.id} className='statusColumn'>

                    <Card>
                        <Card.Title className="cardTitle">
                            {status != statusToChange ?
                                <>
                                    <Form onClick={() => { setStatusToChange(status); }} id="statusFormStyles">
                                        <Form.Group>
                                            <Form.Control
                                                className='cardNameStyles'
                                                plaintext
                                                required={true}
                                                defaultValue={status.statusName}
                                            />
                                        </Form.Group>
                                    </Form>
                                    <DeleteStatusModal
                                        status={status}
                                        listTasks={listContext.currentList.tasks}
                                        updateListData={updateListData}
                                    />
                                </>
                                :
                                status == statusToChange ?
                                    <EditStatusForm
                                        status={status}
                                        listId={listContext.currentList.id}
                                        onFinishStatusEdit={onFinishEditStatus}
                                    />
                                    : null
                            }
                        </Card.Title>
                        <Card.Body>
                            <ListGroup>
                                {editTaskFormVisible == false ?
                                    listContext.currentList.tasks.map((task) => (
                                        task.statusId == status.id ?
                                            <Card key={task.id} className='cardContainer'>
                                                <Form onClick={() => { setEditTaskFormVisible(true); setTaskToChange(task); }} >
                                                    <Card.Header className="cardTitle">
                                                        <Form.Group as={Row} id="statusFormStyles">
                                                            <div className='cardHeaderStyles'>{task.title}</div>
                                                        </Form.Group>
                                                        <span id='switchBtn'>
                                                            <Button variant="none" onClick={() => { setEditTaskFormVisible(true); setTaskToChange(task); }}>
                                                                <AiOutlineSwap />
                                                            </Button>
                                                        </span>
                                                    </Card.Header>
                                                    <div className='cardBodyStyles'>{task.description}</div>
                                                </Form>
                                                <Card.Footer onClick={() => { onFinishDeleteTask(task) }} className="cardFooterContainer">
                                                    <Button variant="secondary" className='buttonDeleteContainer'>
                                                        DELETE
                                                    </Button>
                                                </Card.Footer>
                                            </Card>
                                            : null
                                    ))
                                    :
                                    <>
                                        {listContext.currentList.tasks.map(task => (
                                            task != taskToChange && task.statusId == status.id ?
                                                <Card key={task.id} className='cardContainer'>
                                                    <Form onClick={() => { setEditTaskFormVisible(true); setTaskToChange(task); }} >
                                                        <Card.Header className="cardTitle">
                                                            <Form.Group as={Row} id="statusFormStyles">
                                                                <div className='cardHeaderStyles'>{task.title}</div>
                                                            </Form.Group>
                                                            <span id='switchBtn'>
                                                                <Button variant="none" onClick={() => { setEditTaskFormVisible(true); setTaskToChange(task); }}>
                                                                    <AiOutlineSwap />
                                                                </Button>
                                                            </span>
                                                        </Card.Header>
                                                        <div className='cardBodyStyles'>{task.description}</div>
                                                    </Form>
                                                    <Card.Footer onClick={() => { onFinishDeleteTask(task) }} className="cardFooterContainer">
                                                        <Button variant="secondary" className='buttonDeleteContainer'>
                                                            DELETE
                                                        </Button>
                                                    </Card.Footer>
                                                </Card>
                                                :
                                                task == taskToChange && task.statusId == status.id ?

                                                    <EditTaskForm
                                                        editFormVisible={editTaskFormVisible}
                                                        task={taskToChange}
                                                        status={status}
                                                        list={listContext.currentList}
                                                        key={task.id}
                                                        onFinishFormEdit={onFinishEditTask}
                                                    />
                                                    : null
                                        ))
                                        }
                                    </>
                                }
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </>
    );
}

