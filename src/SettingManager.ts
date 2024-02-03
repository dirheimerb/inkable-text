// Assuming the structure of a setting is key-value pair
export interface Setting {
    [key: string]: boolean;
}

// Default settings, assuming it's a constant with predefined values
export const DEFAULT_SETTINGS: Setting = {
    isAutocomplete: true, // Just examples, set these to whatever the defaults should be
    isRichText: false,
    // ... other default settings
};

class SettingsManager {
    private settings: Setting;

    constructor(initialSettings: Setting) {
        this.settings = initialSettings;

        // Bind methods
        this.initLocalState = this.initLocalState.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.init = this.init.bind(this);
    }

    initLocalState(): void {
        // Initialize settings from local storage
        document.addEventListener('DOMContentLoaded', () => {
            const localSettings = localStorage.getItem('settings');
            if (localSettings) {
                this.settings = JSON.parse(localSettings);
            }
        });
    }

    public saveSettings(): void {
        // Save settings to local storage
        localStorage.setItem('settings', JSON.stringify(this.settings));
    }

    init(): SettingsManager {
        new SettingsManager(DEFAULT_SETTINGS).initLocalState();
        return this;
    }

    public updateSetting(key: string, value: boolean): void {
        this.settings[key] = value;
    }

    public getSetting(key: string): boolean {
        return this.settings[key];
    }

    getAllSettings(): Setting {
        return this.settings;
    }

    addSetting(key: string, value: boolean): void {
        this.settings[key] = value;
    }
}

const settingsManager = new SettingsManager(DEFAULT_SETTINGS);

function addSettingValue(key: string, value: boolean): void {
    settingsManager.updateSetting(key, value);
}

// Function to update settings as per the requirements
export function updateSettings(): void {
    addSettingValue('isAutocomplete', false);
    addSettingValue('isRichText', true);
    addSettingValue('showTableOfContents', false);
    addSettingValue('tableCellBackgroundColor', true);
    addSettingValue('tableCellMerge', true);
    addSettingValue('tableCellMergeButton', true);
    addSettingValue('disableBeforeInput', false);
    addSettingValue('emptyEditor', false);
    addSettingValue('showNestedEditorTreeView', false);
}

// Optional: Export SettingsManager if it needs to be used elsewhere
export { SettingsManager };
