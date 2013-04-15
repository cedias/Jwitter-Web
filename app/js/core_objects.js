
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


Environnement.prototype.refresh = function() {
	
	var that = this;
	console.log("refreshing");
	console.log(this.lastReceived);
	
	if(this.lastReceived != undefined){
		Jwitter.listTo(this.lastReceived,function(resp){
			console.log(resp);
			console.log(jQuery.isEmptyObject(resp));
			if(jQuery.isEmptyObject(resp) === false){
				that._prependMsg(resp.messages);
				that.lastReceived(resp.messages[0])
			}
		});
	}
};

Environnement.prototype.switchContext = function(){
	
	if(this.context ===  "connected"){
		this._disconnectContext();
	}
	else if(this.context === "disconnected"){
		this._connectContext();
	}
};

Environnement.prototype._init = function() {
	var that = this;

	Jwitter.listAll(function(resp){
		that._prependMsg(resp.messages);
		that.lastReceived = resp.messages[0]._id;
		
		that.refresher = setInterval(function(){
		that.refresh();
		},30000);

	});
	
};


Environnement.prototype._prependMsg = function(messages){
		var template = Handlebars.compile($("#message_template").html());
		var box = $("#message_list");
		console.log(messages);
		for(var i=messages.length-1;i>=0;i--){ //pas forcement un tableau
			console.log(i);
			box.prepend(template(messages[i]));	
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


