//jQuery.ajaxSetup({async:false});
/*jshint esversion: 6 */

// returns a random integer between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
}

// return a string with the fist letter capitalised
function capitaliseFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
}


// run the rest of the script
function runTheRest() {
      // get the number of numbers and symbols to generate
      let numbers = document.getElementById("numbers").value.replace(/\s/g, "");
      let symbols = document.getElementById("symbols").value.replace(/\s/g, "");
      // generate the numbers
      for (let index = 0; (index < numbers); index += 1) {
            let number = getRandomInt(0, 10);
            document.getElementById("output").value += number;
      }
      // generate the symbols
      for (let index = 0; (index < symbols); index += 1) {
            let symbol = getRandomInt(33, 44);
            document.getElementById("output").value += String.fromCharCode(symbol);
      }
      return;
}

// get words from a text file and add these to the output - run this when the "run" button is clicked
function start() {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", "resources/10k.txt", false);
      rawFile.onreadystatechange = function ()
      {
            if(rawFile.readyState === 4)
            {
                  if(rawFile.status === 200 || rawFile.status === 0)
                  {
                        let word;
                        // create an array of all the lines in the text file
                        let lines = rawFile.responseText.split("\n");
                        // wipe the output textarea
                        document.getElementById("output").value = "";
                        // get the number of words to generate
                        let words = document.getElementById("words").value.replace(/\s/g, "");
                        // select the words at random from lines
                        for (let wordIndex = 0; (wordIndex < words); wordIndex += 1) {
                              let i = getRandomInt(0, lines.length);
                              word = lines[i];
                              document.getElementById("output").value += capitaliseFirstLetter(word.trim());
                        }
                        // generate numbers and symbols
                        runTheRest();
                        return;
                  }
            }
      };
      rawFile.send(null);

}
