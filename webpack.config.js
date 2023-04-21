const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore.setOutputPath('public/build/')
    .setPublicPath('/build')

    .addEntry('app', './assets/js/index.js')
    .addStyleEntry('styles', './assets/scss/styles.scss')
    .splitEntryChunks()
    .enableSingleRuntimeChunk()

    .copyFiles({
        from: './assets/img',
        to: 'img/[path][name].[hash:8].[ext]]',
    })

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

    .enableSassLoader()
    .enableReactPreset()

    .enableIntegrityHashes(Encore.isProduction());

module.exports = Encore.getWebpackConfig();
