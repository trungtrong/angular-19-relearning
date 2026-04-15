import { SetAuthLoggedInModel } from '@app/modules/auth/models';

export enum UserActionType {
    LOGOUT = "[Auth] Logout",
    //
    SET_AUTH_LOGGED_IN = "[Auth] Set AuthLoggedIn",
}

export class SetAuthLoggedIn {
    static readonly type = UserActionType.SET_AUTH_LOGGED_IN;

    constructor(public readonly payload: SetAuthLoggedInModel) { }
}

export class Logout {
    static readonly type = UserActionType.LOGOUT;

    constructor(public readonly payload?: {
        navigateToUrl?: string
    }) { }
}

export type UserActions =
    | SetAuthLoggedIn;
