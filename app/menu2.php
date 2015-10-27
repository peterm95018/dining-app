<?php
   ini_set('display_errors', '1');
   ini_set('error_reporting', E_ALL);
   
   //Get location_number and serve_date
   $serve_date = $_POST['serve_date'];
   $location_number = $_POST['location_num'];
   $foodproDB = $_POST['foodproDB'];//Bool to check which DB to use

   if($foodproDB){//Check if we need to use FoodPro DB or use our own menu DB
     $serverName = "ches-prod-sql-1.ucsc.edu";
     $database = "FoodPro";
     $port = 1443;

     // Get UID and PWD from application-specific files.
     $uid = file_get_contents('/home/admin/foodpro_login/uid.txt');
     $pwd = file_get_contents('/home/admin/foodpro_login/pwd.txt');
     $uid = trim($uid);  //'FoodProEpicure';
     $pwd = trim($pwd);  //'F00dPr0*2';
     
     try {
        // $conn = new PDO( "sqlsrv:server=$serverName,$port;Database = $database", $uid, $pwd);
        $conn = new PDO( "dblib:host=$serverName;dbname=$database", $uid, $pwd);
        $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
     }

     catch( PDOException $e ) {
        print_r($e);
        die( "Error connecting to FoodProDB SQL Server" );
     }
     
     //Long query that sorts by date and location
     // $query = "select ID, Serve_Date, Meal_Number, Location_Number, Location_Name, Recipe_Print_As_Name, Allergens, Recipe_Web_Codes
     //      from FoodPro.dbo.ForecastedRecipes
     //      where Serve_Date = N'" . $serve_date . "'
     //      and Location_Number = " . $location_number . "
     //      order by Meal_Number";

      $query = "SELECT Recipe_Print_As_Name, Meal_Number, COUNT(*), Max(ID) AS dupes
      from FoodPro.dbo.ForecastedRecipes
      where Serve_Date = N'" . $serve_date . "'
      and Location_Number = " . $location_number . "
      and Meal_Number = 1
      and Recipe_Print_As_Name != ''
      GROUP BY Recipe_Print_As_Name, Meal_Number
      HAVING (COUNT(*) > 1)";

     $stmt = $conn->query( $query );
     while ( $row = $stmt->fetch( PDO::FETCH_ASSOC ) ){
      //  print_r( $row );
      $rows[] = $row;
     }
     if( !empty($rows) ){ print json_encode($rows); } //Only print if the JSON isn't blank.

     // Free statement and connection resources.
     $stmt = null;
     $conn = null;
   }

   //Here we use our own DataBase if not using FoodProDB
   else{
      $serverName = 'localhost';
      $database = 'menus';
      $username = 'resnet';
      $password = '';

      try {
        $conn = new PDO( "mysql:host=$serverName;dbname=$database", $username, $password);
        $conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
      }

      catch( PDOException $e ) {
         print_r($e);
         die( "Error connecting to MySQL Server" );
      }

      $query = "SELECT * FROM menu WHERE location_number=$location_number";// AND Serve_Date=$serve_date;

      $stmt = $conn->query( $query );

      while ( $row = $stmt->fetch( PDO::FETCH_ASSOC ) ){
        $rows[] = $row;
      }

      print json_encode($rows);
   }
?>