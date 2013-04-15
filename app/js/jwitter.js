(function( window, undefined ) 
{ 

var Jwitter = new Object();
var baseUrl = "http://li328.lip6.fr:8280/Dias_Ghanem";
window.Jwitter = Jwitter;

Jwitter.login = function(login,pass,callback)
	{
		var url =baseUrl+"/user/login?login="+login+"&pass="+pass;
		Jwitter._get(url,callback);
	};

Jwitter.logout = function(key,callback)
	{
		var url =baseUrl+"/user/logout?key="+key;
		Jwitter._get(url,callback);

	};

Jwitter.listAll = function(callback){
	var url = baseUrl+"/message/list";
	Jwitter._get(url,callback);
}

Jwitter.listTo = function(msgId, callback){
	var url = baseUrl+"/message/list?mid="+msgId;
	Jwitter._get(url,callback);
}

Jwitter.post = function(key,message,callback){
	
	var url = baseUrl+"/message/post?key="+key+"&msg="+message;
	Jwitter._get(url,callback);
}

Jwitter.signup = function(firstName,lastName,login,password,callback){
	var url = baseUrl+"/user/new?login="+login+"&pass="+password+"&fname="+firstName+"&lname="+lastName;
	Jwitter._get(url,callback);
}

Jwitter._get = function(url,callback){
	var jqxhr = $.ajax(url)
	
    .done(function(resp) {
	    resp = JSON.parse(resp);
	     callback(resp);
	 })

    .fail(function(resp) {
     console.log(resp);
     alert(resp); 
    })
}

})(window);
