export class AppStorage {
    public static storeEncodeData(params: {
        storage: 'local' | 'session' | 'local-and-session';
        key: string;
        value: unknown;
        valueType?: 'string' | 'number' | 'object' | 'array';
    }) {
        if (!params.key) {
            return;
        }
        //
        if (!params.storage) {
            params.storage = 'local';
        }
        //
        if (!params.valueType) {
            params.valueType = 'string';
        }
        //
        let valueString: string | number | boolean;
        //
        switch (params.valueType) {
            case 'object':
            case 'array':
                valueString = JSON.stringify(params.value);
                break;
            case 'number':
            case 'string':
            default:
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                valueString = params.value;
                break;
        }
        //
        switch (params.storage) {
            case 'session':
                sessionStorage.setItem(params.key, btoa(encodeURIComponent(valueString)));
                break;
            case 'local-and-session':
                sessionStorage.setItem(params.key, btoa(encodeURIComponent(valueString)));
                localStorage.setItem(params.key, btoa(encodeURIComponent(valueString)));
                break;
            case 'local':
            default:
                localStorage.setItem(params.key, btoa(encodeURIComponent(valueString)));
                break;
        }
    }

    public static getStorageValue(params: {
        storage: 'local' | 'session';
        key: string;
        valueType?: 'string' | 'number' | 'object' | 'array';
        isDecode?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }): any {
        if (!params) {
            return null;
        }
        //
        try {
            if (!params.storage) {
                params.storage = 'local';
            }
            //
            if (!params.valueType) {
                params.valueType = 'string';
            }
            //
            let valueString: string = params.storage === 'local'
                ? localStorage.getItem(params.key) as string
                : sessionStorage.getItem(params.key) as string;
            //
            if (params.isDecode) {
                valueString = valueString ? decodeURIComponent(atob(valueString)) : '';
            }
            let value: unknown;
            //
            switch (params.valueType) {
                case 'number':
                    value = JSON.parse(valueString);
                    return typeof value === 'number' ? value : null;
                case 'object':
                    value = JSON.parse(valueString);
                    return typeof value === 'object' ? value : {};
                case 'array':
                    value = JSON.parse(valueString);
                    return Array.isArray(value) ? value : [];
                case 'string':
                default:
                    return typeof valueString === 'string' ? valueString : '';
            }
        } catch {
            switch (params.valueType) {
                case 'number':
                    return null;
                case 'object':
                    return {};
                case 'array':
                    return [];
                case 'string':
                default:
                    return '';
            }
        }
    }
}
