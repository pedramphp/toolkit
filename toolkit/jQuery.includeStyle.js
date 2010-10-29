/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage IncludeStyle
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){
	
	$.includeStyle= function(file){
		var v_css  = document.createElement('link');
		v_css.rel = 'stylesheet'
		v_css.type = 'text/css';
		v_css.href = file;
		document.getElementsByTagName('head')[0].appendChild(v_css);
	}; 

})(jQuery);   