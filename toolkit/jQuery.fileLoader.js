/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage FileLoader
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

if(!console){
	var console = {};
	console.log = function(message){
		//alert(message);
		// ignoring it if doesn't support console.log
	}
	
}


(function($){
	
	$.FileLoader = function(urls, callback){

		
		var fileLoader = {};
		
		fileLoader.options = {
				
		   urlList	: new Array() ,
		   i 		: 0,
		   urlCount : 0 ,
		   urls : urls , 	
		   callback : callback || $.noop , 
		   urlListLength : 0
		   
		};
		
		fileLoader.options = $.extend({},$.FileLoader.settings,fileLoader.options);
		
		
		
		fileLoader.Initialize = function(){
			
			fileLoader.SetUrls();
			fileLoader.LoadParallel();
			
		};/* </ fileLoader.Initialize > */
		
		
		
		fileLoader.SetUrls = function(){
			
			
			switch(typeof fileLoader.options.urls){
			
				case 'string' :  fileLoader.options.urlList.push( fileLoader.options.urls ); break;
				case 'object' :  fileLoader.options.urlList = fileLoader.options.urls;	 break; // its ok to be object or an array it will work either way
				// if we wanted to jut limit them by array this was the solution if(fileLoader.options.urls instanceof Array)
			
			}
			fileLoader.options.urlListLength = fileLoader.options.urlList.length;
			//console.log(fileLoader.options.urlListLength);
			
		};/* </ fileLoader.SetUrls > */
		
		
		
		fileLoader.LoadParallel = function(){
			
			if(fileLoader.IfIE()){
			
				fileLoader.LoadIEParallel();
			
			}else{
				fileLoader.LoadNonIEParallel();
			
			}
			
		};/* </ fileLoader.LoadParallel > */
		
		
		
		fileLoader.LoadNonIEParallel = function(){

			for (fileLoader.options.i = 0; fileLoader.options.i < fileLoader.options.urlListLength; fileLoader.options.i++){
				
				$.SingleFileLoader(fileLoader.GetUrl(fileLoader.options.i) ,fileLoader.Callbackfunction);
			
			}
			
		};/* </ fileLoader.LoadNonIEParallel > */
		
		
		
		
		fileLoader.GetUrl = function(index){
			
			fileLoader.options.path = $.trim(fileLoader.options.path);
			return fileLoader.options.path + fileLoader.options.urlList[index];
			
		};/* </ fileLoader.GetUrl > */
		
		
		
		
		fileLoader.LoadIEParallel = function(){

			
			$.SingleFileLoader(fileLoader.options.urlList[0] ,fileLoader.Callbackfunction);
			
		}; /* </ fileLoader.LoadIEParallel > */
		

		
		
		fileLoader.Callbackfunction = function(){
			
			
			fileLoader.options.urlCount++;  
			if(fileLoader.options.urlCount == fileLoader.options.urlListLength && typeof fileLoader.options.callback == 'function'){ 
				
				fileLoader.options.callback.call(this);
			
			}else if(fileLoader.IfIE()){
			
				fileLoader.options.urlList.splice(0,1);
				fileLoader.LoadIEParallel();
			
			}
			
			
		}; /* </ fileLoader.Callbackfunction > */
		
		
		
		
		fileLoader.IfIE = function(){
			
			return ($.browser.msie && $.browser.version < 8)
		}; /* </ fileLoader.IfIE > */
	
		
		
		fileLoader.Initialize();
	
		return this;
	
	}; /* </ $.FileLoader > */
	
	
	$.FileLoader.settings = { path : null };
	$.FileLoader.SetPath = function(path){
		
		$.FileLoader.settings.path = path;
		
	}; /* </ $.FileLoader.SetPath > */
	
		
	
	
	
	
	
	$.SingleFileLoader = function(obj,callback){
		
		var fileLoader = {
	      settings : { 
			url : null  , 
			charset : 'UTF-8' ,
			media   : 'screen'
		  }, 
		  options :  obj  ,
		  loaded  : false, 
		  script  : null ,
		  style   : null 
		},
		
		
		FL = fileLoader // Make the code look cleaner.
		
		
		FL.init = function(){
			
			FL.SetUrl();
			FL.options = $.extend({},FL.settings,FL.options);
			if(FL.IsValid()){ 
				
				if(FL.IsJS()) {		  FL.JSAction(); }
				else if(FL.IsCSS()) { FL.CSSAction(); }
				
			}

		};
		

		
		FL.SetUrl = function(){
			  if(typeof FL.options == 'string'){
				  		
				  		var url = FL.options;
				  		FL.options ={};
				  		FL.options.url = url;
				  		
			  }
		};
		
		
			
			
		FL.IsValid = function(){
			
			return FL.options.url !== null && (FL.IsCSS() || FL.IsJS() );	
			
		};
		
		
		
		
		FL.IsJS  = function() { return   FL.options.url.match(/\.js$/gi);}
		FL.IsCSS = function() { return   FL.options.url.match(/\.css$/gi); }
		FL.CSSAction = function(){
			
			FL.SetStyle();
			FL.Success();
		};		
		
		
		
		
		FL.JSAction = function(){
			
				FL.SetScript();
				FL.LoadScript();
			
		};
		
		
		
		
		FL.LoadScript =function(){
			 
			// IE Sets The Variable FL.script.readyState 
		    if (FL.script.readyState){FL.UpdateReadyState();   FL.script.onreadystatechange = FL.OnLoad;  } 
		    else {    FL.script.onload  = function(){ FL.Success(); } }
		    FL.UpdateReadyState(); 
		
		};
		
		
		
		FL.UpdateReadyState = function(){
			
			if(!FL.readystate){ FL.readystate = ''; }
			if(FL.script !== null){
				FL.readystate += " \n "+ FL.script.readyState;
			}
			
		};
		
		
		
		
		FL.OnLoad = function(){
			
			FL.UpdateReadyState(); 
			if ( !FL.loaded && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
			
				FL.loaded = true;
				// Handle memory leak in IE
				FL.script.onload = FL.script.onreadystatechange = null;
				if ( FL.head && FL.script.parentNode ) {  FL.head.removeChild( FL.script );  }
				FL.Success();  
			
			}
			
		};
		
		
		
		
		FL.SetStyle = function(){
			
			FL.head  = FL.CreateHead(),    
			FL.style = document.createElement('link');
			FL.style.type  = 'text/css';
			FL.style.rel   = 'stylesheet';
			FL.style.href  = FL.options.url ;
			FL.style.media = FL.options.media ;
			FL.head.insertBefore( FL.style, FL.head.firstChild );
			
		};
		
		
		
		
		FL.SetScript = function(){
			
			FL.head   = FL.CreateHead()    ,
			FL.script = document.createElement("script") ,
			FL.script.src  = FL.options.url ;
			FL.script.type = 'text/javascript' ;
			FL.script.charset = FL.options.charset ;
			// Use insertBefore instead of appendChild to circumvent an IE6 bug.
			// This arises when a base node is used (#2709 and #4378).	
			// avoiding for readyState = uninitialize
			FL.head.insertBefore( FL.script, FL.head.firstChild );
			
			
		};
		
	
		
		
		FL.CreateHead = function(){
			
			return document.getElementsByTagName("head")[0] || document.documentElement;

		};
		
		
		
		FL.Success = function(){
			
			FL.UpdateReadyState(); 
			if(	 typeof callback == 'function'){ callback.call(this);}
		};
		
		
		fileLoader.init();
		
	};

  	
  	
  	
})(jQuery);

	  
	  
	  
	  
	  
	  
