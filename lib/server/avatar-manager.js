Accounts.onCreateUser(function(options, user) {
  
  if ( options.profile ) {
    user.profile = options.profile;
  }

  var serviceName = AvatarManager.getUserService(user);
  
  if (serviceName){
    user.profile.avatar = AvatarManager.getUrlFromService(serviceName);
  } else {
    user.profile.avatar = Avatar.options.defaultImageUrl || AvatarManager.avatarBase64;
  }
  return user;
});