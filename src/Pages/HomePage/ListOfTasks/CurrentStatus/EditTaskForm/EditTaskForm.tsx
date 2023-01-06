import { useContext, useEffect, useState } from "react";
import { Button, Card, Dropdown, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ListOfTasksModel } from "../../../../../Models/ListOfTasksModel";
import { StatusModel } from "../../../../../Models/StatusModel";
import { TaskModel } from "../../../../../Models/TaskModel";
import '../../../HomePage.scss';
import './EditTask.scss';
import { ToastContext } from '../../../../../Context/ToastContext';

interface Props {
  editFormVisible: boolean,
  task: TaskModel,
  status: StatusModel,
  list: ListOfTasksModel,
  onFinishFormEdit: (task: TaskModel) => void
}

export default function EditTaskForm(props: Props) {

  const toastContext = useContext(ToastContext);

  const [currentStatus, setCurrentStatus] = useState<StatusModel>(props.status);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setCurrentStatus(props.status);
  }, []);

  const onHandleSubmit = (value: any) => {
    if (props.task != null) {
      const editTask: TaskModel = {
        id: props.task.id,
        title: value.title,
        description: value.description,
        statusId: currentStatus.id,
        status: new StatusModel(),
        listOfTasksId: props.task.listOfTasksId,
        listOfTasks: new ListOfTasksModel()
      };

      if (props.status.id != currentStatus.id) {
        toastContext.setMessage(`Task was successfully edited.(Status '${props.status.statusName}' changed to '${currentStatus.statusName}')`);
      }

      else {
        toastContext.setMessage(`Task was successfully edited.`);
      }

      toastContext.setToastState(true);
      props.onFinishFormEdit(editTask);
    }
  }

  return (
    <Card key={props.task.id} className='cardContainer'>
      <Form onSubmit={handleSubmit(onHandleSubmit)} >
        <Card.Header className="cardHeader">
          <Form.Group as={Row}>
            <Form.Control
              className='cardHeaderStyles'
              plaintext
              placeholder="This field must be filled"
              pattern="^.{0,40}$"
              defaultValue={props.task.title}
              required={true}
              {...register("title", { required: "Required" })}

            />
          </Form.Group>
          <Dropdown>
            <Dropdown.Toggle variant="secondary">
              {currentStatus.statusName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {props.list.statuses.map((status) => (
                status.listOfTasksId == props.task.listOfTasksId ?

                  <Dropdown.Item
                    key={status.id}
                    onClick={() => {
                      if (status.listOfTasksId == props.task.listOfTasksId) {
                        setCurrentStatus(status);
                      }
                    }}>
                    {status.statusName}
                  </Dropdown.Item>
                  : null
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Form.Group>
          <Form.Control
            className='cardBodyStyles'
            plaintext
            required={true}
            placeholder="This field must be filled"
            defaultValue={props.task.description}
            pattern="^.{3,400}$"
            {...register("description", { required: "Required" })}
          />
        </Form.Group>

        <Card.Footer onClick={handleSubmit(onHandleSubmit)} className="cardFooterContainer">

          <Button variant="success" className='buttonDeleteContainer'>
            SAVE
          </Button>
        </Card.Footer>

      </Form>
    </Card>
  );
}


