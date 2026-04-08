/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import notify from 'devextreme/ui/notify';
import {confirm} from 'devextreme/ui/dialog';

export class AppNotify {
    // eslint-disable-next-line
    static info(message: string) {
        notify(message, 'info', 5000);
    }

    static warning(message: string) {
        notify(message, 'warning', 5000);
    }

    static error(message: string = '') {
        if (!message) {
            message = ERROR;
        }
        notify(message, 'error', 5000);
    }

    static success(message: string) {
        notify(message, 'success', 5000);
    }

    static confirm(message: string, title: string): Promise<boolean> {
        return Promise.resolve(true);
        return confirm(message, title);
    }
}

export const ERROR = 'Something Bad Happened';
