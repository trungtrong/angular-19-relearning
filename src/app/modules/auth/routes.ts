import { Routes } from '@angular/router';
import { ForgotPasswordComponent, LoginComponent, SignUpComponent } from './components';
import { AuthComponent } from './auth.component';

export const AUTH_ROUTES: Routes = [
    {
        path: "",
        component: AuthComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'sign-up',
                component: SignUpComponent
            },
            {
                path: 'forgot-password',
                component: ForgotPasswordComponent
            }
        ]
    }
];
