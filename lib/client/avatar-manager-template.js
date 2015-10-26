Template.avatarManager.helpers({
  userId: function(){
    return Meteor.userId();
  },
  hasService: function(){
    return Meteor.user.services && Meteor.user().services[this];
  },
  hasGravatar: function(){
    return AvatarManager.getUrlFromService('gravatar');
  },
  isDefaultAvatar: function() {
    var defaultAvatar = AvatarManager.getDefaultAvatar;
    return Meteor.user().profile.image === defaultAvatar;
  },
  userAvatarServices: function() {
    AvatarManager.log('Available Services: ', AvatarManager.getAvailableServices());
    return AvatarManager.getAvailableServices();
  },
});

Template.avatarService.helpers({
  isCurrent: function() {
    return this.serviceName === 'current';
  }
});

Template.avatarManager.events({
  'click #btnUpload' (event, instance) {
    event.preventDefault();
    $('#editYourAvatarModal').modal();
  },
  'click #btnUseThis'(event, instance) {
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
