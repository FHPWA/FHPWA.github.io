
/**
 * Resize the navbar when the page is resized
 */
function resizeFunction() {
	// Get the width of the nav bar and the content and the "more" button
	const navWidth = $(document.getElementById("js-nav")).width();
	let contentWidth = $(document.getElementById("js-nav__content"))
		.outerWidth(true);
	const more = $(document.getElementById("js-overflow")).outerWidth(true);

	/* Get the width of the overflow menu and the number of elements in
	the overflow menu */
	$(document.getElementById("js-nav__overflow")).show();

	const overflowWidth = $(document.getElementById("js-nav__overflow"))
		.outerWidth(true);
	$(document.getElementById("js-nav__overflow")).hide();

	let noElementOverflow = document.getElementById("js-nav__overflow")
		.getElementsByTagName("li").length;

	// shrink the page
	while ((contentWidth + more + 20) > navWidth) {
		$(document.getElementById("js-nav__content").lastElementChild)
			.remove().prependTo(document.getElementById("js-nav__overflow"));
		contentWidth = $(document.getElementById("js-nav__content"))
			.outerWidth(true);
	}

	// enlarge the page
	while (((contentWidth + more + overflowWidth ) < navWidth) &&
		noElementOverflow > 0) {
		$(document.getElementById("js-nav__overflow").firstElementChild)
			.remove().appendTo(document.getElementById("js-nav__content"));
		contentWidth = $(document.getElementById("js-nav__content"))
			.outerWidth(true);
		noElementOverflow = document.getElementById("js-nav__overflow")
			.getElementsByTagName("li").length;
	}

	/*
	If there are items in the overflow menu then show the overflow button
	*/
	noElementOverflow = document.getElementById("js-nav__overflow")
		.getElementsByTagName("li").length;
	if (noElementOverflow > 0) {
		$(document.getElementById("js-overflow")).show();
	} else {
		$(document.getElementById("js-overflow")).hide();
	}
}

// Declare a resize timer variable
let resizeTimer;

// Hide the overflow element
document.getElementById("js-nav__overflow").style.display = "none";

document.getElementById("js-overflow").onclick = function() {
	const navOverflow = document.getElementById("js-nav__overflow");
	if (navOverflow.style.display === "none") {
		navOverflow.style.display = "block";
	} else {
		navOverflow.style.display = "none";
	}
};

window.onresize = function(event) {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(resizeFunction(), 1000);
};


resizeFunction();
