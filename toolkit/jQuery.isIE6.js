/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage IESuite
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){
	
	$.isIE6 = function(){ return  !$.support.opacity && !window.XMLHttpRequest;	}; 
	$.isIE = function(){ return  !$.support.opacity ;	}; 
	
	
	/**
	 * returns the verison of IE that is running on the client side.  If IE isn't running, 'false' is returned
	 * 
	 * @return bool | float 	the boolean 'false' is returned if the version of IE isn't detected.
	 */
	$.IEVersion = function() {
		  var version = false; 
		  if (navigator.appName == 'Microsoft Internet Explorer') {
		    var expression  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		    var agent = navigator.userAgent;
		    if (expression.exec(agent) != null)
		    	version = parseFloat( RegExp.$1 );
		  }
		  return version;
	};


})(jQuery);

$(document).ready(function(){
	
	console.log('test');
	alert($.IEVersion());


});