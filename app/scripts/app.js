'use strict';

/**
 * @ngdoc overview
 * @name g2WebApp
 * @description
 * # g2WebApp
 *
 * Main module of the application.
 */
var app = angular
  .module('GatherUp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'ui.router',
    'ui.bootstrap.datetimepicker',
    'ngStorage'
  ])

  .constant('FIREBASE_URL', 'https://gatherup.firebaseio.com/')

 .config(function ($stateProvider, $urlRouterProvider) {
    //$locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('/', {
        url:'/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          user: function(Auth) {
            if (!Auth.isAuth()) {
              $state.go('login');
            }
          }
        }
      })

      .state('create', {
        url:'/create',
        templateUrl: 'views/createEvent.html',
        controller: 'CreateEventCtrl',
        resolve: {
          user: function(Auth) {
            if (!Auth.isAuth()) {
              $state.go('/');
            }
          }
        }
      })

      .state('edit', {
        url:'/edit/:id',
        templateUrl: 'views/editEvent.html',
        controller: 'editEventCtrl',
        resolve: {
          user: function(Auth) {
            if (!Auth.isAuth()) {
              $state.go('/');
            }
          }
        }
      })



      .state('signup', {
        url:'/signup',
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })

      .state('logout', {
        url:'/logout',
        controller: function($state, Auth) {
          Auth.ref().unauth();
          $state.go('login');
        }
      })

      .state('login', {
        url:'/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      });
 });

