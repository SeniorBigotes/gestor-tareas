import { Observable, map } from "rxjs";
import { Activities } from "../models/IActivity";
import { DataCarousel, ProcessDataCarousel } from "../layout/home/utils/Interfaces";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ActivityClass implements ProcessDataCarousel {

    private items: DataCarousel[] = [];

    // buscar todos las actividades
    findAllItems(activity$: Observable<Activities[]>): Observable<DataCarousel[]> {
        return activity$.pipe(
            map(activities => this.selectItems(activities))
        );
    }

    // Datos para el carrusel
    private selectItems(activities: Activities[]): DataCarousel[] {
        this.items = activities.map(activity => ({
            id: activity.id,
            name: activity.task,
            info: activity.dateEnd,
            footer: activity.progress,
            progressbar: true
        }));
        return this.items;
    }
}