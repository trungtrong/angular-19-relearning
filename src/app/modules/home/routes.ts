import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
    {
        path: "",
        component: HomeComponent,
        children: [
            {
                path: '',
                redirectTo: 'example-one',
                pathMatch: 'full'
            },
            {
                path: "example-one",
                loadComponent: () => import('@app/modules/example-one/example-one.component').then((c) => c.ExampleOneComponent)
            },
            {
                path: "example-two",
                loadComponent: () => import('@app/modules/example-two/example-two.component').then((c) => c.ExampleTwoComponent)
            }
        ]
    }
]
