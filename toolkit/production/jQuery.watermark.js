// JavaScript Document
/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage Watermark
 * @author Scott Haselton <shaselton@gmail.com> 
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){
	
	var watermark = $.fn.watermark = function(options){ 
		
		watermark.SetOptions(this,options);
		return this.each(watermark.Load);
			
	};/* </ watermark > */
	
	$.watermark = {};
	$.watermark.destroy = function(){
		
		if(watermark.self !== null){
			watermark.self.each(function(){
				
				destroySelf = $(this);
				destroySelf.removeData('isWatermarked').removeClass(watermark.options.className+' '+watermark.options.activeWatermarkClassName).unbind();
				
			});
		}
		
		
	};	
	
	watermark.self =  null;
	watermark.options = {};
	watermark.settings = {
			
			className : 'toolkit-watermark' ,
			activeWatermarkClassName : 	'toolkit-watermark-active'
	};	
	
	
	
	
	watermark.SetOptions = function(self ,options){
	
		watermark.self = self;
		watermark.options = jQuery.extend({},watermark.settings, options);	
	
	}; /* </ SetOptions > */
	
	
	
	watermark.Load = function(index, selector){
		
		var obj = {};
		obj.self  =  $(selector);
		obj.value = selector.value;
		obj.selfWatermarkPassword = null;
		obj.IsFocused = false;
		
		
		obj.Focus = function(){ 
			
			obj.IsFocused = true;
			obj.InactiveWatermark(this); 
			if(obj.IsWatermarked(this)) { this.value = ''; }   
			
			
		}; /* </ Focus>  */
		
		
		
		obj.Blur  = function(){  
			
			obj.IsFocused = false;
			if(obj.IsWatermarked(this)){ 
				
				 obj.ActiveWatermark(this); 
				 this.value = obj.value;  
				
			}   
		
		}; /* </ Blur>  */
		
		
		
		obj.Keyup = function(){ 
			
			$(this).data('isWatermarked' ,obj.NeedWatermark(this) );
			
		}; /* </ Keyup>  */
		
		
		
		obj.CheckWatermarkActive = function(self){
			
			if(obj.NeedWatermark(self)){ obj.ActiveWatermark(self); }
			else{ obj.InactiveWatermark(self); }			
			
		}; /* </ CheckActiveClass >  */
		
		
		
		obj.ActiveWatermark = function(self){
		
			$(self).addClass(watermark.options.activeWatermarkClassName);
			if(obj.selfWatermarkPassword !== null){
				
				obj.self.hide();
				obj.selfWatermarkPassword.show();
				
			}		
		};/* </ ActiveWatermark >  */
		
		
		
		obj.InactiveWatermark = function(self){
		
			$(self).removeClass(watermark.options.activeWatermarkClassName);
			if(obj.selfWatermarkPassword !== null && !obj.IsFocused){
				
				/*console.log('in active water mark');*/
				obj.selfWatermarkPassword.hide();
				obj.self.show().trigger('focus');
				
				
			}
			
		};/* </ InactiveWatermark >  */
		
		
		
		obj.NeedWatermark = function(self){
			
			return ( self.value == '' ||  self.value == obj.value);
			
		};/* </ NeedWatermark >  */
		
		
		
		obj.HandleFormSubmission = function(){
			
			$(this).find('.'+watermark.options.className).each(function(){ 
				
				if( obj.IsWatermarked(this) ) {   this.value = '';  }
				
			});
			
		}; /* </ HandleFormSubmission>  */
		
		
		
		obj.IsWatermarked = function(self){ return $(self).data('isWatermarked'); }
		
		
		obj.self.bind('focus',obj.Focus);
		obj.self.bind('blur',obj.Blur);
		obj.self.bind('keyup',obj.Keyup);
		obj.self.bind('keypress',obj.CheckWatermarkActive);
		obj.self.parents('form').bind('submit',obj.HandleFormSubmission);

		obj.Actions = function(){
			
			obj.self.addClass(watermark.options.className);
			obj.self.data('isWatermarked' , true).addClass(watermark.options.activeWatermarkClassName);
			if(obj.self.attr('type') == 'password'){
				
				obj.selfWatermarkPassword = obj.self.clone();
				obj.selfWatermarkPassword.attr('type', 'text')
										 .insertBefore(obj.self)
										 .bind('focus',obj.InactiveWatermark);
				obj.self.hide();
			}

			
		}(); /* </ Actions>  */		
		
		//console.log(index ,selector , obj.value	);
		
	}; /* </ Load > */
	
})(jQuery);


