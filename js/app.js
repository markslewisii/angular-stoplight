angular.module('cityRoads', [
  'cityRoads.controllers.MainController',
  'cityRoads.directives.StopLightSwitchDirective',
  'cityRoads.services.StopLightService',
  'cityRoads.directives.StopLightDirective'
])
  .run(function($interval, StopLightService){

    $interval(function() {
        StopLightService.toggle();
    }, 5000);

  });

angular.module('cityRoads.controllers.MainController', [])
  .controller('MainController', function($scope){
  $scope.test = "Hello World! Put your HTML here.";

});

angular.module('cityRoads.services.StopLightService', [])
  .service('StopLightService', function(){
    //- should hold value that indicates the direction of traffic. North/South and East/West
    //- create a function that will toggle the value.
    this.direction = true; // 1 = noth south is green, east west is red
    this.test = 'hi there'; // 1 = noth south is green, east west is red

    this.toggle = function() {
      this.direction = ! this.direction;
    }
  });

angular.module('cityRoads.directives.StopLightDirective', [])
  .directive('stopLightDirective', ['StopLightService', function(StopLightService){
    //- should change colors based on stopLightService.
    //- use an attribute to determine which direction the stop light will use.
    return {
      restrict: 'A',
      link: function($scope) {

        $scope.$watch(function () { return StopLightService.direction; }, function(newVal){
          $scope.direction = newVal;
        });

      }
    };


  }]);

angular.module('cityRoads.directives.StopLightSwitchDirective', [])
  .directive('stopLightSwitchDirective', function(){
    //- should contain button that will toggle stopLightService.
console.log("stopLightSwitchDirective");
    return {
      restrict: 'A',
      scope: true,
      template: '<button ng-click="click()">toggle</button>',
      controller: function($scope, $element, StopLightService){

        $scope.click = function(){
          // StopLightService.direction = ! StopLightService.direction;
          StopLightService.toggle();
          StopLightService.test += '|';
          console.log(StopLightService.direction);
          // console.log(StopLightService.test);
        }
      }
    }

  });