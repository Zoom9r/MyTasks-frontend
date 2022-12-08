import { useEffect, useState } from 'react';
import { Dropdown, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { ListOfTasksModel } from '../../../Models/ListOfTasksModel';
import { GetAllLists, GetListsDataById } from '../../../Services/ListOfTasksService';
import './CreateTaskModal.scss'
import { StatusModel } from '../../../Models/StatusModel';
import { ListOfTasksModelDto } from '../../../Models/ListofTasksModelDto';

interface Props {
  onFinish: (task: any) => void;
}

export default function CreateTaskModal(props: Props) {

  //// works on entering data, transferring them to the method, clearing fields ////
  const { register, handleSubmit, reset } = useForm(
    {
      defaultValues: {
        title: "",
        description: "",
      }
    }
  )

  //// closing/opening modal ///
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    reset();
  };

  const handleShowCreateModal = () => setShowCreateModal(true);

  //// input confirmation ////
  const onHandleSubmit = (value: any) => {

    const newTask: any = {
      title: value.title,
      description: value.description,
      listOfTasksId: chosenList.id != 0 ? chosenList.id : currentList.id,
      statusId: chosenStatus.id
    };
    props.onFinish(newTask);
    setShowCreateModal(false);
    reset();
  }

  ///////// FETCHING LIST //////////////

  // useState for all fetched lists
  const [allLists, setAllLists] = useState<ListOfTasksModelDto[]>([new ListOfTasksModelDto()]);

  // useState for list where we are now,like default value(if we already inside some list)
  const [currentList, setCurrentList] = useState<ListOfTasksModel>(new ListOfTasksModel());

  // useState for list that user pick
  const [chosenList, setChosenList] = useState<ListOfTasksModel>(new ListOfTasksModel());

  const [allListStatuses, setAllListStatuses] = useState<StatusModel[]>([new StatusModel()]);
  const [chosenStatus, setChosenStatus] = useState<StatusModel>(new StatusModel());

  const fetchListsData = async () => {
    const listResult = await GetAllLists();
    setAllLists(listResult);
  }

  const fetchCurrentListData = async () => {
    const currentListData = window.sessionStorage.getItem('selectedlist');
    if (currentListData !== null && currentListData !== undefined) {
      try {
        const listData = JSON.parse(currentListData)
        setCurrentList(listData);
        const fullListData = await GetListsDataById(listData.id);

        setAllListStatuses(fullListData.statuses);
        return;
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  const fetchChosenListData = async (listId: number) => {
    const fulllistData = await GetListsDataById(listId);
    setChosenList(fulllistData);
    setAllListStatuses(fulllistData.statuses);
  }

  useEffect(() => {
    fetchListsData();
    fetchCurrentListData();
  }, []);


  return (

    <>
      <Button onClick={handleShowCreateModal} variant="primary">
        <span id='createTaskBtn'>
          Create new task
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
            <Modal.Title className='modalTitleStyles'>Creating your task...</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modalBodyStyles'>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Input your title here"
                autoFocus
                pattern="^.{2,40}$"
                required={true}
                defaultValue=''
                {...register("title", { required: "Required" })}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Input task description here"
                required={true}
                defaultValue=''
                pattern="^.{3,400}$"
                {...register("description", { required: "Required" })}
              />
            </Form.Group>
            <div className='dropdownBtnList'>
              <div id='dropdownNames'> List name:</div>
              <Dropdown id='dropdownBtn'>
                <Dropdown.Toggle variant="secondary" >
                  {currentList.id != 0 && chosenList.id == 0 ? currentList.listName : chosenList.id != 0 ? chosenList.listName : "Select list"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {allLists.map((list) => (
                    <Dropdown.Item key={list.id} onClick={() => { fetchChosenListData(list.id) }}>{list.listName}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              {chosenList.id == 0 && currentList.id != 0 ?
                <>
                  <div id='dropdownNames'> Status:</div>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                      {chosenStatus.id != 0 ? chosenStatus.statusName : "Select status"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {allListStatuses.map((status: StatusModel) => (
                        <Dropdown.Item
                          key={status.id}
                          onClick={() => { setChosenStatus(status); }}
                        >
                          {status.statusName}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </>
                : null}

              {chosenList.id != 0 ?
                <>
                  <div id='dropdownNames'> Status:</div>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                      {chosenStatus.id != 0 && chosenStatus.listOfTasksId == chosenList.id ? chosenStatus.statusName : "Select status"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {allListStatuses.map((status) => (
                        <Dropdown.Item
                          key={status.id}
                          onClick={() => {
                            if (status.listOfTasksId == chosenList.id) {
                              setChosenStatus(status);
                            }
                          }}>
                          {status.statusName}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </>
                : null}
            </div>
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



