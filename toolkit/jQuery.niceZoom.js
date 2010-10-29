// JavaScript Document
/*
    :: http://www.jQueryToolkit.com  
    :: jQuery.niceZoom.js - Javascrip Singleton OOP( jQuery Library 1.4 )
    :: Developers : Seyed - Mahdi Pedramrazi 
    :: Version 1.0 - Jan 22 2010
    :: Copyright © 2010 http://jQueryToolkit.com | All rights reserved.
    :: Email : pedramphp@gmail.com
    :: Date  : Monday , Feburary 14, 2010  - 19:03A PM


	::Sample
	
	$("img").niceZoom({
		align : 'center',  // center , left  , right  [default :center  ]
		valign: 'middle',   // middle , top , bottom  [default : middle ]
		duration : 500 ,  // time in milliseconds     [default : 300    ]
		zoom : 25 ,       // zoom in  Percentage      [defaut  : 10     ]    
		animationComplete : function(){ console.log("animation complete"); }
	},function(){ console.log("my call back function"); });	
	
	
*/


/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage NiceZoom
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 *
 * $("img").niceZoom({
 *		align : 'center',  // center , left  , right  [default :center  ]
 *		valign: 'middle',   // middle , top , bottom  [default : middle ]
 *		duration : 500 ,  // time in milliseconds     [default : 300    ]
 *		zoom : 25 ,       // zoom in  Percentage      [defaut  : 10     ]    
 *		animationComplete : function(){ console.log("animation complete"); }
 *	},function(){ console.log("my call back function"); });	
 */

(function($){
	

	
	var niceZoom = $.fn.niceZoom = function(options,callback){ 
	
		niceZoom.SetOptions(this,options);
		if(typeof callback == 'function'){ callback.call(this);}
		return this.each(niceZoom.Load);
			
	};
	
	$.niceZoom = {};
	$.niceZoom.destroy = function(){
		var destroySelf,style;
		if(niceZoom.self !== null){
			niceZoom.self.each(function(){
				destroySelf = $(this);
				style = destroySelf.data("style");
				destroySelf.unwrap().removeClass("JT_absolute").removeAttr("style").unbind();
				if(style != undefined && $.trim(style) != "") destroySelf.attr("style",style);
				if($.trim(destroySelf.attr("class")) == "")   destroySelf.removeAttr("class");
					
			});
		}
		
		
	};	
	
	niceZoom.self =  null;
	niceZoom.options = {};
	niceZoom.settings = {
			zoom : 10 ,  // Add zoom By Percentage
			duration : 300 ,
			animationComplete : $.noop ,
			align : 'center' , // left ,center,right
			valign : 'middle'  // top , middle , bottom
	};	
	
	
	
	
	niceZoom.SetOptions = function(self,options){
		niceZoom.self = self;
		$.fx.off = false;
		niceZoom.options = jQuery.extend({},niceZoom.settings, options);

	};
	
	
	
	niceZoom.Load = function(index, selector){
		
		var obj = {};
		obj.zoom = null;
		obj.width= null;
		obj.height= null;
		obj.newWidth= null;
		obj.newHeight= null;
		obj.left= null;
		obj.top= null;
		obj.self = $(selector);
		obj.SetZoom = function(){  obj.zoom = 1 + niceZoom.options.zoom /100 ;  }
		
		
		obj.SetDimension = function() {  
			
			obj.width = obj.self.width();  
			obj.height = obj.self.height(); 
		
		};
		
		
		obj.MouseEnter = function(){ 	
			
			if(!obj.self.parent().hasClass("JT_niceZoom"))  obj.WrapImage();
			if(!obj.self.hasClass("JT_absolute"))  			obj.ConfigImage();
			
			obj.SetNewDimentsion();
			obj.SetZoomType();
			
			obj.self.stop(false,true).animate({width:obj.newWidth, height:obj.newHeight, top:obj.top, left:obj.left}, 
										  {duration:niceZoom.options.duration,  easing: 'swing' });
			
		};		
		
		
		obj.WrapImage = function (){ 
			obj.self.wrap("<div style = 'position:relative; overflow:hidden; width:"+obj.width+"px; height:"+obj.height+"px; ' class ='JT_niceZoom' />");
		};
		
		
		obj.ConfigImage = function(){ 
			obj.self.data("style",obj.self.attr("style"));
			obj.self.css({position : 'absolute' , cursor : 'pointer' }).addClass('JT_absolute'); 
		}
		
		
		
		obj.SetNewDimentsion = function(){ 
			
			obj.newWidth  =  obj.width * obj.zoom; 
			obj.newHeight =  obj.height * obj.zoom; 
			
		
		};
		
		
		obj.SetZoomType = function(){ 
			
			obj.left = obj.SetHorizentalZoom(); 
			obj.top = obj.SetVerticalZoom(); 
			
		};
		
		
		obj.MouseLeave = function(){ 
			obj.self.stop(false,true).animate({ width:obj.width, height:obj.height, top:0, left:0}, 
										  {duration:niceZoom.options.duration , easing: 'swing' , complete : niceZoom.options.animationComplete.apply()  });
		} 
		
		
		obj.SetHorizentalZoom =function(){
			switch(niceZoom.options.align){
				case "left"  : return 0; break;
				case "right" : return -(obj.newWidth-obj.width); break;
				default : 	   return -(obj.newWidth-obj.width)/2; break; 
			}			
		};
		
		
		obj.SetVerticalZoom = function(){
			switch(niceZoom.options.valign){
				case "top" :    return 0; break;
				case "bottom" : return -(obj.newHeight-obj.height); break;
				default:   		return -(obj.newHeight-obj.height)/2; break;
			
			}			
		};
		
		
	
			
		obj.SetZoom();
		obj.SetDimension();
		obj.self.bind("mouseenter",obj.MouseEnter).bind("mouseleave",obj.MouseLeave);
	
		
		
	};
	
	
	
	
})(jQuery);


$(window).load(function(){
	$("img").niceZoom({
		align : 'center', // left , center , right
		valign: 'middle',  // top , middle , bottom 
		duration : 500 ,  // MilliSecond
		zoom : 30 ,   // zoom in percentage
		animationComplete : function(){ console.log("animation complete"); }
	},function(){ console.log("my call backfunction"); });
	
});