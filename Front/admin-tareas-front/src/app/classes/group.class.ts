import { Observable, map } from "rxjs";
import { Group } from "../models/IGroup";
import { DataCarousel, ProcessDataCarousel } from "../layout/home/utils/Interfaces";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class GroupClass implements ProcessDataCarousel {

    private items: DataCarousel[] = [];

    // Buscar todos los grupos
    findAllItems(group$: Observable<Group[]>): Observable<DataCarousel[]> {
        return group$.pipe(
            map(groups => this.selectItems(groups))
        );
    }

    // Datos para el carrusel
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
    
    // Grupo publico o privado
    private isPrivate(privacy: boolean): string {
        return privacy ? 'privado' : 'público';
    }
}