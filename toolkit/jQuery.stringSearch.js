/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage StringSearch
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){

	$.searchWord = function(obj){
		
		 
		 var searchWord = {
			result :null,
		 	settings : {
				 string : null,
				 piece : null,	 
				 type  : 'exact' , // exact , contain , 
				 returnType : 'array' , //boolean , array 
				 match : 'all' ,  //Once , all
				 caseSensitive  : false  ,// true
				 replaceWith :  null ,
				 multiLine : false  //true
		 	},
		 	options : obj
		 };	
		 
		 
		 
		 searchWord.init = function(){
	
			 searchWord.options = jQuery.extend({},searchWord.settings,searchWord.options);
			 if(searchWord.options.string !== null && searchWord.options.piece !== null ){
				 searchWord.action();
			 }
			 return searchWord.result;
		 };		
		 
		 
		 
		 searchWord.action = function(){
			var  pattern,result,
				 global 		= (searchWord.options.match == 'all') ? 'g' : '',
				 caseSensitive	= (searchWord.options.caseSensitive === true) ? '' : 'i',
				 multiLine	= 	  (searchWord.options.multiLine === true) ? 'm' : '',
				 regxModifier = 	global	 + caseSensitive + multiLine ;							 
			switch(searchWord.options.type){
				case 'exact'   : pattern = new RegExp('(^|\\s)'+searchWord.options.piece+'(\\s|$)',regxModifier);  break;
				case 'contain' : pattern = new RegExp(searchWord.options.piece,regxModifier); break;
			}
			switch(searchWord.options.returnType){
			 	case  'array'  : result = pattern.exec(searchWord.options.string); break;
			 	case  'boolean' : result = pattern.test(searchWord.options.string); break;
		    }
			if(searchWord.options.replaceWith !== null){
				
				 var replaceResult = searchWord.options.string.replace(pattern,searchWord.options.replaceWith);
				 if(typeof result !== "boolean"){ result = replaceResult;}
			}
			 
			 searchWord.result = result;
			 
		 }
		 
		 
		 return searchWord.init();
		
	}

	
	
	var data = $.searchWord({
		string : 'this test is a Testimonial' , 
		piece  : 'test' ,
		type   : 'exact',
		returnType : 'array' ,
		caseSensitive  : false 
	});
	console.log(data);
	
	
})(jQuery);