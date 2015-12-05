Package.describe({
  name: 'selaias:avatar-manager',
  version: '0.3.1',
  summary: 'Manage your avatar. Upload an imag or select one from the available list (linked accounts).',
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
    'utilities:avatar@0.9.2', 
    'selaias:avatar-upload@1.3.0', 
    'twbs:bootstrap@3.3.6'], 'client');
  
  api.imply(['jparker:gravatar@0.3.1', 'utilities:avatar@0.9.2'], both);
    
  api.addFiles('lib/both/avatar-manager.js', both);
  
  api.addFiles('lib/client/helpers.js', 'client');
  api.addFiles('lib/client/avatar-manager-template.html', 'client');
  api.addFiles('lib/client/avatar-manager-template.js', 'client');
  
  api.addFiles('lib/server/avatar-manager.js', 'server');
  
  api.export('AvatarManager', both);
});