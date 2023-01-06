import { StatusModel } from "./StatusModel";
import { TaskModel } from "./TaskModel";

export class ListOfTasksModel {

    id: number
    listName: string
    statuses: Array<StatusModel>
    tasks: Array<TaskModel>

    constructor() {
        this.id = 0;
        this.listName = '';
        this.statuses = new Array<StatusModel>;
        this.tasks = new Array<TaskModel>;
    }
}