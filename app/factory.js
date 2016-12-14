angular.module("myApp")
.factory("asciireader", function(){
	return {
		charCodeAt : function(str,i){
			var c = str.charCodeAt(i);
			return (c>99?c:"0"+c).toString();
		}
	}
});
