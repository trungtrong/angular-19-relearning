import { APP_URLS } from '@app/shared/constants';

export class PageUrlHelper {
    public static isPagesThatUserIsUnauthenticated(pathName: string) {
        return pathName.startsWith(APP_URLS.LOGIN)
            || pathName.startsWith(APP_URLS.SIGNUP)
            || pathName.startsWith(APP_URLS.FORGOT_PASSWORD);
    }
}
