
$(function() {


	/*----------------
	* Page  Variables |
	* ---------------*/
	var env;



	/*------------------Page Initialisation -------------------------*/

		cookie = readCookie("JwitterAuth");
		$("#error_modal").hide();

		if(cookie)
		{
			var parsed = JSON.parse(cookie);
			var user = new User(parsed.login,parsed.id,parsed.key,false);
	 			env = new Environnement(user);
		}
		else
		{
			env = new Environnement();	
		}

	/*--------------------Utilities----------------------------------*/

		function showError(errorMessage) {
			var modal = $("#error_modal");
			modal.html("<p>"+errorMessage+"</p>");

			modal.fadeIn('fast', function(){
				
				setTimeout(function() {
      				modal.fadeOut(2500);
				}, 1000);

			});
		}

	/*------------------ * Events Bindings * -----------------------*/

	
	/*--------Click login action-------------*/

	 $("#login").on("submit", function(){

	 	var login = $("#login_value").val();
	 	var password = $("#password_value").val();

	 	//login & password != "
	 	if(login === "" || password === ""){
	 		showError("Please enter some credentials");
	 		return false;
	 	}

	 	Jwitter.login(login, password, function(resp){

	 		if(!resp.error_code){
	 			var user = new User(resp.login,resp.id,resp.key,false);
	 			env = new Environnement(user);
	 			createCookie("JwitterAuth", JSON.stringify(user) , 1);
	 		}
	 		else
	 		{
	 			showError(resp.message);
	 		}
	 	});

	 	return false; // deactivate page refresh 
	 });



	 /*--------Click logout action-------------*/

	 $("#logout").on("submit", function(){

	 	env = new Environnement();
	 	eraseCookie("JwitterAuth");
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