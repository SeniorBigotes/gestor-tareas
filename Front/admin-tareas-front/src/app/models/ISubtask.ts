export interface Subtask {
    id: number,
    task: string,
    notes?: string
    priority: string,
    dateStart: Date,
    dateEnd: Date,
    complete: boolean,
    auth: number,
}