export class UserLoginInfoViewModel {
    email = '';
    password = '';
    isRememberMe?: boolean;
    //
    public constructor(init?: Partial<UserLoginInfoViewModel>) {
        Object.assign(this, init);
    }

    static mapToRequestModel(userLogin: UserLoginInfoViewModel) {
        return new UserLoginInfoRequestModel({
            email: userLogin.email ? userLogin.email.trim() : '',
            password: userLogin.email ? userLogin.password.trim() : '',
            isRememberMe: !!userLogin.isRememberMe
        })
    }
}

export class UserLoginInfoRequestModel extends UserLoginInfoViewModel {
    public constructor(init?: Partial<UserLoginInfoRequestModel>) {
        super();
        Object.assign(this, init);
    }
}

