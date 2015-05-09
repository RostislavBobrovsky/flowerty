'use strict';
/**
 * Created by Катерина on 20.04.2015.
 */

userModule.controller("UserAddController", ['$scope', '$http', '$location', '$filter', 'USER_MODULE_CONSTANTS',
    function ($scope, $http, $location, $filter, USER_MODULE_CONSTANTS) {

        $scope.option = {
            title: USER_MODULE_CONSTANTS.PROCESS_TYPES.ADD.title,
            actionButton: USER_MODULE_CONSTANTS.PROCESS_TYPES.ADD.actionButton,
            edit: false
        };

        $scope.bundle = {
            user: {
                contact: null
            },
            roles: {},
            passwordConfirm: undefined
        };

        $scope.error = {
            emptyContact: false,
            emptyLogin: false,
            emptyRole: false,
            emptyPassword: false
        };

        $scope.search = {
            user: {
                enteredSurname: '',
                show: false,
                selected: {}
            }
        };

        $http({
            method: "get",
            url: "user/roles"
        }).success(function (data, status, headers, config) {
            $scope.bundle.roles = data;
        }).error(function (data, status, headers, config) {
            console.log("Exception details: " + JSON.stringify({data: data}));//COMMENT HERE
        });

        $scope.save = function () {
            $scope.bundle.user.contact = $scope.search.selected;

            if (!isFullData()) {
                return;
            }

            for (var i = 0; i < $scope.bundle.roles.length; ++i) {
                if ($scope.bundle.user.role.id === $scope.bundle.roles[i].id) {
                    $scope.bundle.user.role = $scope.bundle.roles[i];
                    break;
                }
            }

            $http({
                method: "post",
                url: "user/save",
                data: $scope.bundle.user
            }).success(function (data, status, headers, config) {
                $location.path("users");
            }).error(function (data, status, headers, config) {
                console.log("Exception details in UserAddController.save() : " + JSON.stringify({data: data}));
            });
        };

        function isFullData() {
            var isFull = true;

            if (!$scope.bundle.user.contact) {
                $scope.error.emptyContact = true;
                isFull = false;
            } else {
                $scope.error.emptyRole = false;
            }

            if (!$scope.bundle.user.role) {
                $scope.error.emptyRole = true;
                isFull = false;
            } else {
                $scope.error.emptyRole = false;
            }

            if (!$scope.bundle.user.login) {
                $scope.error.emptyLogin = true;
                isFull = false;
            } else {
                $scope.error.emptyLogin = false;
            }

            if (!$scope.bundle.user.password) {
                $scope.error.emptyPassword = true;
                isFull = false;
            } else {
                $scope.error.emptyPassword = false;
            }

            if ($scope.bundle.user.password != $scope.bundle.passwordConfirm) {
                isFull = false;
            }

            return isFull;
        }
    }]);