/*global angular*/
angular.module('confusionApp')
  .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    'use strict';
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;

    $scope.dishes = menuFactory.getDishes();

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

  .controller('FeedbackController', ['$scope', function ($scope) {
    'use strict';
    $scope.sendFeedback = function () {
      if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
        $scope.invalidChannelSelection = true;
      } else {
        $scope.invalidChannelSelection = false;
        $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
        $scope.feedback.mychannel = "";
        $scope.feedbackForm.$setPristine();
      }
    };
  }])

  .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
    'use strict';
    $scope.dish = menuFactory.getDish(parseInt($stateParams.id, 10));
  }])

  .controller('DishCommentController', ['$scope', function ($scope) {
    'use strict';
    $scope.mycomment = {rating: 5, comment: "", author: "", date: ""};

    $scope.submitComment = function () {
      $scope.mycomment.date = new Date().toISOString();
      $scope.dish.comments.push($scope.mycomment);
      $scope.commentForm.$setPristine();
      $scope.mycomment = {rating: 5, comment: "", author: "", date: ""};
    };
  }])

  // implement the IndexController and About Controller here
  .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
    'use strict';
    $scope.promotion = menuFactory.getPromotion(0);
    $scope.dish = menuFactory.getDish(0);
    $scope.executiveChef = corporateFactory.getLeader(3);
  }])
  .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
    'use strict';
    $scope.getLeaders = corporateFactory.getLeaders();
  }]);
