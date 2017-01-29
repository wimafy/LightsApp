angular.module('angularfireSlackApp')
  .controller('ProjectsCtrl', function($state, Auth, Users, profile, projects){
    var projectsCtrl = this;

    projectsCtrl.profile = profile;
    projectsCtrl.projects = projects;



    projectsCtrl.getDisplayName = Users.getDisplayName;
    projectsCtrl.getGravatar = Users.getGravatar;

    projectsCtrl.users = Users.all;

    Users.setOnline(projectsCtrl.profile.$id);

    projectsCtrl.newProject = {
      name: ''
    };

    projectsCtrl.colorList = [
      '#d32f2f',
      '#C2185B',
      '#7B1FA2',
      '#512DA8',
      '#303F9F',
      '#0288D1',
      '#1976D2',
      '#0097A7',
      '#00796B',
      '#388E3C',
      '#689F38',
      '#AFB42B',
      '#FBC02D',
      '#FFA000',
      '#F57C00',
      '#E64A19',
      '#5D4037',
      '#616161',
      '#455A64'
    ]

    projectsCtrl.selectedColor = "#d32f2f";

    projectsCtrl.selectColor = function(color) {
      projectsCtrl.selectedColor = color
    };

    $("#file").on("change", function(event) {
      selectedFile = event.target.files[0];
      
    });

    projectsCtrl.uploadFile = function(event) {

      var filename = selectedFile.name;
      var storageRef = firebase.storage().ref('/projectSongs/' + filename);
      var uploadTask = storageRef.put(selectedFile);

      uploadTask.on('state_changed', function(snapshot){
      }, function(error) {

      }, function() {
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log(downloadURL);
      });

    };

    projectsCtrl.createProject = function(){

      projectsCtrl.projects.$add(projectsCtrl.newProject).then(function(ref){
        $state.go('mainpage');
        //$state.go('channels.messages', {projectId: ref.key});
        return;
      });

    };


    projectsCtrl.logout = function(){
      projectsCtrl.profile.online = null;
      projectsCtrl.profile.$save().then(function(){
        Auth.$signOut().then(function(){
          $state.go('login');
        });
      });
    };
  });
