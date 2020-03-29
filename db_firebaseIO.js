/**************************************************************/
// db_firebaseIO.js
//
// firebase 13COMP UI test
// Written by Mr Bob term 1 2020
// v1 basic UI test with CRUD actions
/**************************************************************/ 
/**************************************************************/
// db_connectFirebase
// Self enclosed function.
// Runs straight away.
// Connect to Firebase
// Requires page to run off a web server NOT locally 
//	to enable Goole login
// Input:  
// Return: 
/**************************************************************/
let dbApi = {};
let db = {};

(function () {
	logIt('db_connectFirebase','waiting', COL_INFO);
  	 
    var firebaseConfig = {
		apiKey: "AIzaSyDpSiSjfwc6Wstg_5c_zGeGxDQRgTBqoDo",
		authDomain: "comp-43ab9.firebaseapp.com",
		databaseURL: "https://comp-43ab9.firebaseio.com",
		projectId: "comp-43ab9",
		storageBucket: "comp-43ab9.appspot.com",
		messagingSenderId: "868413612618",
		appId: "1:868413612618:web:1ae5d2b97bb5a1feb13cb3"
    };
  
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
	
	dbApi = firebase;
	db = firebase.database();
	 
	dbApi.databaseApi = {
		create: db_createRec,
		read:	db_readRec,
		readAll:db_readAll,
		update: db_updateRec,
		remove: db_removeRec
	}
})()

/**************************************************************/
// db_checkConnection()
// Called when main.html body loads
// Check connection to firebase
// Requires page to run off a web server NOT locally 
//	to enable Goole login
// Input:  
// Return: 
/**************************************************************/
function db_checkConnection() {
	logIt('db_checkConnection','', COL_INFO);
	var db_connect = '';
	db.ref(".info/connected").on("value",(snap)=> {
			if (snap.val() === true) {
				db_connect = 'OK';
				logIt('db_connectFirebase',db_connect, COL_INFO);
			} else {
				db_connect = 'NO';
				logIt('db_connectFirebase','NO', COL_ERROR);
			}
			// update html with db connection status
			document.getElementById("p_connection").innerHTML = db_connect;
		}
	);
}

/**************************************************************/
// db_createRec(_dbPath, _key, _currRec, _callBack)
// Create a record
// Input:  path to write to, the key, name & score
// Return: 
/**************************************************************/
function db_createRec(_dbPath, _key, _currRec, _callBack) { 
	logIt('db_createRec', ' path=' + _dbPath +
		  '  key=' + _key +
		  '  currRec=' + _currRec, COL_INFO);
	if(!_dbPath || !_key || !_currRec) return;
	dbApi.database().ref(dbPath + '/' + _key).set(_currRec, _callBack);
}

/**************************************************************/
// db_updateRec(dbPath, _key, _currRec, _callBack)
// Read a specific DB record
// Input:  path & key of rec to read & db rec to save data to
// Return:  
/**************************************************************/
function db_updateRec(_dbPath, _key, _currRec, _callBack) {
	logIt('db_updateRec', ' path=' + _dbPath +
		  '  key=' + _key +
		  '  currRec=' + _currRec, COL_INFO);
	if(!_dbPath || !_key || !_currRec) return;
	dbApi.database().ref(dbPath + '/' + _key).update( _currRec, _callBack);
}

/**************************************************************/
// db_removeRec(dbPath, _key, _callBack)
// Remove a specific DB record
// Input:  path & key of rec to read & db rec to save data to
// Return:  
/**************************************************************/
function db_removeRec(_dbPath, _key, _callBack) { 
	logIt('db_removeRec', ' path=' + _dbPath +
		  '  key=' + _key, COL_INFO);
    if(!_dbPath || !_key) return;
	dbApi.database().ref(dbPath + '/' + _key).remove(_callBack);
}

/**************************************************************/
// db_readAll(dbPath, _key, _currRec, _callBack)
// Read all DB records for the path
// Input:  path to read from & array to write to
// Return:  
/**************************************************************/
function db_readAll(_dbPath, _array, _dbRec, _callBack) {
	logIt('db_readAll', ' path=' + _dbPath, COL_INFO);
	//dbApi.databaseApi.create(dbPath + '/' + _key, _currRec, _callBack);
}

/**************************************************************/
// db_readRec(dbPath, _key, _currRec, _callBack)
// Read a specific DB record
// Input:  path & key of rec to read & db rec to save data to
// Return:  
/**************************************************************/
function db_readRec(_dbPath, _key, _currRec, _callBackOK, _callBackFail) {
	logIt('db_readRec', ' path=' + _dbPath +
		  '  key=' + _key +
		  '  currRec=' + _currRec, COL_INFO);
    if(!_dbPath || !_key || !_callBackOK || !_callBackFail) return;
	dbApi.database().ref(dbPath + '/' + _key).once('value')
					.then(_callBackOK, _callBackFail);
}
/**************************************************************/
//      END OF MODULE
/**************************************************************/