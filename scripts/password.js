//jQuery.ajaxSetup({async:false});

// returns a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
}

// return a string with the fist letter capitalised 
function capitaliseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

// get words from a text file and add these to the output - run this when the 'run' button is clicked
function start(word){
      $.get('resources/10k.txt',{},function(content){
            var word 
            // create an array of all the lines in the text file 
            let lines=content.split('\n');
            // wipe the output textarea 
            document.getElementById("output").value = "";
            // get the number of words to generate
            var words = document.getElementById("words").value.replace(/\s/g,'');
            // select the words at random from lines 
            for(var wordIndex = 0; (wordIndex < words); wordIndex += 1){
                  var i = getRandomInt(0, lines.length);
                  word = lines[i];
                  document.getElementById("output").value += capitaliseFirstLetter(word);
            }
            // generate numbers and symbols 
            runTheRest()
            return 
      });
      
}

// run the rest of the script 
function runTheRest(){
      // get the number of numbers and symbols to generate
      var numbers = document.getElementById("numbers").value.replace(/\s/g,'');
      var symbols = document.getElementById("symbols").value.replace(/\s/g,'');
      // generate the numbers 
      for(var index = 0; (index < numbers); index += 1){
            var number = getRandomInt(0, 10);
            document.getElementById("output").value += number;
      }
      // generate the symbols 
      for(var index = 0; (index < symbols); index += 1){
            var symbol = getRandomInt(33, 44);
            document.getElementById("output").value += String.fromCharCode(symbol);
      }
      return;     
}

