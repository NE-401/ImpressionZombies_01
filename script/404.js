window.addEventListener('DOMContentLoaded', () => {
	const m = location.pathname.match(/^\/lists\/(.+)\.html$/i);
	console.log(m);
	if(m) {
		const p = m[1];
		location.replace('/ImpressionZombies_01/list.html?p=' + p);
		throw new Error('Redirecting');
	} else {
		let sec = 10;
		const timerElm = document.getElementById('timer');
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
