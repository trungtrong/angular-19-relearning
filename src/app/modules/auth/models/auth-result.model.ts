import { cloneDeep } from 'lodash-es';
//
import { BaseModel } from '@app/shared/models';
import { SetUpNewAuthLoggedInType, UserRole } from '../enums';
import { UserPermissionModel } from './user-permissions.model';

export class AuthLoggedInModel {
    account?: AccountLoggedInModel;
    user?: UserLoggedInModel;
    jwt?: string;

    constructor(init?: AuthLoggedInModel) {
        Object.assign(this, init);
    }
}

export class AccountLoggedInModel extends BaseModel {
    email?: string;
    avatar?: string;

    constructor(init?: AccountLoggedInModel) {
        super();
        Object.assign(this, init);
    }

    public static mapData(data?: AccountLoggedInModel): AccountLoggedInModel | undefined {
        return data ? new AccountLoggedInModel({
            ...data
        }) : undefined;
    }
}

export class UserLoggedInModel extends BaseModel {
    accountId?: string;
    email?: string;
    avatar?: string;
    //
    role?: UserRole;
    permissions?: UserPermissionModel[];
    //
    isOwner?: boolean;

    constructor(init?: UserLoggedInModel) {
        super();
        Object.assign(this, init);
    }

    public static mapData(data?: UserLoggedInModel): UserLoggedInModel | undefined {
        return data ? new UserLoggedInModel({
            ...data,
            permissions: data?.permissions?.length && data.permissions.length > 1
                ? cloneDeep(data.permissions)
                : []
        }) : undefined;
    }
}

export class SetAuthLoggedInModel {
    authInfo?: AuthLoggedInModel;
    setUpNewAuthInfoType?: SetUpNewAuthLoggedInType;
    navigateToUrl?: string;

    constructor(init?: SetAuthLoggedInModel) {
        Object.assign(this, init);
    }
}
