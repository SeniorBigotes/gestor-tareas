import { RouterOutlet } from "@angular/router";
import { BusquedaComponent } from "./shared/busqueda/busqueda.component";
import { CommonModule } from "@angular/common";
import { NavigationComponent } from "./layout/navigation/pages/navigation/navigation/navigation.component";
import { HomeComponent } from "./layout/home/pages/home/home.component";


export const modules = [
    CommonModule,
    RouterOutlet,
    NavigationComponent,
    HomeComponent,
];