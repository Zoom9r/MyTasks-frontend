import { ListGroup } from "react-bootstrap";
import CreateStatusModal from "./CreateStatusModal";
import StatusTasks from "./CurrentStatus/StatusTasks";
import './ListOfTasks.scss';
import { useContext } from 'react';
import { ListContext } from '../../../Context/ListContext';

export default function ListOfTasks() {

    const listContext = useContext(ListContext);

    return (
        <div className='mainIteemsContainer'>
            {listContext.currentList.id != 0 ?
                <><h1 id='h2'>{listContext.currentList.listName}
                </h1><ListGroup horizontal className="statusContainer">
                        <StatusTasks />
                        <CreateStatusModal />
                    </ListGroup></>
                : null}
        </div>
    );
}


