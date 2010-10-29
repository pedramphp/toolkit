/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage IsInteger
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */
(function($){
	
	$.isInteger = function(value){
		
		return arguments.length == 2 && arguments[1] == "unsigned" 
			   ? /^[0-9]+$/.test(value.toString()) 
			   : /^-?[0-9]+$/.test(value.toString()); 
	}
	
})(jQuery);



console.log($.isInteger("-20","unsigned"));
console.log($.isInteger("20","unsigned"));
console.log($.isInteger("20"));






