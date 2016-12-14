//Unit Test
describe('marcopolo service test', function(){
    var marcopoloService;
    beforeEach(function(){ 
	
		module('myApp');

        inject( function($injector){
            marcopoloService = $injector.get('marcopoloService');
        });
    });
    it('the number should be a marco', function(){
        expect(marcopoloService.checkNumber(24)).toBe("marco");
    });
    it('the number should be a polo', function(){
        expect(marcopoloService.checkNumber(49)).toBe("polo");
    });
    it('the number should be a marcopolo', function(){
        expect(marcopoloService.checkNumber(28)).toBe("marcopolo");
    });
});

