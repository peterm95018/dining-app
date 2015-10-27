var MenuScript = function(locations){

	//Locations is an object with a set of fields of 
	//location id numbers to whether we look in our database or the dining dept's
	//Ex: this.locations[id] === true

	//Save the data
	this.locations = locations;
};

MenuScript.prototype.getAndroidVersion = function(ua) {//Stolen straight from http://stackoverflow.com/q/7184573
	var ua = ua || navigator.userAgent; 
	var match = ua.match(/Android\s([0-9\.]*)/);
	return match ? match[1] : false;
}


MenuScript.prototype.getLocationInfo = function(id) {
	var that = this;

	// wrap the call to menu and menu2.php in a conditional
	 if(this.locations[22] === true) {
		// call menu2.php and run DISTINCT query
		// XMLHttpRequest lets us send variables in the URL to the PHP
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'menu2.php', true);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');//Supports old browsers
		xhr.onload = function () { //Listener that waits for XmlHttp request, then it gets JSON from php once loaded
			//In case the json data is empty, do this first
			//Clear the html content of the tabs and modal stuff
			$("#myTabs").html("");
			$("#myTabContent").html("");

			if (this.responseText == undefined)
				var jsonObj = [];
			else 
				var jsonObj = $.parseJSON(this.responseText);// The JSON grabbed from the php
				that.updateModal(jsonObj, that.locations[id]);
	};

	var today = moment().format("MM/DD/YYYY"); //Eg: 07/24/2014
	xhr.send('serve_date=' +today+ '&location_num=' + id + '&foodproDB=' + this.locations[id]);//Send the data over the URL

		} else {
				// XMLHttpRequest lets us send variables in the URL to the PHP
				var xhr = new XMLHttpRequest();
				xhr.open('POST', 'menu.php', true);
				xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');//Supports old browsers
				xhr.onload = function () { //Listener that waits for XmlHttp request, then it gets JSON from php once loaded
					//In case the json data is empty, do this first
					//Clear the html content of the tabs and modal stuff
					$("#myTabs").html("");
					$("#myTabContent").html("");

					if (this.responseText == undefined)
						var jsonObj = [];
					else 
						var jsonObj = $.parseJSON(this.responseText);// The JSON grabbed from the php
						that.updateModal(jsonObj, that.locations[id]);
			};

			var today = moment().format("MM/DD/YYYY"); //Eg: 07/24/2014
			xhr.send('serve_date=' +today+ '&location_num=' + id + '&foodproDB=' + this.locations[id]);//Send the data over the URL

		}
	
};

MenuScript.prototype.updateModal = function(jsonData, isFoodPro) {
	//We need to make and format all of the categories in html

	//First gather all relevant categories
	if(isFoodPro) {
		var categories = ["breakfast", "lunch", "dinner"];
	}
	else {
		var categories = [];
		for(var j = 0; j < jsonData.length; j++) {
			var row = jsonData[j];

			if(! $.inArray(row.Category, categories)) {
				categories.push(row.Category);
			}
		}
	}



	// For our Perk Coffee carts we want to change the tabs
	// and then we'll fill items with the DISTINCT query results from
	// menu2.php
	// if(isFoodPro && this.locations[22] === true) {
	// 	var categories = ["items", "lunch", "dinner"];
	// }
	

	//now create the correct HTML
	for(var i = 0; i < categories.length; i++) {
		//store IDs with _ instead of spaces
		var noSpaceCat = categories[i].replace(/ /g, "_");

		//Create tabs
		var $tabs = $("#myTabs");
		if(i === 0){
			$tabs.append(
				"<li class='active' id='" + noSpaceCat + "Tab'>"
					+"<a style='outline:0' href='#"+noSpaceCat+"' role='tab' data-toggle='tab'>"
						+categories[i]
					+"</a>"
				+"</li>");
		} else {
			$tabs.append(
				"<li id='" + noSpaceCat + "Tab'>"
					+"<a style='outline:0' href='#"+noSpaceCat+"' role='tab' data-toggle='tab'>"
						+categories[i]
					+"</a>"
				+"</li>");
		}

		//Create Tab Content
		var $tabcontent = $("#myTabContent");
		if(i === 0){
			$tabcontent.append("<div class='tab-pane active' style='padding-top:10px;' id='"+noSpaceCat+"'></div>");
		} else {
			$tabcontent.append("<div class='tab-pane' style='padding-top:10px;' id='"+noSpaceCat+"'></div>");
		}

		//Push the accordion onto the tabcontent
		$("#"+categories[i]).append('<div class="panel-group" id="'+noSpaceCat+'accordion"></div>');
	} // end categories.length

	//Now we need to push food items retrieved from DB query into the correct accordions
	// jsonData is an array of objects returned from the FoodPro system
	for(var j = 0; j < jsonData.length; j++) {
		var row = jsonData[j];

		//Obtain the correct category string of the food item, depending on the database being pulled from.
		// Remember that we have a MySQL db and the FoodPro DB.
		var category = "";
		if(isFoodPro) {
			switch(row.Meal_Number) {
				case "1": category = "breakfast";
						  break;
				case "2": category = "lunch";
						  break;
				case "3": category = "dinner";
						  break;
			}
		} else {
			category = row.Category.replace(/ /g, "_");
		}

		//Check for allergens
		var allergenInfo = "No allergens";
		if( row.Allergens.trim() ) {
			allergenInfo = "Allergens: " + row.Allergens.trim() + "<br>";
		}

		//Check for Android version, earlier Android versions can't render accordion data
		var androidversion = parseInt(this.getAndroidVersion());

		//Build up the menu_item, if on android, don't make it collapsible
		var menu_item = "";
		if(androidversion < 3) {
			menu_item = "<p style='font-size:14px;padding-left:7px;'>" + 
							"&middot;" + row.Recipe_Print_As_Name; + 
						"</p>";
		} else {
			menu_item = '<div class="panel panel-success">' +
				'<div class="panel-heading">' +
					'<p class="panel-title">' +
						'<a data-toggle="collapse" data-parent="#'+category+'accordion" href="#collapse' + j + '">' +
							row.Recipe_Print_As_Name + //Item title
						'</a>' +
					'</p>' +
				'</div>' +
				'<div id="collapse' +j+ '" class="panel-collapse collapse">' +
					'<div class="panel-body">' + 
						allergenInfo +
					'</div>' +
				'</div>' +
			'</div>';
		}

		//Now write the menu item to the correct accordion
		$("#"+category+"accordion").append(menu_item);
		
	} // end jsonData.length
} // end updateModal()
