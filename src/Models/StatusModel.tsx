
export class StatusModel {
    id: number
    statusName: string
    listOfTasksId: number

    constructor() {
        this.id = 0;
        this.statusName = '';
        this.listOfTasksId = 0;
    }
}