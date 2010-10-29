// JavaScript Document
/*
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage isNumeric
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 * 
 */


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
				
				if ( options.includeNull ) { this.result = !isNaN( number ); return;	}
				this.result = ( number != null && !isNaN( number ) );				
				
			},
			
			callback: function(){
				
				if( $.isFunction( options.callback ) ){	options.callback.apply( $, [number, this.result] ); }
				
			}
						
		};
		
		isNumeric.init().callback();
		
		return isNumeric.result;
	
	} /* < / $.isNumeric  > */
	
})(jQuery);
	