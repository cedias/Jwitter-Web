 $(function(){


 	$("#error_modal").hide();

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


	$("#signup").on("submit", function(){
		var firstName = $("#first_name").val();
		var lastName = $("#last_name").val();
		var login = $("#login").val();
		var password = $("#password").val();
		var password2 = $("#password2").val();

		if(firstName === "" || lastName === "" || login === "" || password === "" || password2 === "")
		{
			showError("Please fill all the fields");
			return false;
		}

		if(password !== password2){
			showError("You haven't typed the same password !");
			return false;
		}

		Jwitter.signup(firstName,lastName,login,password,function(resp){
			console.log(resp);

			if(resp.error_code){
				showError(resp.message);
			}
			else
			{
				alert("Account Created");
				window.document.location = "index.html";
			}
		});
		
		return false;
	});


});