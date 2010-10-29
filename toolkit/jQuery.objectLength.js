/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage ObjectLength
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){
	
	$.objectLength = function(obj){
		var counter= 0 ;
		for (i in obj) counter++;
		return counter;
	};
	
})(jQuery);


/*
 * Unfinished jQuery PreLoad Images Plugin , 
 * You got to insert the Image to the DOM after loading it
 * 
 */
/*
jQuery.preloadImages = function() {
	for(var i = 0; i<arguments.length; i++){
		jQuery("<img>").attr("src", arguments[i]);
	}
	var link = $('#linkID');
	$.get(link.attr('href'), '', function(data) {
	    alert(data);
	});
	
	//parse cssPile for image urls and load them into the DOM
	
        var imgUrls = cssPile.match(/[^\(]+\.(gif|jpg|jpeg|png)/g);//reg ex to get a string of between a "(" and a ".filename"
        if(imgUrls != null && imgUrls.length>0 && imgUrls != ''){//loop array
                var arr = jQuery.makeArray(imgUrls);//create array from regex obj       
                jQuery(arr).each(function(){
                        allImgs[k] = new Image(); //new img obj
                        allImgs[k].src = (this[0] == '/' || this.match('http://')) ? this : baseURL + this;     //set src either absolute or rel to css dir
                        k++;
                });
        }
        
        
        
        // Insert preloaded image after it finishes loading
        $('<img />')
            .attr('src', 'imageURL.jpg')
            .load(function(){
                $('.profile').append( $(this) );
                // Your other custom code
            });  
        
};
*/




