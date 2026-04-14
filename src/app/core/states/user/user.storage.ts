export const APP_STORAGE_KEYS = {
    ACCOUNT_ID: '_app_aid',
    USER_ID: '_app_uid',
    JWT_TOKEN: '_app_utk',
}

export class UserStorage {
    public static removeSessionStorage(): void {
        sessionStorage.clear();
    }

    public static removeLocalStorage(): void {
        localStorage.clear();
    }
}
