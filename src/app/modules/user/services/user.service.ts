import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services';
import { AuthLoggedInModel, UserLoginInfoRequestModel } from '@app/modules/auth/models';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private USER_API_URL = 'api/user';

    constructor(private _apiService: ApiService) {

    }

    //#region Authentication
    login(loginInfo: UserLoginInfoRequestModel): Observable<AuthLoggedInModel> {
        return of(new AuthLoggedInModel());
        return throwError(() => new Error('Something went wrong!'));
        return this._apiService.post(`${this.USER_API_URL}/auth`, loginInfo);
    }
    //#endregion
}
