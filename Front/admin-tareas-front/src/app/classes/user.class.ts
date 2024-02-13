import { Observable, Subject, map } from "rxjs";
import { User } from "../models/IUser";
import { DataCarousel, ProcessDataCarousel } from "../layout/home/utils/Interfaces";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

/**
 * Clase de apoyo para transformar los datos para el carrusel
 */

export class UserClass implements ProcessDataCarousel {

    private items: DataCarousel[] = [];

     /**
     * metodo para procesar los datos de los usuarios
     * @param user$ arreglo de usuarios (http)
     * @returns {Observable<DataCarousel[]>} convertir la estructura en observable
     */
    findAllItems(user$: Observable<User[]>): Observable<DataCarousel[]> {
        return user$.pipe(
            map(users => this.selectItems(users))
        );
    }

     /**
     * metodo de apoyo de findAllItems() que envia los datos necesarios
     * @param activities arreglo de usuarios
     * @returns {DataCarousel[]} estructura de datos que maneja el carruel
     */
    private selectItems(users: User[]): DataCarousel[] {
        this.items = users.map(user => ({
            id: user.id,
            name: user.photoUrl,
            info: user.name,
            footer: user.specialization,
            photo: true,
        }));
        return this.items;
    }
}