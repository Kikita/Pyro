<?php session_start();

// echo "email=".$user_email;
echo "HI!!!";


if(!$_POST) exit;

	if (!defined("PHP_EOL")) define("PHP_EOL", "\r\n");
	
	// email address to receive contact messages
//	$address = "kiki@breensmith.com";
	$address = "kazcodesigns@gmail.com";
	
	// received message email subject
	$emailSubject = 'You\'ve been contacted by ' . $name . '.';
	
	// grab values from HTLM form
   	$name     = $_POST['name'];
    $address    = $_POST['address'];
    $phone    = $_POST['phone'];
    $email    = $_POST['email'];
    $company    = $_POST['company'];

    $message = $_POST['message'];
//     $botProtect = $_POST['firstname'];
	$error = '';

	// validate 
	if(trim($name) == '' || $name == 'Your Name') {
	      	$error .= 'Please enter your name.';
	}
	
	else if(trim($address) == '' || $address == 'Address'){
      	$error .= 'Your mailing address is required.';
	}  /* <-- this was an important curly brace -kaz */
	else if(trim($phone) == '' || $phone == 'Phone'){
      	$error .= 'Your phone number is required.';
      	
	}else if(!isEmail($email)){
      	$error .= 'Please enter a valid e-mail address.';
      }

	else if(trim($message) == '' || $message == 'Message..'){
      	$error .= 'Please enter a message.';
      }	
// 	else if($botProtect){
// 		$error .= $botProtect;
// 	}
	if($error != '') { 
		echo $error;
		} else {
		
		$message = stripslashes($message);

		// create email receipt
		$emailMessage  = "You've received a mesage from $name ($email):" . PHP_EOL . PHP_EOL;
		$emailMessage .= $message . PHP_EOL . PHP_EOL . PHP_EOL;
		
		$emailMessage = wordwrap( $emailMessage, 100 );

		$headers = "From: $email" . PHP_EOL;
		$headers .= "Reply-To: $email" . PHP_EOL;
		$headers .= "MIME-Version: 1.0" . PHP_EOL;
		$headers .= "Content-type: text/plain; charset=utf-8" . PHP_EOL;
		$headers .= "Content-Transfer-Encoding: quoted-printable" . PHP_EOL;

        if(mail($address, $emailSubject, $emailMessage, $headers)) {
		
		// confirm message has been emailed		
		 echo "Success! Message Sent.";
		 		 
		 } else {
		 
		 echo 'Error processing email.';
		 
		 }
                      
	}
	
function isEmail($email) { return(preg_match("/^[-_.[:alnum:]]+@((([[:alnum:]]|[[:alnum:]][[:alnum:]-]*[[:alnum:]])\.)+(ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cs|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|info|int|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mil|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.){3}([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$/i",$email)); }

?>