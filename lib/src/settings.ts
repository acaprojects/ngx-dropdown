/*
 * @Author: Alex Sorafumo
 * @Email:  alex@yuion.net
 */

declare global {
    interface Window {
        debug: boolean;
    }
}

const LIB_NAME = 'DROPDOWN';

export class LIBRARY_SETTINGS {
    public static readonly type = 'Dropdown';

    public static log(type: string, msg: string, args?: any, out: string = 'debug', color?: string) {
        if (window.debug) {
            const clr = color ? color : '#009688';
            const COLOURS = ['color: #0288D1', `color:${clr}`, 'color:rgba(0,0,0,0.87)'];
            if (args) {
                if (LIBRARY_SETTINGS.hasColours()) {
                    console[out](`%c[${LIB_NAME}]%c[${type}] %c${msg}`, ...COLOURS, args);
                } else {
                    console[out](`[${LIB_NAME}][${type}] ${msg}`, args);
                }
            } else {
                if (LIBRARY_SETTINGS.hasColours()) {
                    console[out](`%c[${LIB_NAME}]%c[${type}] %c${msg}`, ...COLOURS);
                } else {
                    console[out](`[${LIB_NAME}][${type}] ${msg}`);
                }
            }
        }
    }

    public static error(type: string, msg: string, args?: any) {
        LIBRARY_SETTINGS.log(type, msg, args, 'error');
    }

    public static version(version: string, build: string, out: any = 'debug') {
        const COLOURS = ['color: #f44336', `color: #9c27b0`, 'color:rgba(0,0,0,0.87)'];
        if (LIBRARY_SETTINGS.hasColours()) {
            console[out](`%c[ACA]%c[LIB] %c${LIBRARY_SETTINGS.type} - ${version} | ${build}`, ...COLOURS);
        } else {
            console[out](`[ACA][LIB] ${LIBRARY_SETTINGS.type} - ${version} | ${build}`);
        }
    }

    private static hasColours() {
        const doc = document as any;
        return !(doc.documentMode || /Edge/.test(navigator.userAgent));
    }

    constructor() {
        throw new Error('This class is static');
    }
}
