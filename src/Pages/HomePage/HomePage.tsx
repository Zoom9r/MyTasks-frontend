import { CreateTask } from '../../Services/TaskService';
import './HomePage.scss'
import CreateTaskModal from './CreateTaskModal/CreateTaskModal';
import Offcanv from './Offcanv/Offcanv';
import ListOfTasks from './ListOfTasks/ListOfTasks';
import { GetListsDataById } from '../../Services/ListOfTasksService';
import { ListOfTasksModel } from '../../Models/ListOfTasksModel';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function HomePage() {

  const [currentList, setCurrentList] = useState<ListOfTasksModel>(new ListOfTasksModel());
  const [initialOffcanvOpen, setInitialOffcanvOpen] = useState<boolean>(false);

  const fetchCurrentListData = async () => {
    const selectedList = window.sessionStorage.getItem('selectedlist');
    if (selectedList !== null && selectedList !== undefined) {

      const listData = JSON.parse(selectedList);
      const listResult = await GetListsDataById(listData.id);
      setCurrentList(listResult);
      return;
    }
  }

  ////////////////// CREATE button ////////////////////

  const onFinishCreateTask = (values: any) => {
    CreateTask(values).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    fetchCurrentListData();
  }, [initialOffcanvOpen]);

  return (
    <div className='homeContainer'>
      <Offcanv initialOpen={initialOffcanvOpen} />
      <div className='mainIteemsContainer'>
        <h1 id='h1'>My Tasks

        </h1>
        <div className='createBtnContainer'>
          <CreateTaskModal
            onFinish={onFinishCreateTask}
          ></CreateTaskModal>
        </div>
        {currentList.id != 0 ? <ListOfTasks /> :
          <Button onClick={() => { setInitialOffcanvOpen(!initialOffcanvOpen) }} id='selectListBtn' variant="outline-primary">
            Hi!
            Select the list you want to work with
          </Button>

        }
      </div>
    </div>
  );
}

export default HomePage;


