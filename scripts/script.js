
	
$(document).ready(function(){
	
	
	$('.nav-overflow').hide();
	
	
	overflowWidth = $('.nav-overflow').outerWidth(true);
	var resizeTimer;
	
	var navWidth = $('#nav').width();
	var contentWidth = $('#nav-content').outerWidth(true);
	var more = $('#overflow').outerWidth(true);
	while((contentWidth + more + 20)> navWidth){
		$('#nav-content li:last').prependTo('.nav-overflow');
		contentWidth = $('#nav-content').outerWidth(true);
	}
	
	var noElementOverflow = $('.nav-overflow li').length;
	if(noElementOverflow>0){
		$('#overflow').show();
	}

	
	function resizeFunction(){
		var navWidth = $('#nav').width();
		var contentWidth = $('#nav-content').outerWidth(true);
		var more = $('#overflow').outerWidth(true);
		
		// shrink the page 
		while((contentWidth + more + 20)> navWidth){
			$('#nav-content li:last').remove().prependTo('.nav-overflow');
			contentWidth = $('#nav-content').outerWidth(true);
		}
		
		// enlarge the page 
		var overflowWidth = $('.nav-overflow').outerWidth(true);
		
		var noElementOverflow = $('.nav-overflow li').length;
		while (((contentWidth + more + overflowWidth) < navWidth) && noElementOverflow > 0){ 
			$('.nav-overflow li:first').remove().appendTo('#nav-content');
			contentWidth = $('#nav-content').outerWidth(true);
			noElementOverflow = $('.nav-overflow li').length;
		}
		
		var noElementOverflow = $('.nav-overflow li').length;
		if(noElementOverflow>0){
			$('#overflow').show();
		}
		else{
			$('#overflow').hide();
		}
		
	}
	
	
	$('#overflow').click(function(){
		$('.nav-overflow').toggle();
	});
	
	
	
	
	$(window).resize(function(){
		clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeFunction, 250);
    });

    resizeFunction();
		
		
		
		
		

	
	



})	
