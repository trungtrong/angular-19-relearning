import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/pages';
import { HomeComponent } from './modules/home';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
        title: 'App'
    },
    {
        path: "**",
        component: PageNotFoundComponent,
        title: 'Page Not Found'
    }
];
