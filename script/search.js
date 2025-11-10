async function onClickSearchBtn() {
	const url = 'https://raw.githubusercontent.com/NE-401/ImpressionZombies_01/refs/heads/main/json/';
	const decimalChar = "0123456789";
	const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
	const txt = inputId.value;
	if(txt.trim() === '') {
		return;
	} else {
		const result = document.getElementById('result');
		let isEnd = false;
		for(let i = 1; i < 100 && !isEnd; i++) {
			const jsonNum = decimalChar.charAt(i / 10) + decimalChar.charAt(i % 10);
			const jsonUrl = url + jsonNum + '.json';
			console.log(isEnd + ' ' + jsonNum + '.json'); // debug
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
					console.log(error);
					isEnd = true;
				});
			}
			await sleep(3);
		}
	}
}

window.addEventListener('DOMContentLoaded', function() {
	const submitBtn = document.getElementById('submitBtn');
	submitBtn.addEventListener('click', onClickSearchBtn);
});
