import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
//
import { PageUrlHelper } from '@app/utilities';
import { UserStorage } from '../states/user';
import * as UserActions from '../states/user/user.actions';
import { APP_URLS } from '@app/shared/constants';
import { UserService } from '@app/modules/user/services';
import { SetAuthLoggedInModel } from '@app/modules/auth/models';
import { SetUpNewAuthLoggedInType } from '@app/modules/auth/enums';

@Injectable({
    providedIn: 'root'
})

export class AppInitializerService {
    constructor(
        private _store: Store,
        private _userService: UserService
    ) {

    }

    /*
    1- High priority
    - from versionJson file, check app is in maintenance or not
        - Yes, navigate to maintenance app
        - No, go to the next line

    2 - Check if app is in which pages
        2.1. Maintenance Page - for prod app only
            - That means, the maintenance is done -> call (2)
        2.1. Logout / Signup / Forgot Password
            - call (1)
        2.2. Home and working pages
            - call (2)

    (1) Yes -> Log out, clear data, move to Maintenance Page
    (2) No
        - Check Token, Id in LocalStorage to see if base User Info is still existed
            - Yes, call necessary APIs: authLoggedIn, userLookup,
            - No, Log out
*/
    async initApp(): Promise<unknown> {
        const pathName = window.location.pathname;
        //
        switch (true) {
            case PageUrlHelper.isPagesThatUserIsUnauthenticated(pathName):
                this._logout();
                return of(true);
            default:
                if (!UserStorage.isUserLoggedIn()) {
                    this._store.dispatch(new UserActions.Logout({
                        navigateToUrl: APP_URLS.LOGIN
                    }));
                    return of(true);
                }
                //
                await this._callAPIs();
                return of(true);
        }
    }

    private _logout(params?: { navigateToUrl: string }) {
        if (UserStorage.isUserLoggedIn()) {
            this._store.dispatch(new UserActions.Logout({
                navigateToUrl: params?.navigateToUrl
            }));
        }
    }

    private _callAPIs() {
        return Promise.all([
            this._userService.getAuthLoggedIn().toPromise(),
            // Lookup, ...
        ]).then(([authLoggedIn]) => {
            if (!authLoggedIn || !authLoggedIn?.account
                || !authLoggedIn?.user
                || !authLoggedIn?.jwt
            ) {
                this._logout();
                return;
            }
            // 1- Save Login Info
            this._store.dispatch(new UserActions.SetAuthLoggedIn(
                new SetAuthLoggedInModel({
                    authInfo: authLoggedIn,
                    setUpNewAuthInfoType: SetUpNewAuthLoggedInType.ReloadPage
                })
            ));
            return true;
        })
            .catch((error) => {
                console.log(error);
                this._logout();
                return Promise.resolve(true);
            })
    }
}
