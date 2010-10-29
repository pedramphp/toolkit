/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage InObject
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){
	
	$.inObject : function(obj,value){
		  
		for(i in obj){ if(obj[i] == value){  return i;  } }
		return -1;
	}
		  
}
	
})(jQuery);