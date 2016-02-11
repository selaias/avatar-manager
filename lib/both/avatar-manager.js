Avatar.setOptions({
  customImageProperty: function() {
    var user = this;
    return user.profile.image;
  }
});

AvatarManager = {};

// Disable logging
AvatarManager.isLoggingEnabled = false;

function _getUrlFromService( service ) {
  check( service, String );
  if ( !Meteor.user() ) {
    return;
  }
  var url,
      defaultUrl,
      user = Meteor.user();
      
  if ( service === 'twitter' ) {
    // use larger image (200x200 is smallest custom option)
    url = user.services.twitter.profile_image_url_https.replace('_normal.', '_200x200.');
  }
  else if ( service === 'facebook' ) {
    // use larger image (~200x200)
    url = 'http://graph.facebook.com/' + user.services.facebook.id + '/picture?type=large';
  }
  else if ( service === 'google' ) {
    url = user.services.google.picture;
  }
  else if ( service === 'github' ) {
    url = 'https://avatars.githubusercontent.com/' + user.services.github.username + '?s=200';
  }
  else if ( service === 'instagram' ) {
    url = user.services.instagram.profile_picture;
  }
  else if ( service === 'linkedin' ) {
    url = user.services.linkedin.pictureUrl;
  }
  else if ( service === 'runkeeper' ) {
    url = user.services.runkeeper.small_picture;
  }
  else if ( service === 'mapMyFitness' ) {
    url = user.profile.small_picture;
  }
  else if ( service === 'strava' ) {
    url = user.services.strava.profile_medium;
  }
  else if ( service === 'fitbit' ) {
    url = user.services.fitbit.avatar;
  }
  else if ( service === 'default' ) {
    url = Avatar.options.defaultImageUrl || AvatarManager.getDefaultAvatar;
  }
  else if ( service === 'current' ) {
    url = user.profile.image;
  }
  else if (service === 'gravatar') {
    defaultUrl = Avatar.options.defaultImageUrl || '/packages/utilities_avatar/default.png';
    // If it's a relative path (no '//' anywhere), complete the URL
    if (defaultUrl.indexOf('//') === -1) {
      // Strip starting slash if it exists
      if (defaultUrl.charAt(0) === '/') defaultUrl = defaultUrl.slice(1);
      // Then add the relative path to the server's base URL
      defaultUrl = Meteor.absoluteUrl() + defaultUrl;
    }
    url = getGravatarUrl(user, defaultUrl);
  }
  AvatarManager.log('Function getUrlFromService: Service /  Url - ', service, url);
  return url;
}

function _getUserService( user ) {
  check( user, Object );
  var service ;
  if ( user && user.services && user.services.twitter ) {
    service = 'twitter';
  }
  else if ( user && user.services && user.services.facebook ) {
    service = 'facebook';
  }
  else if ( user && user.services && user.services.google ) {
    service = 'google';
  }
  else if ( user && user.services && user.services.github ) {
    service = 'github';
  }
  else if ( user && user.services && user.services.instagram ) {
    service = 'instagram';
  }
  else if ( user && user.services && user.services.runkeeper ) {
    service = 'runkeeper';
  }
  else if ( user && user.services && user.services.mapMyFitness ) {
    service = 'mapMyFitness';
  }
  else if ( user && user.services && user.services.strava ) {
    service = 'strava';
  }
  else if ( user && user.services && user.services.linkedin ) {
    service = 'linkedin';
  }
  else if ( user && user.services && user.services.fitbit ) {
    service = 'fitbit';
  }
  else if ( user && user.services && user.services.underArmour ) {
    service = 'underArmour';
  }
  AvatarManager.log('Function getUserService ServiceName - ', service);
  return service;
}

function getGravatarUrl(user, defaultUrl) {
  var gravatarDefault;
  var validGravatars = ['404', 'mm', 'identicon', 'monsterid', 'wavatar', 'retro', 'blank'];

  // Initials are shown when Gravatar returns 404.
  if ( Avatar.options.fallbackType !== 'initials' ) {
    var valid = _.contains( validGravatars, Avatar.options.gravatarDefault );
    gravatarDefault = valid ? Avatar.options.gravatarDefault : defaultUrl;
  }
  else {
    gravatarDefault = '404';
  }

  var options = {
    // NOTE: Gravatar's default option requires a publicly accessible URL,
    // so it won't work when your app is running on localhost and you're
    // using an image with either the standard default image URL or a custom
    // defaultImageUrl that is a relative path (e.g. 'images/defaultAvatar.png').
    default: gravatarDefault,
    size: 200, // use 200x200 like twitter and facebook above (might be useful later)
    secure: true
  };

  var emailOrHash = getEmailOrHash( user );
  AvatarManager.log('Function getGravatarUrl: emailOrHash /  options - ', emailOrHash, options);
  return Gravatar.imageUrl( emailOrHash, options );
}

// Get the user's email address or (if the emailHashProperty is defined) hash
function getEmailOrHash( user ) {
  var emailOrHash;
  if ( user && Avatar.options.emailHashProperty && user[Avatar.options.emailHashProperty] ) {
    emailOrHash = user[Avatar.options.emailHashProperty];
  }
  else if ( user && user.emails ) {
    emailOrHash = user.emails[0].address; // TODO: try all emails
  }
  else {
    // If all else fails, return 32 zeros (trash hash, hehe) so that Gravatar
    // has something to build a URL with at least.
    emailOrHash = '00000000000000000000000000000000';
  }
  return emailOrHash;
}


function _log( /* arguments */ ) {

  if (AvatarManager.isLoggingEnabled) {
    console.log.apply(console, arguments);
  }
}

var avatarServices = ['twitter', 'facebook', 'google', 'instagram', 'github', 'linkedin'];

function _getAvailableServices() {
  return avatarServices;
}

function _setAvailableServices(services, union = true) {
  check( services, Match.Optional([String]) );
  check( union, Match.Optional(Boolean));
  if ( union ) {
  avatarServices = _.union(avatarServices, services);
  } else {
    avatarServices = services;
  }
}

function _setUserAvatar(user) {
  check(user, Object);

  let userProfile = {};
  
  if (user.profile) {
    userProfile = user.profile;
  }
  
  let serviceName = AvatarManager.getUserService(user);
  
  if (serviceName){
    userProfile.image = AvatarManager.getUrlFromService(serviceName);
  } else {
    userProfile.image = Avatar.options.defaultImageUrl || AvatarManager.getDefaultAvatar;
  }
  
  Meteor.users.update({_id: user._id}, {$set: {profile: userProfile}});
}

AvatarManager.log = _log;
AvatarManager.getAvailableServices = _getAvailableServices;
AvatarManager.setAvailableServices = _setAvailableServices;
AvatarManager.getUrlFromService = _getUrlFromService;
AvatarManager.getUserService  = _getUserService;
AvatarManager.setUserAvatar = _setUserAvatar;
AvatarManager.getDefaultAvatar = "data:image/jpeg;base64,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";
