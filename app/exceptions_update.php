<?php
//Allow full error reporting
ini_set('display_errors', '1');
ini_set('error_reporting', E_ALL);

//Get the JSON and decode it
$JSONobj = $_POST['myData'];
$size = count($JSONobj); //Used for looping through the array later

$serverName = 'localhost';
$database = 'dininghours';
$username = 'resnet';
$password = '';

try {
      $conn = new PDO( "mysql:host=$serverName;dbname=$database", $username, $password);
      $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
}

catch( PDOException $e ) {
   print_r($e);
   die( "Error connecting to SQL Server" );
}

$query = "";
//Loop through and compile all the update queries into one big $query!
for($i = 0; $i < $size; $i = $i +1){
	$row       = $JSONobj[$i];
	$loc       = $row['location_number'];
	$weekday   = $row['weekdays'];
	$startdate = $row['startdate'];
	$enddate   = $row['enddate'];
	$starttime = $row['starttime'];
	$endtime   = $row['endtime'];
	$details   = $row['details'];
	//You have to surround the time in single quotes because of the colon :
	$query = "INSERT INTO exceptions ($loc, $weekday, '$startdate', '$enddate', '$starttime', '$endtime', $details);";
}

$stmt = $conn->query( $query );

?>