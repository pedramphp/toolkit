/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage PreloadImagess
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){
	
	$.preloadImages = function(){
		var i;
		if(arguments.length == 1 && typeof arguments == "object"){  arguments = arguments[0]; }
		for(i = 0; i < arguments.length; i++){ $('<img />').attr('src', arguments[i]);   }
	}; /* </ jQuery.preloadImages > */

})(jQuery);