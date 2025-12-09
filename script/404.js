window.addEventListener('DOMContentLoaded', () => {
	let sec = 10;
	const timerElm = document.getElementById('timer');
	const countdown = setInterval(() => {
		sec--;
		timerElm.textContent = sec;

		if(sec <= 0) {
			clearInterval(countdown);
			location.href = '/ImpressionZombies_01/';
		}
	}, 1000);
});
