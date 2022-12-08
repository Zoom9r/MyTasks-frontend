import axios from "axios"
import { ListOfTasksModel } from "../Models/ListOfTasksModel";
import { ListOfTasksModelDto } from "../Models/ListofTasksModelDto";

export const GetAllLists = async function (): Promise<ListOfTasksModelDto[]> {

    const result = await axios.get('https://localhost:7129/listoftasks');
    return result.data;
}

export const GetListsDataById = async function (listOfTasksId: any): Promise<ListOfTasksModel> {

    const result = await axios.get(`https://localhost:7129/listoftasks/${listOfTasksId}`, listOfTasksId);
    return result.data;
}
export const CreateList = async function (listOfTasksModel: ListOfTasksModel) {
    await axios.post('https://localhost:7129/listoftasks', listOfTasksModel)
}

export const DeleteList = async function (listOfTasksId: any) {

    await axios.delete(`https://localhost:7129/listoftasks/${listOfTasksId}`, listOfTasksId)
}

export const EditList = async function (listOfTasksModel: ListOfTasksModel) {
    await axios.put('https://localhost:7129/listoftasks', listOfTasksModel)
}

