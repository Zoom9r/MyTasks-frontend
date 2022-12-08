import { useEffect, useState } from "react";
import { Button, Card, Form, ListGroup, Row } from "react-bootstrap";
import { StatusModel } from "../../../../Models/StatusModel";
import { TaskModel } from "../../../../Models/TaskModel";
import { EditStatus } from "../../../../Services/StatusService";
import { DeleteTask, EditTask } from "../../../../Services/TaskService";
import EditTaskForm from "./EditTaskForm/EditTaskForm";
import DeleteStatusModal from "./DeleteStatusModal/DeleteStatusModal";
import EditStatusForm from "./EditStatusForm/EditStatusForm";
import './CurrentStatus.scss';
import { AiOutlineSwap } from "react-icons/ai";

interface Props {
    listId: number,
    status: StatusModel,
    listTasks: TaskModel[]
    updateListData: () => void;
}

const CurrentStatusTasks = (props: Props) => {

    ////////////////// UseStates for tasks functionality ////////////////////

    const [editTaskFormVisible, setEditTaskFormVisible] = useState(false);
    const [taskToChange, setTaskToChange] = useState<TaskModel>(new TaskModel);


    ////////////////// DELETE TASK button /////////////////

    const onFinishDeleteTask = (id: number) => {
        DeleteTask(id).then(() => {
            props.updateListData();
        });
    };

    ////////////////// EDIT TASK button ////////////////////

    const onFinishEditTask = async (values: any) => {
        await EditTask(values).then(() => {
            setEditTaskFormVisible(false);
            props.updateListData();
        });
    };

    ////////////////// EDIT STATUS FUNCTIONALITY ////////////

    const [editStatusFormVisible, setEditStatusFormVisible] = useState(false);

    const onFinishEditStatus = async (values: any) => {
        await EditStatus(values).then(() => {
            setEditStatusFormVisible(false);
            props.updateListData();
        });
    };

    useEffect(() => {

    }, []);

    return (

        <Card>
            {/* Card head,for status name */}
            <Card.Title className="cardTitle">
                {editStatusFormVisible == false ?
                    <>
                        <Form onClick={() => { setEditStatusFormVisible(true); }}>
                            <Form.Group>
                                <Form.Control
                                    className='cardNameStyles'
                                    plaintext
                                    required={true}
                                    defaultValue={props.status.statusName}
                                    pattern="^.{0,400}$" />
                            </Form.Group>
                        </Form>
                        <DeleteStatusModal
                            status={props.status}
                            listTasks={props.listTasks}
                            updateListData={props.updateListData}
                        />
                    </>
                    :
                    <EditStatusForm
                        status={props.status}
                        listId={props.listId}
                        onFinishStatusEdit={onFinishEditStatus}
                    />
                }
            </Card.Title>
            <Card.Body>
                <ListGroup>
                    {editTaskFormVisible == false ?
                        props.listTasks.map((task) => (
                            task.statusId == props.status.id ?
                                <Card key={task.id} className='cardContainer'>
                                    <Form onClick={() => { setEditTaskFormVisible(true); setTaskToChange(task); }} >
                                        <Card.Header className="cardTitle">
                                            <Form.Group as={Row} >
                                                <Form.Control
                                                    className='cardHeaderStyles'
                                                    plaintext
                                                    type="text"
                                                    autoFocus
                                                    pattern="^.{0,40}$"
                                                    defaultValue={task.title}
                                                    required={true}
                                                />
                                            </Form.Group>
                                            <span id='switchBtn'>
                                                <Button variant="none" onClick={() => { setEditTaskFormVisible(true); setTaskToChange(task); }}>
                                                    <AiOutlineSwap />
                                                </Button>
                                            </span>
                                        </Card.Header>
                                        <Form.Group>
                                            <Form.Control
                                                className='cardBodyStyles'
                                                plaintext
                                                required={true}
                                                defaultValue={task.description}
                                                pattern="^.{0,400}$"
                                            />
                                        </Form.Group>
                                    </Form>
                                    <Card.Footer onClick={() => { onFinishDeleteTask(task.id) }} className="cardFooterContainer">
                                        <Button variant="secondary" className='buttonDeleteContainer'>
                                            DELETE
                                        </Button>
                                    </Card.Footer>
                                </Card>
                                : null
                        ))
                        :
                        <>
                            {props.listTasks.map(task => (
                                task != taskToChange && task.statusId == props.status.id ?
                                    <Card key={task.id} className='cardContainer'>
                                        <Form onClick={() => { setEditTaskFormVisible(true); setTaskToChange(task); }}>
                                            <Card.Header>
                                                <Form.Group as={Row} >
                                                    <Form.Control
                                                        className='cardHeaderStyles'
                                                        plaintext
                                                        placeholder="Input your title here"
                                                        autoFocus
                                                        pattern="^.{0,40}$"
                                                        defaultValue={task.title}
                                                        required={true}
                                                    />
                                                </Form.Group>
                                            </Card.Header>
                                            <Form.Group>
                                                <Form.Control
                                                    className='cardBodyStyles'
                                                    plaintext
                                                    required={true}
                                                    defaultValue={task.description}
                                                    pattern="^.{0,400}$"
                                                />
                                            </Form.Group>
                                        </Form>
                                        <Card.Footer onClick={() => { onFinishDeleteTask(task.id) }} className="cardFooterContainer">
                                            <Button variant="secondary" className='buttonDeleteContainer'>
                                                DELETE
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                    :
                                    task == taskToChange ?

                                        <EditTaskForm
                                            editFormVisible={editTaskFormVisible}
                                            task={taskToChange}
                                            key={task.id}
                                            onFinishFormEdit={onFinishEditTask}
                                            onFinishFormDelete={onFinishDeleteTask}
                                        />
                                        : null
                            ))
                            }
                        </>
                    }
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default CurrentStatusTasks;