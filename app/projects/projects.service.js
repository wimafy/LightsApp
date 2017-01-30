angular.module('angularfireSlackApp')
  .factory('projects', function($firebaseArray){
    var ref = firebase.database().ref('projects');
    var projects = $firebaseArray(ref);

    return projects;
  });
