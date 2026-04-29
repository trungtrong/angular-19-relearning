import { Selector } from '@ngxs/store';
//
import { UserState } from './user.state';
import { AuthLoggedInModel } from '@app/modules/auth/models';
import { UserRole } from '@app/modules/auth/enums';

export class UserSelectors {
    @Selector([UserState])
    public static accountInfo(state: AuthLoggedInModel) {
        return !!state && state?.account ? state.account : undefined;
    }

    @Selector([UserState])
    public static userInfo(state: AuthLoggedInModel) {
        return !!state && state?.user ? state.user : undefined;
    }

    @Selector([UserState])
    public static userRole(state: AuthLoggedInModel): UserRole {
        return (state?.user?.role ?? undefined) as UserRole;
    }
}
