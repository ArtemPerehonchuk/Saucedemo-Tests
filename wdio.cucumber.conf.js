export const config = {
    runner: 'local',
    specs: [
        './test/features/**/*.feature'
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [],
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./test/features/step-definitions/**/*.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        colors: true,
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
    reporters: ['spec'],
    before: function (capabilities, specs) {
    }
}