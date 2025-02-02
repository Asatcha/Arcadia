import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '**', redirectTo: 'home' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];
