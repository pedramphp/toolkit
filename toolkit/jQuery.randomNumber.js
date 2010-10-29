/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage GetRandomNumber
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */
  (function($){
  	
  	$.GetRandomNumber = function(min,max){
  		
        max = max + 1;
        return parseInt(Math.random()*(max-min) +min ); 
  	}
  	
  })(jQuery);
  
  
  
  