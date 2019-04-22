/*
Default data. Use this if there is no other data
*/
var DEFAULT = {
	theme: 'light',
	text: '1'
};

var data;

/*
Copy the contents of the output element
*/
function copy() {
	var stringToCopy = document.getElementById("output").value;
	copyToClipboard(stringToCopy);
	window.getSelection().removeAllRanges();
}

async function
copyToClipboard(stringToCopy){
	if(navigator.clipboard){
		try{
			await navigator.clipboard.writeText(stringToCopy);
			showToast("Successfully Copied");
		} catch(err){
			showToast("Failed to Copy")
		}
		
	}
}

function showToast(message) {
	var toast = document.getElementById("toast-notification");
	var toastText = document.getElementById("toast-text");
	toastText.innerHTML = message;
	toast.className += " show";
	setTimeout(function(){ toast.className = toast.className.replace(" show", ""); }, 3000);
  }

/*
Does the current browser support local storage?
*/
function hasLocalStorage() {
	var test = 'test';
	try {
		localStorage.setItem(test, test);
		localStorage.removeItem(test);
		return true;
	}
	catch (e) {
		console.log('Your Browser does not support local storage');
		return false;
	}
}

/*
Save data onto local storage
*/
function save() {
	if (hasLocalStorage()) {
		localStorage.setItem('com.fredhappyface.blackc4t', JSON.stringify(data));
	}

}

/*
Load data from local storage
*/
function load() {

	if (hasLocalStorage() && localStorage.getItem('com.fredhappyface.blackc4t') !== null) {
		data = JSON.parse(localStorage.getItem('com.fredhappyface.blackc4t'));
		return;
	} else {
		console.log('Your Browser does not support local storage or no data saved. Loading default data.');
		data = DEFAULT;
		return;
	}
}



/*
Set the theme
*/
function setTheme() {
	if (document.getElementById('theme') == null) {
		document.head.innerHTML += '<link rel="stylesheet" href="css/theme/' + data.theme + '.css"  id="theme">';
	}
	save();
}


/*
Resize the navbar when the page is resized 
*/
function resizeFunction() {
	// Get the width of the nav bar and the content and the "more" button
	var navWidth = $('#nav').width();
	var contentWidth = $('#nav-content').outerWidth(true);
	var more = $('#overflow').outerWidth(true);

	// Get the width of the overflow menu and the number of elements in the overflow menu 
	var overflowWidth = $('#nav-overflow').outerWidth(true);
	var noElementOverflow = $('#nav-overflow li').length;

	// shrink the page 
	while ((contentWidth + more + 20) > navWidth) {
		$('#nav-content li:last').remove().prependTo('#nav-overflow');
		contentWidth = $('#nav-content').outerWidth(true);
	}

	// enlarge the page 
	while (((contentWidth + more + overflowWidth) < navWidth) && noElementOverflow > 0) {
		$('#nav-overflow li:first').remove().appendTo('#nav-content');
		contentWidth = $('#nav-content').outerWidth(true);
		noElementOverflow = $('#nav-overflow li').length;
	}

	/*
	If there are items in the overflow menu then show the overflow button 
	*/
	var noElementOverflow = $('#nav-overflow li').length;
	if (noElementOverflow > 0) {
		$('#overflow').show();
	}
	else {
		$('#overflow').hide();
	}

}

/*
Gets an elements outer width
*/
function outerWidth(el) {
	var width = el.offsetWidth;
	var style = getComputedStyle(el);
	width += parseInt(style.marginLeft) + parseInt(style.marginRight);
	return width;
}

/*
Run this (the document should be ready)
*/

// read data from local storage
load();

// set the theme to the appropriate css 
setTheme();

// Declare a resize timer variable 
var resizeTimer;

// Hide the overflow element



document.getElementById("nav-overflow").style.display = 'none';


document.getElementById("overflow").onclick = function() {
	var navOverflow = document.getElementById("nav-overflow");
	if (navOverflow.style.display === "none") {
		navOverflow.style.display = "block";
	} else {
		navOverflow.style.display = "none";
	}
};

window.onresize = function(event) {
    clearTimeout(resizeTimer);
	resizeTimer = setTimeout(resizeFunction(), 250);
};


resizeFunction();


