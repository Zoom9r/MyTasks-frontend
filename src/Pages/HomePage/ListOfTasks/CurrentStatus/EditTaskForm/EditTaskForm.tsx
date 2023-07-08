import { useContext, useEffect, useState } from "react";
import { Button, Card, Dropdown, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ListOfTasksModel } from "../../../../../Models/ListOfTasksModel";
import { StatusModel } from "../../../../../Models/StatusModel";
import { TaskModel } from "../../../../../Models/TaskModel";
import { ToastContext } from '../../../../../Context/ToastContext';
import '../../../HomePage.scss';
import './EditTask.scss';

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
  // useStates for validating what user enters
  const [validatedTitle, setValidatedTitle] = useState(false);
  const [validatedDescription, setValidatedDescription] = useState(false);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setCurrentStatus(props.status);
  }, []);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const titleRegex: RegExp = /^.{1,30}$/;
  const descriptionRegex: RegExp = /^.{1,400}$/;

  const onHandleSubmit = (value: any) => {
    if (titleRegex.test(value.title.toString()) && descriptionRegex.test(value.description.toString())) {
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
          toastContext.setToastState(true);
        }

        else if (props.task.title!=value.title || props.task.description!=value.description){
          toastContext.setMessage(`Task was successfully edited.`);
          toastContext.setToastState(true);
        }

        props.onFinishFormEdit(editTask);
      }
    }
    else {
      if (titleRegex.test(value.title.toString()) == false) {
        setValidatedTitle(true);
        sleep(5000).then(() => { setValidatedTitle(true) });
      }
      if (descriptionRegex.test(value.description.toString()) == false) {
        setValidatedDescription(true);
        sleep(5000).then(() => { setValidatedDescription(true) });
      }
    }
  }

  return (
    <Card key={props.task.id} className='cardContainer'>
      <Form onSubmit={handleSubmit(onHandleSubmit)} >
        <Card.Header className="cardHeader">
          <Form.Group >
            <Form.Control
              className='cardHeaderStyles'
              plaintext
              placeholder="This field must be filled"
              isInvalid={validatedTitle}
              defaultValue={props.task.title}
              required={true}
              {...register("title")}
            />
            <div id='taskValidationStyle'>{validatedTitle == true ? 'Between 1 and 30 characters!!!' : null}</div>
          </Form.Group>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdownStyle">
              <span >
                {currentStatus.statusName}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu >
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
          as={'textarea'}
            className='cardBodyStyles'
            plaintext
            required={true}
            placeholder="This field must be filled"
            defaultValue={props.task.description}
            isInvalid={validatedDescription}
            {...register("description")}
          />
          <Form.Control.Feedback type="invalid" id='taskValidationStyle'>
            Between 1 and 400 characters!!!
          </Form.Control.Feedback>
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


