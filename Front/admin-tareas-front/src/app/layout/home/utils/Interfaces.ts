import { Observable } from "rxjs";
import { Activities } from "../../../models/IActivity";
import { Group } from "../../../models/IGroup";
import { User } from "../../../models/IUser";

export interface DataCarousel {
    id: number
    name: string,
    info: any,
    footer: any,
    progressbar?: boolean,
    photo?: boolean,
}

type Data = Group | Activities | User;

export interface ProcessDataCarousel {
    findAllItems(obs: Observable<Data[]>): Observable<DataCarousel[]>;
}