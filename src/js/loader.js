'use strict';
angular.module('evtrs.loader', []).
    factory('HttpRequestInterceptor', function ($rootScope, $q, ENV, $log) {
        var pendingRequests = 0;

        var checkUrl = function (config) {
            if (!ENV.API_ENDPOINT) {
                ENV.API_ENDPOINT = 'api';
            }
            return config.url.indexOf(ENV.API_ENDPOINT) != -1 ? true : false;
        }

        return {
            request: function (config) {
                config.timeout = ENV.REQUEST_TIMEOUT ? ENV.REQUEST_TIMEOUT : 20000;
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
                if (!response.statusText) {
                    response.statusText = 'No Response';
                }
                $log.error('http error ' + response.status ? response.status : 'UNKNOWN',
                    response.statusText ? response.statusText : 'UNKNOWN',
                    response.config.url ? response.config.url : 'UNKNOWN');

                $rootScope.$broadcast('STATUS_ERROR', {type: 'HTTP_ERROR',
                    code: response.status ? response.status : 'UNKNOWN',
                    message: response.statusText ? response.statusText : 'UNKNOWN',
                    cause: response.config.url ? response.config.url : 'UNKNOWN'});
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
                var spinner = document.createElement('div');
                switch (attrs.animation) {
                    case  'box':
                        spinner.setAttribute('class', 'loader-box');
                        break;
                    case 'bounce':
                        spinner.setAttribute('class', 'loader-bounce');
                        var bounce1 = document.createElement('div');
                        bounce1.setAttribute('class', 'loader-bounce1');
                        spinner.append(bounce1);
                        var bounce2 = document.createElement('div');
                        bounce2.setAttribute('class', 'loader-bounce2');
                        spinner.append(bounce2);
                        break;
                    default:
                        spinner.setAttribute('class', 'loader-box');
                        break;
                }
                element.append(spinner);

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