<?php
   ini_set('display_errors', '1');
   ini_set('error_reporting', E_ALL);
   $serverName = "ches-prod-sql-1.ucsc.edu";
   $database = "FoodPro";
         $port = 1443;

   // Get UID and PWD from application-specific files.
   // $uid = file_get_contents("C:\AppData\uid.txt");
   // $pwd = file_get_contents("C:\AppData\pwd.txt");

   $uid = 'FoodProEpicure';
   $pwd = 'F00dPr0*2';
   
   //Get location_number and serve_date
   $serve_date = $_POST['serve_date'];
   $location_number = $_POST['location_num'];

   try {
     // $conn = new PDO( "sqlsrv:server=$serverName,$port;Database = $database", $uid, $pwd);
       $conn = new PDO( "dblib:host=$serverName;dbname=$database", $uid, $pwd);
      $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
   }

   catch( PDOException $e ) {
      print_r($e);
      die( "Error connecting to SQL Server" );
   }

   //echo "Connected to SQL Server\n";

   $query = "select ID, Serve_Date, Meal_Number, Location_Number, Location_Name, Recipe_Print_As_Name, Allergens, Recipe_Web_Codes
        from FoodPro.dbo.ForecastedRecipes
        where Serve_Date = N'" . $serve_date . "'
        and Location_Number = " . $location_number . "
        order by Meal_Number";

   $stmt = $conn->query( $query );
   while ( $row = $stmt->fetch( PDO::FETCH_ASSOC ) ){
    //  print_r( $row );
    $rows[] = $row;
   }
   print json_encode($rows);

   // Free statement and connection resources.
   $stmt = null;
   $conn = null;
?>
