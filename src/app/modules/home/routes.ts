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
                redirectTo: 'router-config',
                pathMatch: 'full'
            },
            {
                path: "router-config",
                loadComponent: () => import('@app/modules/router-config/router-config.component').then((c) => c.RouterConfigComponent),
                canActivate: [AuthGuard],
            },
            {
                path: "example-two",
                loadComponent: () => import('@app/modules/example-two/example-two.component').then((c) => c.ExampleTwoComponent),
                canActivate: [AuthGuard, PermissionGuard],
                data: {
                    permissionData: new PermissionGuardDataModel({
                        allowedRoles: [UserRole.Admin],
                        fallbackUrl: APP_URLS.Home_RouterConfig
                    })
                }
            }
        ]
    }
]
