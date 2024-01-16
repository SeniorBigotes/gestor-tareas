import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadChildren: () => import('./layout/home/home.routes').then(r => r.routes)},
    {path: 'projects', loadChildren: () => import('./layout/projects/project.routes').then(r => r.routes), title: 'Projects'},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
