import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { QuicklinkStrategy } from 'ngx-quicklink';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(
            routes,
            withPreloading(QuicklinkStrategy),
        )
    ]
};
