import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
//
import { DxCheckBoxModule, DxTextBoxModule, DxValidatorModule } from 'devextreme-angular';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { DxTextBoxComponent, DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { finalize, Subject, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
//
import { AuthLoggedInModel, SetAuthLoggedInModel, UserLoginInfoRequestModel, UserLoginInfoViewModel } from '../../models';
import { StringHelper, RegexHelper, APP_REGEX } from '@app/utilities';
import { UserService } from '@app/modules/user/services';
import { APP_URLS } from '@app/shared/constants';
import * as UserActions from '@app/core/states/user';
import { SetUpNewAuthLoggedInType } from '../../enums';

@Component({
    standalone: true,
    selector: 'app-auth-login',
    templateUrl: 'login.component.html',
    styleUrl: 'login.component.scss',
    imports: [
        CommonModule,
        DxTextBoxModule,
        DxCheckBoxModule,
        DxValidatorModule
    ]
})
export class LoginComponent implements OnInit, OnDestroy {
    @ViewChild('emailTextBox') emailTextBox?: DxTextBoxComponent;
    @ViewChild('passwordTextBox') passwordTextBox?: DxTextBoxComponent;

    PASSWORD_MIN_LENGTH = 6;
    EmailRegex = APP_REGEX.Email;

    userLoginInfo = new UserLoginInfoViewModel({
        isRememberMe: false
    });
    //
    passwordMode: DxTextBoxTypes.TextBoxType = 'password';
    passwordButton: DxButtonTypes.Properties = {
        icon: 'eyeopen',
        stylingMode: 'text',
        onClick: () => {
            this.passwordMode = this.passwordMode === 'text' ? 'password' : 'text';
        },
    };
    // Autofill
    autofillDetection = {
        isEmailEnable: false,
        isPasswordEnable: false
    }
    isAutofillInit = true;
    //
    returnUrl = '';

    isLoading = false;
    isDataValid = false;
    //
    private _autofillDetection$: Subject<void> = new Subject<void>();
    private _subscriptions$: Subscription = new Subscription();

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _store: Store,
        private _userService: UserService,
    ) {
        this._subscribeAutofillDetection();
    }

    ngOnInit(): void {
        console.log('This is login');
        this.getReturnUrl();
    }

    ngOnDestroy(): void {
        this._subscriptions$.unsubscribe();
    }

    getReturnUrl() {
        this._subscriptions$.add(
            this._activatedRoute.queryParamMap.subscribe((params) => {
                this.returnUrl = params?.get('returnUrl') ?? '';
                console.log('returnUrl', this.returnUrl);
            })
        )
    }

    //#region Check Data Changed
    dataChanged() {
        this.isDataValid = this.checkIsDataValid();
    }

    checkIsDataValid() {
        const isEmailValid = !StringHelper.isValueEmpty(this.userLoginInfo.email)
            && RegexHelper.checkEmailIsValid(this.userLoginInfo.email);
        const isPasswordValid = !StringHelper.isValueEmpty(this.userLoginInfo.password)
            && this.userLoginInfo.password.length >= this.PASSWORD_MIN_LENGTH;
        return isEmailValid && isPasswordValid;
    }
    //#endregion

    //#region Detect AutoFill
    detectAutofillFromBrowser() {
        const intervalTime = setInterval(() => {
            if (!!this.emailTextBox && !!this.passwordTextBox) {
                const emailInput = this.emailTextBox.instance.element().querySelector('input');
                const passwordInput = this.emailTextBox.instance.element().querySelector('input');
                //
                if (!!emailInput && !!passwordInput) {
                    clearInterval(intervalTime);
                }
                //
                emailInput?.addEventListener('animationiteration', this.setAutofillForEmail, true);
                passwordInput?.addEventListener('animationiteration', this.setAutofillForPassword, true);
            }
        })
    }

    setAutofillForEmail() {
        if (this.isAutofillInit) {
            this.autofillDetection.isEmailEnable = true;
            this._autofillDetection$.next();
        }
    }

    setAutofillForPassword() {
        if (this.isAutofillInit && this.autofillDetection.isEmailEnable) {
            this.autofillDetection.isPasswordEnable = true;
            this._autofillDetection$.next();
        }
    }

    private _subscribeAutofillDetection() {
        this._subscriptions$.add(
            this._autofillDetection$.subscribe(() => {
                if (this.autofillDetection.isEmailEnable && this.autofillDetection.isPasswordEnable) {
                    this.isAutofillInit = false;
                    this.isDataValid = true;
                }
                // Remove Event Listener
                if (this.autofillDetection.isEmailEnable) {
                    const emailInput = this.emailTextBox?.instance.element().querySelector('input');
                    emailInput?.removeEventListener('animationiteration', this.setAutofillForEmail, true);
                }
                //
                if (this.autofillDetection.isPasswordEnable) {
                    const passwordInput = this.passwordTextBox?.instance.element().querySelector('input');
                    //
                    passwordInput?.removeEventListener('animationiteration', this.setAutofillForPassword, true);
                }
            })
        )
    }
    //#endregion

    //#region Events
    onLogin() {
        if (!this.isDataValid || this.isLoading) return;
        //
        const userLoginInfoRequestModel: UserLoginInfoRequestModel
            = UserLoginInfoViewModel.mapToRequestModel(this.userLoginInfo);
        this.isLoading = true;

        this._userService.login(userLoginInfoRequestModel).pipe(
            finalize(() => {
                this.isLoading = false;
            })
        ).subscribe((res: AuthLoggedInModel) => {
            console.log(res);
            // 1- Save Login Info
            this.storeLoginInfo(res);
            // 2 - Navigate to Home Page
            this.navigateToRightPageAfterLoggedIn();
        })
    }

    storeLoginInfo(authInfo: AuthLoggedInModel) {
        this._store.dispatch(new UserActions.SetAuthLoggedIn(
            new SetAuthLoggedInModel({
                authInfo: authInfo,
                setUpNewAuthInfoType: SetUpNewAuthLoggedInType.Login
            })
        ))
    }

    navigateToRightPageAfterLoggedIn() {
        if (!StringHelper.isValueEmpty(this.returnUrl)) {
            const returnUrlValid = this.returnUrl.startsWith('/');
            this._router.navigateByUrl(returnUrlValid ? this.returnUrl : '/' + this.returnUrl);
            return;
        }
        //
        this._router.navigateByUrl(APP_URLS.HOME);
    }
    //#endregion
}
