/*global angular */
/*jslint nomen: true */
angular.module('confusionApp')
  .constant("baseUrl", "http://localhost:3000/" )
  .service('menuFactory', ['$resource', 'baseUrl', function ($resource, baseUrl) {
    'use strict';

    this.getDishes = function () {
      return $resource(baseUrl + "dishes/:id", null, {update: {method:'PUT'}});
    };



    // implement a function named getPromotion
    // that returns a selected promotion.
    this.getPromotion = function () {
      return $resource(baseUrl + "promotions/:id", null, {update: {method:'PUT'}});
    };


  }])

  .factory('corporateFactory', ['$resource', 'baseUrl', function ($resource,baseUrl) {
    'use strict';
    var corpfac = {};


    // Implement two functions, one named getLeaders,
    // the other named getLeader(index)
    // Remember this is a factory not a service
    corpfac.getLeaders = function () {
      return $resource(baseUrl + "leadership/:id", null, {update: {method:'PUT'}});
    };
    return corpfac;

  }])
	.factory('feedbackFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
		'use strict';
		 var feedbackFac = {};
		 feedbackFac.getFeedback = function () {
			 return $resource(baseUrl + "feedback/:id", null, {save: {method: "POST"}});
		 };
		 return feedbackFac;

	}]);
