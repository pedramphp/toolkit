/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage InitializeAjax
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){
	  	
	  	$.InitializeAjax = function(string){
	  		
			Ajax = {
					
					init : function(){
	                    $.ajaxSetup(Ajax.IntializeVars());
					},
					
					
					IntializeVars : function(){

						return ({
				  			type       : 'POST'     ,
				  			dataType   : 'html'     ,
				  			beforeSend : Ajax.BeforeSend ,
				  			error      : Ajax.Error
						});
									
					},
					
					
					BeforeSend : function(){
						
						//console.log("Ajax Before Send");
						
					},
					
					
					Error : function(){
						
						console.log("Error Occured ( BY AJAX Object in jquery.vortal.js file )");
						
					}
					
			}; // Ajax Object Ends 	
			return Ajax.init();
	  	}
	  	
})(jQuery);  