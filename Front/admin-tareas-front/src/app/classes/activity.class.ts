import { Observable, map } from "rxjs";
import { Activities } from "../models/IActivity";
import { DataCarousel, ProcessDataCarousel } from "../layout/home/utils/Interfaces";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

/**
 * Clase de apoyo para transformar los datos para el carrusel
 */

export class ActivityClass implements ProcessDataCarousel {

    private items: DataCarousel[] = [];

    /**
     * metodo para procesar los datos de las actividades
     * @param activity$ arreglo de actividades
     * @returns {Observable<DataCarousel[]>} convertir la estructura en observable
     */
    findAllItems(activity$: Observable<Activities[]>): Observable<DataCarousel[]> {
        return activity$.pipe(
            map(activities => this.selectItems(activities))
        );
    }

    /**
     * metodo de apoyo de findAllItems() que envia los datos necesarios
     * @param activities arreglo de actividades
     * @returns {DataCarousel[]} estrucuta de datos que recibe el carruel
     */
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