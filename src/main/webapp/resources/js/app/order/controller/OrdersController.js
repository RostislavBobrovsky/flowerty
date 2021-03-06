'use strict';
/**
 * Created by Катерина on 26.04.2015.
 */

angular.module("flowertyApplication.orderModule").controller('OrdersController', ['$scope', '$http', '$location', '$filter', 'orderListService', 'paginationService',
    function($scope, $http, $location, $filter, orderListService, paginationService) {

    $scope.orders = paginationService.getListBundle();
    $scope.pagination = paginationService.getPagination(orderListService.getOrderList, true);
    $scope.pagination.getPage(1);

}]);