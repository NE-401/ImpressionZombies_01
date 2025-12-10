window.addEventListener('DOMContentLoaded', () => {
	const m = location.pathname.match(/lists\/(.+)\.html$/i);
	if(m) {
		const p = m[1];
		location.replace('/ImpressionZombies_01/list.html?p=' + p);
		throw new Error('Redirecting');
	}

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
});
