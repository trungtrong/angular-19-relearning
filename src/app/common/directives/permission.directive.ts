import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngxs/store';
//
import { UserSelectors } from '@app/core/states/user/user.selectors';
import { UserRole } from '@app/modules/auth/enums';

@Directive({
    selector: '[appPermission]',
    standalone: true
})
export class PermissionDirective {
    get userRoleSnapshot(): UserRole {
        return this._store.selectSnapshot<UserRole>(UserSelectors.userRole);
    }

    @Input() set appPermission(userRoles: UserRole[]) {
        if (userRoles?.length && userRoles.includes(this.userRoleSnapshot)) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        } else {
            this._viewContainerRef.clear();
        }
    }

    constructor(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        private _templateRef: TemplateRef<any>,
        private _viewContainerRef: ViewContainerRef,
        private _store: Store
    ) { }

}
