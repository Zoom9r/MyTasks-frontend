import axios from "axios";
import { ListOfTasksModel } from "../Models/ListOfTasksModel";
import { ListOfTasksModelDto } from "../Models/ListofTasksModelDto";

export const getAllListsNames = async function (): Promise<ListOfTasksModelDto[]> {
    const result = await axios.get('https://localhost:7129/listoftasks');
    return result.data;
}

export const getListsDataById = async function (listOfTasksId: any): Promise<ListOfTasksModel> {
    const result = await axios.get(`https://localhost:7129/listoftasks/${listOfTasksId}`, listOfTasksId);
    return result.data;
}

export const createList = async function (listOfTasksModel: ListOfTasksModel) {
    await axios.post('https://localhost:7129/listoftasks', listOfTasksModel)
}

export const deleteList = async function (listOfTasksId: any) {
    await axios.delete(`https://localhost:7129/listoftasks/${listOfTasksId}`, listOfTasksId)
}

export const editList = async function (listOfTasksModel: ListOfTasksModel) {
    await axios.put('https://localhost:7129/listoftasks', listOfTasksModel)
}

