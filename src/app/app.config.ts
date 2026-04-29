import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
//
import { quicklinkProviders, QuicklinkStrategy } from 'ngx-quicklink';
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
import { AppInitializerService } from './core/services';

export const ngxsConfig: NgxsModuleOptions = {
    developmentMode: !environment.production,
    selectorOptions: {
        suppressErrors: false
    },
    compatibility: {
        strictContentSecurityPolicy: true
    }
};

const initializerFn = (): Promise<unknown> => {
    // because DI framework is set up after bootstrap app - APP initialize
    const _appInitService = inject(AppInitializerService);
    return _appInitService.initApp();
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideHttpClient(),
        //
        quicklinkProviders,
        provideRouter(
            routes,
            withPreloading(QuicklinkStrategy),
        ),
        //
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
        // Services
        provideAppInitializer(initializerFn)
    ]
};

