// JavaScript Document
/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage Truncate
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 



	::Sample
	
	
	var truncateCongig = {
		width : 30 ,
		delimeter : "..." ,
		returnData :true 		
	};
	var callback = function(){  $(this).css("color","red"); }
	var fullData = $("a").truncate(truncateCongig,callback);



	:: Notice : if the returnData is set to TRUE then you should continue your chaining
				in the call back function .

*/


(function($){

    
    
	var truncate = $.fn.truncate = function(options,callback){  
			
			truncate.SetOptions(this,options);
			if(typeof callback == 'function'){ callback.call(this);}
			if(options.returnData){
				this.each(truncate.Load);
				return truncate.returnData; 
			}else{
				return this.each(truncate.Load);
			}
	};
	
	
	truncate.returnData = {};
	truncate.options = {};
	truncate.self =  null;
	truncate.selectorLength = 1;
	truncate.settings = {
			width : 20 ,
			delimeter : "..." ,
			returnData : false
	};
	

	
	truncate.SetOptions = function(self,options){
		
		truncate.selectorLength = $(self).length;
		truncate.options = jQuery.extend({},truncate.settings, options);

	};		
	
	
	
	truncate.Load = function(index, selector){
		
		truncate.index = index;
		truncate.self = $(selector);
		truncate.Init();
		
	};
	
	
	
	
	truncate.Init = function(){
	
		var text 		= truncate.self.text().toString();
        var textlength  = truncate.self.text().toString().length; 
        if(textlength > truncate.options.width){
           truncatedText = text.substring(0,truncate.options.width) + truncate.options.delimeter;  
        }else{
            truncatedText = text; 
        } 
        truncate.self.text(truncatedText);
        truncate.BuildReturnData(text,truncatedText);


	};	
	
	
	
	
	truncate.BuildReturnData = function(text,truncatedText){
		
        if(truncate.selectorLength == 1){
        	truncate.returnData = {
            	text : text ,
            	truncatedText : truncatedText	        		
        	};
        }else{
        	truncate.returnData[truncate.index] = {
                	text : text ,
                	truncatedText : truncatedText	        		
            	};        	
        }
        
	}
	
       
})(jQuery);