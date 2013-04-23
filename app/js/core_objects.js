/*tweaks*/
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


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
	
	if(this.lastReceived != undefined){
		Jwitter.listTo(this.lastReceived,function(resp){

			if(jQuery.isEmptyObject(resp) === false){
				that._prependMsg(resp.messages);

				if(resp.messages[0] !== undefined)
					that.lastReceived = resp.messages[0]._id;
				else
					that.lastReceived = resp.messages._id;
			}
		});
	}
};

Environnement.prototype.switchContext = function(user){
	
	if(this.context ===  "connected"){
		this._disconnectContext();
	}
	else if(this.context === "disconnected"){
		this._connectContext(user);
	}

	$("#user_info").remove(); //Eventually delete user info window
};

Environnement.prototype._init = function() {
	var that = this;

	Jwitter.listAll(function(resp){
		that._prependMsg(resp.messages);
		that.lastReceived = resp.messages[0]._id;
		
		that.refresher = setInterval(function(){
		that.refresh();
		},15000); //15 sec polling

	});
	
};


Environnement.prototype._prependMsg = function(messages){
		var template = Handlebars.compile($("#message_template").html());
		var box = $("#message_list");
		var node;
		var that = this;

		/*if no messages*/
		if(messages === undefined)
			return;
		/* if messages is a single object & not an array*/
		if(messages._id !== undefined){
			this.messages.push(messages);
			node = template(messages);
			box.prepend(node);
		}
		else 
		{
			/* if messages is an array */
			for(var i=messages.length-1;i>=0;i--){
				this.messages.push(messages[i]);
				node = template(messages[i]);
				box.prepend(node);
			}
		}
		this._bindMsgEvents();
};

/* Binds the events on messages*/
Environnement.prototype._bindMsgEvents = function() {
	var that = this;
	var key = (this.userConnected !== undefined)?this.userConnected.key:"";
		//delete old event Listeners
		$(".message_info>a").off("click");
		$(".message").off("click");



		//append new ones

		/*Show user info*/
		$(".message_info>a").on("click",function(){
			var index = $(this.parentNode.parentNode).index();
			var length = that.messages.length;
			var msgClicked = that.messages[length-1-index];

			that._showInfo(msgClicked.id);
		});

		/*delete messages*/
		if(key!="") {
			$(".message").on("click",function(){
				var msgBox = $(this);
				var index = msgBox.index();
				var length = that.messages.length;
				var msgClicked = that.messages[length-1-index];
				

				if(msgClicked.login === that.userConnected.login){
					if(msgBox[0].children[0].className!=="delete"){
						/*No Delete button*/
						msgBox.prepend("<p class=\"delete\" >DELETE</p>");
						console.log(msgClicked);
						$(".delete").on("click",function(){
							Jwitter.deletePost(that.userConnected.key,msgClicked._id,function(){
								that.messages.remove(length-1-index);
								msgBox.remove();
							});
						});						
					}else
					{
						$(".delete").off("click");
						msgBox.children().remove(".delete");
					}
				}

			});
		}
};

/* Shows the info of a user*/
Environnement.prototype._showInfo = function(userId) {
	$("#user_info").remove(); //delete old one if there
	var key = (this.userConnected !== undefined)?this.userConnected.key:"";
	var that = this;

	Jwitter.info(key,userId,function(resp){
		var info = resp;

		if(info.friend_with !== undefined){
			/*Conditions to show friend buttons*/
			info.friend_with = (info.friend_with === "no")?false:true;
			info.connected = (info.login !== that.userConnected.login)?true:false;
		}
		/*If messages is a single object and not an array*/
		if(!jQuery.isArray(info.last_jweets.messages)){
				var temp = info.last_jweets.messages
				info.last_jweets.messages = [];
				info.last_jweets.messages.push(temp);
		}
		console.log(info);

		var template = Handlebars.compile($("#info_template").html());
		$("body").prepend(template(info));

		if(key !== "")
			that._bindUserInfoButtons(info);
	});
};

Environnement.prototype._bindUserInfoButtons = function(info) {
	var removeFriend = $("#remove_friend_button");
	var addFriend = $("#add_friend_button");
	var key = this.userConnected.key;
	var that = this
	var fid = info.id

	if(info.friend_with){
		/*is friend*/
		removeFriend.on("click",function(){

			Jwitter.removeFriend(key,fid,function(resp){
				if(resp.error_code){
					alert(resp.message);
				}
			});
			that._showInfo(fid); //refresh box
		});
	}
	else
	{
		addFriend.on("click",function(){
			Jwitter.addFriend(key,fid,function(resp){
				if(resp.error_code){
					alert(resp.message);
				}
			});
			that._showInfo(fid); //refresh box
		});
	}
};

/* Sets the DOM to "connected" context */	
Environnement.prototype._connectContext = function(user){
	this.userConnected = user
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


