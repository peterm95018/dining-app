var MenuScript = function(locations){

	//Locations is an object with a set of fields of 
	//location id numbers to whether we look in our database or the dining dept's
	//Ex: this.locations[id] === true

	//Error check formatting of data
	for(var id in locations){
		if(typeof id !== "number"){
			alert("MenuScript() declaration error: at least one id field is not an int!");
			return;
		}

		if(typeof location[id] !== "boolean"){
			alert("MenuScript() declaration error: at least one location flag is not a boolean!");
			return;
		}
	}

	//Save the data
	this.locations = locations;
};


MenuScript.prototype.getLocationInfo = function(id){
	var that = this;

	// XMLHttpRequest lets us send variables in the URL to the PHP
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'menu.php', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');//Supports old browsers
	xhr.onload = function () { //Listener that waits for XmlHttp request, then it gets JSON from php once loaded
		if (this.responseText == undefined)
			var jsonObj = [];
		else 
			var jsonObj = $.parseJSON(this.responseText, that.locations[id]);// The JSON grabbed from the php
		that.updateModal(jsonObj);
	};

	var today = moment().format("MM/DD/YYYY"); //Eg: 07/24/2014
	xhr.send('serve_date=' +today+ '&location_num=' + id + '&foodproDB=' + this.locations[id]);//Send the data over the URL

};

MenuScript.prototype.updateModal = function(menuInfo, isFoodPro){

	//This part creates the outer collapse accordion div
	//We append stuff to it in the for loop
	$("#breakfast").append('<div class="panel-group" id="breakfastaccordion"></div>');
	$("#lunch").append('<div class="panel-group" id="lunchaccordion"></div>');
	$("#dinner").append('<div class="panel-group" id="dinneraccordion"></div>');

	//We need to make and format all of the categories in html

	//First gather all relevant categories
	if(isFoodPro) var categories = ["breakfast", "lunch", "dinner"];
	else {
		var categories = [];
		for(var j = 0; j < jsonData.length; j++){
			var row = jsonData[j];

			if(! $.inArray(row.Category, categories){
				categories.push(row.Category);
			}

		}
	}

	//now create the correct HTML
	for(var i = 0; i < categories.length; i++){
		//Create tabs
		var $tabs = $("#myTabs");
		if(i === 0){
			$tabs.append(
				"<li class='active' id='" + categories[i] + "Tab'>"
					+"<a style='outline:0' href='#"+categories[i]+"' role='tab' data-toggle='tab'>"
						+categories[i]
					+"</a>"
				+"</li>");
		} else {
			$tabs.append(
				"<li id='" + categories[i] + "Tab'>"
					+"<a style='outline:0' href='#"+categories[i]+"' role='tab' data-toggle='tab'>"
						+categories[i]
					+"</a>"
				+"</li>");
		}

		//Create Tab Content
		var $tabcontent = $("#myTabContent");
		if(i === 0){
			$tabcontent.append("<div class='tab-pane active' style='padding-top:10px;' id='"+categories[i]+"'></div>");
		} else {
			$tabcontent.append("<div class='tab-pane' style='padding-top:10px;' id='"+categories[i]+"'></div>");
		}

		//Push the accordion onto the tabcontent
		$("#"+categories[i]).append('<div class="panel-group" id="'+categories[i]+'accordion"></div>');
	}

	/* This is all reference code

	var androidversion = parseInt(getAndroidVersion());
	//Now we can start appending the javascript data from myData into the right tabs
	for(var j = 0; j < jsonData.length; j++){
		var row = jsonData[j];


		




		//One more sort to determine which meal goes where
		var time = "";
		switch(row.Meal_Number){
			case "1": time = "breakfast";
					   break;
			case "2": time = "lunch";
					   break;
			case "3": time = "dinner";
					   break;
		}
		var menu_item = "";
		
		if(androidversion < 3){//Use plain text if it's an older Android. No accordion.
			menu_item  = "<p style='font-size:14px;padding-left:7px;'>";
			menu_item = menu_item + "&middot;"+ row.Recipe_Print_As_Name;
			menu_item = menu_item + "</p>";
		}
		//Create a blank collapsable element (lots of divs)
		else{
			menu_item = '<div class="panel panel-success">' +
					'<div class="panel-heading">' +
						'<p class="panel-title">' +
							'<a data-toggle="collapse" data-parent="#'+time+'accordion" href="#collapse' + j + '">' +
								row.Recipe_Print_As_Name + //Item title
							'</a>' +
						'</p>' +
					'</div>' +
					'<div id="collapse' +j+ '" class="panel-collapse collapse">' +
						'<div class="panel-body">' + //This is where the content gets appended
						'</div>' +
					'</div>' +
				'</div>';
		}
		//Push the items into the appropriate accordion
		//Eg: $("#breakfastaccordion").append(menu_item); Adds item to breakfast menu.
		$("#"+time+"accordion").append(menu_item);

		//Check if allergens/codes are blank, print only if non-blank.
		if( row.Allergens.trim() ){$("#"+time+" .panel-body:last").append("Allergens: "+ row.Allergens.trim()+"<br>");}
		else{$("#"+time+" .panel-body:last").append("No Allergens<br>");}

		if( row.Recipe_Web_Codes.trim() ){$("#"+time+" .panel-body:last").append(row.Recipe_Web_Codes.trim());}

	}//End FOR loop	

	var currentTime = (new Date()).getHours();
	$("#breakfastTab").removeClass("active");
	$("#lunchTab").removeClass("active");
	$("#dinnerTab").removeClass("active");
	$("#breakfast").removeClass("active");
	$("#lunch").removeClass("active");
	$("#dinner").removeClass("active");
	
	if(currentTime < 11){
		$("#breakfastTab").addClass("active");
		$("#breakfast").addClass("active");
		$("#breakfastTab a").tab('show');
	}
	if(currentTime > 10 && currentTime < 17){
		$("#lunchTab").addClass("active");
		$("#lunch").addClass("active");
		$("#lunchTab a").tab('show');
	}
	if(currentTime > 16){
		$("#dinnerTab").addClass("active");
		$("#dinner").addClass("active");
		$("#dinnerTab a").tab('show');
	}	

	*/

}
