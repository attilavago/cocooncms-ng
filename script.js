var app = angular.module('cocooncms-app',['ngRoute', 'ngSanitize']);


var articles_db = 'https://docs.google.com/spreadsheets/d/1WirgJFgoLQJxNB7_2Gn2ull13B3cYyRVU5vPbzt5o78/pubhtml';

  function init_blog() {
    Tabletop.init( { key: articles_db,
                     callback: showBlogInfo,
                     simpleSheet: true } )
  }

  function showBlogInfo(article_data, tabletop) {
    
    console.log(article_data); // for testing article data only
  }


app.config(function($routeProvider){


      $routeProvider
          .when('/',{
                templateUrl: 'home.html'
          })
          .when('/blog',{
                templateUrl: 'blog.html'
          });


})


// blog directives


.directive('articleCms', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'views/articleView.html' 
  };
})

.directive('articleTitle', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<h2>{{article.title}}</h2>' 
  };
})

.directive('articleFeatImg', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<img ng-src="{{article.main_image}}">' 
  };
})

.directive('articleAuthor', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<p>{{article.author}}</p>' 
  };
})

.directive('articleAuthorImg', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<p>{{article.author_image}}</p>' 
  };
})

.directive('articleAuthorInfo', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<span ng-bind-html="article.author_info | unsafe"></span>'
  };
})

.directive('articleContent', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<p>{{article.content}}</p>' 
  };
})

.directive('articleImgOne', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<p>{{article.image_1}}</p>' 
  };
})

.directive('articleImgTwo', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<p>{{article.image_2}}</p>' 
  };
})

.directive('articleImgThree', function() {
  return {
    restrict: 'E',
    replace: true,
    template: '<p>{{article.image_3}}</p>' 
  };
})

// connect to google via article service

app.controller('articleController', ['$scope', 'article',
  function ($scope, article) {
    article.query(function(data) {
      $scope.articles = data;
      console.log(data);
    });
}])

// filter our formatted strings so they are deemed safe for parsing into HTML

.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
})


// service connecting to google via tabletop.js

app.factory('article', ['$rootScope',
  function($rootScope){
    return {
      query: function(callback) {
        Tabletop.init({
          key: '1WirgJFgoLQJxNB7_2Gn2ull13B3cYyRVU5vPbzt5o78',
          simpleSheet: true,
          parseNumbers: true,
          callback: function(data, tabletop) {
            if(callback && typeof(callback) === "function") {
              $rootScope.$apply(function() {
                callback(data);
              });
            }
          }
        });
      }
    };
}]);
