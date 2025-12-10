window.addEventListener('DOMContentLoaded', () => {
	const m = location.pathname.match(/lists\/(.+)\.html$/i);
	if(m) {
		const p = m[1];
		document.write('Redirecting to new page, please wait...');
		location.replace('/ImpressionZombies_01/list.html?p=' + p);
		throw new Error('Redirecting');
	} else {
		document.write('<head><title>Page not found</title></head>');
		document.write('<body><h1>404 - Page not found.</h1>');
		document.write('<p>The page you are looking for does not exist or the URL is incorrect.</p>');
		document.write('You will be redirected back to the top page in <span id="timer">10</span> seconds.');
		document.write('<br><br><a href="/ImpressionZombies_01">Return to top page now</a>');

		let sec = 10;
		const timerElm = document.getElementById('timer');
		// console.log(location.pathname);
		const countdown = setInterval(() => {
			sec--;
			timerElm.textContent = sec;
			if(sec <= 0) {
				clearInterval(countdown);
				location.href = '/ImpressionZombies_01';
			}
		}, 1000);
	}
});
