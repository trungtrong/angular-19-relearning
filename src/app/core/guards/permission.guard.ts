import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { Store } from '@ngxs/store';
//
import { UserRole } from '@app/modules/auth/enums';
import { UserSelectors } from '../states/user/user.selectors';

export class PermissionGuardDataModel {
    allowedRoles!: UserRole[];
    fallbackUrl!: string;

    constructor(init?: PermissionGuardDataModel) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
    get userRoleSnapshot(): UserRole {
        return this._store.selectSnapshot<UserRole>(UserSelectors.userRole);
    }

    constructor(
        private _router: Router,
        private _store: Store
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot): MaybeAsync<GuardResult> {
        const data = route.data as { permissionData: PermissionGuardDataModel };
        const permissionData = data?.permissionData;
        if (!permissionData) {
            return true;
        }
        //
        const allow = permissionData && permissionData?.allowedRoles?.length > 0 ? permissionData?.allowedRoles?.includes(this.userRoleSnapshot) : true;
        if (!allow && permissionData.fallbackUrl) {
            this._router.navigateByUrl(permissionData.fallbackUrl);
        }
        return allow;
    }
}
