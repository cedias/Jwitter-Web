

var env = new Environnement();



 $("#login").on("submit", function(){
 	var login = $("#login_value").val();
 	var password = $("#password_value").val();

 	Jwitter.login(login, password, function(resp){

 		console.log(resp);

 		if(!resp.error_code){
 			var user = new User(resp.login,resp.id,resp.key,false);
 			env = new Environnement(user);
 		}
 		else
 			alert(resp.message);

 	});

 	return false; // deactivate page refresh 
 });


 $("#logout").on("submit", function(){

 	env = new Environnement();

 	return false; // deactivate page refresh 
 });
