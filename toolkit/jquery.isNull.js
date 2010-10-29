// JavaScript Document
/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage isNull
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 * 
 */

(function( $ ){
	
	$.isNull = function( str, callback ){
		
		var result = str == null;
		callback = callback || $.noop;
		if( $.isFunction( callback ) ){	callback.apply( $, [str, result] ); }
		return result;
		
	} /* < / $.IsNull  > */ 
	
})(jQuery);
	