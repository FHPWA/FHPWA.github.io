/* eslint-disable prefer-const */

if (localStorage.getItem("com.fredhappyface") === null) {
	// eslint-disable-next-line no-var
	var data = {
		"theme": "auto",
		"text": "1",
		"iconTopLeft": "50%",
		"iconTopRight": "50%",
		"iconBottomLeft": "50%",
		"iconBottomRight": "50%",
	};
}

/**
 * Save data onto local storage - Over 95% of browsers support this so I'm not
 * going to check for it
 * @return {void}
 */
function save() {
	localStorage.setItem("com.fredhappyface", JSON.stringify(data));
	return;
}

let themeRadios = document.getElementsByName("themeR");
let textRadios = document.getElementsByName("textR");
let shapeRadios = document.getElementsByName("shapeR");

let themeList = ["", "light", "dark", "black", "auto"];

let textList = ["", "0.75", "1", "1.5"];
let textIds = ["", "small", "med", "large"];

// TopLeft, TopRight, BottomLeft, BottomRight
let shapeList = [["", "", "", ""], ["0%", "0%", "0%", "0%"],
	["50%", "50%", "50%", "50%"], ["10%", "10%", "10%", "10%"],
	["50%", "50%", "50%", "10%"]];
let shapeIds = ["", "square", "circle", "squircle", "teardrop"];

// Set the checked radio buttons for theme, textSize and iconShape
document.getElementById(data.theme).checked = true;
let textRadioIndex = textList.indexOf(data.text);
if (textRadioIndex > -1) {
	document.getElementById(textIds[textRadioIndex]).checked = true;
}
for (let shapeRadioIndex = 0; shapeRadioIndex < shapeList.length;
	shapeRadioIndex++) {
	if (shapeList[shapeRadioIndex][0] === data.iconTopLeft &&
		shapeList[shapeRadioIndex][1] === data.iconTopRight &&
		shapeList[shapeRadioIndex][2] === data.iconBottomLeft &&
		shapeList[shapeRadioIndex][3] === data.iconBottomRight) {
		document.getElementById(shapeIds[shapeRadioIndex]).checked = true;
	}
}

/**
 * saveTheme takes the current index of the theme radio button and uses
 * themeList to identify the theme to set in localStorage
 */
function saveTheme() { // eslint-disable-line no-unused-vars
	let theme = 0;

	for (let i = 0, length = themeRadios.length; i < length; i++) {
		if (themeRadios[i].checked) {
			theme = parseInt(themeRadios[i].value, 10);
			break;
		}
	}
	data.theme = themeList[theme];
	save();
	location.reload();
}

/**
 * saveText takes the current index of the textSize radio button and uses
 * textList to identify the text size to set in localStorage
 */
function saveText() { // eslint-disable-line no-unused-vars
	let text = 0;

	for (let i = 0, length = textRadios.length; i < length; i++) {
		if (textRadios[i].checked) {
			text = parseInt(textRadios[i].value, 10);
			break;
		}
	}
	data.text = textList[text];
	save();
	location.reload();
}

/**
 * saveShape takes the current index of the shape radio button and uses
 * shapeList to set the icon shape in localStorage
 */
function saveShape() { // eslint-disable-line no-unused-vars
	let shape = 0;

	for (let i = 0, length = shapeRadios.length; i < length; i++) {
		if (shapeRadios[i].checked) {
			shape = parseInt(shapeRadios[i].value, 10);
			break;
		}
	}
	data.iconTopLeft = shapeList[shape][0];
	data.iconTopRight = shapeList[shape][1];
	data.iconBottomLeft = shapeList[shape][2];
	data.iconBottomRight = shapeList[shape][3];
	save();
	location.reload();
}
