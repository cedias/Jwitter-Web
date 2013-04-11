
$(function() {


	/*----------------
	* Page  Variables |
	* ---------------*/

	var env = new Environnement();



	/*------------------ * Events Bindings * -----------------------*/

	
	/*--------Click login action-------------*/

	 $("#login").on("submit", function(){

	 	var login = $("#login_value").val();
	 	var password = $("#password_value").val();

	 	Jwitter.login(login, password, function(resp){

	 		if(!resp.error_code){
	 			var user = new User(resp.login,resp.id,resp.key,false);
	 			env = new Environnement(user);
	 		}
	 		else
	 		{
	 			alert(resp.message);
	 		}
	 	});

	 	return false; // deactivate page refresh 
	 });



	 /*--------Click logout action-------------*/

	 $("#logout").on("submit", function(){

	 	env = new Environnement();
	 	return false; // deactivate page refresh 
	 });



	 /*-------------Click post action--------------*/

	 $("#message_form").on("submit",function(){

	 	alert('not implemented');
	 	return false; // deactivate page refresh 
	 });

	 /*------------Click go(search) action------------*/
	 
	  $("#search_form").on("submit",function(){

	 	alert('not implemented');
	 	return false;// deactivate page refresh 
	 });


});