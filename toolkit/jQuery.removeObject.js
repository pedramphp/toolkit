// JavaScript Document
/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage CountWords
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 


	::Samples
	
	-- Default Object
	
	var Obj = {
			i :1 ,
			j:2 ,
			k :{
      			a : 1 ,
      			b : 2 
			},
			lol : '12'
	};
	
	
	::Sample 1 REMOVE THE WHOLE OBJECT
	

		var Obj = $.removeObject(Obj);   //returns null 
		/**********Output********
		 * 
		 * Obj = NULL
		 *
		
		
	::Sample 2 REMOVE AN INDEX OF AN OBJECT
	
		var Obj = $.removeObject(Obj,'i');   
	   /**********Output********
		Obj = {
				j:2 ,
				k :{
		  			a : 1 ,
		  			b : 2 
				},
				lol : '12'
		};	  
	  **************************

	::Sample 3 REMOVE AN INDEX OF AN OBJECT AND RESET THE INDEX  -- RESET INDEX IS NOT RECURSIVE , CAUSE THE FOCUS IS JUST ON THE INDEX 
	
	
		var settings = {
			resetIndex : true,   
			index : "i"		
		}
		var Obj = $.removeObject(Obj,settings);   
	   /**********Output********
		Obj = {
			0:2 ,
			1 :{
      			a : 1 ,
      			b : 2 
			},
			2 : '12'
		};	  
	  **************************	  
	  

	  
	::Sample 4 REMOVE VALUE --RESET INDEX IS  RECURSIVE 
	
	
		var settings = {
			resetIndex : true,   
			value : 2		,
			removeBy :  "value" ,
			recursive : true 
		}
		var Obj = $.removeObject(Obj,settings);   
	   /**********Output********
		Obj = {
			0 : 1
			1 :{
      			0 : 1 
			},
			2 : '12'
		};	  
	  **************************	  	  
	  


*/


(function($){
	
	$.removeObject = function(obj){
		
		
		 
		 var removeObject = {};
		 
		 
		 
		 
		 removeObject.obj = obj ;
		 
		 
		 
		 
		 removeObject.exec = function(){
			  	 if(removeObject.IsObject){ removeObject.LoadObject(); }
				 else{ /*  Do nothing */}
				 return removeObject.obj;
			 
		 };
		 
		 
		 
		 // Default Values
		 removeObject.settings = {
				    value  :  null		  ,
					index  :  null 		  ,
					removeBy   :  "index"   , //value
					resetIndex : false ,
					recursive : false 
		 };
		 
		 
		 
		 
		 removeObject.arguments = arguments;
		 
		 
		 
		 
		 removeObject.options = {};
		 
		 
		 
		 
		 removeObject.IsObject = function(){ return typeof removeObject.obj === "object"   }
		 
		 
		 
		 
		 removeObject.LoadObject = function(){
			if(removeObject.arguments.length === 2){
				
				 if(typeof removeObject.arguments[1] === "object"){ removeObject.options = removeObject.arguments[1];}
				 else{removeObject.options.index =  removeObject.arguments[1]; }
				 removeObject.options = jQuery.extend( removeObject.settings,removeObject.options);
				 
				 if( removeObject.options.removeBy == "value" && removeObject.options.value ) 		removeObject.ByValue();
				 else if(removeObject.options.removeBy == "index" && removeObject.options.index)    removeObject.ByIndex();
				 else 	removeObject.ByIndex(); 
			 
			}else{ removeObject.FullObject();  }
			 
		 };
		 
		 
		 
		 
		 removeObject.FullObject = function(){ removeObject.obj =  null;  }
		 
		 
		 
		 
		 removeObject.ByValue = function(){  
			 
			    
			    function loop(obj,status){
			    
			    	var newObj = new Object(),j = 0,k;
					for(var i in obj ){  
						k = (removeObject.options.resetIndex === true) ? j: i; 
						if(obj[i] != removeObject.options.value || !status){ 
							newObj[k] = (typeof obj[i] === "object" ) ? loop(obj[i],removeObject.options.recursive) : obj[i] ;
							j++;
						}
					}
					return newObj;
			    }
			    removeObject.obj = loop(removeObject.obj,true);

		 };
		 
		 
		 
		 
		 removeObject.ByIndex = function(){  
			 
			 	if(removeObject.options.resetIndex === true){
				    var newObj = new Object(),j = 0;
					for(var i in removeObject.obj ){  
						if( i !== removeObject.options.index){ newObj[j] = removeObject.obj[i]; j++; }   
					}
					removeObject.obj = newObj;
			 	}else{ delete removeObject.obj[removeObject.options.index]; } 
			
		 };
		 
		 return removeObject.exec();
		 
		   
		 
		 
		 
	};
	
	

	
	
	
	
})(jQuery);