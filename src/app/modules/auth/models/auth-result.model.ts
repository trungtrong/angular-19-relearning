import { BaseModel } from '@app/shared/models';
import { UserRole } from '../enums';
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
}
