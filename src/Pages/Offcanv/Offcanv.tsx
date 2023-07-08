import { Button, ButtonGroup, Offcanvas } from 'react-bootstrap';
import { useEffect } from "react";
import CreateListModal from './CreateListModal';
import DeleteListModal from './DeleteListModal';
import { ListOfTasksModelDto } from '../../Models/ListofTasksModelDto';
import EditListModal from './EditListModal';
import { AiOutlineMenu } from "react-icons/ai";
import { useContext } from 'react';
import { ListContext } from '../../Context/ListContext';
import './Offcanv.scss';

export default function Offcanv() {

    const listContext = useContext(ListContext);

    const handleShow = () => listContext.setOffcanvOpen(true);
    const handleClose = () => listContext.setOffcanvOpen(false);

    const fetchListsNames = async () => {
        listContext.fetchAllListsNames();
    }

    const onListSelected = async (list: ListOfTasksModelDto) => {
        listContext.fetchCurrentListData(list.id);
    }

    useEffect(() => {
        fetchListsNames();
    }, []);

    return (
        <div className='mainContainer'>
            <div className='menuButton'>
                <AiOutlineMenu onClick={handleShow} className='menuButton' type='button' />
            </div>

            <Offcanvas show={listContext.offcanvOpen} onHide={handleClose} className='offcanvContainer'>
                <Offcanvas.Header id='offCavnasHeader' closeButton>
                    <Offcanvas.Title ><h2 id='offCavnasTitle'>Available lists</h2></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body >
                    <span id='createList'>
                        <CreateListModal
                            onFinishCreate={fetchListsNames}
                        />
                    </span>
                    {listContext.allListNames.map((list) => (

                        <ButtonGroup key={list.id} id='listGroup'>
                            <Button id='listNameBtn' variant="light" onClick={() => { onListSelected(list); handleClose(); }}>
                                {list.listName}
                            </Button>
                            <span id='listModifyButtons'>
                                <EditListModal
                                    list={list}
                                    onFinishEdit={fetchListsNames}
                                />
                                <DeleteListModal
                                    list={list}
                                    onFinishDelete={fetchListsNames}
                                />
                            </span>
                        </ButtonGroup>
                    ))}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

