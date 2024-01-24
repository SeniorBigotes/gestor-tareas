import { Activities } from "../../models/IActivity";
import { Group } from "../../models/IGroup";
import { User } from "../../models/IUser";

export interface DataCarousel {
    name: string,
    info: any,
    footer: any,
    progressbar?: boolean,
    photo?: boolean,
}

export type DataCarouselItems = Group | Activities | User
export type CarouselItems = DataCarousel | string | null