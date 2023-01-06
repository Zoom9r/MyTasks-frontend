import { ListOfTasksModel } from './ListOfTasksModel';
import { StatusModel } from './StatusModel';

export class TaskModel {
    id: number
    title: string
    description: string
    statusId: number
    status: StatusModel
    listOfTasksId: number
    listOfTasks: ListOfTasksModel

    constructor() {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.listOfTasksId = 0;
        this.listOfTasks = new ListOfTasksModel();
        this.statusId = 0;
        this.status = new StatusModel();
    }
}