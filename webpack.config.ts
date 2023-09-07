import * as path from 'path';
import * as webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import 'webpack-dev-server';

const config: webpack.Configuration = {
  'target':           'node',
  'externalsPresets': { 'node': true },
  'externals':        [nodeExternals()],
  'entry':            { 'index': './src/index.js' },
  'output':           {
    'path':          path.resolve(__dirname, 'dist'),
    'filename':      '[name].bundle.js',
    'libraryTarget': 'commonjs2',
    'clean':         true
  },
  'module': {
    'rules': [{
      'test': /\.js$/,
      'use':  {
        'loader':  'babel-loader',
        'options': {
          'presets': [
            ['env', { 'targets': { 'node': 'current' } }]
          ]
        }
      }
    }]
  }
};

export default [config];