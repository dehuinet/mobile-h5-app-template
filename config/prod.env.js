'use strict';
const MxBaler = require('webpack-mx-mobile-baler-plugin');
const {common: {checknum}, build: {assetsSubDirectory}} = require('./index');
module.exports = {
    STATIC: `"${assetsSubDirectory}"`,
    CHECKNUM: JSON.stringify(checknum),
    MACRO_LOG_PRE_PROCESSOR: '"[__mx-log-macro/app/mobile-h5-app-template/pre-processor__]"',
    MACRO_LOG_TRANSFORMER: '"[__mx-log-macro/app/mobile-h5-app-template/transformer__]"',
    MACRO_LOG_POST_PROCESSOR: '"[__mx-log-macro/app/mobile-h5-app-template/post-processor__]"',
    RELEASE_VERSION: JSON.stringify(`mobile-h5-app-template_${checknum.git.tagName}_${checknum.git.branchName}@${MxBaler.ARGS_SHORTCUT.versionName}`)
};
