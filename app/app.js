angular.module("myApp",[])
.controller('mainController',function($scope,invoiceNumbers){ 
	$scope.invoiceNumbers = false;
	$scope.readFile = function(){  
		if($scope.file){ 
			var reader  = new FileReader(); 
			  reader.onloadend = function () {
				$scope.$apply(function(){ 
					$scope.invoiceNumbers = invoiceNumbers.parseData(reader.result);
				})
			  }
			  reader.readAsBinaryString($scope.file);
		}
	}
})
.directive('fileinput', ["$parse",function($parse) {
	return {
        restrict: "EA", 
		replace:true, 
		template:'<input type="file">', 
		link:function(scope,element,attrs){   		
			var modelGet = $parse(attrs.ngModel);
            var modelSet = modelGet.assign;
            var onChange = $parse(attrs.onChange);
            element.bind('change', function (event) {
				var file = event.target.files[0];
				if(file){
					modelSet(scope, file);
					onChange(event, scope, element, attrs);
				}
            });
		}
	}
}]);