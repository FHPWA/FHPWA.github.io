let themeRadios = document.getElementsByName("themeR");
let textRadios = document.getElementsByName("textR");

let themeList = ["", "light", "dark", "black", "auto"];
let textList = ["", "0.75", "1", "1.5"];

let textIds = ["", "small", "med", "large"]

document.getElementById(data.theme).checked = true;
textRadioIndex = textList.indexOf(data.text);
if (textRadioIndex > -1){
	document.getElementById(textIds[textRadioIndex]).checked = true;
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
