import { UserRole } from '@app/modules/auth/enums';
import { AccountLoggedInModel, AuthLoggedInModel, UserLoggedInModel } from '@app/modules/auth/models';


export class UserMockData {
    //#region Authentication
    public static login(): AuthLoggedInModel {
        return new AuthLoggedInModel({
            account: new AccountLoggedInModel({
                id: '132',
                email: 'bri@gmail.com',
                avatar: '',
            }),
            user: new UserLoggedInModel({
                id: '456',
                accountId: '123',
                email: 'bri@gmail.com',
                avatar: '',
                role: UserRole.User,
                permissions: undefined
            }),
            jwt: 'qrejnorhjo4564654674987987qw9r79q'

        })
    }
    //#endregion
}
