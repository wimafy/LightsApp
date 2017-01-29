angular.module('angularfireSlackApp')
  .controller('MainPageCtrl', function($state, Auth, Users, profile, projects){
    var mainpageCtrl = this;

    mainpageCtrl.profile = profile;
    mainpageCtrl.projects = projects;

    mainpageCtrl.getDisplayName = Users.getDisplayName;
    mainpageCtrl.getGravatar = Users.getGravatar;

    mainpageCtrl.users = Users.all;

    Users.setOnline(mainpageCtrl.profile.$id);

    mainpageCtrl.newProject = {
      name: ''
    };



    mainpageCtrl.logout = function(){
      mainpageCtrl.profile.online = null;
      mainpageCtrl.profile.$save().then(function(){
        Auth.$signOut().then(function(){
          $state.go('login');
        });
      });
    };
  });
