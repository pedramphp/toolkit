/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage GoTop
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */
(function($){
	$.goTop = function(acceleration, time){
		acceleration = acceleration || 0.1;time = time || 5;
		var dx,dy,bx,wx,wy,x,v,speed,invokeFunction,source;	
		x = Math.max(window.scrollX || 0, Math.max(document.body.scrollLeft || 0 , document.documentElement.scrollleft || 0));
		y = Math.max(window.scrollY || 0, Math.max(document.body.scrollTop || 0, document.documentElement.scrollTop || 0));
		speed = 1 + acceleration;
		window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
		if(x > 0 || y > 0) { window.setTimeout(function(){$.goTop(acceleration, time);}, time); }
	}; 
})(jQuery);