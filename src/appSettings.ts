// const hostName = window.location.hostname;
// export const isDevPlayground: boolean =
//   hostName !== 'localhost' &&
//   hostName !== 'inkable-text.vercel.app';
import { SettingsManager } from './SettingManager';
const PRODUCTION_HOSTNAMES = ['inkable-text.vercel.app'];
export const isDevPlayground: boolean = !PRODUCTION_HOSTNAMES.includes(
    window.location.hostname,
);

export interface AppSettings {
    [key: string]: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
    disableBeforeInput: false,
    emptyEditor: false,
    isAutocomplete: false,
    isRichText: true,
    showNestedEditorTreeView: false,
    showTableOfContents: false,
    tableCellBackgroundColor: true,
    tableCellMerge: true,
    tableCellMergeButton: true,
};

export type SettingName = keyof typeof DEFAULT_SETTINGS;

export type Settings = typeof DEFAULT_SETTINGS;

const settingsManager = new SettingsManager(DEFAULT_SETTINGS);

export function addSettingValue(key: string, value: boolean): void {
    settingsManager.updateSetting(key, value);
}

export function getSettingValue(key: keyof Settings): boolean | unknown {
    if (key === typeof String) {
        return settingsManager.getSetting(key);
    }
}
