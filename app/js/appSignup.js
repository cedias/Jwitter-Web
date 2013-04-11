 $(function(){




	$("#signup").on("submit", function(){
		var firstName = $("#first_name").val();
		var lastName = $("#last_name").val();
		var login = $("#login").val();
		var password = $("#password").val();


		Jwitter.signup(firstName,lastName,login,password,function(resp){
			console.log(resp);

			if(resp.error_code){
				alert(resp.message);
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