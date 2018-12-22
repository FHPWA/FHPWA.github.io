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
	document.getElementById("output").select();
	document.execCommand('copy');
	window.getSelection().removeAllRanges();
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
Wait until the document is ready
*/
$(document).ready(function () {

	// read data from local storage
	load();

	// set the theme to the appropriate css 
	setTheme();


	// Hide the overflow element
	$('.nav-overflow').hide();


	overflowWidth = $('.nav-overflow').outerWidth(true);
	var resizeTimer;

	var navWidth = $('#nav').width();
	var contentWidth = $('#nav-content').outerWidth(true);
	var more = $('#overflow').outerWidth(true);
	while ((contentWidth + more + 20) > navWidth) {
		$('#nav-content li:last').prependTo('.nav-overflow');
		contentWidth = $('#nav-content').outerWidth(true);
	}

	var noElementOverflow = $('.nav-overflow li').length;
	if (noElementOverflow > 0) {
		$('#overflow').show();
	}


	function resizeFunction() {
		var navWidth = $('#nav').width();
		var contentWidth = $('#nav-content').outerWidth(true);
		var more = $('#overflow').outerWidth(true);

		// shrink the page 
		while ((contentWidth + more + 20) > navWidth) {
			$('#nav-content li:last').remove().prependTo('.nav-overflow');
			contentWidth = $('#nav-content').outerWidth(true);
		}

		// enlarge the page 
		var overflowWidth = $('.nav-overflow').outerWidth(true);

		var noElementOverflow = $('.nav-overflow li').length;
		while (((contentWidth + more + overflowWidth) < navWidth) && noElementOverflow > 0) {
			$('.nav-overflow li:first').remove().appendTo('#nav-content');
			contentWidth = $('#nav-content').outerWidth(true);
			noElementOverflow = $('.nav-overflow li').length;
		}

		var noElementOverflow = $('.nav-overflow li').length;
		if (noElementOverflow > 0) {
			$('#overflow').show();
		}
		else {
			$('#overflow').hide();
		}

	}


	$('#overflow').click(function () {
		$('.nav-overflow').toggle();
	});




	$(window).resize(function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 250);
	});

	resizeFunction();











});
