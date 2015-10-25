Template.avatarManager.helpers({
  userId: function(){
    return Meteor.userId();
  },
  hasService: function(){
    return Meteor.user().services[this];
  },
  hasGravatar: function(){
    return AvatarManager.getUrlFromService('gravatar');
  },
  isDefaultAvatar: function() {
    var defaultAvatar = Avatar.options.defaultImageUrl || AvatarManager.avatarBase64;
    return Meteor.user().profile.image === defaultAvatar;
  }
});

Template.avatarManager.events({
  'click #btnAvatar': function (e) {
    e.preventDefault();
    $('#editYourAvatarModal').modal();
  },
  'click #btnDefault'(event, instance) {
    event.preventDefault();
    var service = event.currentTarget.getAttribute('data-id');
    var url = AvatarManager.getUrlFromService(service);
    if (url) {
      Meteor.users.update(Meteor.userId(), {
        $set: {
          'profile.image': url
        }
      });
    }
  },
});


// Override Avatar helper
Template.avatar.helpers({
  imageUrl: function () {
    var user = this.user ? this.user : Meteor.users.findOne(this.userId);
    var url;
    if (this.serviceName) {
      url = AvatarManager.getUrlFromService(this.serviceName); 
    } else {
      url = Avatar.getUrl(user);
    }
    if (url && url.trim() !== '' && Template.instance().firstNode) {
      var img = Template.instance().find('img');
      if (img.src !== url.trim()) {
        img.style.removeProperty('display');
      }
    }
    return url;
  }
});
