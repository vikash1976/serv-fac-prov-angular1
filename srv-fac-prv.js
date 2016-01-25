var srvFacPrvApp = angular.module('srvFacPrvApp', []);

//We are not creating any object here, service functions are called with 'new' keyword. meaning we will have to attach props/methods to 'this' object, that we want to expose as part of the service
srvFacPrvApp.service('nameService', function(){
    var fname = 'Vikash';
    var lname = 'Pandey';
    var fullName = function(){
        return fname+ ' '+lname;
    };
    
    this.getFullName = function(){
        return fullName();
    }
});

//We need to create the object by ourselves here and add props/methods that we need to expose through our factory object
srvFacPrvApp.factory('nameFactory', function(){
    var facService = {};
    var fname = 'Vikash';
    var lname = 'Pandey';
    var fullName = function(){
        return fname+ ' '+lname;
    };
    
    facService.getFullName = function(){
        return fullName();
    }
    
    return facService;
});

//This is the only service that can be passed to app.config for tweaking before it gets ready and passed to controller. An opportunity to configure the service
srvFacPrvApp.provider('nameProvider', function(){
    
    var fname = 'Vikash';
    var lname = 'Pandey';
    var fullName = function(){
        return fname+ ' '+lname;
    };
    this.defaultSalutation = 'Mr.'; //this can be configured in app.config, anything on this object
    //all thats returned by $get is what is available in controller, everything that $get function returns
    this.$get = function(){
        return {
            getFullName(){
                return fullName();
            },
            salutation: this.defaultSalutation
        };
    };
    
});

srvFacPrvApp.config(function(nameProviderProvider){
    //Note: Angular suffixes Provider word to the passed in provider.
    nameProviderProvider.defaultSalutation = 'Explorer.';
})


srvFacPrvApp.controller('mainCtrl', ['$scope', 'nameService', function($scope, nameService){
    $scope.name = nameService.getFullName();
}]);

srvFacPrvApp.controller('mainFacCtrl', ['$scope', 'nameFactory', function($scope, nameFactory){
    $scope.name = nameFactory.getFullName();
}]);

srvFacPrvApp.controller('mainPrvCtrl', ['$scope', 'nameProvider', function($scope, nameProvider){
    $scope.name = nameProvider.salutation + ' ' +nameProvider.getFullName();
}])


/*
When you’re using a Factory you create an object, add properties to it, then return that same object. When you pass this service into your controller, those properties on the object will now be available in that controller through your factory.

When you’re using Service, it’s instantiated with the ‘new’ keyword. Because of that, you’ll add properties to ‘this’ and the service will return ‘this’. When you pass the service into your controller, those properties on ‘this’ will now be available on that controller through your service.

Providers are the only service you can pass into your .config() function. Use a provider when you want to provide module-wide configuration for your service object before making it available.
*/