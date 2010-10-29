/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage FormatMoney
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){
	  	
	
	$.FormatMoney = function(numb, opts, callback){
		
		
		var formatMoney = {
				
	      settings : {			
			number				: numb.toString().replace(/\$|\,/g,''),
			decimalPlaces		: 2,
			countryCode			: 'usd',
			decimalDelimiter	: '.',
			groupingDelimiter	: ','
		  }, 
		  
		  options 			: opts,
		  symbolOutput		: true,
		  formatNumber		: true,
		  outputVars		: []
		  
		},
		
		
		FM = formatMoney 
		
		
		FM.init = function(){
			
			FM.settings = jQuery.extend({},FM.settings,FM.opts);
			FM.settings.number = ( isNaN( FM.settings.number ) ) ? 0 : FM.settings.number;
			
			if ( FM.symbolOutput ){
				FM.outputVars = FM.DetermineCountry();
			}
			
			return FM.Format();
						
		};
		
		FM.Format = function(){
			
			
			
		};
		
		
		
		FM.DetermineCountry = function(){
			
			switch ( toLowerCase( FM.settings.countryCode ) ){
			
				case 'yen':
					return '¥';
					break;
					
				case 'euro':
					return '€';
					break;
					
				case 'uk':
				case 'gbp':
					return '£';
					break;
					
				case 'usd':
				default:
					return '$';
					break;					
			
			}
			
		}
		
		
		formatMoney.init();
		
	};
  	
  	
})(jQuery);

	  
	  
	  
	  
	  
	  
$(document).ready(function(){
	/*
	var modulePath = 'http://pedramtech.com/Development/YottaFrameworkTest/jslib/jquery/jQuery.formatMoney.js'; 
	$.Module(modulePath);
	
	
	

	
	//var modulePath = 'http://pedramtech.com/Development/YottaFrameworkTest/css/main.css'; 
	var option = {
			
		url : modulePath 
			
	};

	$.FileLoader('http://pedramtech.com/Development/YottaFrameworkTest/jslib/jquery/jQuery.dropdown.js');
	$.FileLoader(option,function(){
		console.log("callback function");		
		$("body").append("<div class='wow'>www</div>");
		$("body").append("<div class='wow'>"+$.CountWords("asdasd")+"</div>");
	});
	*/
});