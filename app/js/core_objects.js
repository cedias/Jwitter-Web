
/*Environnement*/

function Environnement(user){
	
	this.users = [];
	this.messages = [];

	if(user){
		this._connectContext();
		this.userConnected = user;
	}
	else
		this._disconnectContext();

	this._init();
}

Environnement.prototype._init = function() {

	Jwitter.listAll(function(resp){
		var template = Handlebars.compile($("#message_template").html());
		var box = $("#message_list");
		var messages = resp.messages;
		

		for(var i=0;i<messages.length;i++){
			box.prepend(template(messages[i]));	
		}
	});

};

Environnement.prototype.switchContext = function(){
	
	if(this.context ===  "connected"){
		this._disconnectContext();
	}
	else if(this.context === "disconnected"){
		this._connectContext();
	}
};


/* Sets the DOM to "connected" context */	
Environnement.prototype._connectContext = function(){
	this.context = "connected";
	var postId = $("#content_form");
	var loginId = $("#login");
	var logoutId = $("#logout");

	postId.show();
	loginId.hide();
	logoutId.show();
};


/* Sets the DOM to "disconnected" context */	
Environnement.prototype._disconnectContext = function(){	
	this.context = "disconnected";
	var postId = $("#content_form");
	var loginId = $("#login");
	var logoutId = $("#logout");

	postId.hide();
	logoutId.hide();
	loginId.show();
};


/*User*/

function User(login,id,key,contact){
	this.login = login;
	this.id = id;
	this.key = key;
	this.contact = contact;
}

User.prototype.getKey = function() {
	return this.key;
};



/*Message*/

function Message(id,author,text,data,score,template){
	this.id = id;
	this.author = author;
	this.text = text;
	this.data = data;
	this.score = score;
	this.template = template;
}




/*RechercheMessage*/

function RechercheMessage(resultats,recherche,contact_only,author,data){
	this.resultats = resultats;
	this.recherche = recherche;
	this.contact_only = contact_only;
	this.author = author;
	this.data = data;
}


