/**************************************************************/
// main.js
//
// firebase UI test
// Written by Mr Bob term 1 2020
// v1: basic UI test with CRUD actions
/**************************************************************/
let score = 0;

/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/
// database variables
var dbPath 	  = 'safety';

var currRec = {
    email: ' ',
    name:  ' ',
    score: 0 
};
/*dbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdbdb*/

/**************************************************************/
// Self enclosed funtion.
// Runs straight away to check if user is "logged in"
// Requires page to run off a web server NOT locally
// Input:  
// Return: 
/**************************************************************/
(function () {
	logIt('main_login_check','', COL_INFO);
	var firebase = dbApi;
	var uid = null;
	
	firebase.auth().onAuthStateChanged(function(user) {
		console.log('firebase.auth');
		if (user) {
			// user is signed in
			uid = user.uid;
			logIt('main.js','user=' + uid, COL_INFO);
		}
		else {
			// user NOT logged in, so redirect to login page
			window.location.replace("login.html");
		}
	})();
})();

logIt('main.js','loaded', COL_INFO);

/**************************************************************/
//	EVENTS
/**************************************************************/
// main_getUserName()
// Input event; called when user changes user name input field
// Saves user's name and update display
// Input:  
// Return: 
/**************************************************************/
function main_getUserName() { 
	currRec.email = document.getElementById("i_userName").value;
	currRec.name = currRec.email
	logIt('main_getUserName','user name: ' + currRec.name, COL_INFO);
      
    document.getElementById("p_userName").innerHTML = currRec.name;
}

/**************************************************************/
// main_add2Score()
// Button event; called when user clicks add score button.
// Add to score & update display
// Input:  
// Return: 
/**************************************************************/
function main_add2Score() {
    currRec.score++;           
	logIt('main_add2Score','score: ' + currRec.score, COL_INFO);
      
    document.getElementById("p_userScore").innerHTML = currRec.score;
}

/**************************************************************/
// main_create()
// Button event; called when user clicks CREATE button.
// Creates a firebase record & updates display with status
// Input:  
// Return: 
/**************************************************************/
function main_create() {
	logIt('main_create',dbPath + '/' + currRec.email + '/' + currRec, COL_INFO);
	
	var x = document.getElementById("db_IOResults").rows[1].cells;
	x[0].innerHTML = 'waiting';
	dbApi.databaseApi.create(dbPath, currRec.email, currRec, main_msgCreate);
}
		
/**************************************************************/
// main_read()
// Button event; called when user clicks READ button.
// Reads a firebase record & updates display with status
// Input:  
// Return: 
/**************************************************************/		
function main_read() {
	logIt('main_read',dbPath + '/' + currRec.email + '/' + currRec, COL_INFO);
	
	var x = document.getElementById("db_IOResults").rows[1].cells;
	x[1].innerHTML = 'waiting';
	dbApi.databaseApi.read(dbPath, currRec.email, currRec, main_msgReadOK, main_msgRead);
	function main_msgReadOK(snapshot) {
		if (snapshot.val() != null) {
			var childData = snapshot.val();
			logIt('main_msgRead OK', ' path=' + dbPath +
				  '  key=' + currRec.email, COL_INFO);
			console.table(childData);
			main_msgHandler(null, 1, null);
		}
		else {
			logIt('main_msgRead no rec', ' path=' + dbPath +
				  '  key=' + currRec.email +
				  '  currRec=' + currRec, COL_INFO);
			main_msgHandler('NO REC', 1, 'NO REC');
		}
	}
}

/**************************************************************/
// main_update()
// Button event; called when user clicks UPDATE button.
// Updates a firebase record with a new score of 77 & 
//	updates display with status
// Input:  
// Return: 
/**************************************************************/
function main_update() {
	var update = {
		score:   77
	}
	currRec.score = update.score;
	
	logIt('main_update',dbPath + '/' + currRec.email + '/' + currRec, COL_INFO);
	
	var x = document.getElementById("db_IOResults").rows[1].cells;
	x[2].innerHTML = 'waiting';
	dbApi.databaseApi.update(dbPath, currRec.email, update, main_msgUpdate);
}

/**************************************************************/
// main_remove()
// Button event; called when user clicks REMOVE button.
// Removes a firebase record & updates display 
// Input:  
// Return: 
/**************************************************************/
function main_remove() {
	logIt('main_remove',dbPath + '/' + currRec.email + '/' + currRec, COL_INFO);
	var x = document.getElementById("db_IOResults").rows[1].cells;
	x[3].innerHTML = 'waiting';
	dbApi.databaseApi.remove(dbPath, currRec.email, main_msgRemove);
}

/**************************************************************/
// main_logOut()
// Button event; called when user clicks LOGOUT button.
// Signs out of firebase & updates display 
// Input:  
// Return: 
/**************************************************************/
function main_logOut() {
	logIt('main_logOut','', COL_INFO);
	firebase.auth().signOut();
}

/**************************************************************/
// MESSAGE HANDLER ROUTINES
/**************************************************************/
// main_msgCreate(err)
// Called by db_IOResults CREATE function to handle create messages
// Calls function main_msgHandler to handle the message
// Input:  db error if any, else null
// Return: 
/**************************************************************/
function main_msgCreate(err) {
	main_msgHandler(err, 0, 'ERROR');
}

/**************************************************************/
// main_msgRead(err)
// Called by db_IOResults READ function to handle read messages
// Calls function main_msgHandler to handle the message
// Input:  db error if any, else null
// Return: 
/**************************************************************/
function main_msgRead(err) {
	main_msgHandler(err, 1, 'ERROR');
}

/**************************************************************/
// main_msgUpdate(err)
// Called by db_IOResults UPDATE function to handle update messages
// Calls function main_msgHandler to handle the message
// Input:  db error if any, else null
// Return: 
/**************************************************************/
function main_msgUpdate(err) {
	main_msgHandler(err, 2, 'ERROR');
}

/**************************************************************/
// main_msgRemove(err)
// Called by db_IOResults REMOVE function to handle remove messages
// Calls function main_msgHandler to handle the message
// Input:  db error if any, else null
// Return: 
/**************************************************************/
function main_msgRemove(err) {
	main_msgHandler(err, 3, 'ERROR');
}

/**************************************************************/
// main_msgHandler(err)
// Called by various message handling routines.
// Output either the error, OK or NO REC message
// Input:  db error if any, else null
//		   table entry number
//		   IO status
// Return: 
/**************************************************************/
function main_msgHandler(err, _entry, _status) {
	status = _status;
	
	if(!!err) {
		logIt('msgHandler',err, COL_ERROR);
	}
	else {
		logIt('msgHandler','OK', COL_INFO);
		status = 'OK';
	}
	
	var x = document.getElementById("db_IOResults").rows[1].cells;
		x[_entry].innerHTML = status;
}
/**************************************************************/
//    END OF PROG
/**************************************************************/