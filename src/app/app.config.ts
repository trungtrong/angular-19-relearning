import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
//
import { QuicklinkStrategy } from 'ngx-quicklink';
//
import { NgxsModuleOptions, provideStore } from '@ngxs/store';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { withNgxsResetPlugin } from 'ngxs-reset-plugin';
//
import { routes } from './app.routes';
import { environment } from '@environment';
import { UserState } from '@app/core/states/user/user.state';

export const ngxsConfig: NgxsModuleOptions = {
    developmentMode: !environment.production,
    selectorOptions: {
        suppressErrors: false
    },
    compatibility: {
        strictContentSecurityPolicy: true
    }
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(
            routes,
            withPreloading(QuicklinkStrategy),
        ),
        provideHttpClient(),
        // Ngxs
        provideStore([UserState], ngxsConfig),
        withNgxsReduxDevtoolsPlugin({
            name: 'App Store',
            disabled: environment.production
        }),
        withNgxsRouterPlugin(),
        withNgxsResetPlugin(),
        importProvidersFrom([
            NgxsSelectSnapshotModule.forRoot(),
        ]),
    ]
};

