function changeDarkmode(){
	$('body').toggleClass('darkmode');
	setCookie('darkmode_hand', $('body').hasClass('darkmode') ? 1 : 0, 720);
	setCookie('darkmode', $('body').hasClass('darkmode')?1:0, 720);
}
