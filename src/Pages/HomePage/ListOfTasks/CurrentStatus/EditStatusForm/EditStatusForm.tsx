import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { StatusModel } from "../../../../../Models/StatusModel";
import './EditStatus.scss';
import { AiOutlineCheck } from "react-icons/ai";

interface Props {
    status: StatusModel,
    listId: number
    onFinishStatusEdit: (status: StatusModel) => void;
}

const EditStatusForm = (props: Props) => {

    const { register, handleSubmit } = useForm()

    const onHandleSubmit = (value: any) => {

        const editStatus: StatusModel = {
            id: props.status.id,
            statusName: value.statusName,
            listOfTasksId: props.listId
        }
        props.onFinishStatusEdit(editStatus);

    }

    return (
        <Form onSubmit={handleSubmit(onHandleSubmit)} >
            <Card.Title className="cardTitle">
                <Form.Group >
                    <Form.Control
                        className='cardNameStyles'
                        plaintext
                        required={true}
                        placeholder="This field must be filled"
                        defaultValue={props.status.statusName}
                        pattern="^.{3,400}$"
                        {...register("statusName", { required: "Required" })}
                    />
                </Form.Group>

                <Button variant="success" id='editBtn' onClick={handleSubmit(onHandleSubmit)} >
                    <AiOutlineCheck />
                </Button>
            </Card.Title>
        </Form>

    );
}

export default EditStatusForm;