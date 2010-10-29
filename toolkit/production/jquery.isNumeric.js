// JavaScript Document
/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage isNumeric
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 * 
 */

// TODO: don't think this is necessary...isNaN can do what is needed here.
(function( $ ){
	
	$.isNumeric = function( number, options ){
		
		var isNumeric = {
			
			result:false,
			settings:{
				includeNull:false,
				callback: $.noop
			},
			
			init: function(){
				
				options = $.extend( {}, this.settings, options );
				this.process();
				return this;
				
			},
			
			process: function(){
				
				if ( options.includeNull ) { 
					this.result = !isNaN( number ); 
				}else{
					this.result = ( number !== null && !isNaN( number ) );
				}
				
			},
			
			callback: function(){
				
				if( $.isFunction( options.callback ) ){	options.callback.apply( $, [number, this.result] ); }
				
			}
						
		};
		
		isNumeric.init().callback();
		
		return isNumeric.result;
	
	} /* < / $.isNumeric  > */
	
})(jQuery);
	