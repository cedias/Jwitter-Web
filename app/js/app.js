
$(function() {


var env = new Environnement();


 $("#login").on("submit", function(){
 	var login = $("#login_value").val();
 	var password = $("#password_value").val();

 	Jwitter.login(login, password, function(resp){

 		console.log(resp);

 		if(!resp.error_code){
 			var user = new User(resp.login,resp.id,resp.key,false);
 			env = new Environnement(user);

 			//setting cookie
 			createCookie('JwitterUser',user,7);
 		}
 		else
 			alert(resp.message);

 	});

 	return false; // deactivate page refresh 
 });


 $("#logout").on("submit", function(){

 	eraseCookie('JwitterUser');
 	env = new Environnement();


 	return false; // deactivate page refresh 
 });

 $("#message_form").on("submit",function(){
	
 	var key = env.getKey();
 	var message = $("#add_message");
 	console.log(message); //try text
 	return false;
 	// Jwitter.post(key,message,function(resp){

 	// 	if(resp.error_code){
 	// 		alert(resp.message);
 	// 	}
 	// });


 });
});


function newPopup(url) {
	popupWindow = window.open(
		url,'popUpWindow','height=400,width=380,left=10,top=10,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no,center=1')
}
