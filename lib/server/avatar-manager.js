Accounts.onCreateUser(function(options, user) {
  
  if ( options.profile ) {
    user.profile = options.profile;
  }

  var serviceName = AvatarManager.getUserService(user);
  
  if (serviceName){
    user.profile.image = AvatarManager.getUrlFromService(serviceName);
  } else {
    user.profile.image = Avatar.options.defaultImageUrl || AvatarManager.avatarBase64;
  }
  return user;
});