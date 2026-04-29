import { Routes } from '@angular/router';
//
import { HomeComponent } from './home.component';
import { AuthGuard, PermissionGuard, PermissionGuardDataModel } from '@app/core/guards';
import { UserRole } from '../auth/enums';
import { APP_URLS } from '@app/shared/constants';

export const HOME_ROUTES: Routes = [
    {
        path: "",
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'example-one',
                pathMatch: 'full'
            },
            {
                path: "example-one",
                loadComponent: () => import('@app/modules/example-one/example-one.component').then((c) => c.ExampleOneComponent),
                canActivate: [AuthGuard],
            },
            {
                path: "example-two",
                loadComponent: () => import('@app/modules/example-two/example-two.component').then((c) => c.ExampleTwoComponent),
                canActivate: [AuthGuard, PermissionGuard],
                data: {
                    permissionData: new PermissionGuardDataModel({
                        allowedRoles: [UserRole.Admin],
                        fallbackUrl: APP_URLS.Home_ExampleOne
                    })
                }
            }
        ]
    }
]
