export interface SendComplete {
    complete: boolean;
    dateComplete: Date;
}

export interface UpdateSubtask {
    task: string;
    priority: string;
    assignedTo: number;
    dateStart: Date;
    dateEnd: Date;
}