/* eslint-disable no-var */
/* eslint-disable prefer-const */
const TOAST_TIMER = 2000;

/**
 * Copy the contents of the output element
 * @param {string} message
 * @return {void}
 */
function showToast(message) {
	var toast = document.getElementById("js-toast");
	var toastText = toast.firstElementChild.firstElementChild;
	toastText.innerText = message;
	toast.classList.add("show");
	setTimeout(function() {
		toast.classList.remove("show");
	}, TOAST_TIMER);
	return;
}

const MAX_FILE_SIZE = 1024 * 1024;

/**
 * Open the system file selector and upload a stream of chars with a filename
for each file
 * @param {blob[]} files
 * @param {string[]} targets
 * @return {string[]} fileNames
 */
function upload(files, targets) { // eslint-disable-line no-unused-vars
	const output = [];
	for (let index = 0; index < files.length; index++) {
		const file = files[index];
		const reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		reader.onload = function(event) {
			const fileContents = event.target.result;
			if (fileContents.length < MAX_FILE_SIZE) {
				document.getElementById(targets[index]).value = fileContents;
			} else {
				showToast("File must be smaller than 1MB");
			}
		};
		output.push(file.name);
	}
	return output;
}


/**
 * Download a stream of chars and set a filename
 * @param {string} filename
 * @param {string} chars
 * @return {void} none
 */
function download(filename, chars) { // eslint-disable-line no-unused-vars
	if (filename.length > 0 && chars.length > 0) {
		const blob = new Blob([chars], {type: "application/octet-stream"});
		const blobURL = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.download = filename;
		link.href = blobURL;
		link.style.display = "none";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} else {
		showToast("Give the file a name and some content");
	}
	return;
}

/**
 * @param {string} stringToCopy
 * @return {void}
 */
async function copyToClipboard(stringToCopy) {
	if (navigator.clipboard) {
		try {
			await navigator.clipboard.writeText(stringToCopy);
			showToast("Successfully Copied");
		} catch (err) {
			showToast("Failed to Copy");
		}
	}
	return;
}

/**
 * Copy the contents of the output element
 * @return {void}
 */
function copy() { // eslint-disable-line no-unused-vars
	var stringToCopy = document.getElementById("output").value;
	copyToClipboard(stringToCopy);
	window.getSelection().removeAllRanges();
	return;
}

/**
 * Returns a random integer between min (inclusive) and max (exclusive)
 * @param {int} min minimum int inclusive
 * @param {int} max maximum int exclusive
 * @return {int} random number
 */
function getRandomInt(min, max) {
	let rand = window.crypto.getRandomValues(new Uint8Array(1)) / 256;
	return Math.floor(rand * (max - min)) + min;
}

/**
 *
 * @param {arr[]} array array of values to shuffle
 * @return {arr[]} shuffled array
 */
function shuffle(array) { // eslint-disable-line no-unused-vars
	for (let index = array.length - 1; index > 0; index--) {
		const swap = getRandomInt(0, array.length);
		[array[index], array[swap]] = [array[swap], array[index]];
	}
	return array;
}
