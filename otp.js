function start() {
    var charint, choice, inputstring, keystring, outstring, inputlength;
	keystring = document.getElementById("fieldkey").value.replace(/\s/g,'');
	choice = document.getElementById("rad").checked;
	
    outstring = "";
	inputstring = document.getElementById("input").value;
	inputlength = inputstring.length;
    for (var index = 0; (index < inputlength); index += 1) {
        if ((index >= keystring.length)) {
            keystring += keystring;
        }
        if ((choice === true)) {
            charint = inputstring.charCodeAt(index) + keystring.charCodeAt(index) - 1;
        } else {
            charint = inputstring.charCodeAt(index) - keystring.charCodeAt(index) + 1;
        }
        outstring += String.fromCharCode(charint);
		console.log(outstring);
    }
	document.getElementById("output").value = outstring;
}
