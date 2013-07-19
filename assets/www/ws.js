$("#page-home").live("pageshow", function() {
		
		GetAllVehicleData();
		toggleWatchPosition();
		
	});
function setlat(val){
	
	$('#clat').val(""+val);
}
function setlong(val){
	
	$('#clong').val(""+val);
	//alert("getpresent addres gogogo");
	getpresentAddress();

}
function getlat(){
	
	return $('#clat').val();
}
function getlong(){
	return $('#clong').val();
}
function setDeviceId(id){
	$('#DeviceId').val(""+id);
	
}
function getDeviceId(){
	
	return $('#DeviceId').val();
}
function setSimNum(num){
	
	$('#SimNum').val(""+num);
}
function getSimNum(){
	
	return $('#SimNum').val();
}
function setVehicleNum(num){
	
	$('#VehicleNum').val(""+num);
}
function getVehicleNum(){
	
	return $('#VehicleNum').val();
	
}
function setpresentLoc(loc){
	 $("#uSourceTextField").val(""+loc);
	$("#presentLoc").val(""+loc);
}
function getpresentLoc(){
	
	return $("#presentLoc").val();
}

$(document).ready(function(){
	//function onDeviceReady(){
		$('#page-home').live("pageinit", function() {
			
			
		});
		$("#Status").live("click",function(){
			if($("#Status").attr("isEnable")=="false")
		      EnableDisableFun("Status","Available",true);
			else
				EnableDisableFun("Status","Available",false);
			
		});
	$("#SOS").live("click",function(){
			
		if($("#SOS").attr("isEnable")=="false")
		      EnableDisableFun("SOS","",true);
			else
				EnableDisableFun("SOS","",false);
		});
	$("#Busy").live("click",function(){
		
		if($("#Busy").attr("isEnable")=="false")
		      EnableDisableFun("Busy","",true);
			else
				EnableDisableFun("Busy","",false);
	});
	$("#SMS").live("click",function(){
		

		if($("#SMS").attr("isEnable")=="false")
		      EnableDisableFun("SMS","",true);
			else
				EnableDisableFun("SMS","",false);
	});
	$("#BreakDown").live("click",function(){
		

		if($("#BreakDown").attr("isEnable")=="false")
		      EnableDisableFun("BreakDown","",true);
			else
				EnableDisableFun("BreakDown","",false);
		
	});
	$("#SpeedAlert").live("click",function(){
		

		if($("#SpeedAlert").attr("isEnable")=="false")
		      EnableDisableFun("SpeedAlert","",true);
			else
				EnableDisableFun("SpeedAlert","",false);
		
	});

//		var uagent = navigator.userAgent.toLowerCase();
//		var deviceIphone = "iphone";
//		var deviceIpod = "ipod";
//		var devicePalm = "palm";
//		var deviceS60 = "series60";
//		var deviceSymbian = "symbian";
//		var engineWebKit = "webkit";
//		var deviceAndroid = "android";
//		var deviceWinMob = "windows ce";
//		var deviceWinPhone = "windows phone";
//		var deviceBB = "blackberry";
//		var type="";
	//
//		//**************************
//		// Detects if the current device is an iPhone.
	//
//		   if (uagent.search(deviceIphone) > -1)
//	         type="iphone";
//		   else if(uagent.search("windows") > -1)//	   else
//	        type="windows";
//		   else if(uagent.search(deviceAndroid)>-1)
//	       type="android";
	//	getCurrentPosition(); 
		//getLocation();toggleWatchPosition
		toggleWatchPosition();
		$('#goBtn').live('click',function(){
			
			 $.mobile.changePage($('#page-map'), {changeHash:true, reloadPage:true});
			
		});
		$('#page-map').live('pageshow', function() {
			
		    $('#map-canvas').empty();
		    createGMap();
		   
		    $('#map_square').click( function() { 
		        $.mobile.changePage($('#page-map'), {});
		    });
			
		});
		$("#page-gps").live("pageshow", function() {
			getpresentAddress();
		});
		//gps page
		$("#page-gps").live("pageinit", function() {
			//alert(getlat());
			//alert(getlong());
			//console.log
			var defaultBounds = new google.maps.LatLngBounds(
					  new google.maps.LatLng(getlat(),getlong()),
					  new google.maps.LatLng(getlat(),getlong()));
//					mapdata,mapdata);
			
			var input = document.getElementById('ulocationTextField');	
			var input2= document.getElementById('uSourceTextField');	
			var input3=document.getElementById('ufuelStation');

			var options = {
			  bounds: defaultBounds,
			//		bounds:mapdata,
			  types: ['(regions)'],
			  componentRestrictions: {country: 'in'}
			};
			
			var cache = {};
			autocomplete = new google.maps.places.Autocomplete(input, options);
			autocomplete2 = new google.maps.places.Autocomplete(input2, options);
			autocomplete3=new google.maps.places.Autocomplete(input3,options);
			
		//	getpresentAddress();
			$('#map_square').gmap(
		        {
		          'center' : new google.maps.LatLng(getlat(),getlong()), 
		          'zoom' : 12, 
		          'mapTypeControl' : false, 
		          'navigationControl' : false,
		          'streetViewControl' : false 
		        })
		        .bind('init', function(evt, map) { 
		            $('#map_square').gmap('addMarker', 
		                { 'position': map.getCenter(), 
		                  'animation' : google.maps.Animation.DROP
		 });                                                                                                                                                                                                               
		        });
		
		  // alert("new val"+getlat()+"/"+getlong());
		
		    
		});
		//Create the map then make 'displayDirections' request
		$('#page-map').live("pageinit", function() {
		//alert(getlat()+"/"+getlong());
			$('#map_canvas').gmap({'center' : new google.maps.LatLng(getlat(), getlong()), 
		        'mapTypeControl' : true, 
		        'navigationControl' : true,
		        'navigationControlOptions' : {'position':google.maps.ControlPosition.LEFT_TOP}
		        })
		    .bind('init', function() {
		        $('.refresh').trigger('tap');        
		    });
		});
		// Request display of directions, requires jquery.ui.map.services.js
		var toggleval = true; // used for test case: static locations
		$('.refresh').live("tap", function() {
	       return createGMap();
		});

		//Go to map page to see instruction detail (zoom) on map page
		$('#dir_panel').live("tap", function() {
		    $.mobile.changePage($('#page-map'), {});
		});

		// Briefly show hint on using instruction tap/zoom
		$('#page-dir').live("pageshow", function() {
		    fadingMsg("Tap any instruction<br/>to see details on map");
		});
		
	$('#manageFuelPage').live('click',function(){
		
		$.mobile.changePage($('#page-manage-fuel'),{});
	});
	
	$('#manageTyresPage').live('click',function(){
		$.mobile.changePage($('#page-manage-tyre'),{});
	});
	
	$('#servicingPage').live('click',function(){
		$.mobile.changePage($('#page-servicing'),{});
	});
	
	$('#maintainancePage').live('click',function(){
	
		$.mobile.changePage($('#page-maint'),{});
	});
	
	$('#page-config-vehicle').live('click',function(){
		
		$.mobile.changePage($('#page-vehicle'),{});
	});
	
	$('#page-config-server').live('click',function(){
		$.mobile.changePage($('#page-ServerSet'),{});
	});
	
	$('#saveServerUrl').live('click',function(){
		
		var url=$('#serverUrl').val();
		var port=$('#serverPort').val();
		console.log(url+"/"+port);
		
	});
	
	$('#saveUidPwd').live('click',function(){
		
		var uId=$('#userId').val();
		var pwd=$('#userPwd').val();
		console.log(uId+"/"+pwd);
	});
	
	$('#saveManageTyre').live('click',function(){
		var dId=getDeviceId();
		var tType=$("input[type='radio'][name='radio-choice-1']:checked").val();
		var tPos=$('#combolist2 :selected').val();
		var tModel=$('#uTyreModel').val();
		var tMake=$('#uTyreMake').val();
		var tCost=$('#uTyreCost').val();
		var tLife=$('#uTyreLife').val();
		var odoReading=$('#uOdoReading').val();
		var replaceDt=$('#uReplacementDate').val(); // some mock date
		//var milliseconds = replaceDt.getTime();
//		{
//			"requestMetadata":{
//				"pulse":"String content"
//			},
//			"tyreEntry":{
//				"deviceId":"String content",
//				"tyreType":0,
//				"tyrePosition":"String content",
//				"tyreModel":"String content",
//				"tyreMake":"String content",
//				"tyreCost":12678967.543233,
//				"tyreLife":12678967.543233,
//				"replacementDate":"\/Date(928129800000+0530)\/",
//				"odoMeter":12678967.543233,
//				"location":{
//					"remoteDeviceId":"String content",
//					"gpsData":"String content"
//				}
//			}
//		}
//		}
		
		var sendData = {requestMetadata:{"pulse":"("+getlat()+","+getlong()+")"},tyreEntry:{deviceId:getDeviceId(),tyreType:"0",tyrePosition:"1",tyreModel:tModel,tyreMake:tMake,tyreCost:tCost,
			tyreLife:tLife,replacementDate:replaceDt,odoMeter:odoReading,location:{remoteDeviceId:getDeviceId(),gpsData:"("+getlat()+","+getlong()+")"}}};
		
		var ArrayData=[];
			ArrayData.push(sendData);
		var jsonSendData=$.toJSON(sendData);
		console.log(jsonSendData);	
		
		$.ajax({
	        type: "POST",
	        url: "http://118.102.149.213:13004/MobileService.svc/createVehicleTyreEntry",
	        data: jsonSendData,
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	       
	        error: function (msg) {
	        	console.log("error");
	        	console.log(msg);
	        },


	        success: function (msg) {
	        	console.log("Response Data: "+msg);
	        	console.log(msg.responseMetadata.serviceMessage);
	        	
	        	
	        	
	        }
		});
		

		
		
		
		
	});
	
	$('#saveServicing').live('click',function(){
		var serviceDt=$('#sevicedt').val();
		var serviceType=$("input[type='radio'][name='radio-choice-2']:checked").val();
		var station=$('#srstn').val();
		var serviceDesc=$('#srdesc').val();
		var cost=$('#cst').val();
		var odoReading=$('#sodomtrrdng').val();
		var uReplaceDate=$('#nxtSrvDate').val();
		var uBillNo=$('#sbillno').val();
		var uBillDt=$('#sbilldt').val();
		var uBillAmt=$('#sbillamt').val();
		alert(serviceDt+"/"+serviceType+"/"+station+"/"+serviceDesc+"/"+cost+"/"+odoReading+"/"+uReplaceDate+"/"+uBillNo+"/"+uBillDt+"/"+uBillAmt);
		
//		<td>3</td><td>Service Station</td><td><input type="text" id="uServiceStation" minlength="3" placeholder="Service Station"/></td></tr>
//
//		<tr><td>4</td><td>Service Description</td><td><input type="text" id=uServiceDesc minlength="3" placeholder="Service Description"/></td></tr>
//		<tr><td>5</td><td>Cost</td><td><input type="text" id="uCost" minlength="3" placeholder="Cost"/></td></tr>	
//		<tr><td>6</td><td>Odo Meter Reading</td><td><input type="text" id="uOdoReadingSvc" minlength="3" placeholder="Odometer Reading"/></td></tr>			
//		<tr><td>7</td><td>Next Service Date</td><td><input type="date" id="uReplacementDate" minlength="3" placeholder="Next Service Date"/></td></tr>
//		uBillNumb" minlength="3" placeholder="Bill Number"/></td></tr>	
//		<tr><td>9</td><td>Bill Date</td><td><input type="text" id="uBillDt" minlength="3" placeholder="Bill Date"/></td></tr>
//		<tr><td>10</td><td>Bill Amount</td><td><input type="text" id="uBillAmt
//		
		
		
		
			var sendData = {requestMetadata:{"pulse":"("+getlat()+","+getlong()+")"},serviceEntry:  {deviceId:getDeviceId(),serviceType:serviceType,serviceDate:serviceDt,serviceStation:station,
			    serviceDetails:serviceDesc,nextServiceDate:uReplaceDate,billNum:uBillNo,billDate:uBillDt,billAmount:uBillAmt,odoMeter:odoReading,
			    location:{remoteDeviceId:getDeviceId(),gpsData:"("+getlat()+","+getlong()+")"}}};
		var ArrayData=[];
			ArrayData.push(sendData);
		
		var jsonSendData=$.toJSON(sendData);
		console.log(jsonSendData);
		$.ajax({
	        type: "POST",
	        url: "http://118.102.149.213:13004/MobileService.svc/createVehicleServiceEntry",
	        data: jsonSendData,
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	       
	        error: function (msg) {
	        	console.log("error");
	        	console.log(msg);
	        },


	        success: function (msg) {
	        	console.log("Response Data: ");
	        	console.log(msg.responseMetadata.serviceMessage);
	        	
	        	
	        	
	        }
		});
		
		
		
	});
	
	$('#saveFuel').live('click',function(){
		var billNo=$('#uBillNo').val();
		var billDt=$('#uBillDateTime').val();
		
		var billAmt=$('#uBillAmt').val();
		var NLtr=$('#uNoOfLiters').val();
		var FuelStation=$('#ufuelStation').val();
		var OdoMtrReading=$('#uOdometerReading').val();
		console.log(billNo+"/"+billDt+"/"+billAmt+"/"+NLtr+"/"+FuelStation+"/"+OdoMtrReading);

		console.log(billDt);
		var sendData = {"requestMetadata":{"pulse":"("+getlat()+","+getlong()+")"},
		"fuelEntry":{"deviceId":getDeviceId(),
		"billNum":billNo,
		"billDate":billDt,
		"billAmount":billAmt,
		"qty":NLtr,
		"fuelStation":FuelStation,
		"odoMeter":OdoMtrReading,
		"location":{
			"remoteDeviceId":getDeviceId(),
			"gpsData":"("+getlat()+","+getlong()+")"
		},
		"UnitofMeasure":"ltr"}};
		
		
		var jsonSendData=$.toJSON(sendData);
		console.log("sending data is ....");
		console.log(jsonSendData);
		var myurl="http://118.102.149.213:13004/MobileService.svc/createVehicleFuelEntry";
		console.log(myurl);
		$.ajax({
	        type: "POST",
	        url: myurl,
	         data: jsonSendData,
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	       
	        error: function (msg) {
	        	console.log("error");
	        	console.log(msg);
	        },


	        success: function (msg) {
	        	console.log("Response Data: ");
	        	console.log(msg);
	        	console.log(msg.responseMetadata.serviceMessage);
	        	
	        	
	        	
	        }
		});
		
	});
	
	$("#page-vehicle").live("pageshow",function(){
	
		$('#udeviceId').val(""+getDeviceId());
		$('#uSimNo').val(""+getSimNum());
		$('#uVehicleNo').val(""+getVehicleNum());
 
		console.log(VehicleSettings);
		for(var i=0;i<VehicleSettings.length;i++){
			
			//alert(VehicleSettings[i].data);
			switch(VehicleSettings[i].name){
			
			case "Status": 
				
			$("#checkbox-1").prop("checked", VehicleSettings[i].isEnabled).checkboxradio("refresh"); 
				           break;
			case "Busy": 
				
				$("#checkbox-2").prop("checked", VehicleSettings[i].isEnabled).checkboxradio("refresh"); 
					           break;
			case "BreakDown":
				$("#checkbox-3").prop("checked", VehicleSettings[i].isEnabled).checkboxradio("refresh"); 
		           break;
			 
			case "SOS":
				$("#checkbox-4").prop("checked", VehicleSettings[i].isEnabled).checkboxradio("refresh"); 
				$("#uSos").val(VehicleSettings[i].data);
				break;
			case "Call":
				$("#checkbox-5").prop("checked", VehicleSettings[i].isEnabled).checkboxradio("refresh"); 
				break;
			case "SMS":
				$("#checkbox-6").prop("checked", VehicleSettings[i].isEnabled).checkboxradio("refresh"); 
				break;
			case "Police":
				$("#checkbox-7").prop("checked", VehicleSettings[i].isEnabled).checkboxradio("refresh"); 
				break;
			case "SpeedAlert" :
				$("#checkbox-8").prop("checked", VehicleSettings[i].isEnabled).checkboxradio("refresh"); 
				$("#uSpeed").val(VehicleSettings[i].data);
				break;
			
		
			}
			
		}
		
		
	});
		
$('#UpdateVehicleData').live('click',function(){
	
	var dId=$('#udeviceId').val();
	var simNo=$('#uSimNo').val();
	var vehicleNo=$('#uVehicleNo').val();
	var vehicleSet=[];

	
	$("input[type='checkbox'][name*='checkbox-']").each(function() {
		
		if($(this).attr("mychoice")!="SOS" && $(this).attr("mychoice")!="SpeedAlert" && $(this).attr("mychoice")!="Status")
			
		      vehicleSet.push({name:$(this).attr("mychoice"),data:"",isEnabled:($(this).attr('checked')=='checked')});
		
        else{
        	
        	if($(this).attr("mychoice")=="SOS")
        	        vehicleSet.push({name:$(this).attr("mychoice"),data:$("#uSos").val(),isEnabled:($(this).attr('checked')=='checked')});
        	else if($(this).attr("mychoice")=="Status")
                vehicleSet.push({name:$(this).attr("mychoice"),data:"Available",isEnabled:($(this).attr('checked')=='checked')});
        	else
        	  	vehicleSet.push({name:$(this).attr("mychoice"),data:$("#uSpeed").val(),isEnabled:($(this).attr('checked')=='checked')});
            
           }
	});
	
	

	var sendData = {requestMetadata:{pulse:"("+getlat()+","+getlong()+")"},vehicleData:{deviceId:getDeviceId(),sim:getSimNum(),vehicleNum:getVehicleNum(),vehicleSettings:vehicleSet}};
	
	
	var ArrayData=[];
		ArrayData.push(sendData);
	var jsonSendData=$.toJSON(sendData);
	console.log(JSON.stringify(sendData));

	$.ajax({
        type: "POST",
        url: "http://118.102.149.213:13004/MobileService.svc/updateVehicleData",
        data:jsonSendData,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
       
        error: function (msg) {
        	console.log("error");
        	console.log(msg);
        },


        success: function (msg) {
        	console.log("Response Data: ");
        	console.log(msg);
        	console.log(msg.responseMetadata.serviceMessage);
        	
        	
        	
        }
	});
	});

$('#gpsPage').live('click',function(){
	
	$.mobile.changePage($('#page-gps'), {});
	
	
});

$('#statsPage').live('click',function(){
	
	$.mobile.changePage($('#page-status'),{});
	
});

$('#maintainencePage').live('click',function(){
	
	$.mobile.changePage($('#page-maint'),{});
	
});

$('#configurationPage').live('click',function(){
	
	$.mobile.changePage($('#page-config'),{});
	
});
//	};
});
var VehicleSettings;
function addStatusValue(){
	
	for(var i=0;i<VehicleSettings.length;i++){
		
		if(VehicleSettings[i].isEnabled==false){
			$("#"+VehicleSettings[i].name).removeClass("status-btn").addClass("status-btn-off").trigger("cssClassChanged");
			
		}else{
			
			$("#"+VehicleSettings[i].name).removeClass("status-btn-off").addClass("status-btn").trigger("cssClassChanged");
			
			
		}
			
		   $("#"+VehicleSettings[i].name).attr("isEnable",VehicleSettings[i].isEnabled);
		   
		}
	
}

function GetAllVehicleData()
{
	var myurl="http://118.102.149.213:13004/MobileService.svc/getVehicleData?remoteId=8780&deviceId=8780";
	console.log("getallvehicleData",myurl);
	$.ajax({
        type: "GET",
        url: "http://118.102.149.213:13004/MobileService.svc/getVehicleData?remoteId=8780&deviceId=8780",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
       
        error: function (msg) {
        	console.log("error");
        	console.log(msg);
        },


        success: function (msg) {
        	console.log("success");
        	console.log(msg);
        	var VehicleData=msg.vehicleData;
        	 VehicleSettings=VehicleData.vehicleSettings;
        	console.log("vehicle Data",VehicleData);
        	//deviceId: "8780", sim: "8374151234", vehicleNum: "AP28T 8688"
        	setDeviceId(VehicleData.deviceId);
        	setSimNum(VehicleData.sim);
        	setVehicleNum(VehicleData.vehicleNum);
        	addStatusValue();

        	
        }
	});
	

}
function EnableDisableFun(name,data,value){
	
	var vehicleSet=[];

		
			      vehicleSet.push({name:name,data:data,isEnabled:value});
			
	      
		var sendData = {requestMetadata:{pulse:"("+getlat()+","+getlong()+")"},vehicleData:{deviceId:getDeviceId(),sim:getSimNum(),vehicleNum:getVehicleNum(),vehicleSettings:vehicleSet}};
		
		
		var ArrayData=[];
			ArrayData.push(sendData);
		var jsonSendData=$.toJSON(sendData);
		console.log(JSON.stringify(sendData));

		$.ajax({
	        type: "POST",
	        url: "http://118.102.149.213:13004/MobileService.svc/updateVehicleData",
	        data:jsonSendData,
	        contentType: "application/json; charset=utf-8",
	        dataType: "json",
	       
	        error: function (msg) {
	        	console.log("error");
	        	console.log(msg);
	        },


	        success: function (msg) {
	        	console.log("Response Data: ");
	        	console.log(msg);
	        	console.log(msg.responseMetadata.serviceMessage);
	        	
	        	GetAllVehicleData();
	        	
	        	
	        }
		});
	}

