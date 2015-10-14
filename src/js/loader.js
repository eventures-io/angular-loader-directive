'use strict';

angular.module('eventures.loader', [])

    .provider('loaderProvider', function () {
        this.interceptableURL = '/api';
        this.abeyance = 200;

        var setInterceptableURL = function (url) {
            this.interceptableURL = url;
        };

        var setAbeyance = function (abeyanceVal) {
            this.abeyance = abeyanceVal;
        };

        this.$get = function () {
            var interceptableURL =  this.interceptableURL;
            var abeyance = this.abeyance;
            return {
                setInterceptableURL: setInterceptableURL,
                setAbeyance: setAbeyance,
                interceptableURL: interceptableURL,
                abeyance:  abeyance
            };
        };

    })
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('loaderInterceptor');
    })
    .factory('loaderInterceptor', function ($rootScope, $q, $timeout, loaderProvider) {
        var pendingRequests = 0;

        var checkUrl = function (config) {
            return config.url.indexOf(loaderProvider.interceptableURL) != -1 ? true : false;
        }

        return {
            request: function (config) {
                if (checkUrl(config)) {
                    pendingRequests++;
                    $timeout(function() {
                        if(pendingRequests > 0){
                        //no response received during abeayance, start loader animation
                        $rootScope.$broadcast('LOADER_START');
                        }
                    }, loaderProvider.abeyance);
                }
                return config || $q.when(config)
            },
            response: function (response) {
                if (checkUrl(response.config)) {
                    if ((--pendingRequests) === 0) {
                        $rootScope.$broadcast('LOADER_STOP');
                    }
                }
                return response || $q.when(response);
            },
            responseError: function (response) {
                if (checkUrl(response.config)) {
                    if (!(--pendingRequests)) {
                        $rootScope.$broadcast('LOADER_STOP');
                    }
                }
                return $q.reject(response);
            }
        };
    })
    .directive('loader', function () {
        return {
            restrict: 'AE',
            scope: {
                loader: '@'
            },
            link: function (scope, element) {
                element.css('display', 'none');

                switch (scope.loader) {
                    case  'box':
                        element.append('<div class="loader-box"></div>');
                        break;
                    case 'bounce':
                        element.append('<div class="loader-bounce"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>');
                        break;
                    case 'cube':
                        element.append('<div class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div>');
                        break;
                    case 'spinner':
                        element.append('<div class="spinner"><div class="dot1"></div><div class="dot2"></div></div>');
                        break;
                    case 'fold':
                        element.append('<div class="sk-folding-cube"><div class="sk-cube1 sk-cube"></div><div class="sk-cube2 sk-cube"></div><div class="sk-cube4 sk-cube"></div><div class="sk-cube3 sk-cube"></div></div>');
                        break;
                    default:
                        element.append('<div class="loader-box"></div>');
                        break;
                }

            },
            controller: function ($scope, $element) {

                $scope.$on('LOADER_START', function () {
                    $element.css('display', 'block');
                });

                $scope.$on('LOADER_STOP', function () {
                    $element.css('display', 'none');
                });

            }

        }
    });

