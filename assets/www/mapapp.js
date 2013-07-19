//var mapdata = { destination: new google.maps.LatLng(17.4390995, 78.4268758) };

//Home page

//$(document).ready(function(){
//	$('#page-home').live("pageinit", function() {
//		
//		
//	});
//	
////	var uagent = navigator.userAgent.toLowerCase();
////	var deviceIphone = "iphone";
////	var deviceIpod = "ipod";
////	var devicePalm = "palm";
////	var deviceS60 = "series60";
////	var deviceSymbian = "symbian";
////	var engineWebKit = "webkit";
////	var deviceAndroid = "android";
////	var deviceWinMob = "windows ce";
////	var deviceWinPhone = "windows phone";
////	var deviceBB = "blackberry";
////	var type="";
////
////	//**************************
////	// Detects if the current device is an iPhone.
////
////	   if (uagent.search(deviceIphone) > -1)
////         type="iphone";
////	   else if(uagent.search("windows") > -1)//	   else
////        type="windows";
////	   else if(uagent.search(deviceAndroid)>-1)
////       type="android";
//	   
//	getLocation();
//	$('#goBtn').live('click',function(){
//		
//		 $.mobile.changePage($('#page-map'), {changeHash:true, reloadPage:true});
//		
//	});
//	$('#page-map').live('pageshow', function() {
//		
//	    $('#map-canvas').empty();
//	    createGMap();
//	   
//		
//		
//	});
//	$('#page-gps').live("pageshow", function() {
//		getpresentAddress();
//	});
//	//gps page
//	$('#page-gps').live("pageinit", function() {
//		//alert(glat);
//		//alert(glong);
//		//console.log
//		var defaultBounds = new google.maps.LatLngBounds(
//				  new google.maps.LatLng(glat,glong),
//				  new google.maps.LatLng(glat,glong));
////				mapdata,mapdata);
//		
//		var input = document.getElementById('ulocationTextField');	
//		var input2= document.getElementById('uSourceTextField');	
//
//		var options = {
//		  bounds: defaultBounds,
//		//		bounds:mapdata,
//		  types: ['(regions)'],
//		  componentRestrictions: {country: 'in'}
//		};
//		
//		var cache = {};
//		autocomplete = new google.maps.places.Autocomplete(input, options);
//		autocomplete2 = new google.maps.places.Autocomplete(input2, options);
//		getpresentAddress();
//		$('#map_square').gmap(
//	        {
//	          'center' : mapdata.destination, 
//	          'zoom' : 12, 
//	          'mapTypeControl' : false, 
//	          'navigationControl' : false,
//	          'streetViewControl' : false 
//	        })
//	        .bind('init', function(evt, map) { 
//	            $('#map_square').gmap('addMarker', 
//	                { 'position': map.getCenter(), 
//	                  'animation' : google.maps.Animation.DROP
//	 });                                                                                                                                                                                                               
//	        });
//	    $('#map_square').click( function() { 
//	        $.mobile.changePage($('#page-map'), {});
//	    });
//	    alert(glat);
//	
//	    
//	});
//	//Create the map then make 'displayDirections' request
//	$('#page-map').live("pageinit", function() {
//	    $('#map_canvas').gmap({'center' : mapdata.destination, 
//	        'mapTypeControl' : true, 
//	        'navigationControl' : true,
//	        'navigationControlOptions' : {'position':google.maps.ControlPosition.LEFT_TOP}
//	        })
//	    .bind('init', function() {
//	        $('.refresh').trigger('tap');        
//	    });
//	});
//	// Request display of directions, requires jquery.ui.map.services.js
//	var toggleval = true; // used for test case: static locations
//	$('.refresh').live("tap", function() {
//       return createGMap();
//	});
//
//	//Go to map page to see instruction detail (zoom) on map page
//	$('#dir_panel').live("tap", function() {
//	    $.mobile.changePage($('#page-map'), {});
//	});
//
//	// Briefly show hint on using instruction tap/zoom
//	$('#page-dir').live("pageshow", function() {
//	    fadingMsg("Tap any instruction<br/>to see details on map");
//	});
//	
//});
function getpresentAddress(){
	
//alert(getlat()+"/getaddresss/"+getlong());
//	$('#map_canvas').gmap({ 'center': new google.maps.LatLng(glat,glong), 'callback': function(data) {
//	    alert(data);
//	    console.log(data);
//	}});
	
//	 if ( navigator.geolocation ) { 
//	 	
//         navigator.geolocation.getCurrentPosition ( 
//             function(position) {
//             	//alert("position");
// 
	var lat=getlat();
	var lng=getlong();
	
	     // alert("Entering getAddressFromLatLang()");
	      var geocoder = new google.maps.Geocoder();
	        var latLng = new google.maps.LatLng(lat, lng);
	        geocoder.geocode( { 'latLng': latLng}, function(results, status) {
	        console.log("After getting address");
	        console.log(results);
	        if (status == google.maps.GeocoderStatus.OK) {
	          if (results[1]) {
	            console.log(results[1]);
	            //alert("oyoyoy"+results[1].formatted_address);
	            $("#uSourceTextField").val(""+results[1].formatted_address);
	          }
	        }else{
	         // alert("Geocode was not successful    for the following reason: " + status);
	        }
	        });
	      console.log("Entering getAddressFromLatLang()");
	         
//             }, 
//             function(){ 
//                 alert('Unable to get location');
//                 $.mobile.changePage($('#page-gps'), {}); 
//             }); 
//         } else {
//        	 
//             alert('Unable to get location.');
//             
//         }   

	
	
	
}
function createGMap(){
	var source= document.getElementById('uSourceTextField').value;
	 var destination = document.getElementById('ulocationTextField').value;
     // START: Tracking location with device geolocation
    console.log(destination);
     if (destination.length > 0 )
     {
	     if(source.length > 0){
	         $('#map_canvas').gmap('displayDirections', 
                 { 'origin' : source, 
                   'destination' : destination, 'travelMode' : google.maps.DirectionsTravelMode.DRIVING},
                 { 'panel' : document.getElementById('dir_panel')},
                       function (result, status) {
                           if (status == 'OK') {
                        	   
                         	   var center = result.routes[0].bounds.getCenter();
                               setpresentLoc(""+result.routes[0].legs[0].start_address);
                              // alert(getpresentLoc());
                               
                               $('#map_canvas').gmap('option', 'center', center);
                               $('#map_canvas').gmap('refresh');
                               
                           } else {
                             alert('Unable to get route');
                           }
                       }
                    );         
	     }
	     else{
	    	 $('#map_canvas').gmap('displayDirections', 
	                 { 'origin' : new google.maps.LatLng(getlat(), getlong()), 
	                   'destination' : destination, 'travelMode' : google.maps.DirectionsTravelMode.DRIVING},
	                 { 'panel' : document.getElementById('dir_panel')},
	                       function (result, status) {
	                           if (status == 'OK') {
	                        	   
	                         	   var center = result.routes[0].bounds.getCenter();
	                               setpresentLoc(""+result.routes[0].legs[0].start_address);
	                              // alert(getpresentLoc());
	                               
	                               $('#map_canvas').gmap('option', 'center', center);
	                               $('#map_canvas').gmap('refresh');
	                               
	                           } else {
	                             alert('Unable to get route');
	                           }
	                       }
	                    );     
	     }
            
}
else
	 {
	 var destinationLocUnavailable="Sorry, no destination was entered, please go back and enter the destination.";
	 $("<div class='ui-overlay-shadow ui-body-e ui-corner-all fading-msg'>" + destinationLocUnavailable + "</div>")
	    .css({ "display": "block", "opacity": 0.9, "top": $(window).scrollTop() + 100 })
	    .appendTo( $.mobile.pageContainer )
	    .delay( 2200 )
	    .fadeOut( 1000, function(){
	        $(this).remove();
	   });
	 }
     
$(this).removeClass($.mobile.activeBtnClass);
return false;

}
//unction getLocation(){
	
//	var onSuccess = function(position) {
//	   alert('Latitude: '          +      position.coords.latitude     + '\n' +
//	          'Longitude: '         + position.coords.longitude         + '\n' 
//	         );
//	    glong=position.coords.longitude  ;
//	    glat=position.coords.latitude ;
//	    //mapdata=[];
//	    mapdata={ destination: new google.maps.LatLng(glat, glong ) };
//	};
//
//	// onError Callback receives a PositionError object
//	//
//	function onError(error) {
//	    alert('code: '    + error.code    + '\n' +
//	          'message: ' + error.message + '\n'+
//	          "check GPS settings");
//	}
//
//	navigator.geolocation.getCurrentPosition(onSuccess, onError);

//}
//	else{
//		console.log("getLocation()");
//		var onSuccess = function(position) {
//		
//			var lat=position.coords.latitude;
//			var log=position.coords.longitude ;
//			
//			var myurl="http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+log+"&sensor=false";
//			
//			 var country="";
//			console.log(myurl);
//			 $.ajax({
//		 		 type:"GET",
//				 url:"http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+log+"&sensor=false",
//				 dataType:"json",
//		    		 contentType:"application/json; charset=utf-8",
//		    		 success:function(data){
//		    			
//		    			 var address=data.results[0].address_components;
//		    			 for(var i=address.length-1;i>0;i--){
//		    				 if(address[i].types[0]=="country"){
//		    					
//		    					country=address[i].long_name;
//		    					 console.log("getLocation country name",country);
//		    					break;
//		    				 }
//		    				 
//		    			 }
//		    	
//		    		setCountryName(country);
//		                	},
//		    	    		
//		    	    		error: function(msg)
//		    	    		{
//		    	    		//	$("#"+$('.ui-page-active').attr('id')).unblock();
//		    	    		console.log(msg);
//		    	    		}
//		    		});
//
//		   if(country==""){
//			   return "India";
//		   }
//		};
//
//		// onError Callback receives a PositionError object
//		//
//		var onError=function(error) {
//		    console.log('code: '    + error.code    + '\n' +
//		          'message: ' + error.message + '\n');
//		};
//
//		navigator.geolocation.getCurrentPosition(onSuccess, onError);
//	}
//}
//$("#gpsPage").live("click",function()
//		  {
//	 	console.log("Directing to App main page");
//	  }
//);



function fadingMsg (locMsg) {
    $("<div class='ui-overlay-shadow ui-body-e ui-corner-all fading-msg'>" + locMsg + "</div>")
    .css({ "display": "block", "opacity": 0.9, "top": $(window).scrollTop() + 100 })
    .appendTo( $.mobile.pageContainer )
    .delay( 2200 )
    .fadeOut( 1000, function(){
        $(this).remove();
   });
}

