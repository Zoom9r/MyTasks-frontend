import { Button, ButtonGroup, Offcanvas } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { GetAllLists, GetListsDataById } from "../../../Services/ListOfTasksService";
import { createBrowserHistory } from 'history';
import CreateListModal from './CreateListModal';
import DeleteListModal from './DeleteListModal';
import { ListOfTasksModelDto } from '../../../Models/ListofTasksModelDto';
import EditListModal from './EditListModal';
import './Offcanv.scss'
import { AiOutlineMenu } from "react-icons/ai";

interface Props {
    initialOpen: boolean;
}

export const history = createBrowserHistory();


function Offcanv(props: Props) {

    const [allLists, setAllLists] = useState<ListOfTasksModelDto[]>([new ListOfTasksModelDto()]);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleShow = () => setShowOffcanvas(true);
    const handleStartShow = () => setShowOffcanvas(props.initialOpen);
    const handleClose = () => setShowOffcanvas(false);

    const fetchListsData = async () => {
        const listResult = await GetAllLists();
        setAllLists(listResult);
    }

    ///////////////// Putting selected list data in session storage ////////////////
    const key: string = 'selectedlist';

    const onListSelected = async (list: ListOfTasksModelDto) => {
        const allListData = await GetListsDataById(list.id);
        window.sessionStorage.setItem(key, JSON.stringify(allListData));
        window.location.reload();
    }

    const onFinishCreate = async () => {
        await fetchListsData();

    }
    const onFinishChangeData = async () => {
        await fetchListsData();
        window.location.reload();
    }

    useEffect(() => {
        fetchListsData();
        handleStartShow();
    }, [props.initialOpen]);

    return (
        <div className='mainContainer'>
            <div className='menuButton'>
                <AiOutlineMenu onClick={handleShow} className='menuButton' type='button' />
            </div>

            <Offcanvas show={showOffcanvas} onHide={handleClose} className='offcanvContainer'>
                <Offcanvas.Header id='offCavnasHeader' closeButton>
                    <Offcanvas.Title ><h2 id='offCavnasTitle'>Available lists</h2></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body >
                    <span id='createList'>
                        <CreateListModal
                            onFinishCreate={onFinishCreate}
                        />
                    </span>
                    {allLists.map((list) => (

                        <ButtonGroup key={list.id} id='listGroup'>
                            <Button id='listNameBtn' variant="light" onClick={() => { onListSelected(list); handleClose() }}>
                                {list.listName}
                            </Button>
                            <span id='listModifyButtons'>
                                <EditListModal
                                    list={list}
                                    onFinishEdit={onFinishChangeData}
                                />
                                <DeleteListModal
                                    list={list}
                                    onFinishDelete={onFinishChangeData}
                                />
                            </span>
                        </ButtonGroup>

                    ))}

                </Offcanvas.Body>
            </Offcanvas>

        </div>
    );
}

export default Offcanv;