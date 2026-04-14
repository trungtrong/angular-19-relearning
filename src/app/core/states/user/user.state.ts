import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
//
import { AppKeyFeature } from '../app-key-feature.enum';
import { AccountLoggedInModel, AuthLoggedInModel, SetAuthLoggedInModel, UserLoggedInModel } from '@app/modules/auth/models';
//
import * as UserActions from './user.actions';
import { APP_URLS } from '@app/shared/constants';
import { AppStorage, StringHelper } from '@app/utilities';
import { APP_STORAGE_KEYS } from './user.storage';

const INIT_STATE: AuthLoggedInModel = {
    account: undefined,
    user: undefined,
    jwt: undefined
}

@State<AuthLoggedInModel>({
    name: AppKeyFeature.AuthLoggedIn,
    defaults: INIT_STATE
})
@Injectable()
export class UserState {
    constructor(private _store: Store) {
    }

    //#region Store Auth Logged In
    @Action(UserActions.SetAuthLoggedIn)
    SetAuthLoggedIn(context: StateContext<AuthLoggedInModel>, { payload }: UserActions.SetAuthLoggedIn) {
        if (!payload || !payload?.authInfo || !payload?.authInfo?.account || !payload?.authInfo?.user) {
            context.dispatch(
                new UserActions.Logout({
                    navigateToUrl: APP_URLS.HOME
                })
            )
        }
        // Store Data to Storage
        this._storeLoggedInUser(payload);
        // Store Data to Ngxs Store
        context.patchState({
            account: AccountLoggedInModel.mapData(
                payload.authInfo?.account
            ),
            user: UserLoggedInModel.mapData(
                payload.authInfo?.user
            ),
        });
        // Cuz it is duplicated behavior, so we move it to here
        // Navigate to Url
        if (!StringHelper.isValueEmpty(payload.navigateToUrl ?? '')) {
            // Need timeout = 100 because the router doesn't work normally. The reason doesn't know now.
            setTimeout(() => {
                this._store.dispatch(new Navigate([payload.navigateToUrl]));
            }, 100);
        }
    }

    private _storeLoggedInUser(params: SetAuthLoggedInModel) {
        // Store: AccountId, UserId, JWT
        AppStorage.storeData({
            storage: 'local',
            key: APP_STORAGE_KEYS.ACCOUNT_ID,
            value: params.authInfo?.account?.id
        });
        AppStorage.storeData({
            storage: 'local',
            key: APP_STORAGE_KEYS.USER_ID,
            value: params.authInfo?.user?.id
        });
        AppStorage.storeData({
            storage: 'local',
            key: APP_STORAGE_KEYS.JWT_TOKEN,
            value: params.authInfo?.jwt
        });
    }

    //#endregion

    @Action(UserActions.Logout)
    Logout(context: StateContext<AuthLoggedInModel>, { payload }: UserActions.SetAuthLoggedIn) {
        // Reset States
        // Clear Browser Storage
    }
}
