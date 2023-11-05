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
    ipc.send('save-settings', settings);
}

export function saveSetting(name, value) {
    let settings = loadSettings();
    settings[name] = value;
    saveSettings(settings);
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
            },
            {
                name: 'RotateCamera',
                type: 'boolean',
                value: () => getSetting('tracking.rotateCamera') ?? true,
                onchange: (value) => {},
                save: (value) => { saveSetting('tracking.rotateCamera', value) },
                settings: [
                    {
                        name: 'CameraSpeed',
                        type: 'number',
                        value: () => getSetting('tracking.cameraSpeed') ?? 10,
                        onchange: (value) => {},
                        save: (value) => { saveSetting('tracking.cameraSpeed', value) }
                    }
                ],
                condition: (setting) => setting.inputValue === undefined ? setting.value() : setting.inputValue
            },
            {
                name: 'TrackingType',
                type: 'select',
                options: () => [
                    { context: Lang.CreateTranslationContext('settings', 'TypeAIGuess'), value: 'ai' },
                    { context: Lang.CreateTranslationContext('settings', 'TypeIntersections'), value: 'intersection' },
                    { context: Lang.CreateTranslationContext('settings', 'TypeCombined'), value: 'combined' }
                ],
                value: () => getSetting('tracking.type') ?? 'combined',
                onchange: (value) => {},
                save: (value) => { saveSetting('tracking.type', value) }
            }
        ]
    },
    {
        name: 'Extensions',
        settings: [
            {
                name: 'ServerPort',
                type: 'number',
                value: () => getSetting('extensions.serverPort') ?? 5621,
                onchange: (value) => {},
                save: (value) => { saveSetting('extensions.serverPort', value) }
            },
            {
                name: 'ServerAddress',
                type: 'string',
                value: () => getSetting('extensions.serverAddress') ?? 'localhost',
                onchange: (value) => {},
                save: (value) => { saveSetting('extensions.serverAddress', value) }
            }
        ]
    }
];