export class UserPermissionModel {
    view?: boolean;
    modified?: boolean;

    constructor(init?: UserPermissionModel) {
        Object.assign(this, init);
    }
}
