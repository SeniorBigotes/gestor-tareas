import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadChildren: () => import('./layout/home/home.routes').then(r => r.routes)},
    {path: 'activities', loadChildren: () => import('./layout/activities/activities.routes').then(r => r.routes), title: 'Activities'},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
