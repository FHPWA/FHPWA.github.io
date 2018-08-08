//jQuery.ajaxSetup({async:false});

// returns a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
}



//console.log(words)


// get a random word from the text file
function getWord(word){
      $.get('resources/10k.txt',{},function(content){
            var word 
            let lines=content.split('\n');
            var i = getRandomInt(0, lines.length);
            word = lines[i];
            runTheRest(word)
            return 
       
           
      });
      
}

function runTheRest(word){
      console.log(word);
      document.getElementById("output").value += word;
      return word; 
      
}

// run this when the 'run' button is clicked 
function start(){

      // get values 
      var words = document.getElementById("words").value.replace(/\s/g,'');
      var numbers = document.getElementById("numbers").value.replace(/\s/g,'');
      var symbols = document.getElementById("symbols").value.replace(/\s/g,'');

      var output

      for(var wordIndex = 0; (wordIndex < words); wordIndex += 1){
            getWord();
            //console.log(output)
      }

     //document.getElementById("output").value = output;
}

