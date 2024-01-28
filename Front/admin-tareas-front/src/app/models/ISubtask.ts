export interface Subtask {
    id: number,
    task: string,
    notes?: number /**/
    priority: string,
    dateStart: Date,
    dateEnd: Date,
    dateComplete: Date,
    complete: boolean,
    activityID: number,
    auth: number, /* */
    assignedTo: number, /* */
}