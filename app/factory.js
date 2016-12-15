angular.module("myApp")
.factory("invoiceNumbers", function(){
	return {
		segments : function(str,i){
			return [
				"1111110","0110000","1101101",
				"1111001","0110011","1011011",
				"1011111","1110000","1111111",
				"1111011"
			];
		},
		parseData: function(result){  
			var numbers = [], digits = [], size = 4, segments = this.segments();
			var lines = result.split("\n"); 
			while (lines.length > 1){
				var na = lines.splice(0, size);
				if(na.length>0){
					for (i=0;i<27;i+=3){ 
						var segment = [];
						for (j=0;j<3;j++){   
							switch(j){
								case 0:
									segment[0] = na[j].charCodeAt(i+1)===95?1:0;
								break;
								case 1:
									segment[1] = na[j].charCodeAt(i+2)===124?1:0;
									segment[5] = na[j].charCodeAt(i)===124?1:0;
									segment[6] = na[j].charCodeAt(i+1)===95?1:0;
								break;
								case 2:
									segment[2] = na[j].charCodeAt(i+2)===124?1:0;
									segment[4] = na[j].charCodeAt(i)===124?1:0;
									segment[3] = na[j].charCodeAt(i+1)===95?1:0;
								break; 
							}
						}
						var segmentStr = segment.join(''); 
						if(segments.indexOf(segmentStr)>-1){
							var number = String(segments.indexOf(segmentStr));
						}else{
							var number = "?";
						}
						digits.push({  
							segment:segmentStr,
							number:number,
						}); 
						numbers.push(number);			
					}
				}
			} 
			var invoiceNumbers = [];
			while (numbers.length > 1){
				var invoiceNumber = numbers.splice(0, 9);
				invoiceNumbers.push(invoiceNumber.join(''));									
			} 
			return invoiceNumbers;
		}
	}
});
