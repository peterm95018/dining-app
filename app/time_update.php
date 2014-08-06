<?php
//Allow full error reporting
ini_set('display_errors', '1');
ini_set('error_reporting', E_ALL);

//Get the JSON and decode it
$JSONobj = $_POST['data'];
$size = count($JSONobj);

$serverName = 'localhost';
$database = 'dininghours';
$username = 'resnet';
$password = '';

print_r($JSONobj);

try {
      $conn = new PDO( "mysql:host=$serverName;dbname=$database", $username, $password);
      $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    }

catch( PDOException $e ) {
   print_r($e);
   die( "Error connecting to SQL Server" );
}

$query = "";

for($i = 0; $i < $size; $i = $i +1){
	$row = $JSONob[$i];
	echo "row.startime = " $row . $row.starttime;
	echo "row[startime] = " $row . $row[starttime];
	$query += "UPDATE hours SET starttime = $row.starttime WHERE location_number = $row.location_number AND weekdays = $row.weekdays;";
	$query += "UPDATE hours SET endttime = $row.endtime WHERE location_number = $row.location_number AND weekdays = $row.weekdays;";
}

$stmt = $conn->query( $query );

?>
