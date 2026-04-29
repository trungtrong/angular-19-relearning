import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserStorage } from '../states/user';
import { APP_URLS } from '@app/shared/constants';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if (UserStorage.isUserLoggedIn()) {
            return true;
        }
        //
        this._router.navigate(
            [`${APP_URLS.LOGIN}`],
            { queryParams: { returnUrl: state.url } }
        );
        return false;
    }
}
