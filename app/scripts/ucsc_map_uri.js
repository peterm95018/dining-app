var parser = document.createElement('a');

var url = document.URL;

parser.href = url;

parser.protocol; // => "http:"
parser.hostname; // => "example.com"
parser.port;     // => "3000"
parser.pathname; // => "/pathname/"
parser.search;   // => "?search=test"
parser.hash;     // => "#hash"
parser.host;     // => "example.com:3000"


var query = parser.hash; // returns "#17/36.999998/-122.05443"
var pairs = query.split('/'); // Split at "/", ["#15", "36.9991", "-122.0549"]
var lat = pairs[1];
var lng = pairs[2];
var tmpZoom = pairs[0]; // gives us #17, need to parse out the hash here
var ourZoom = tmpZoom.substring(1); // returns 17
var lat = pairs[1];
var lng = pairs[2];
var diningTitle = pairs[3];

/*
		
		var theData = new Object();
		theData.diningTitle = diningTitle;

		var theTemplateScript = $("#header").html();
		var theTemplate = Handlebars.compile(theTemplateScript);

		$(.header).append(theTemplate(theData));
*/