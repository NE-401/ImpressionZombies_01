async function onClickSearchBtn() {
	const url = 'https://raw.githubusercontent.com/NE-401/ImpressionZombies_01/refs/heads/main/json/';
	const decimalChar = "0123456789";
	const txt = inputId.value;
	const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

	if(txt.trim() === '') {
		return;
	} else {
		const result = document.getElementById('result');
		let isEnd = false;
		const users = [];
		for(let i = 1; i < 100 && !isEnd; i++) {
			const jsonNum = decimalChar.charAt(i / 10) + decimalChar.charAt(i % 10);
			const jsonUrl = url + jsonNum + '.json';
			const xhr = new XMLHttpRequest();
			xhr.open("HEAD", jsonUrl, false);
			xhr.send();
			if(xhr.status == 404) {		// not found JSON
				users.forEach((u) => {
					const uArr = u[1];
					uArr.forEach((ud) => {
						if(!isEnd && txt.toLowerCase() === ud.toLowerCase()) {
							result.innerText = txt + ' is found at ' + u[0] + '.html.';
							isEnd = true;
						}
					});
				});
				if(!isEnd) result.innerText = txt + ' was not found on list.';
				break;
			} else {
				fetch(jsonUrl).then(response => response.json()).then(data => {
					let a = [];
					a.push(jsonNum);
					a.push(data.userIds);
					users.push(a);
					console.log('loaded ' + jsonNum + '.json');
				}).catch(error => {		// failed to load JSON
					isEnd = true;
				});
			}
			await sleep(4);
		}
	}
}

window.addEventListener('DOMContentLoaded', function() {
	const submitBtn = document.getElementById('submitBtn');
	submitBtn.addEventListener('click', onClickSearchBtn);
});
