// @ts-check

const envalid = require('envalid');
const path = require('path');
const dotenv = require('dotenv');

const { webpackConfiguration } = require('@umbrellait/webpack-react');

dotenv.config();

envalid.cleanEnv(process.env, {
  REACT_APP_API_URL: envalid.str(),
  REACT_APP_HOT_LOADER_ENABLED: envalid.bool({
    default: false,
  }),
  PORT: envalid.port(),
  NODE_ENV: envalid.str({
    default: 'development',
    choices: ['development', 'production'],
  }),
  WEBPACK_BUNDLE_ANALYZER: envalid.str({
    choices: ['true', 'false'],
    default: 'false',
  }),
});

const dev = process.env.NODE_ENV === 'development';
const prod = process.env.NODE_ENV === 'production';
const hot = dev && !prod && process.env.REACT_APP_HOT_LOADER_ENABLED === 'true';

const rootPath = __dirname;
const packageJsonPath = path.join(rootPath, 'package.json');
const buildPath = path.join(rootPath, 'build');
const srcPath = path.join(rootPath, 'src');
const assetsPath = path.join(srcPath, 'assets');
const htmlTemplatePath = path.join(assetsPath, 'index.html');
const faviconPath = path.join(assetsPath, 'favicon.ico');
const indexPath = path.join(srcPath, 'index.ts');

module.exports = webpackConfiguration({
  src: srcPath,
  entries: {
    bundle: indexPath,
  },
  injectPolyfills: true,
  simpleFileName: false,
  build: buildPath,
  htmlTemplate: htmlTemplatePath,
  favicon: faviconPath,
  devServer: {
    port: process.env.PORT,
    sockPort: process.env.PORT,
    hot,
  },
  chunks: true,
  extractCSS: false,
  packageJson: packageJsonPath,
  asModule: false,
  cleanOnRebuild: true,
});
