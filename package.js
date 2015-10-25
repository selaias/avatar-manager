Package.describe({
  name: 'selaias:avatar-manager',
  version: '0.0.1',
  summary: 'Manage your own avatar. Select your avatar from the available list (linked accounts).',
  git: 'https://github.com/selaias/avatar-manager.git',
  documentation: 'README.md'
});

var both = ['client', 'server'];

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use(['underscore', 'accounts-base', 'accounts-password'], both);
  
  api.use(['templating'], 'client');
  
  api.use([
    'ecmascript', 
    'check',
    'underscore',
    'selaias:avatar', 
    'selaias:upload-avatar', 
    'twbs:bootstrap'], both);
  
  api.imply(['jparker:gravatar@0.3.1', 'selaias:avatar'], both);
    
  api.addFiles('lib/both/avatar-manager.js', both);
  
  api.addFiles('lib/client/helpers.js', 'client');
  api.addFiles('lib/client/avatar-manager-template.html', 'client');
  api.addFiles('lib/client/avatar-manager-template.js', 'client');
  
  api.addFiles('lib/server/avatar-manager.js', 'server');
});