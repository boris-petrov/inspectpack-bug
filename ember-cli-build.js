'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const { DuplicatesPlugin } = require('inspectpack/plugin');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      webpack: {
        module: {
          rules: [
            {
              test: /\.css$/i,
              use: [
                { loader: 'style-loader', options: { insert: function (element) { document.getElementsByTagName('head')[0].prepend(element); } } },
                'css-loader',
              ],
            },
            {
              test: /\.(woff|woff2|eot|ttf|svg)$/,
              use: [
                { loader: 'file-loader' },
              ],
            },
          ],
        },
        plugins: [
          new DuplicatesPlugin({
            emitError: true,
            verbose: true,
          }),
        ],
      },
    },
    // Add options here
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
