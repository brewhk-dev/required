Package.describe({
  name: 'brewhk:required',
  version: '0.1.0',
  summary: 'Checks and highlight required fields which are not completed',
  git: 'https://github.com/brewhk/required.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('stevezhu:lodash@3.10.1');
  api.use(['templating'], 'client');
  api.addFiles('required.js', 'client');
  api.export('Required', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('brewhk:required');
  api.addFiles('required-tests.js');
});