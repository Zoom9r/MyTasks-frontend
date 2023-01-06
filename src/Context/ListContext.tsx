import { createContext, SetStateAction, useState } from 'react';
import { ListOfTasksModel } from '../Models/ListOfTasksModel';
import { ListOfTasksModelDto } from '../Models/ListofTasksModelDto';
import { getAllListsNames, getListsDataById } from '../Services/ListOfTasksService';

type ListContextProviderProps = {
    children: React.ReactNode
}

export const ListContext = createContext({} as ListContextType);

type ListContextType = {
    currentList: ListOfTasksModel,
    setCurrentList: React.Dispatch<React.SetStateAction<ListOfTasksModel>>,
    allListNames: ListOfTasksModelDto[],
    setAllListNames: React.Dispatch<SetStateAction<ListOfTasksModelDto[]>>,
    offcanvOpen: boolean,
    setOffcanvOpen: React.Dispatch<SetStateAction<boolean>>,
    fetchCurrentListData: any,
    fetchAllListsNames: any
}

export const ListContextProvider = ({ children }: ListContextProviderProps) => {

    const [currentList, setCurrentList] = useState<ListOfTasksModel>(new ListOfTasksModel);
    const [allListNames, setAllListNames] = useState<ListOfTasksModelDto[]>([new ListOfTasksModelDto()]);
    const [offcanvOpen, setOffcanvOpen] = useState<boolean>(false);

    const fetchCurrentListData = async (id: number | null) => {

        if (id != null && id != 0) {
            const listResult = await getListsDataById(id);
            setCurrentList(listResult);
        }

        if (id == null && currentList.id != 0) {
            const listResult = await getListsDataById(currentList.id);
            setCurrentList(listResult);
        }

        return;
    }

    const fetchAllListsNames = async () => {
        const listResult = await getAllListsNames();
        setAllListNames(listResult);

        if (currentList.id != 0) {
            fetchCurrentListData(null);
        }
    }

    return <ListContext.Provider value={{ currentList, setCurrentList, allListNames, setAllListNames, offcanvOpen, setOffcanvOpen, fetchCurrentListData, fetchAllListsNames }}>
        {children}
    </ListContext.Provider>
}

