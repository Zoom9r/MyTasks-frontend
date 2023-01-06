import './HomePage.scss';
import CreateTaskModal from './CreateTaskModal/CreateTaskModal';
import Offcanv from '../Offcanv/Offcanv';
import ListOfTasks from './ListOfTasks/ListOfTasks';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { ListContext } from '../../Context/ListContext';
import ToastModal from '../ToastModal';

export default function HomePage() {

  const listContext = useContext(ListContext);

  return (
    <div className='homeContainer'>
      <Offcanv />
      <div className='mainIteemsContainer'>
        <h1 id='h1'>My Tasks</h1>
        <div className='createBtnContainer'>
          <CreateTaskModal />
        </div>
        {listContext.currentList.id != 0 ?
          <ListOfTasks />
          : <Button onClick={() => { listContext.setOffcanvOpen(true) }} id='selectListBtn' variant="outline-primary">
            Hi!
            Select the list you want to work with
          </Button>
        }
      </div>
      <ToastModal />
    </div>
  );
}




