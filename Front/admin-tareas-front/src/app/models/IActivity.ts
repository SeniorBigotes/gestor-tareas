import { Subtask } from "./ISubtask"

export interface Activities {
    id: number,
    task: string,
    description?: string,
    dateStart: Date,
    dateEnd: Date,
    dateUpdate: Date,
    progress: number,
    complete: boolean,
    auth: number
    group: boolean,
    subtask?: Subtask[]
}