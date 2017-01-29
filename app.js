(function() {
  'use strict';
  /*angular.module('shoppingListApp',[])
  .controller('shoppingListAddController',['$scope',shoppingListAddController]);

  	function shoppingListAddController($scope) {
      $scope.message1 = "";
      $scope.message2 = "Nothing bought yet.";
      $scope.BoughtArray = [];
      $scope.itemArray = [{name:"cookies",
                         quantity:"10"},
                          {name:"chocolates",
                          quantity:"8"},
                          {name:"pickles",
                          quantity:"3"},
                          {name:"jams",
                          quantity:"14"},
                          {name:"butter",
                          quantity:"5"}];

      $scope.remove = function (index) {
          var item = $scope.itemArray.splice(index,1);
          if($scope.itemArray.length === 0) {
            $scope.message1 = "Everything is bought!"

          }

          $scope.message2 = "";
          $scope.BoughtArray.push(item[0]);

       };                  

    }  */
   angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .provider('shoppingListService1',shoppingListServiceProvider);


    ToBuyController.$inject = ['shoppingListService1'];
    AlreadyBoughtController.$inject = ['shoppingListService1'];

    function ToBuyController(shoppingListService1) {
        var itemAdder = this;
        itemAdder.message1 = "";
        itemAdder.message2 = "Nothing Bought Yet !";
  
        itemAdder.itemArray = shoppingListService1.getItems();
        itemAdder.remove = function(index) {
          shoppingListService1.remove(index);
          itemAdder.message1 = shoppingListService1.getMessageForBuyingList();
          itemAdder.message2 = shoppingListService1.getMessageForBoughtList();

        };

       }

   function AlreadyBoughtController(shoppingListService1) {
        var itemAdder = this;
        itemAdder.BoughtArray = shoppingListService1.getBoughtItems();
        
       }

  function shoppingListService() {
      var service = this;
      //var message1 = "Nothing Bought Yet !";
      var BoughtArray = [];
      var itemArray = [{name:"cookies",
                         quantity:"10"},
                          {name:"chocolates",
                          quantity:"8"},
                          {name:"pickles",
                          quantity:"3"},
                          {name:"jams",
                          quantity:"14"},
                          {name:"butter",
                          quantity:"5"}];

      service.getItems = function () {
              return itemArray;
         };                   
      service.remove = function (index) {
          var item = itemArray.splice(index,1);
          BoughtArray.push(item[0]);

       };   

       service.getBoughtItems = function () {
            return BoughtArray;
       }; 

       service.getMessageForBuyingList = function () {
        if(itemArray.length === 0) {
          var message = "Everything is bought!";
        } else {
          message = "";
        }
        return message;
       }
       service.getMessageForBoughtList = function () {
        if(BoughtArray.length === 0) {
          var message = "Nothing bought yet !";
        } else {
          message = "";
        }
        return message;
       }

    }

  function shoppingListServiceProvider() {
      var provider = this;

      provider.$get = function () {
        var shopingList = new shoppingListService();
        return shopingList;
      };
    } 


})();
