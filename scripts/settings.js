let themeRadios = document.getElementsByName("themeR");
let textRadios = document.getElementsByName("textR");
let shapeRadios = document.getElementsByName("shapeR");

let themeList = ["", "light", "dark", "black", "auto"];

let textList = ["", "0.75", "1", "1.5"];
let textIds = ["", "small", "med", "large"];

// TopLeft, TopRight, BottomLeft, BottomRight
let shapeList = [["", "", "", ""], ["0%", "0%", "0%", "0%"], ["50%", "50%", "50%", "50%"], ["10%", "10%", "10%", "10%"], ["50%", "50%", "50%", "10%"]];
let shapeIds = ["", "square", "circle", "squircle", "teardrop"];

document.getElementById(data.theme).checked = true;
let textRadioIndex = textList.indexOf(data.text);
if (textRadioIndex > -1){
	document.getElementById(textIds[textRadioIndex]).checked = true;
}
for (let shapeRadioIndex = 0; shapeRadioIndex < shapeList.length; shapeRadioIndex++){
	if (shapeList[shapeRadioIndex][0] === data.iconTopLeft && shapeList[shapeRadioIndex][1] === iconTopRight && shapeList[shapeRadioIndex][2] === iconBottomLeft && shapeList[shapeRadioIndex][3] === iconBottomRight){
		document.getElementById(shapeIds[shapeRadioIndex]).checked = true;
	}
}


function saveTheme() {
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

function saveText() {
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

function saveShape() {
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
