/*******************************************************************
 Function: PrintOffScreen
 Inputs: the URL or the Selector that incudes the Data
 Output: Printing a URL or a Content ina Selector
 Usage   
       // Get the data from the URL 
       // ****Cross Domain doesn't work
       
       $.vortal.PrintOffScreen({
		   url :"http://inventory.vortalgroup.com/admin"		   
       });
	   
	   // get the data out of a Selector in a DOM 
       $.vortal.PrintOffScreen({
		   selector : "#div"
       });       
       
  
 ********************************************************************/     
/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage PrintScreen
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){
	
	$.PrintOffScreen = function(options){
		
		
		 var defaults = {
				selector : '',
				url      : ''
		 },HTML;
		 
		 options = jQuery.extend(defaults, options);
		 
		 if(options.selector == '' && options.url == ''){
		
			 alert("You need to add a URL or Selector");
		
		 }else if(options.selector != ''){
		
			 HTML = $(options.selector).html(); 
		 
		 }else{
			 $.ajax({
				dataType   : 'html'       ,
				async      : false        ,
				url 		: options.url,
				beforeSend : function(){} ,
				error      : function(){} ,
				success    : function(Data){ 
					HTML = Data; 
				}
			 });		 
		 }

		 var iframe = document.createElement('IFRAME'),doc = null;
		$(iframe).attr('style','position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
		document.body.appendChild(iframe);
		doc = iframe.contentWindow.document;
		doc.write(HTML);
		doc.close();
		iframe.contentWindow.focus();
		iframe.contentWindow.print();
		
	}
	
})(jQuery);

