/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage ModuleLoader
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
	
	$.module = function(path){
		

		
		var _core = {};
		
		_core.ObjectLength = function(obj){
			
			var counter= 0 ;
			for (i in obj){ counter++; } 
			return counter;
			
		};
		
		
		_core.removeArrayValue = function(arr,value){
	  		
	  	    var r = new Array();
	  	  
	  	    for(var i = 0, n = arr.length; i < n; i++){
	  	        if( arr[i] != value){ r.push(arr[i]); }
	  	    }

	  	    return r;
	  	}
		
		
		var _module = {
				
				callback : $.noop,
				requestedModule : null,
				requestedScripts : null,
				path : null	,
				modules : null,
				modulesLength : 0,
				selectedModuleFiles : [] ,
				selectedModuleDetail : null ,
				loadedFiles : ['test2.js','test4.js']
				
		};
		

		_module.initialize = function(){
			
			_module.SetPath(path);
			
		};
		
		
		
		_module.SetPath = function(path){
			
			if($.trim(path) != ''){
				
				_module.path = path;
						
			}
	
		};
		
		
		
		_module.GetPath = function(){
			
			return _module.path;
		
		};
		
		
		
		_module.Create = function(moduleRules){
			
			_module.modules = moduleRules;
			_module.SetModuleLength();
			
		};
		
		
		
		_module.SetModuleLength = function(){
			
			if( _module.HasBeenCreatedModules()){

				_module.modulesLength = _core.ObjectLength(_module.modules);
				
			}
			
		};
		
		
		

		
		
		/******************************************
		 * 		
		 * 			<	Loading Module  >
		 * 
		 *****************************************/
		
		_module.Load = function( moduleName ){
			
			console.log(moduleName);
			_module.SetRequestedModule( moduleName );
			if(!_module.IsValidate()){ console.log("notValidated"); return _module.Callback();  }
			_module.LoadModule();
			
		};	
		

		
		_module.IsValidate = function(){
			
			
			// $.trim(undefined) --> an empty string
			if( _module.requestedModule 		== ''   || 
				_module.requestedModule 		== null || 
				typeof _module.requestedModule  != 'string' ||
				_module.HasBeenCreatedModules() === false ||
				_module.HasBeenLoadedBefore()   ===  true ){
				
				return false;
			
			}
			return true;
			
			
		};
		
		
		_module.SetRequestedModule = function( moduleName ){
			
			_module.requestedModule = $.trim( moduleName ); 
			
		};

		
		
		_module.HasBeenCreatedModules= function(){
			
			if(!_module.modules instanceof Object ||  $.isEmptyObject(_module.modules)){ 
					
				console.log("has Not been Created Before");
				return false;  
				
			}			
			return true;
			
		};
		
		
		
		
		_module.HasBeenLoadedBefore = function(){
			
			var loaded = true;
			_module.SetSelectedModuleFiles();
			if(_module.selectedModuleFiles.length == 0){ return true; }
			for(var i = 0 ; i < _module.selectedModuleFiles.length; i++){
				console.log(_module.selectedModuleFiles[i]);
				console.log(_module.loadedFiles );
				if( $.inArray(_module.selectedModuleFiles[i] , _module.loadedFiles ) == -1){
					loaded = false;
					//i = _module.selectedModuleFiles.length;
					break;
				}
			}
			return loaded;
		
		};
		
			
			
		
		_module.SetSelectedModuleFiles = function(){
				

				if( _module.GetModuleLength() > 0 ){
					
					_module.selectedModuleDetail = _module.FindModuleIn( _module.modules );
					if( _module.selectedModuleDetail !==  false ){
							
							_module.FetchModuleFiles(_module.selectedModuleDetail);
							
					}
					console.log(_module.selectedModuleDetail);
					console.log('this is all selected module files',_module.selectedModuleFiles);

					
				}
				
		};
		
		
		
		_module.FetchModuleFiles = function(obj){
			
			
			if(typeof _module.selectedModuleDetail == 'string'){
				
				_module.selectedModuleFiles.push(_module.selectedModuleDetail)
			
			}else if( obj instanceof Object ){
				
				for( i in obj ){
					
					if(typeof obj[i] == 'string'){
						
						_module.selectedModuleFiles.push(obj[i]);
					
					}else if(typeof obj[i] == "object"){   
						
						_module.FetchModuleFiles(obj[i]); 
						
					}
						
				}
				
				
			}else if (obj instanceof Array ){

				for( var i = 0 ; i < obj.length; i++ ){
					
						_module.selectedModuleFiles.push(obj[i]);
						
				}
			}
			
		};
		
		
		
		_module.GetSelectedModuleFiles = function(){
			
			return _module.selectedModuleFiles;
			
		}
		
		
		
		
		_module.FindModuleIn = function(obj){
			
			var foundObject, result;
			if(obj instanceof Object){
				
				for ( i in obj){
					
					if( obj[_module.requestedModule] ){
						
						foundObject = obj[_module.requestedModule];
						return foundObject;
						
					}
					else if(typeof obj[i] == "object"){   
						
						result = _module.FindModuleIn(obj[i]); 
						if( result !== false ){ return result; } 
						
					}
					
					
				}/* </ for > */
				
				return false;
				
			} /* </ If Statement > */
			
		} /* </ FindModule > */
		
		
		
		_module.GetModuleLength = function(){
			
			return _module.modulesLength;
			
		};
	
		
		
		_module.Callback = function(){
			
			if(typeof _module.callback == 'function'){
				
				_module.callback.call(this);
			
			}
			
			
		};
		
		
		
		_module.SaveCallback = function(callback){
			
			_module.callback = callback;
			
		};
		
		
		
		
		_module.LoadModule = function(){

			_module.PureSelectedModuleFiles();
			_module.ApplyPathToSelectedModuleFiles();
			// this is pure and clean like virgin right now
			console.log("that set" , _module.selectedModuleFiles);
			
			$.FileLoader( _module.selectedModuleFiles ,_module.Callback);
			
			
		};
		
		
		
		_module.PureSelectedModuleFiles = function(){
			
			
			
			if(_module.selectedModuleFiles.length == 0){ return; }
			var temp = _module.selectedModuleFiles;
			for(var i = 0 ; i < temp.length; i++){
				
				if( $.inArray(temp[i] , _module.loadedFiles ) >= 0){
					_module.selectedModuleFiles = _core.removeArrayValue(_module.selectedModuleFiles , temp[i] );
				}
				
			}	
			
		};
		
		
		
		_module.ApplyPathToSelectedModuleFiles = function(){

			if( $.trim(_module.path) == '' ) return; 
			for(var i = 0 ; i < _module.selectedModuleFiles.length; i++){
				
				_module.selectedModuleFiles[i] = _module.path + _module.selectedModuleFiles[i];
			}				
			
		};
		
		
		/******************************************
		 * 		
		 * 			< /	Loading Module  >
		 * 
		 *****************************************/
		
		
		
		
		
		var module = {};
		module.Initialize = function(){
			
			_module.initialize();
			
		};
		
		
		module.SetPath = function(path){
			
			console.log(_module);
			_module.SetPath(path);
		
		};
		
		
		module.GetPath = function(){
			
			return _module.GetPath();
		
		};
		
		
		
		module.Create = function(moduleRules){
			
			_module.Create(moduleRules);
			
		};
		
		
		
		module.Load = function(moduleName , callback){
			
			var callback = callback || $.noop ;
			_module.SaveCallback(callback);
			_module.Load(moduleName );
		
		};

		
		module.Initialize();
		return module;
	
	};
	
	
	
	
	
	
	
})(jQuery);








var module = $.module();

module.SetPath('http://pedramtech.com/Development/YottaFrameworkTest/jslib/jquery/');


var customModule ={
	a : {
		d : [  'jQuery.countWords.js' ,  'jQuery.dropdown.js'],
		k : {  j: 'jQuery.easeing.js' , l : 'jQuery.fileUpload.js' } 
	},
	c : 'jQuery.fixEvents.js'
};


module.Create(customModule);


module.Load('k',function(){
	
	console.log('Mission Accomplished');
	
});

$(document).ready(function(){
	
	
	console.log("Document Loaded");
	/*
	var modulePath = 'jQuery.countWords.js'; 
	$.Module(modulePath);
	var url =  modulePath; 
	
	$.FileLoader.SetPath('http://pedramtech.com/Development/YottaFrameworkTest/jslib/jquery/');
	$.FileLoader(['jQuery.fileUpload.js',url], function(){
		console.log("asdas");
			$("body").append("<div class='wow'>"+$.CountWords("asdasd")+"</div>");
	
	});
		
	
	
	
	
	
	//module.Set
	//console.log(module.GetPath());
	*/
	
});