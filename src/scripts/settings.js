import Lang from '@/scripts/Lang';

export function loadSettings() {
    let settings = {};
    let settingsStr = localStorage.getItem('settings');
    if (settingsStr) {
        settings = JSON.parse(settingsStr);
    }
    return settings;
}

export function saveSettings(settings) {
    localStorage.setItem('settings', JSON.stringify(settings));
}

export function saveSetting(name, value) {
    let settings = loadSettings();
    settings[name] = value;
    saveSettings(settings);
}

export function resetSettings() {
    localStorage.setItem('settings', '{}');
}

export function getSetting(name) {
    let settings = loadSettings();
    return settings[name];
}

export const settings = [
    {
        name: 'Common',
        settings: [
            {
                name: 'Language',
                type: 'select',
                options: () => Lang.getLanguages(),
                value: () => Lang.getLanguage(),
                onchange: (value) => {
                    Lang.setLanguage(value);
                },
                save: (value) => {}
            },{
                name: 'ShutdownOnClose',
                type: 'boolean',
                value: () => getSetting('common.shutdownOnClose') ?? false,
                onchange: (value) => {  },
                save: (value) => { saveSetting('common.shutdownOnClose', value) }
            }
        ]
    },
    {
        name: 'Tracking',
        settings: [
            {
                name: 'Framerate',
                type: 'number',
                value: () => getSetting('tracking.framerate') ?? 30,
                onchange: (value) => {},
                save: (value) => { saveSetting('tracking.framerate', value) }
            },
            {
                name: 'Smooth',
                type: 'boolean',
                value: () => getSetting('tracking.smooth') ?? true,
                onchange: (value) => {},
                save: (value) => { saveSetting('tracking.smooth', value) }
            }
        ]
    },
    {
        name: 'Scene',
        settings: [
            {
                name: 'RotateCamera',
                type: 'boolean',
                value: () => getSetting('scene.rotateCamera') ?? true,
                onchange: (value) => {},
                save: (value) => { saveSetting('scene.rotateCamera', value) },
                settings: [
                    {
                        name: 'CameraSpeed',
                        type: 'number',
                        value: () => getSetting('scene.cameraSpeed') ?? 10,
                        onchange: (value) => {},
                        save: (value) => { saveSetting('scene.cameraSpeed', value) }
                    }
                ],
                condition: (setting) => setting.inputValue === undefined ? setting.value() : setting.inputValue
            }
        ]
    },
    {
        name: 'Listeners',
        settings: [
            {
                name: 'ServerPort',
                type: 'number',
                value: () => getSetting('listeners.serverPort') ?? 5621,
                onchange: (value) => {},
                save: (value) => { saveSetting('listeners.serverPort', value) }
            },
            {
                name: 'ServerAddress',
                type: 'string',
                value: () => getSetting('listeners.serverAddress') ?? 'localhost',
                onchange: (value) => {},
                save: (value) => { saveSetting('listeners.serverAddress', value) }
            }
        ]
    },
    {
        name: 'Advanced',
        settings: [
            {
                name: 'EnginePath',
                type: 'file',
                accept: '.dll,.so,.dylib',
                value: () => getSetting('advanced.enginePath') ?? "",
                onchange: (value) => {},
                save: async (value) => {
                    saveSetting('advanced.enginePath', value);
                    const success = await ipc.invoke("change-engine-path", value);
                    // TODO : handle error with notification
                    // (create a notification system [state:loading/success/error/warning, title+icon+desc, notificationId for content updates, etc...])
                }
            }
        ]
    }
];
