
/**
 * http://www.jQueryToolkit.com 
 * @package jQuery Toolkit
 * @subpackage FileUpload
 * @author Mahdi Pedramrazi <pedramphp@gmail.com>
 * @author Scott Haselton <shaselton@gmail.com>
 * @copyright © 2010 http://jQueryToolkit.com | All rights reserved. 
 * 
 */

(function($){
	
    
	$.fileupload = function(ajaxVars,fileVars){
		
		 
		 var fileupload = {
		 	settings : {
			 	ajaxVars:{
			 		dataType : 'json' ,
			 		error    : function(XMLHttpRequest, textStatus, errorThrown){},
			 		type     : 'post',
			 		url 	 : null
			 	},
			 	fileVars :{
			 		fileSelectors : [] ,
			 		secureuri : true
			 	}
		 	},
		 	ajaxVarsOptions : ajaxVars ,
		 	fileVarsOptions : fileVars ,
		 	iframe : null ,
		 	seed : null ,
		 	form : null ,
		 	requestDone : false ,
		 	xml : {}
		 };	
		 
		 
		 
		 fileupload.initialize = function(){
			 
			 fileupload.ajaxVarsOptions = jQuery.extend({},fileupload.settings.ajaxVars,fileupload.ajaxVarsOptions);
			 fileupload.ajaxVarsOptions = jQuery.extend({}, jQuery.ajaxSettings, fileupload.ajaxVarsOptions);
			 fileupload.fileVarsOptions = jQuery.extend({},fileupload.settings.fileVars,fileupload.fileVarsOptions);
			 
			 fileupload.Settins();
			 fileupload.Action();
		 
		 }; /* </ initialize > */
		 
		 
		 
		 fileupload.Settins = function(){
			 
			 fileupload.SetupAjax();
			 fileupload.SetSeed();
			 
		 };
		 
		 
		 
		 
		 fileupload.SetupAjax = function(){ $.ajaxSetup(fileupload.ajaxVarsOptions); }

		 
		 		 
		 
		 fileupload.SetSeed = function(){
			 
			 fileupload.seed = new Date().getTime();       
			 
		 }; /* </ SetSeed > */
		 
		 
		 
		 
		 fileupload.Action = function(){
			 
			 fileupload.AjaxStart();
			 fileupload.CreateIframe();
			 fileupload.CreateForm();
			 fileupload.Upload();
			 
		 };  /* </ Action > */
		 
		 
		 
		 
		 fileupload.CreateIframe = function(){
			 	
			 	var iframeId = 'jTookitIframe' + fileupload.seed;
	            if(window.ActiveXObject) {
	            
	            	fileupload.iframe = document.createElement('<iframe id="' + iframeId + '" name="' + iframeId + '" />');
	                if(typeof fileupload.fileVarsOptions.secureuri == 'boolean'){    fileupload.iframe.src = 'javascript:false'; }
	                else if(typeof fileupload.fileVarsOptions.secureuri== 'string'){ fileupload.iframe.src = fileupload.fileVarsOptions.secureuri;  }
	            
	            }else {
	            	
	            	fileupload.iframe = document.createElement('iframe');
	            	fileupload.iframe.id = iframeId;
	            	fileupload.iframe.name = iframeId;
	            	
	            }
	            fileupload.iframe.style.position = 'absolute';
	            fileupload.iframe.style.top = '-1000px';
	            fileupload.iframe.style.left = '-1000px';

	            document.body.appendChild(fileupload.iframe);
			 
			 
		 };  /* </ CreateIframe > */
		 
		 
		 
		 
		 fileupload.CreateForm = function(){
				
			 	var formId = 'jTookitForm' + fileupload.seed;
			 	var newFile = null ,$hidden;
				fileupload.form = $('<form    action = "'+fileupload.ajaxVarsOptions.url +'"'+ 
											' method = "POST"'+ 
											' name = "' + formId + '"'+
											' id = "' + formId + '"'+
											' enctype = "multipart/form-data">'+
									'</form>');	
				for( i = 0 ; i < fileupload.fileVarsOptions.fileSelectors.length ;  i++){
					
					 newFile = $(fileupload.fileVarsOptions.fileSelectors[i]).clone();
					 newFile.appendTo(fileupload.form);
				
				}
				var formParams = fileupload.GetFormParams();
				for(i in formParams){
					
					$hidden = $("<input type = 'hidden' />");
					$hidden.attr('name',formParams[i][0]).val(formParams[i][1]);
					$hidden.appendTo(newFile);
					
				}
				
				//set attributes
				fileupload.form.css({'position' : 'absolute' , 'top' : '-1200px' , 'left' : '-1200px'});

				
				
		 };  /* </ CreateForm > */
		 
		 
		 
		 
		 fileupload.GetFormParams = function(){
			 
			 var queryStringList = {};
			 //
			 if(typeof fileupload.ajaxVarsOptions.data != 'string'){ 
			
				 fileupload.ajaxVarsOptions.data =$.param(fileupload.ajaxVarsOptions.data);  
			
			 }
			// Store as associative array.
			 fileupload.ajaxVarsOptions.data = decodeURIComponent(fileupload.ajaxVarsOptions.data);
			 var params = fileupload.ajaxVarsOptions.data.split("&"),tmp;

			 // Make associative array.
			 for (var i = 0; i < params.length; i++){
				 
			    tmp = params[i].split("=");
			    console.log(tmp);
			    queryStringList[i] = { 0 : tmp[0], 1 : tmp[1] };
			 }			 
			 return queryStringList;
			 
		 };
		 
		 
		 fileupload.Upload = function(){
			 
			  if ( fileupload.ajaxVarsOptions.beforeSend ){ fileupload.ajaxVarsOptions.beforeSend(); }
               fileupload.SubmitForm();
			  fileupload.AttachIframEvent();
				 
		 }; /* </ Upload > */
		 
		 
		 
		 
		 fileupload.SubmitForm = function(){
			
				setTimeout( function() {
					var XMLHttpRequest;
		            $('body',$(fileupload.iframe)[0].contentWindow.document).html(fileupload.form);
		            fileupload.form.submit();
				}, 1 ); 			 
			 
		 }; /* </ SubmitForm > */
		 
		 
		 
		 
		 fileupload.AttachIframEvent = function(){
			 
	            if(window.attachEvent){ $(fileupload.iframe)[0].attachEvent('onload', fileupload.IframeReloaded); }
	            else{ $(fileupload.iframe)[0].addEventListener('load', fileupload.IframeReloaded, false); } 
	            
		 }; /* </ AttachIframEvent > */
		 
		 
		 
		 
		 fileupload.IframeReloaded = function(){
			 
			 try{
				 
				 fileupload.GetXmlResponse();
				 fileupload.AnalyzeXmlResponse();
				 
			 }catch(e){ fileupload.AjaxError(e);}   	
			 
		 }; /* </ IframeReloaded > */
		 
		 
		 
		 
		 
		 fileupload.GetXmlResponse = function(){	
			 
			 	var $iframe = $(fileupload.iframe)[0];
	            				
				if($iframe.contentWindow){
				
					fileupload.xml.responseText = $iframe.contentWindow.document.body ? $iframe.contentWindow.document.body.innerHTML : null;
					fileupload.xml.responseXML  = $iframe.contentWindow.document.XMLDocument ? $iframe.contentWindow.document.XMLDocument : $iframe.contentWindow.document;
				
				}else if($iframe.contentDocument){
				
					fileupload.xml.responseText = $iframe.contentDocument.document.body ? $iframe.contentDocument.document.body.innerHTML : null;
					fileupload.xml.responseXML  = $iframe.contentDocument.document.XMLDocument ? $iframe.contentDocument.document.XMLDocument : $iframe.contentDocument.document;
				
				}						
	   
	            
		 }; /* </ GetXmlResponse > */
		 
		 
		 
		 fileupload.AnalyzeXmlResponse = function(){
	        
			 if(fileupload.xml){
	            	
	            	var processedData = fileupload.ShapeXmlResponse();
	            	if ( fileupload.ajaxVarsOptions.success ){ fileupload.ajaxVarsOptions.success( processedData, true ); }
	                if ( fileupload.ajaxVarsOptions.global ){
	                	jQuery.event.trigger( "ajaxSuccess", [fileupload.xml,fileupload.ajaxVarsOptions] );
	                	jQuery.event.trigger( "ajaxComplete", [fileupload.xml,fileupload.ajaxVarsOptions] ); 
	                }
	                // Handle the global AJAX counter
	                if ( fileupload.ajaxVarsOptions.global && ! --jQuery.active )     jQuery.event.trigger( "ajaxStop" );
	                // Process result
	                if ( fileupload.ajaxVarsOptions.complete ){ fileupload.ajaxVarsOptions.complete(fileupload.xml, true);  }
	                $(fileupload.iframe).unbind();
	                fileupload.requestDone = true;
	                setTimeout(function(){	
	                	try {$(fileupload.iframe).remove();} 
	                	catch(e){ fileupload.AjaxError(e);}									
	                }, 100)	
	                
	                fileupload.xml = null;
	            }
          
		 };/* </ AnalyzeXmlResponse > */
		 
		 
		 
		 
		 fileupload.ShapeXmlResponse = function(){
			
			   var data = (fileupload.ajaxVarsOptions.dataType == "xml") ? fileupload.xml.responseXML : fileupload.xml.responseText;
			   switch(fileupload.ajaxVarsOptions.dataType){
			   	
					case "script" : jQuery.globalEval( data ); break;
					case "json" :   eval( "data = " + data );  break;	
					case "html" :   jQuery("<div>").html(data).evalScripts();	break;
					
			   }
			   return data;
		   
		 };/* </ ShapeXmlResponse > */
		 
		 
		 
		 // Watch for a new set of requests
	     fileupload.AjaxStart = function(){

		        if ( fileupload.ajaxVarsOptions.global && ! jQuery.active++ ){ jQuery.event.trigger( "ajaxStart" );}     			 
		        if ( fileupload.ajaxVarsOptions.global ) jQuery.event.trigger( "ajaxSend" , [fileupload.xml, fileupload.ajaxVarsOptions]);
		        
		 };/* </ AjaxStart > */
		 
		 
		 
		 
		 fileupload.AjaxError = function(e){
			 
			 jQuery.handleError(fileupload.ajaxVarsOptions, fileupload.xml, null, e);
			 if ( fileupload.ajaxVarsOptions.complete ){
				 fileupload.ajaxVarsOptions.error(fileupload.xml, null, e);
			 }
		 
		 };/* </ AjaxError > */
		 
		 
		 return fileupload.initialize();
		 
		 
	} /* </ fileupload > */
	
})(jQuery);




$(window).load(function(){
	
	$(".button").click(function(){
		
		var data = 'par1=textvariable&par2=variable2&par3[]=var1&par3[]=var2';
		/*var  data = {
				i :1 ,
				j :2,
				k : [1,2] 
		};*/
		
			var ajaxVars = {
					url : 'http://pedramtech.com/Development/YottaFrameworkTest/?action=FileTest',
					success : function(data){
						console.log("success");
						console.log(data);
					},
					error : function(a,b,c){
						
						console.log("this is a error",a,b,c);
						
					},
					data : data
			};
			
			var fileVars = {
			
					fileSelectors : ['#file1','#file2']
			
			};/*
			$("body").ajaxError(function(){
				$(this).text('Triggered ajaxError handler.');
		
			});
			*/
			$.fileupload(ajaxVars,fileVars);

	});
});