#!/usr/bin/env node
/* eslint no-console:0 */
require('babel-register');

const argv = require('yargs')
  .usage('Usage: $0 --dist [dist dir] --asset [asset dir]')
  .demand(['dist'])
  .demand(['asset'])
  .argv;

const path = require('path');
const fs = require('fs');
const server = require('../src/server');

fs.writeFileSync(path.join(argv.asset, 'component.css'), server.getComponentCss());

['/', '/2.html', '/3.html'].forEach(url => {
  server.renderApp(url).then(html => {
    const filename = url.slice(1) || 'index.html';
    const target = path.join(argv.dist, filename);
    fs.writeFileSync(target, html);
  }).catch(e => console.error(e.stack || e));
});
