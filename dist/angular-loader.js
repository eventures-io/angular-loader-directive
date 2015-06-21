'use strict';
angular.module('evtrs.loader', []).
    factory('HttpRequestInterceptor', function ($rootScope, $q, LoaderConfig) {
        var pendingRequests = 0;

        var checkUrl = function (config) {
            if (!LoaderConfig.API_ENDPOINT) {
                LoaderConfig.API_ENDPOINT = 'api';
            }
            return config.url.indexOf(LoaderConfig.API_ENDPOINT) != -1 ? true : false;
        }

        return {
            request: function (config) {
                if (checkUrl(config)) {
                    pendingRequests++;
                    $rootScope.$broadcast('HTTP_START');
                }
                return config || $q.when(config)
            },
            response: function (response) {
                if (checkUrl(response.config)) {
                    if ((--pendingRequests) === 0) {
                        $rootScope.$broadcast('HTTP_STOP');
                    }
                }
                return response || $q.when(response);
            },
            responseError: function (response) {
                if (checkUrl(response.config)) {
                    if (!(--pendingRequests)) {
                        $rootScope.$broadcast('HTTP_STOP');
                    }
                }
                return $q.reject(response);
            }
        };
    })
    .directive('loader', function () {
        return {
            restrict: 'E',
            scope: {

            },
            link: function (scope, element, attrs) {
                switch (attrs.animation) {
                    case  'box':
                        element.append('<div class="loader-box"></div>');
                        break;
                    case 'bounce':
                        element.append('<div class="loader-bounce"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>');
                        break;
                    default:
                        element.append('<div class="loader-box"></div>');
                        break;
                }

            },
            controller: function ($scope, $element) {

                $scope.$on('HTTP_START', function () {
                    $element.css('display', 'block');
                });

                $scope.$on('HTTP_STOP', function () {
                    $element.css('display', 'none');
                });

            }

        }
    });