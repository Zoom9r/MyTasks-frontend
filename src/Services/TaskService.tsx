import axios from "axios";
import { TaskModel } from "../Models/TaskModel";

export const getAllTasks = async function (): Promise<TaskModel[]> {
    const result = await axios.get('https://localhost:7129/tasks');
    return result.data;
}

export const createTask = async function (TaskModel: TaskModel) {
    await axios.post('https://localhost:7129/tasks', TaskModel)
}

export const deleteTask = async function (taskId: any) {
    await axios.delete(`https://localhost:7129/tasks/${taskId}`, taskId)
}

export const editTask = async function (taskModel: TaskModel) {
    await axios.put('https://localhost:7129/tasks', taskModel)
}