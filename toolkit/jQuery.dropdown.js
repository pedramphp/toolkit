/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage DropDown
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

var t =111;
$("body").append("<div class='wow'>"+t+"deddd</div>");

(function($){
	
	var dropdown = $.fn.dropdown = function(options,callbak){
		
		dropdown.SetOptions(this,options);
		if(typeof callback == 'function'){ callback.call(this);}
		return this.each(dropdown.Load);
		
		
	};
	
	
	dropdown.options = {};
	dropdown.settings = {
			nodeType : "li"	,
			speed    : 'fast' ,  // normal , fast , slow
			autocomplete :{
				status   : true	,
				filter   : 'start' , // anywhere , end , exact
				caseSensitive : false
			}
	};
	
	
	
	
	dropdown.SetOptions = function(self,options){
		
		dropdown.self = self;
		dropdown.options = jQuery.extend(true,{},dropdown.settings, options);

	};	
	
	
	
	
	dropdown.Load = function(index, selector){
		
		var obj    = {};
		obj.self   = $(selector);
		obj.nodes  = obj.self.find(">"+dropdown.options.nodeType);
		obj.init   = function(){ obj.nodes.slice(1).hide(); };
		
		
		
		
		obj.nodeClick = function(e){
			
			obj.fixEvents(e); 
			var $li = $(this),
				index = $li.index(),
				width,
				height,
				$textbox,
				speed = (dropdown.options.speed == "normal") ? '' :  dropdown.options.speed,
				autocomplete = function(){
					 $li.data("temp",$li.html()).empty();
					 width = $li.width();height = $li.height();
					 $textbox = $("<input />").attr("type","text").css({ width : 0.9*width , height : Math.max(0.9*height,20) ,margin:0 , padding:0});
					 $textbox.appendTo($li).focus().bind("keyup",obj.textboxKeyup);				
				};
				
			if($(e.target).is(":text") && index == 0){ return; /* do not do anything when they click on autocomplete*/ }
			if(index  == 0 ){
				if(dropdown.options.autocomplete.status === true && !$li.find(":text").length ){autocomplete();  /*Create an auto complete*/ }
				if(obj.nodes.filter(":visible").length == 1){ obj.nodes.slice(1).slideDown(speed);}
				else{
					if(dropdown.options.autocomplete.status === true){ $(this).html($li.data("temp")); }
					obj.nodes.slice(1).slideUp(speed,function(){obj.nodes.filter(":eq("+index+")").show();	});		
				}
								
			}else{ // if index is not 0 
				if(obj.nodes.filter(":visible").length == 1){ obj.nodes.slideDown(speed); }
				else{ 
					obj.nodes.eq(0).find(":text").val("");
					obj.nodes.filter(":lt("+index+"),:gt("+index+")").slideUp(speed);
				}
			}
		};	
		
		
		
		obj.textboxKeyup = function(){
			
			 var regexPatternText = $(this).val(),nodeText,txt,$self,patternQuantifier;
			 
			 obj.nodes.slice(1).show().each(function(){
				 $self = $(this);
				 nodeText  = $.trim($self.text());
				 switch(dropdown.options.autocomplete.filter){
					 case 'start' 	 : regexPattern = '^' + regexPatternText;      break;
					 case 'anywhere' : regexPattern =  regexPatternText;           break;
					 case 'end'      : regexPattern =  regexPatternText+'$';       break;	
					 case 'exact'    : regexPattern = '^' + regexPatternText+'$';  break;	
				 }
				 txt = new RegExp(regexPattern,(dropdown.options.autocomplete.caseSensitive) ? 'g' : 'gi');
				 if(!txt.test(nodeText)){ $self.hide();  }  
			 });			
			
		}; 
		
		
		
		
		obj.events = function(){
			
			obj.nodes.bind("click",obj.nodeClick);
		};
		
		
		
		
		obj.fixEvents = function(event){
			  
	        event.stopPropagation();  // ingonring multiple clicks
	        event.preventDefault();  //  ignoring Enter to submit the form
	        
		};
		
		
		obj.init();
		obj.events();

	};
	
	

})(jQuery);