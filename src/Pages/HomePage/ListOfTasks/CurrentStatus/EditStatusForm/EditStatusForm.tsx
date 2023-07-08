import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { StatusModel } from "../../../../../Models/StatusModel";
import { AiOutlineCheck } from "react-icons/ai";
import { ToastContext } from '../../../../../Context/ToastContext';
import { useContext, useState } from "react";
import './EditStatus.scss';

interface Props {
    status: StatusModel,
    listId: number,
    onFinishStatusEdit: (status: StatusModel) => void
}

export default function EditStatusForm(props: Props) {

    const toastContext = useContext(ToastContext);

    // useState for validating what user enters
    const [validatedTitle, setValidatedTitle] = useState(false);

    const { register, handleSubmit } = useForm()

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    const titleRegex: RegExp = /^.{1,20}$/;

    const onHandleSubmit = (value: any) => {
        if (titleRegex.test(value.statusName.toString())) {
            const editStatus: StatusModel = {
                id: props.status.id,
                statusName: value.statusName,
                listOfTasksId: props.listId
            };
            if (props.status.statusName != value.statusName) {
                toastContext.setMessage(`Status '${props.status.statusName}' was changed to '${value.statusName}'`);
                toastContext.setToastState(true);
            }
            props.onFinishStatusEdit(editStatus);
        }
        else {
            setValidatedTitle(true);
            sleep(5000).then(() => { setValidatedTitle(false) });
        }
    }

    return (
        <><Form onSubmit={handleSubmit(onHandleSubmit)} id="editStatusFormStyles" >
            <Card.Title >
                <Form.Group>
                    <Form.Control
                        className='cardNameStyles'
                        plaintext
                        required={true}
                        placeholder="This field must be filled"
                        defaultValue={props.status.statusName}
                        isInvalid={validatedTitle}
                        {...register("statusName")} />
                    <Form.Control.Feedback type="invalid">
                        Between 1 and 20 characters!!!
                    </Form.Control.Feedback>
                </Form.Group>
            </Card.Title>
        </Form>
            <Button variant="success" id='editBtn' onClick={handleSubmit(onHandleSubmit)}>
                <AiOutlineCheck />
            </Button></>
    );
}

