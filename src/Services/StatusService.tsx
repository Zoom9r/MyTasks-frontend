import axios from "axios"
import { StatusModel } from "../Models/StatusModel";

export const GetAllStatuses = async function (): Promise<StatusModel[]> {

    const result = await axios.get('https://localhost:7129/status');
    return result.data;
}

export const GetStatus = async function (statusId: any): Promise<StatusModel> {

    const result = await axios.get(`https://localhost:7129/status/${statusId}`, statusId);
    return result.data;
}

export const CreateStatus = async function (statusModel: StatusModel) {
    await axios.post('https://localhost:7129/status', statusModel)
}

export const DeleteStatus = async function (statusId: any) {
    console.log(statusId)
    await axios.delete(`https://localhost:7129/status/${statusId}`, statusId)
}

export const EditStatus = async function (statusModel: StatusModel) {
    await axios.put('https://localhost:7129/status', statusModel)
}