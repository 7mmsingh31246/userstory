angular.module("myApp",[])
.controller(function($scope){
	$scope.readFile = function(event, file){ 
			console.log(event, file);  
	}
})
.directive('fileinput',['$parse',"asciireader", function( $parse,asciireader ) {
	return {
        restrict: "E", 
		replace:true, 
		scope:{
			result:"@",
			chars:"@",
			lines:"@"
		},
		template:'<input type="file" accept=".txt">', 
		link:function(scope,element,attrs){
			var onChange = $parse(attrs.onChange);
			element.bind('change', function (event) {
				var file = event.target.files[0];
				if(file){ 
					var reader  = new FileReader(); 
					  reader.onloadend = function () {
						  scope.$apply(function(){
						  var result = reader.result;
						  	scope.result = result;
						  	var numbers = [], finalNumbers = [], size = 4;
						  	var lines = result.split("\n"); 
							while (lines.length > 0){
								var na = lines.splice(0, size);
								var nw = {};
								for (i=0;i<na.length;i++){
									n = na[i];
									console.log("n",n);
									if(n.length>0){
										//for (i=0;i<n.length-1;i++){
											var d = 0;
											for (j=0;j<27;j+=3){ 
												if(i==0){
													nw[d] = []; 
												} 
												nw[d].push(n[i].charCodeAt(j)+n[i].charCodeAt(j+1)+n[i].charCodeAt(j+2));
												d++;
											}
										//} 
									}
								}
								numbers.push(nw);
							} 
							/*for (ni=0;ni<numbers.length;ni++){
								var na = numbers[ni];
										console.log(na);
								for (i=0;i<na.length-1;i++){
									for (j=0;j<27;j++){
										var c = na[i].charAt(j);
									} 
								}
							} */
							console.log(numbers);
							})
					  }
					  reader.readAsBinaryString(file);
				}
			});
		}
	}
}]);