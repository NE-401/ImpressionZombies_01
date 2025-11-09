function onClickSearchBtn() {
	const currentPath = window.location.pathname;
	const pattern = /^.*\//g;
	const url = 'https://raw.githubusercontent.com/NE-401/ImpressionZombies_01/refs/heads/main/json/';
	const decimalChar = "0123456789";

	const txt = inputId.value;
	if(txt.trim() === '') {
		return;
	} else {
		const result = document.getElementById('result');
		// result.innerText = txt;

		let i = 1;
		do {
			const jsonNum = decimalChar.charAt(i / 10) + decimalChar.charAt(i % 10);
			const jsonUrl = url + jsonNum + '.json';
			fetch(jsonUrl).then(response => response.json()).then(data => {
				const userKeys = Object.keys(data.userIds);
				for(let i = 0; i < userKeys.length; i++) {
					if(data.userIds[i].toLowerCase() == txt.toLowerCase()) {
						result.innerText = txt + ' is found in the list ' + jsonNum + '.json';
						return;
					}
				}
			}).catch(error => {		// failed to load JSON, or not found JSON
				// return 1;
			});

			i++;
		} while(i < 100);

		result.innerText = txt + ' is not present in the list. Please contact the list owner.';
	}

}

window.addEventListener('DOMContentLoaded', function() {
	const submitBtn = document.getElementById('submitBtn');
	submitBtn.addEventListener('click', onClickSearchBtn);
});
