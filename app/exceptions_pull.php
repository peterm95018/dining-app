<?php
//Allow full error reporting
ini_set('display_errors', '1');
ini_set('error_reporting', E_ALL);

//Get loc # from URL
$location_number = $_POST['location'];

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

$query = "SELECT * FROM exceptions WHERE location_number=$location_number AND enddate >= CURDATE();";

$stmt = $conn->query( $query );

while ( $row = $stmt->fetch( PDO::FETCH_ASSOC ) ){
	$rows[] = $row;
}

print json_encode($rows);

?>