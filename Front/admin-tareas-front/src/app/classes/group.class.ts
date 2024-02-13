import { Observable, map } from "rxjs";
import { Group } from "../models/IGroup";
import { DataCarousel, ProcessDataCarousel } from "../layout/home/utils/Interfaces";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

/**
 * Clase de apoyo para transformar los datos para el carrusel
 */

export class GroupClass implements ProcessDataCarousel {

    private items: DataCarousel[] = [];

     /**
     * metodo para procesar los datos de las actividades
     * @param group$ arreglo de grupos (http)
     * @returns {Observable<DataCarousel[]>} convertir la estructura en observable
     */
    findAllItems(group$: Observable<Group[]>): Observable<DataCarousel[]> {
        return group$.pipe(
            map(groups => this.selectItems(groups))
        );
    }

     /**
     * metodo de apoyo de findAllItems() que envia los datos necesarios
     * @param groups arreglo de grupos
     * @returns {DataCarousel[]} estructura de datos que maneja el carruel
     */
    private selectItems(groups: Group[]): DataCarousel[] {
        this.items = groups.map(group => ({
            id: group.id,
            name: group.photoUrl,
            info: group.name,
            footer: this.isPrivate(group.privacy),
            photo: true
        }));
        return this.items;
    }
    
    /**
     * metodo de apoyo para selectItems()
     * @param privacy privacidad del grupo
     * @returns {string} valor que se enviara al carrusel
     */
    private isPrivate(privacy: boolean): string {
        return privacy ? 'privado' : 'público';
    }
}