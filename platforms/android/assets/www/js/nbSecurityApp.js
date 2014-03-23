"use strict"

function nbSecurityApp(){
	this.assetObj;
}

nbSecurityApp.prototype = {
	//restore constructor
	constructor: nbSecurityApp,
	
	getAlarmState: function(){		
		return this._ajax('GET', 'http://mattmcalear.net/customFiles/NB/nbSecurityApp.php', 'getData=alarmState');
	},
	
	arm: function(){
		var that = this;
		
		//Will invoke 5 times to make sure all assets have been triggered
		var count = 0;
		var intervalID = window.setInterval(function(){
			var r = that._ajax('GET', 'http://mattmcalear.net/customFiles/NB/nbSecurityApp.php', 'setState=arm');
			document.getElementById('arm').className = "ui-btn ui-corner-all ui-btn-active";
			document.getElementById('disarm').className = "ui-btn ui-corner-all";
			
			if(r != 1){ console.log(r); }
			
			count++;
			
			if(count == 5){ clearInterval(intervalID); }
		}, 500);
	},
	
	disarm: function(){
		var that = this;
			
		//Will invoke 5 times to make sure all assets have been triggered
		var count = 0;
		var intervalID = window.setInterval(function(){
			var r = that._ajax('GET', 'http://mattmcalear.net/customFiles/NB/nbSecurityApp.php', 'setState=disarm');
			document.getElementById('disarm').className = "ui-btn ui-corner-all ui-btn-active";
			document.getElementById('arm').className = "ui-btn ui-corner-all";
			
			if(r != 1){ console.log(r); }
			
			count++;
			
			if(count == 5){ clearInterval(intervalID); }
		}, 500);
	},
	
	getAssets: function(){
		return this._ajax('GET', 'http://mattmcalear.net/customFiles/NB/nbSecurityApp.php', 'getAssets=true');		
	},
			
	//Private Methods
	_ajax: function(method, location, queryString){		
		var that = this;
	    $.ajax({
	    	 //async: false,
	         url: location,
	         method: 'post',
	         dataType: 'jsonp',
	         contentType: "application/json; charset=utf-8",
	         data: queryString,
	         success:function(json){
	         	//console.log(json);
	         	that._hideLoader();
	         	
	         	if(json == 1){
	         		//Great success!!
	         	}else if(json == 'armed'){
	            	document.getElementById('arm').className += " ui-btn-active";
	            }else if(json == 'disarmed'){
		            document.getElementById('disarm').className += " ui-btn-active";
	            }else{
		            that.assetObj = json;
		            
		            that._setAssets();
	            }
	            
	            /*else if(json.substr(0, 25) == '<ul data-role="listview">'){
		            document.getElementById('nbAssetDisplay').innerHTML = json;
		            //Repaints CSS
		            //$( "div[data-role=page]" ).page( "destroy" ).page();
	            }else if(json.substr(0, 34) == '<ul data-role="listview" id="sub">'){
		            document.getElementById('nbSubAssetDisplay').innerHTML = json;
		            //Repaints CSS
		            //$( "div[data-role=page]" ).page( "destroy" ).page();
	            }*/
	            
	            return json;	            
	         },
	         error:function(XHR, textStatus, errorThrown){	         	
	         	//console.log(new Array(XHR, textStatus, errorThrown));
	         	return textStatus;
	         }
	    });	    
	},
		
	_hideLoader: function(){
		/*
			Need to call seperate id's 
			as they seem to be trying to 
			access the element on the other 
			page and will not remove the proper id
		*/
		if(document.getElementById('ajaxLoader'))
			document.getElementById('ajaxLoader').innerHTML = '';
		if(document.getElementById('ajaxLoader2'))
			document.getElementById('ajaxLoader2').innerHTML = '';
	},
	
	_getUrlVars: function(){
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	},
	
	_isEmpty: function(obj){
	    // null and undefined are "empty"
	    if (obj == null) return true;
	
	    // Assume if it has a length property with a non-zero value
	    // that that property is correct.
	    if (obj.length > 0)    return false;
	    if (obj.length === 0)  return true;
	
	    // Otherwise, does it have any properties of its own?
	    // Note that this doesn't handle
	    // toString and valueOf enumeration bugs in IE < 9
	    for (var key in obj) {
	        if (hasOwnProperty.call(obj, key)) return false;
	    }
	
	    return true;
	},
	
	_setImage: function(asset){
		switch(asset.toLowerCase()){
			case 'generic state device':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/state.jpg" width="320px" height="210px" />';
				break;
			case 'temperature':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/temperature.jpg" width="320px" height="210px" />';
				break;
			case 'humidity':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/temperature.jpg" width="320px" height="210px" />';
				break;
			case 'raspberry pi outgoing network activity':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/picrust.png" width="320px" height="210px" />';
				break;
			case 'raspberry pi incoming network activity':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/picrust.png" width="320px" height="210px" />';
				break;
			case 'raspberry pi ram usage':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/picrust.png" width="320px" height="210px" />';
				break;
			case 'raspberry pi cpu temperature':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/picrust.png" width="320px" height="210px" />';
				break;
			case 'raspberry pi cpu usage':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/picrust.png" width="320px" height="210px" />';
				break;
			case 'status light':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/ninjablock.png" width="320px" height="210px" />';
				break;
			case 'on board rgb led':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/ninjablock.jpg" width="320px" height="210px" />';
				break;
			case "nina's eyes":
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/ninjablock.jpg" width="320px" height="210px" />';
				break;
			case 'rf 433mhz':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/rf433k.jpg" width="320px" height="210px" />';
				break;
			case 'sms':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/sms.jpeg" width="320px" height="210px" />';
				break;
			case 'twitter':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/twitter.png" width="320px" height="210px" />';
				break;
			case 'webhook':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/webhooks.jpg" width="320px" height="210px" />';
				break;
			case 'facebook':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/facebook.png" width="320px" height="210px" />';
				break;
			case 'google':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/google.png" width="320px" height="210px" />';
				break;
			case 'email':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/email-icon.jpg" width="320px" height="210px" />';
				break;
			case 'dropbox':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/dropbox.jpeg" width="320px" height="210px" />';
				break;
			case 'alarm button':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/push_button.jpg" width="320px" height="210px" />';
				break;
			case 'front door sensor':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/contact_sensor.jpg" width="320px" height="210px" />';
				break;
			case 'main hallway motion':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/pir_motion_sensor.jpg" width="320px" height="210px" />';
				break;
			case 'side door camera on':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/camera.png" width="320px" height="210px" />';
				break;
			case 'side door camera off':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/camera.png" width="320px" height="210px" />';
				break;
			case 'fan upstairs on':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/fan.jpg" width="320px" height="210px" />';
				break;
			case 'fan upstairs off':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/fan.jpg" width="320px" height="210px" />';
				break;
			case 'living room camera on':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/camera.png" width="320px" height="210px" />';
				break;
			case 'living room camera off':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/camera.png" width="320px" height="210px" />';
				break;
			case 'alarm button click':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/push_button.jpg" width="320px" height="210px" />';
				break;
			case 'side door sensor':
				document.getElementById('image').innerHTML = '<img src="img/nbDevices/contact_sensor.jpg" width="320px" height="210px" />';
				break;
		}
	},
	
	_setAssets: function(){
		var html = '<ul data-role="listview"><li data-role="list-divider"><a>Devices</a></li>';
		
		for (var key in this.assetObj) {
			var obj = this.assetObj[key];
			for (var prop in obj) {
		      	// important check that this is objects own property 
			  	// not from prototype prop inherited
			  	if(obj.hasOwnProperty(prop)){
			  		if(prop == 'default_name'){
				  		html += '<li><a href="#assetView" onclick="nbSecurityApp._setAssetData(\''+key+'\')">'+obj[prop]+'</a></li>';
			  		}
				}
			}
		}
				
		html += '</ul>';
		
		document.getElementById('nbAssetDisplay').innerHTML = html;
	},
	
	_setAssetData: function(guid){
		//console.log($.makeArray(this.assetObj[guid].subDevices).length);
		var guid = guid;
		var type = this.assetObj[guid].device_type;
		var name = this.assetObj[guid].default_name;
		var data = this.assetObj[guid].last_data.DA;
		var sensor = this.assetObj[guid].is_sensor;
		var actuator = this.assetObj[guid].is_actuator;
		var timestamp = this.assetObj[guid].last_data.timestamp;
		var subDevice = (this._isEmpty(this.assetObj[guid].subDevices) ? 0 : 1);
		
		document.getElementById('guid').innerHTML = guid.replace(/%20/g, ' ');
		document.getElementById('type').innerHTML = type.replace(/%20/g, ' ');
		document.getElementById('name').innerHTML = name.replace(/%20/g, ' ');
		document.getElementById('sensor').innerHTML = (sensor == 1 ? 'YES' : 'NO');
		document.getElementById('actuator').innerHTML = (actuator == 1 ? 'YES' : 'NO');
		document.getElementById('data').innerHTML = data;
		var date = new Date(timestamp*1000);
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();
		var formattedTime = hours + ':' + minutes + ':' + seconds;
		document.getElementById('timestamp').innerHTML = formattedTime;
		document.getElementById('subDevice').innerHTML = (subDevice == 1 ? '<a href="#subAssetList" onclick="nbSecurityApp._setSubAssets(\''+guid+'\')">YES</a>' : 'NO');
		
		//Set image
		this._setImage(name.replace(/%20/g, ' '));
	},
	
	_setSubAssets: function(guid){
		var html = '<ul data-role="listview"><li data-role="list-divider"><a>Devices</a></li>';
		
		for (var key in this.assetObj[guid].subDevices) {
			var obj = this.assetObj[guid].subDevices[key];
			for (var prop in obj) {
		      	// important check that this is objects own property 
			  	// not from prototype prop inherited
			  	if(obj.hasOwnProperty(prop)){
			  		if(prop == 'shortName'){
				  		html += '<li><a href="#subAssetView" onclick="nbSecurityApp._setSubAssetData(\''+guid+'\',\''+key+'\')">'+obj[prop]+'</a></li>';
			  		}
				}
			}
		}
		
		html += '</ul>';
		
		document.getElementById('nbSubAssetDisplay').innerHTML = html;
	},
	
	_setSubAssetData: function(guid, subGuid){
		var category = this.assetObj[guid].subDevices[subGuid].category;
		var data = this.assetObj[guid].subDevices[subGuid].data;
		var shortName = this.assetObj[guid].subDevices[subGuid].shortName;
		var type = this.assetObj[guid].subDevices[subGuid].type;
		
		document.getElementById('subGuid').innerHTML = subGuid.replace(/%20/g, ' ');
		document.getElementById('subCategory').innerHTML = category.replace(/%20/g, ' ');
		document.getElementById('subData').innerHTML = data.replace(/%20/g, ' ');
		document.getElementById('subShortName').innerHTML = shortName.replace(/%20/g, ' ');
		document.getElementById('subType').innerHTML = type.replace(/%20/g, ' ');		
		
		//Set image
		this._setImage(shortName.replace(/%20/g, ' '));
	}
}