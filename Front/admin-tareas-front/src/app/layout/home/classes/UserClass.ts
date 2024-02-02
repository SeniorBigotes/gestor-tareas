import { Observable, Subject, map } from "rxjs";
import { User } from "../../../models/IUser";
import { DataCarousel, ProcessDataCarousel } from "../utils/Interfaces";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class UserClass implements ProcessDataCarousel {

    private items: DataCarousel[] = [];

    // Buscar todos los usuarios
    findAllItems(user$: Observable<User[]>): Observable<DataCarousel[]> {
        return user$.pipe(
            map(users => this.selectItems(users))
        );
    }

    // Datos para el carrusel
    private selectItems(users: User[]): DataCarousel[] {
        this.items = users.map(user => ({
            name: user.photoUrl,
            info: user.name,
            footer: user.specialization,
            photo: true,
        }));
        return this.items;
    }
}