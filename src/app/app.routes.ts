import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/pages';

export const routes: Routes = [
    {
        path: "",
        loadChildren: () => import('./modules/home/routes').then((c => c.HOME_ROUTES)),
        title: 'App'
    },
    {
        path: "",
        loadChildren: () => import('./modules/auth/routes').then((c => c.AUTH_ROUTES)),
        title: 'App'
    },
    {
        path: "**",
        component: PageNotFoundComponent,
        title: 'Page Not Found'
    }
];
