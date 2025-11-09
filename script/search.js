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
		let i = 1;
		let isEnd = false;
		do {
			const jsonNum = decimalChar.charAt(i / 10) + decimalChar.charAt(i % 10);
			const jsonUrl = url + jsonNum + '.json';
			const xhr = new XMLHttpRequest();
			xhr.open("HEAD", jsonUrl, false);
			xhr.send();
			if(xhr.status == 404) {		// not found JSON
				result.innerText = txt + ' is not present in the list. Please contact the list owner.';
				break;
			} else {
				fetch(jsonUrl).then(response => response.json()).then(data => {
					const userKeys = Object.keys(data.userIds);
					for(let j = 0; j < userKeys.length; j++) {
						if(data.userIds[j].toLowerCase() == txt.toLowerCase()) {
							result.innerText = txt + ' is found in the list ' + jsonNum + '.json';
							isEnd = true;
							break;
						}
					}
				}).catch(error => {		// failed to load JSON
					result.innerText = txt + ' is not present in the list. Please contact the list owner.';
					isEnd = true;
				});
			}
			if(isEnd) break;
			i++;
		} while(i < 100);
	}
}

window.addEventListener('DOMContentLoaded', function() {
	const submitBtn = document.getElementById('submitBtn');
	submitBtn.addEventListener('click', onClickSearchBtn);
});
