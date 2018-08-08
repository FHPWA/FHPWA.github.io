// Checks if an arguement is prime 
function isPrime(x){
	if(x%2 === 0 && x>2){
		return false;
	}
	var i = 3;
	var sqrt = Math.sqrt(x);
	while(i < sqrt){
		if(x%i === 0){
		return false;}
		i += 2;
	}
	return true;
}

// finds the Highest Common Factor or argument a and arguement b
function highestCommonFactor(a, b){
    if (b === 0){
       return a;
	}
    else{
       return highestCommonFactor(b, a % b);
	}
}

// calculates the private key exponent from the public key exponent
function modInverse(a, m){
	for (var x = 1; x < m; x++){
	   if ((a * x) % m == 1){
		  return x;
	   }
	}
	return 1;
}

// returns a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// https://stackoverflow.com/questions/5989429/pow-and-mod-function-optimization
function expmod( base, exp, mod ){
  if (exp == 0) return 1;
  if (exp % 2 == 0){
    return Math.pow( expmod( base, (exp / 2), mod), 2) % mod;
  }
  else {
    return (base * expmod( base, (exp - 1), mod)) % mod;
  }
}



var globalPrivateKeyExponent;

function start() {
	
	
	// check for existing keys 
	var check = document.getElementById("mod").value.replace(/\s/g,'');
	if(check != ""){
		
		// get them 
		
		var keyModulus = document.getElementById("mod").value.replace(/\s/g,'');
		var publicKeyExponent = document.getElementById("public").value.replace(/\s/g,'');
		var privateKeyExponent = document.getElementById("private").value.replace(/\s/g,'');
		if(privateKeyExponent == ""){
			privateKeyExponent = globalPrivateKeyExponent;
		}
		
	}
	else{
		
		document.getElementById("privatelabel").innerHTML  = "<p>Click to Show Private Key Exponent...</p>";
		
		// generate new keys 

	
		//Generate 2 prime numbers 
		//These can be static for now 
		//- these are used to calculate the keyModulus and the eulerTotient

		var prime0 = 11;	
		var prime1 = 19;


		//Generate the key modulus - this is used in the encryption and decryption methods 
		var keyModulus = prime0*prime1;

		//Generate the euler totient - this is used to generate the private key exponent from the public key exponent 
		var eulerTotient=(prime0-1)*(prime1-1)

		//Use Euclid's Algorithm to verify that publicKeyExponent and eulerTotient are coprime
		var publicKeyExponent;
		var factor;
		do {
			publicKeyExponent = getRandomInt(1,eulerTotient);
			factor = highestCommonFactor(publicKeyExponent,eulerTotient);
		}
		while (factor!= 1);

		// calculates the private key exponent from the public key exponent
		var privateKeyExponent = modInverse(publicKeyExponent,eulerTotient)
	}
	
	
	// get input 
	var encrypt = document.getElementById("encrypt").checked;
	var inputstring = document.getElementById("input").value;
	outstring = "";
    inputlength = inputstring.normalize().length;
	
    for (var index = 0; (index < inputlength); index += 1) {
        if ((encrypt === true)) {
            charint = expmod(inputstring.charCodeAt(index),publicKeyExponent,keyModulus);
			console.log(charint);
        } else {
            charint = expmod(inputstring.charCodeAt(index),privateKeyExponent,keyModulus);
        }
        outstring += String.fromCharCode(charint);

        
    }
	document.getElementById("output").value = outstring;
	
	document.getElementById("mod").value = keyModulus;
	document.getElementById("public").value = publicKeyExponent;
	globalPrivateKeyExponent = privateKeyExponent;
	

}

function showPrivate(){
	document.getElementById("private").value = globalPrivateKeyExponent;
	document.getElementById("privatelabel").innerHTML  = "<p>Private Key Exponent:</p>";
}











