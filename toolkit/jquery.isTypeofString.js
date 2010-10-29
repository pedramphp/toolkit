// JavaScript Document
/*
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage isTypeOfString
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 * 
 */


(function( $ ){
	
	$.isTypeofString = function( str,callback ){
		
		var result = typeof str == "string";
		callback = callback || $.noop;
		if( $.isFunction( callback ) ){	callback.apply( $, [str, result] ); }
		return result;
		
	} /* < / $.isTypeofString  > */ 
	
})(jQuery);	