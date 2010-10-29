/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage FixEvents
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */
(function($){
	
	$.fixEvents = function(event){
        event.stopPropagation();  // ingonring multiple clicks
        event.preventDefault();  //  ignoring Enter to submit the form     
	};
	
})(jQuery);