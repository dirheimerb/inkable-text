// import {CAN_USE_DOM} from './canUseDOM';

// declare global {
//   interface Document {
//     documentMode?: unknown;
//   }

//   interface Window {
//     MSStream?: unknown;
//   }
// }

// const documentMode =
//   CAN_USE_DOM && 'documentMode' in document ? document.documentMode : null;

// export const IS_APPLE: boolean =
//   CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

// export const IS_FIREFOX: boolean =
//   CAN_USE_DOM && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent);

// export const CAN_USE_BEFORE_INPUT: boolean =
//   CAN_USE_DOM && 'InputEvent' in window && !documentMode
//     ? 'getTargetRanges' in new window.InputEvent('input')
//     : false;

// export const IS_SAFARI: boolean =
//   CAN_USE_DOM && /Version\/[\d.]+.*Safari/.test(navigator.userAgent);

// export const IS_IOS: boolean =
//   CAN_USE_DOM &&
//   /iPad|iPhone|iPod/.test(navigator.userAgent) &&
//   !window.MSStream;

// export const IS_ANDROID: boolean =
//   CAN_USE_DOM && /Android/.test(navigator.userAgent);

// // Keep these in case we need to use them in the future.
// // export const IS_WINDOWS: boolean = CAN_USE_DOM && /Win/.test(navigator.platform);
// export const IS_CHROME: boolean =
//   CAN_USE_DOM && /^(?=.*Chrome).*/i.test(navigator.userAgent);
// // export const canUseTextInputEvent: boolean = CAN_USE_DOM && 'TextEvent' in window && !documentMode;

// export const IS_APPLE_WEBKIT =
//   CAN_USE_DOM && /AppleWebKit\/[\d.]+/.test(navigator.userAgent) && !IS_CHROME;

import { CAN_USE_DOM } from './canUseDOM';

declare global {
    interface Document {
        documentMode?: unknown;
    }

    interface Window {
        MSStream?: unknown;
    }
}

const userAgent = CAN_USE_DOM ? navigator.userAgent : '';
const platform = CAN_USE_DOM ? navigator.platform : '';

const documentMode =
    CAN_USE_DOM && 'documentMode' in document ? document.documentMode : null;

const regexAppleDevice = /Mac|iPod|iPhone|iPad/;
const regexFirefox = /^(?!.*Seamonkey)(?=.*Firefox).*/i;
const regexSafari = /Version\/[\d.]+.*Safari/;
const regexIOS = /iPad|iPhone|iPod/;
const regexAndroid = /Android/;
const regexChrome = /^(?=.*Chrome).*/i;
const regexAppleWebkit = /AppleWebKit\/[\d.]+/;

export const IS_APPLE: boolean = regexAppleDevice.test(platform);
export const IS_FIREFOX: boolean = regexFirefox.test(userAgent);
export const IS_SAFARI: boolean = regexSafari.test(userAgent);
export const IS_IOS: boolean = regexIOS.test(userAgent) && !window.MSStream;
export const IS_ANDROID: boolean = regexAndroid.test(userAgent);
export const IS_CHROME: boolean = regexChrome.test(userAgent);
export const IS_APPLE_WEBKIT: boolean =
    regexAppleWebkit.test(userAgent) && !IS_CHROME;

export const CAN_USE_BEFORE_INPUT: boolean =
    CAN_USE_DOM && 'InputEvent' in window && !documentMode
        ? 'getTargetRanges' in new window.InputEvent('input')
        : false;

// Keep these in case we need to use them in the future.
// export const IS_WINDOWS: boolean = /Win/.test(platform);
// export const canUseTextInputEvent: boolean = 'TextEvent' in window && !documentMode;
