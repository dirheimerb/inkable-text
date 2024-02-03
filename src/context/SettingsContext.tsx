import { createContext, useContext, useState, ReactNode } from 'react';
import { DEFAULT_SETTINGS, SettingsManager } from '../SettingManager'; // Adjust the import path as necessary
import React from 'react';
// Importing type AppSettings if it's not defined in this file
// import type { AppSettings } from '../appSettings'; // Uncomment and adjust the path if needed

// Create the context
const SettingsContext = createContext<
    | {
          settingsManager: SettingsManager;
          updateSetting: (key: string, value: boolean) => void;
          settings: { [key: string]: boolean };
      }
    | undefined
>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [settingsManager] = useState(new SettingsManager(DEFAULT_SETTINGS)); // Add DEFAULT_SETTINGS if needed
    const updateSetting = (key: string, value: boolean) => {
        settingsManager.addSetting(key, value);
        // Sync with URL parameters or perform other side effects if needed
    };

    const settings = settingsManager.getAllSettings(); // Assuming this returns an object with all settings

    return (
        <SettingsContext.Provider
            value={{ settingsManager, updateSetting, settings }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettingsManager = (): SettingsManager => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error(
            'useSettingsManager must be used within a SettingsProvider',
        );
    }
    return context.settingsManager;
};

export const useSettings = (): { [key: string]: boolean } => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context.settings;
};

export const useSetting = (key: string): boolean | unknown => {
    const settings = useSettings();
    return settings[key];
};

export const useAddSetting = (): ((key: string, value: boolean) => void) => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useAddSetting must be used within a SettingsProvider');
    }
    return context.updateSetting;
};

export const useUpdateSetting = (): ((key: string, value: boolean) => void) => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error(
            'useUpdateSetting must be used within a SettingsProvider',
        );
    }
    const copyContext = { ...context };

    return copyContext.updateSetting;
};

export const useAllSettings = () => {
    // Define the type AppSettings properly
    const context = useContext(SettingsContext);
    if (!context || !context.settingsManager) {
        throw new Error(
            'useAllSettings must be used within a SettingsProvider',
        );
    }
    const { settingsManager } = context;
    return settingsManager.getAllSettings();
};

// function setURLParam(param: string, value: boolean | null) {
//   // Function implementation
// }
