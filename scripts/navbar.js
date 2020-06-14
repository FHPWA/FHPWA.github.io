/**
 * Resize the navbar when the page is resized
 */
function resizeFunction() {
	// Get the width of the nav bar and the content and the "more" button
	const navComputedStyle = getComputedStyle(document.getElementById("js-nav"));
	const navWidth = document.getElementById("js-nav").clientWidth - (parseFloat(
		navComputedStyle.paddingLeft) + parseFloat(navComputedStyle.paddingRight));
	let contentWidth = document.getElementById("js-nav__content").clientWidth;
	const more = document.getElementById("js-overflow").clientWidth;

	/* Get the width of the overflow menu and the number of elements in
	the overflow menu */
	document.getElementById("js-nav__overflow").style.display = "inline-block";
	const overflowWidth = document.getElementById("js-nav__overflow").clientWidth;
	document.getElementById("js-nav__overflow").style.display = "none";

	let noElementOverflow = document.getElementById("js-nav__overflow")
		.getElementsByTagName("li").length;

	// shrink the page
	while ((contentWidth + more + 20) > navWidth) {
		const el = document.getElementById("js-nav__content").lastElementChild;
		// prependto
		document.getElementById("js-nav__overflow").prepend(el);
		contentWidth = document.getElementById("js-nav__content").clientWidth;
	}

	// enlarge the page
	while (((contentWidth + more + overflowWidth ) + 50 < navWidth) &&
		noElementOverflow > 0) {
		const el = document.getElementById("js-nav__overflow").firstElementChild;
		// appendto
		document.getElementById("js-nav__content").appendChild(el);
		contentWidth = document.getElementById("js-nav__content").clientWidth;
		noElementOverflow = document.getElementById("js-nav__overflow")
			.getElementsByTagName("li").length;
	}


	/*
	If there are items in the overflow menu then show the overflow button
	*/
	noElementOverflow = document.getElementById("js-nav__overflow")
		.getElementsByTagName("li").length;
	if (noElementOverflow > 0) {
		document.getElementById("js-overflow").style.display = "inline-block";
	} else {
		document.getElementById("js-overflow").style.display = "none";
	}
}

// Declare a resize timer variable
let resizeTimer;

// Hide the overflow element
document.getElementById("js-nav__overflow").style.display = "none";

document.getElementById("js-overflow").onclick = function() {
	const navOverflow = document.getElementById("js-nav__overflow");
	if (navOverflow.style.display === "none") {
		navOverflow.style.display = "inline-block";
	} else {
		navOverflow.style.display = "none";
	}
};

window.onresize = function(event) {
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(resizeFunction(), 1000);
};


resizeFunction();
