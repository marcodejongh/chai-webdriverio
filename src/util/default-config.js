export default function configWithDefaults(config) {
    var defaultConfig = {defaultWait: 0};
    return Object.assign({}, defaultConfig, config);
}
