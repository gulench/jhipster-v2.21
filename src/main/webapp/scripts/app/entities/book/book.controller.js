'use strict';

angular.module('jhipsterApp')
    .controller('BookController', function ($scope, Book, BookSearch, ParseLinks) {
        $scope.books = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Book.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                for (var i = 0; i < result.length; i++) {
                    $scope.books.push(result[i]);
                }
            });
        };
        $scope.reset = function() {
            $scope.page = 0;
            $scope.books = [];
            $scope.loadAll();
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.delete = function (id) {
            Book.get({id: id}, function(result) {
                $scope.book = result;
                $('#deleteBookConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Book.delete({id: id},
                function () {
                    $scope.reset();
                    $('#deleteBookConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.search = function () {
            BookSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.books = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.reset();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.book = {title: null, description: null, publicationDate: null, price: null, id: null};
        };
    });
