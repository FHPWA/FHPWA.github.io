function start() {
    var charint, choice, inputstring, keystring, keystring2, outstring, inputlength;
    keystring = document.getElementById("fieldkey").value.replace(/\s/g, '');
    keystring2 = document.getElementById("fieldkey2").value.replace(/\s/g, '');
    choice = document.getElementById("rad").checked;

    outstring = "";
    inputstring = document.getElementById("input").value;

    inputlength = inputstring.normalize().length;
    for (var index = 0; (index < inputlength); index += 1) {
        if ((index >= keystring.length)) {
            keystring += keystring;
        }
        if ((index >= keystring2.length)) {
            keystring2 += keystring2;
        }
        if ((choice === true)) {
            charint = inputstring.charCodeAt(index) + keystring.charCodeAt(index) + keystring2.charCodeAt(index);
        } else {
            charint = inputstring.charCodeAt(index) - keystring.charCodeAt(index) - keystring2.charCodeAt(index);
        }
        outstring += String.fromCharCode(charint);


    }
    document.getElementById("output").value = outstring;
}
