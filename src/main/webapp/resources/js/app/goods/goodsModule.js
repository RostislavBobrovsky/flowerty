'use strict';

/**
 * Created by Катерина on 17.04.2015.
 */

var goodsModule = angular.module("flowertyApplication.goodsModule", ['ngRoute']);

goodsModule.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/goods", {
            templateUrl: GOODS_MODULE_PATH + "partial/goods-list.html",
            controller: "GoodsListController"
        });
}]);

goodsModule.controller("GoodsListController", ['$scope', '$http', '$location', '$filter', function($scope, $http, $location, $filter) {

    $scope.basket = [];
    $scope.goods = {};
    $scope.goods.goodsArray = [
        [
            {
                imageName : 'flowers-iris.jpg',
                flower : { name : 'Iris' },
                cost : '13 $',
                //  This is the count of items you want to order
                //  Default is 1
                count : 1,
                ordered : false
            },
            {
                imageName : 'orchid_rose.jpg',
                flower : { name : 'Buquet orchid+rose' },
                cost : '50 $',
                //  This is the count of items you want to order
                //  Default is 1
                count : 1,
                ordered : false
            },
            {
                imageName : 'bush-rose.jpg',
                flower : { name : 'Bush rose' },
                cost : '17 $',
                //  This is the count of items you want to order
                //  Default is 1
                count : 1,
                ordered : false
            }
        ],
        [
            {
                imageName : 'violet-pion.jpg',
                flower : { name : 'Pion' },
                cost : '20 $',
                //  This is the count of items you want to order
                //  Default is 1
                count : 1,
                ordered : false
            },
            {
                imageName : 'coral-pion.jpg',
                flower : { name : 'Coral pion' },
                cost : '20 $',
                //  This is the count of items you want to order
                //  Default is 1
                count : 1,
                ordered : false
            }
        ]
    ];
    $scope.goods.makeOrder = function(goodsItem){
        goodsItem.ordered = true;
        $scope.basket.push(goodsItem);
    };

    $scope.goods.less = function(goodsItem){
        if(goodsItem.count > 1) {
            goodsItem.count--;
        }

    };

    $scope.goods.more = function(goodsItem){
        goodsItem.count++;
    };


}]);