import { AppStorage, StringHelper } from '@app/utilities'

export const APP_STORAGE_KEYS = {
    ACCOUNT_ID: '_app_aid',
    USER_ID: '_app_uid',
    USER_JWT: '_app_utk',
}

export class UserStorage {
    public static isUserLoggedIn() {
        const jwt = AppStorage.getStorageValue({
            storage: 'local',
            key: APP_STORAGE_KEYS.USER_JWT
        })
        return !StringHelper.isValueEmpty(jwt);
    }
}
