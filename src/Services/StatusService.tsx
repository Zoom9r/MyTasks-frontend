import axios from "axios";
import { StatusModel } from "../Models/StatusModel";

export const getAllStatuses = async function (): Promise<StatusModel[]> {
    const result = await axios.get('https://localhost:7129/status');
    return result.data;
}

export const getStatus = async function (statusId: any): Promise<StatusModel> {
    const result = await axios.get(`https://localhost:7129/status/${statusId}`, statusId);
    return result.data;
}

export const createStatus = async function (statusModel: StatusModel) {
    await axios.post('https://localhost:7129/status', statusModel)
}

export const deleteStatus = async function (statusId: any) {
    await axios.delete(`https://localhost:7129/status/${statusId}`, statusId)
}

export const editStatus = async function (statusModel: StatusModel) {
    await axios.put('https://localhost:7129/status', statusModel)
}