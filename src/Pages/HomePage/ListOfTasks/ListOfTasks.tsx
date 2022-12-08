import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { ListOfTasksModel } from "../../../Models/ListOfTasksModel";
import { StatusModel } from "../../../Models/StatusModel";
import { GetListsDataById } from "../../../Services/ListOfTasksService";
import { CreateStatus } from "../../../Services/StatusService";
import CreateStatusModal from "./CreateStatusModal";
import CurrentStatusTasks from "./CurrentStatus/CurrentStatusTasks";
import './ListOfTasks.scss';

const ListOfTasks = () => {

    const [currentList, setCurrentList] = useState<ListOfTasksModel>(new ListOfTasksModel());

    const fetchListData = async () => {
        const listResult = await GetListsDataById(currentList.id);
        setCurrentList(listResult);
        window.location.reload();
    }

    const onFinishCreateStatus = async (values: StatusModel) => {
        await CreateStatus(values).then(() => {
            fetchListData();
        })
    };

    const fetchCurrentListData = async () => {
        const selectedList = window.sessionStorage.getItem('selectedlist');
        if (selectedList !== null && selectedList !== undefined) {

            const listData = JSON.parse(selectedList);
            const listResult = await GetListsDataById(listData.id);
            setCurrentList(listResult);
            return;
        }
    }

    useEffect(() => {
        fetchCurrentListData();
    }, []);

    return (
        <div className='mainIteemsContainer'>
            {currentList.id != 0 ?
                <>
                    <h1 id='h2'>{currentList.listName}
                    </h1>
                    <ListGroup horizontal className="statusContainer">
                        {currentList.statuses.map((status) => (
                            <div key={status.id} className='statusColumn'>
                                <CurrentStatusTasks
                                    listId={currentList.id}
                                    status={status}
                                    listTasks={currentList.tasks}
                                    updateListData={fetchListData}
                                />
                            </div>
                        ))}

                        <CreateStatusModal
                            onFinish={onFinishCreateStatus}
                            currentList={currentList}
                        />
                    </ListGroup>
                </>
                : null}
        </div>

    );
}
export default ListOfTasks;


