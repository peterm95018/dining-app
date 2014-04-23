<?php
echo "TEST";
if(isset($_POST['inputEmail'])) {
 
     
     //Data to be captured
     // optionsRadios1
     // optionsRadios2
     // optionsRadios3
     // commentInput
     // inputEmail
     
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
 
    $email_to = "aidenator00@gmail.com";
 
    $email_subject = "Mobile Dining Feedback";
 
    
 
    $radio = $_POST['meal']; // required
 
    $comments = $_POST['commentInput']; // not required
 
    $email_from = $_POST['inputEmail']; // required
 
     
 
    $error_message = "";
 
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) {
 
    $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
 
  }
 
 
    $email_message = "Form details below.\n\n";
 
     
 
    $email_message .= "How was your meal?: ".clean_string($radio)."\n";
 
    $email_message .= "Comments: ".clean_string($comments)."\n";
 
     
 
     
 
// create email headers
 
$headers = 'From: '.$email_from."\r\n".
 
'Reply-To: '.$email_from."\r\n" .
 
'X-Mailer: PHP/' . phpversion();
 
@mail($email_to, $email_subject, $email_message, $headers); 
} 
?>

