Package.describe({
  name: 'selaias:avatar-manager',
  version: '0.2.1',
  summary: 'Manage your own avatar. Upload an image to use as your avatar or select one from the available list (linked accounts).',
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
    'utilities:avatar', 
    'selaias:avatar-upload', 
    'twbs:bootstrap'], both);
  
  api.imply(['jparker:gravatar@0.3.1', 'utilities:avatar'], both);
    
  api.addFiles('lib/both/avatar-manager.js', both);
  
  api.addFiles('lib/client/helpers.js', 'client');
  api.addFiles('lib/client/avatar-manager-template.html', 'client');
  api.addFiles('lib/client/avatar-manager-template.js', 'client');
  
  api.addFiles('lib/server/avatar-manager.js', 'server');
  
  api.export('AvatarManager', both);
});