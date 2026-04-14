import { Selector } from '@ngxs/store';
//
import { UserState } from './user.state';
import { AuthLoggedInModel } from '@app/modules/auth/models';

export class UserSelectors {
    @Selector([UserState])
    public static accountInfo(state: AuthLoggedInModel) {
        return !!state && state?.account ? state.account : undefined;
    }

    @Selector([UserState])
    public static userInfo(state: AuthLoggedInModel) {
        return !!state && state?.user ? state.user : undefined;
    }
}
