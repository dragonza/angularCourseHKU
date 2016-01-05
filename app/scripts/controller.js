/*global angular*/
angular.module('confusionApp')
  .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    'use strict';
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showMenu = false;
    $scope.message = "Loading...";

    $scope.dishes = menuFactory.getDishes()
        .query(
            function(response) {
                $scope.dishes = response;
                console.log(response);
                $scope.showMenu = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statsText;
            }

    );

    $scope.select = function (setTab) {
      $scope.tab = setTab;

      if (setTab === 2) {
        $scope.filtText = "appetizer";
      } else if (setTab === 3) {
        $scope.filtText = "mains";
      } else if (setTab === 4) {
        $scope.filtText = "dessert";
      } else {
        $scope.filtText = "";
      }
    };

    $scope.isSelected = function (checkTab) {
      return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
      $scope.showDetails = !$scope.showDetails;
    };
  }])

  .controller('ContactController', ['$scope', function ($scope) {
    'use strict';
    $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
    $scope.channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];
    $scope.invalidChannelSelection = false;

  }])

  .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {
    'use strict';
    $scope.sendFeedback = function () {
      if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
        $scope.invalidChannelSelection = true;
      } else {
        $scope.invalidChannelSelection = false;
	      feedbackFactory.getFeedback().save($scope.feedback);
        $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
        $scope.feedback.mychannel = "";
        $scope.feedbackForm.$setPristine();
      }
    };
  }])

  .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
    'use strict';
    $scope.dish = {};
    $scope.showDish = false;
    $scope.message = "Loading...";
    $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id, 10)})
      .$promise.then (
         function (response) {
            $scope.dish = response;
            $scope.showDish  = true;
         },
         function (response) {
            $scope.message = "Error: " + response.status + " " + response.statsText;
         }
      );

  }])

  .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    'use strict';
    $scope.mycomment = {rating: 5, comment: "", author: "", date: ""};

    $scope.submitComment = function () {
      $scope.mycomment.date = new Date().toISOString();
      console.log($scope.mycomment);
      $scope.dish.comments.push($scope.mycomment);
      menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);
      $scope.commentForm.$setPristine();
      $scope.mycomment = {rating: 5, comment: "", author: "", date: ""};
    };
  }])

  // implement the IndexController and About Controller here
  .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
    'use strict';
    $scope.showPromotion = false;
		$scope.message = "Loading...";
    $scope.promotion = menuFactory.getPromotion().get({id: 0})
      .$promise.then(
		    function(response) {
			    $scope.promotion = response;

			    $scope.showPromotion = true;
		    },
		    function(response) {
			    $scope.message = "Error: " + response.status + " " + response.statusText;
		    }
      );
    $scope.showDish = false;

    $scope.dish = menuFactory.getDishes().get({id:0})
      .$promise.then (
        function (response) {
            $scope.dish = response;
            $scope.showDish  = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statsText;
        }
      );
		$scope.showChef = false;
    $scope.executiveChef = corporateFactory.getLeaders().get({id: 3})
		    .$promise.then(
		      function(response) {
			      $scope.executiveChef = response;
			      $scope.showChef = true;
		      },
		      function(response) {
			      $scope.message = "Error: " + response.status + " " + response.statsText;
		      }
    );
  }])
  .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
    'use strict';
		$scope.showLeaders = false;
    $scope.getLeaders = corporateFactory.getLeaders().query(
		    function(response) {
			    $scope.dishes = response;

			    $scope.showLeaders = true;
		    },
		    function(response) {
			    $scope.message = "Error: " + response.status + " " + response.statsText;
		    }
    );
  }]);
