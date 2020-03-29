/**************************************************************/
// logIt_console.js
//
// Written by Mr Bob term 1 2020
// Logs data to the console
// logIt('addToScore', score, COL_INFO);
/**************************************************************/
const COL_INFO = 'black'; COL_WARN = 'yellow'; COL_SUCCESS = 'blue';
const COL_ERROR = 'red';
const trace = true;
/**************************************************************/
// logIt(_function, _text, _colour)
// log information to console. 
// Project colour usage is available; see const at start of code
// Called by various
// Log text passed if trace is true
// Input:  text to display
// Return: 
// COL_INFO = 'cyan'; COL_WARN = 'yellow'; COL_SUCCESS = 'blue'; COL_ERROR = 'red';
/**************************************************************/
function logIt(_function, _text, _colour) {		
  if (trace) {
    switch (_colour) {
    case 'COL_INFO':
      console.info("%c" + _function + ': '  +_text, "color:" + _colour);
      break;  
    case 'COL_WARN':
      console.warn("%c" + _function + ': '  +_text, "color:" + _colour);
      break; 
    case 'COL_SUCCESS':
      console.info("%c" + _function + ': '  +_text, "color:" + _colour);
      break; 
    case 'COL_ERROR':
      console.error("%c" + _function + ': '  +_text, "color:" + _colour);
      break; 
    default: 
      console.log("%c" + _function + ': '  +_text, "color:" + _colour);
    }
  }
}

/**************************************************************/
//      END OF MODULE
/**************************************************************/