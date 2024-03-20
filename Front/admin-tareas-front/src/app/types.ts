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

export interface CreateSubtask {
    task: string;
    priority: string;
    dateStart: Date;
    dateEnd: Date;
    auth: number;
    assignedTo: number;
    activityID: number;
}

export interface PostNote {
    note: string;
    activityID: number;
    subtaskID: number;
    authID: number;
}

export interface PutNote {
    note: string;
}

export interface Message {
    message: string;
}