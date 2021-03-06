// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('myApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state( 'start', {
      url:"/start",
      templateUrl:"templates/view1.html",
      controller: 'startCtrl'
    })

    .state( 'q1', {
      url:"/q1",
      templateUrl:"templates/view2.html",
      controller: 'q1Ctrl'

    })

    .state( 'q2', {
      url:"/q2",
      params: {
        'q1_result_param' : null,
        'q2_random_val' : null
      },
      templateUrl:"templates/view3.html",
      controller: 'q2Ctrl'

    })

    .state( 'result', {
      url:"/result",
      params: {
        'q1_result_param' : null,
        'q2_result_param' : null
      },
      templateUrl:"templates/view4.html",
      controller: 'resultCtrl'
    });

  $urlRouterProvider.otherwise("/start");
});


// in the start page, nothing really happens. just clicking on start to proceed
myApp.controller('startCtrl', function($scope, $state) {
  // start button pressed
  $scope.start = function () {
    $state.go("q1")
  };
});


// problem 1. check if user put the time matching to the device
myApp.controller('q1Ctrl', function($scope, $state, $ionicModal, $ionicLoading) {
  var result = null;


  $scope.check = function() {
    // get time from device
    var time = new Date();
    var h = time.getHours();
    var m = time.getMinutes();


    //ionicLoading for debugging purpose

    if ($scope.hour == null || $scope.minute == null ) {
      $ionicLoading.show({ template: 'put your answer.', noBackdrop: true, duration: 1000 });
    } else if ($scope.hour != h || $scope.minute != m ) {
      $ionicLoading.show({ template: 'wrong.', noBackdrop: true, duration: 1000 });
      result = false;
    } else {
      $ionicLoading.show({ template: 'correct.', noBackdrop: true, duration: 1000 });
      result = true;
    }

    if (result != null) {
      delete $scope.hour;
      delete $scope.minute;

      var randomPass;
      var random = Math.floor((Math.random() * 10) + 1);
      if (random >= 1 && random <= 5) {
        randomPass = "ocean";
      } else {
        randomPass = "mountain";
      }

      $state.go("q2", {
        'q2_random_val' : randomPass,
        'q1_result_param' : result
      })
    }
  };

});

myApp.controller('q2Ctrl', function($scope, $state, $ionicModal, $ionicLoading, $stateParams) {
  var ans = $stateParams.q2_random_val;
  var result2;

  //ionicLoading for debugging purpose.
  $scope.ocean = function() {
      if (ans == "ocean") {
        $ionicLoading.show({ template: 'correct.', noBackdrop: true, duration: 1000 });
        result2 = true;
      } else {
        $ionicLoading.show({template: 'wrong.', noBackdrop: true, duration: 1000});
        result2 = false;
      }
    $state.go("result", {
      'q1_result_param' : $stateParams.q1_result_param,
      'q2_result_param' : result2

    })
  };

  $scope.mountain = function () {
    if (ans == "mountain") {
      $ionicLoading.show({template: 'correct.', noBackdrop: true, duration: 1000});
      result2 = true;
    } else{ $ionicLoading.show({template: 'wrong.', noBackdrop: true, duration: 1000});
      var result2 = false;
    }

    $state.go("result", {
      'q1_result_param' : $stateParams.q1_result_param,
      'q2_result_param' : result2

    })
  }


});


myApp.controller('resultCtrl', function($scope, $state, $stateParams) {




  var comb = $stateParams.q1_result_param + $stateParams.q2_result_param;
  $scope.combResult = comb * 50 + "%";

    if ($stateParams.q1_result_param) $scope.result1= "correct";
  else $scope.result1 = "wrong";

  if ($stateParams.q2_result_param) $scope.result2 = "correct";
  else $scope.result2 = "wrong";


  $scope.redo = function () {

    $state.go("start");
  }
});
