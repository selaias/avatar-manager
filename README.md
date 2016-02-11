avatar-manager
----------------
Now you can manage your avatar.  When having more that one accounts linked (eg with `splendido:accounts-meld`) you might need more control of which of your accounts avatar to be displayed as your default avatar. You can upload your avatar image, or select your avatar from the available list (linked accounts).



[DEMO](http://avatarmanager.meteor.com)
------------

Installation
------------
In your Meteor project directory, run:
```shell
$ meteor add selaias:avatar-manager
```

Dependencies
------------

This package is using the following packages

```
utilities:avatar
selaias:upload-avatar
```

**Note
`selaias:upload-avatar` is forked from `particle4dev:upload-avatar`, updated to work with Meteor > @1.2.0.2.

Usage
------------
Just place the template on the user profile page.

```js
{{>avatarManager}}
```

This package utilizes the `customImageProperty` of the `utilities:avatar` package. 

You can set the default user avatar by updating the user's profile property `user.profile.image` by calling `AvatarManager.setUserAvatar(user)` 

 `client.js`
```js
Accounts.onLogin( () => {

    if (Meteor.user().profile.image) return;

    AvatarManager.setUserAvatar(Meteor.user());

});
```


The `utilities:avatar` package will only read this property, so we don't need to expose any fields from the `services` object for our users.

However, we may need to expose those fields only for the currentUser so he can manage his own avatar.

```javascript
Meteor.publish(null, function() {
  if ( !this.userId ) {
    return;
  }
  return Meteor.users.find({_id: this.userId}, { 
    fields: {
      "profile": 1,
      "emailHash": 1,
      "services.twitter.profile_image_url_https": 1,
      "services.twitter.profile_image_url": 1,
      "services.facebook.id": 1,
      "services.google.picture": 1,
      "services.github.username": 1,
      "services.instagram.profile_picture": 1,
      "services.linkedin.pictureUrl": 1,
      "services.strava.profile_medium": 1,
      "services.runkeeper.small_picture": 1,
    } 
  });
});
```

The package will look through those services `['twitter', 'facebook', 'google', 'instagram', 'github', 'linkedin']` and will display the respective avatar to choose from.

You can extend this list by calling `AvatarManager.setAvailableServices()`, passing an array of services `['strava', runkeeper']` and an optional boolean parameter if you want to join those arrays or override the defaults with your list. 

You can also enable simple logging messages by `AvatarManager.isLoggingEnabled = true` on startup.

To avoid any issues, you should add the propery `serviceName='current'` wherever you use the default `{{>avatar}}` template: `{{>avatar serviceName='current' size="large" etc..}}`

So far this is tested with `splendido:accounts-meld` package which manages linking multiple accounts.
