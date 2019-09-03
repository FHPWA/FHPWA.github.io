function otp(numberOfKeys) {
    let charint, choice, inputstring, outstring, inputlength;
    let keystring = []
    let keyIds = ["fieldkey", "fieldkey2"]
    for(let i = 0; i < numberOfKeys; i++){
        keystring.push(document.getElementById(keyIds[i]).value.replace(/\s/g, ""));
    }
    choice = document.getElementById("rad").checked;

    outstring = "";
    inputstring = document.getElementById("input").value;

    inputlength = inputstring.normalize().length;
    for (let index = 0; (index < inputlength); index += 1) {
        for(let i = 0; i < numberOfKeys; i++){
            if ((index >= keystring[i].length)) {
                keystring[i] += keystring[i];
            }
        }
        shift = 0
        for(let i = 0; i < numberOfKeys; i++){
            shift += keystring[i].charCodeAt(index)
        }
        if ((choice === true)) {
            charint = inputstring.charCodeAt(index) + shift
        } else {
            charint = inputstring.charCodeAt(index) - shift
        }
        outstring += String.fromCharCode(charint);


    }
    document.getElementById("output").value = outstring;
}
