
function saveTheme() {
	var radios = document.getElementsByName('themeR');

	var theme = 0;

	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			theme = radios[i].value;
			break;
		}
	}
	console.log(theme);
	switch (theme) {
		case "1":
			data.theme = "light";
			save();

			break;
		case "2":
			data.theme = "dark";
			save();

			break;
		case "3":
			data.theme = "black";
			save();

			break;
	}

}

function saveText() {
	var radios = document.getElementsByName('textR');

	var text = 0;

	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			text = radios[i].value;
			break;
		}
	}
	console.log(text);
	switch (text) {
		case "1":
			data.text = "0.75";
			save();

			break;
		case "2":
			data.text = "1";
			save();

			break;
		case "3":
			data.text = "1.5";
			save();

			break;
	}

}

