/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
//
import { AppStorage, API_URL, AppUrls, AppNotify } from '@app/utilities';
import { ACCESS_TOKEN_KEY, AUTH_SCHEME } from '@app/shared/constants';
import { environment } from '@environment';
import { AttachmentModel, ListItemModel } from '@app/shared/models';
import { ApiErrorCode } from '@app/shared/enums';
import { UserStorage } from '../states';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public baseURL = environment.baseUrl;

    ERROR_SOMETHING_BAD_HAPPENED = 'Something bad happened. Please try again later.';
    SERVER_ERROR = 'An unknown error has occurred. Please refresh the page.';
    WARNING_YOUR_SESSION_HAS_EXPIRED = 'Your session has expired, please log in again.';

    constructor(private httpClient: HttpClient,
        private router: Router) {
    }

    //#region
    get accessToken(): string {
        return AppStorage.getStorageValue({
            storage: 'session',
            key: ACCESS_TOKEN_KEY,
            valueType: 'string',
            isDecode: true
        });
    }

    get headerAuthorizationKey(): string {
        return AUTH_SCHEME + this.accessToken;
    }

    get headers(): HttpHeaders {
        return new HttpHeaders({
            'app-key': environment.appKey,
            'Content-Type': 'application/json',
            Authorization: this.headerAuthorizationKey,
        });
    }

    get binaryArrayHeaders(): HttpHeaders {
        return new HttpHeaders({
            'app-key': environment.appKey,
            'Content-Type': 'application/octet-stream',
            Authorization: this.headerAuthorizationKey,
        });
    }

    get httpOptions() {
        return {
            ...this.headers,
        }
    }

    get formDataHeaders(): HttpHeaders {
        return new HttpHeaders({
            Accept: 'application/json',
            Authorization: this.headerAuthorizationKey,
        });
    }

    get blobFileHeaders(): { headers: HttpHeaders } {
        return {
            headers: new HttpHeaders({
                Accept: 'application/json',
                Authorization: this.headerAuthorizationKey,
                responseType: 'blob'
            })
        }
    }

    get options(): {
        headers?: HttpHeaders | Record<string, string | string[]>;
        context?: HttpContext;
        observe?: 'body';
        params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        body?: unknown | null;
    } {
        return { headers: this.headers };
    }
    //#endregion

    //#region GET Method
    get<T>(
        url: string,
        params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>
    ): Observable<T> {
        const options = this.options;
        if (params) {
            options.params = params;
        }
        return this.httpClient
            .get<T>(`${this.baseURL}/${url}`, options)
            .pipe(catchError((error) => this.handleError(error)));
    }

    async getAsync<T>(
        url: string,
        params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>
    ): Promise<T> {
        const options = this.options;
        if (params) {
            options.params = params;
        }
        return await this.httpClient
            .get<T>(`${this.baseURL}/${url}`, options)
            .pipe(catchError((error) => this.handleError(error))).toPromise() as Promise<T>;
    }

    getBlobFile(url: string): Observable<Blob | ArrayBuffer> {
        return this.httpClient.get<Blob>(url, this.blobFileHeaders).pipe(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            tap((res) => {
                // dowload file
            }),
            catchError((error) => this.handleError(error, url))
        );
    }

    getFile(
        url: string,
        fileName: string,
        fileExtension: string,
        params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>
    ): Observable<any> {
        const headers = this.binaryArrayHeaders;
        return this.httpClient
            .get<any>(`${this.baseURL}/${url}`, { headers, responseType: 'blob' as 'json', params }).pipe(tap(
                data => {
                    this.downLoadFile(data, 'application/ms-excel', fileName, fileExtension);
                }
            ));
    }
    //#endregion

    //#region POST Methods
    post<T>(
        url: string,
        data: any,
        isCatchError = true,
        params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>
    ): Observable<T> {
        const options = this.options;
        if (params) {
            options.params = params;
        }
        return this.httpClient
            .post<T>(`${this.baseURL}/${url}`, data, options)
            .pipe(catchError(isCatchError ? this.handleError : (error) => throwError(error)));
    }

    async postAsync<T>(
        url: string,
        data: any,
        isCatchError = true,
        params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>
    ): Promise<T> {
        const options = this.options;
        if (params) {
            options.params = params;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.httpClient
            .post<T>(`${this.baseURL}/${url}`, data, this.options)
            .pipe(catchError(isCatchError ? this.handleError : (error) => throwError(error))).toPromise();
    }

    postFile<T>(url: string, data: any): Observable<T> {
        const configuration = this.initialDataOption(data);
        const formData = configuration.key;
        const httpOptions = configuration.value;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.httpClient
            .post<T>(`${this.baseURL}/${url}`, formData, httpOptions as any)
            .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
    }
    //#endregion

    //#region PUT Methods
    put<T>(url: string, data: any): Observable<T> {
        return this.httpClient
            .put<T>(`${this.baseURL}/${url}`, data, this.options)
            .pipe(catchError(this.handleError));
    }

    putFile<T>(url: string, data: any): Observable<T> {
        const configuration = this.initialDataOption(data);
        const formData = configuration.key as any;
        const httpOptions = configuration.value;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.httpClient
            .put<T>(`${this.baseURL}/${url}`, formData, httpOptions as any)
            .pipe(catchError(this.handleError));
    }
    //#endregion

    //#region DELETE Methods
    delete<T>(
        url: string,
        params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>
    ): Observable<T> {
        const options = this.options;
        if (params) {
            options.params = params;
        }
        return this.httpClient
            .delete<T>(`${this.baseURL}/${url}`, this.options)
            .pipe(catchError(this.handleError));
    }
    //#endregion

    //#region File and FormData
    downLoadFile(data: BlobPart, type: string, fileName: string, fileExtension: string) {
        const blob = new Blob([data], { type });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName + '.' + fileExtension;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    downloadBlobFile(data: BlobPart, fileName: string) {
        const blob = new Blob([data]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    downloadAttachment(file: AttachmentModel): Promise<any> {
        return fetch(file.url as string, {
            headers: new Headers({
                Origin: location.origin
            }),
            method: 'get',
            mode: 'cors'
        })
            .then(response => response ? response.blob() : Promise.reject())
            .catch(() => {
                AppNotify.error('Failed to download file. Please try again later.');
                return Promise.reject(new Error('Failed to download file. Please try again later.'));
            })
            .then(blob => {
                const blobUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = file.name as string;
                link.href = blobUrl;
                document.body.appendChild(link);
                link.click();
                link.remove();
            });
    }

    getBlobThumbnail(url: string): Observable<Blob> {
        return from(fetch(url, {
            headers: new Headers({
                Origin: location.origin
            }),
            method: 'get',
            mode: 'cors'
        }).then(response => response.blob()));
    }

    private initialDataOption(data: any) {
        const formData: FormData = new FormData();
        this.addDataToFormData({ formData, data });
        //
        // Important note: Don't add 'Content-Type' in request header.
        const httpOptions = {
            headers: new HttpHeaders({
                'app-key': environment.appKey,
                Accept: 'application/json',
                Authorization: this.headerAuthorizationKey
            }),
        };

        const result = new ListItemModel();
        result.key = formData;
        result.value = httpOptions;

        return result;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    private addDataToFormData(params: {
        formData: FormData, data: any, name?: string
    }) {
        for (const property in params.data) {
            if (Object.prototype.hasOwnProperty.call(params.data, property)) {
                let formName = params.name ? `${params.name}[${property}]` : property;
                if (params.data[property] instanceof File) {
                    // Add a file name to mark this field is File field
                    formName = params.name ? `${name}` : property;
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    formData.append(formName, data[property], data[property].name ? data[property].name : null);
                } else if (typeof params.data[property] === 'object') {
                    this.addDataToFormData({
                        formData: params.formData,
                        data: params.data[property],
                        name: formName,
                    });
                } else {
                    params.formData.append(formName, params.data[property]);
                }
            }
        }
    }
    //#endregion


        //#region Helper
    private handleError = (error: HttpErrorResponse) => {
        let messageError = '';
        let errorCode: ApiErrorCode;
        //
        switch (error.status) {
            case 401:
                UserStorage.removeLocalStorage();
                UserStorage.removeSessionStorage();
                //
                errorCode = ApiErrorCode.Warning;
                messageError = this.WARNING_YOUR_SESSION_HAS_EXPIRED;
                //
                if (window.location.hostname !== 'localhost') {
                    window.location.href = window.location.origin + '/login';
                }
                break;
            case 403:
                errorCode = error?.error?.errorCode;
                messageError = this.ERROR_SOMETHING_BAD_HAPPENED;
                // Navigate to forbidden page
                if (window.location.hostname !== 'localhost') {
                    window.location.href = window.location.origin + '/forbidden';
                }
                break;
            case 417:
                return throwError(error.error.message);
            default:
                errorCode = error?.error?.errorCode;
                messageError = !!error.error && !!error.error.message ? error.error.message : this.SERVER_ERROR;
                break;
        }

        switch (errorCode) {
            case ApiErrorCode.Error:
                if (error.error instanceof ErrorEvent) {
                    // A client-side or network error occurred. Handle it accordingly.
                    console.error('An error occurred:', error.error.message);
                } else {
                    // The backend returned an unsuccessful response code.
                    // The response body may contain clues as to what went wrong,
                    console.error(
                        `Backend returned code ${error.status}, ` +
                        `body was: ${JSON.stringify(error.error)}`);
                }

                AppNotify.error(messageError);
                break;
            case ApiErrorCode.Warning:
                AppNotify.warning(messageError);
                break;
            case ApiErrorCode.Info:
                AppNotify.info(error.error.message as string);
                break;
            default:
                AppNotify.error(messageError);
        }

        // return an observable with a user-facing error message
        return throwError(messageError);
    };

    public httpRequestHandleError(err: HttpErrorResponse) {
        AppNotify.error('An error has occurred: ' + err.message);

        return throwError(err.error);
    }
    //#endregion

    navigateToForbidden() {
        this.router.navigate([AppUrls.Forbidden]);
    }

    navigateToLogin(callbackUrl = false) {
        let pathname: string | null = window.location.pathname;
        if (pathname === '/' || pathname === '/login') {
            pathname = null;
        }
        //
        //
        if (pathname && callbackUrl === true) {
            // window.location.href = `${AppUrls.Login}?callback=${callback}`;
            this.router.navigate([`/${AppUrls.Login}`], {
                queryParams: { callback: encodeURIComponent(window.location.href) }
            });
        } else {
            // window.location.href = `${AppUrls.Login}`;
            this.router.navigate([`/${AppUrls.Login}`]);
        }
    }
}
