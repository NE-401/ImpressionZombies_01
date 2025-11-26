let users = [];

function searchId(t) {
	const result = document.getElementById('result');
	let found = false;
	users.forEach((u) => {
		const uArr = u[1];
		if(!found) {
			uArr.forEach((ud) => {
				if(t.toLowerCase() === ud.toLowerCase()) {
					result.innerText = t + ' was found on ' + u[0] + '.html.';
					found = true;
				}
			});
		}
	});
	if(!found) result.innerText = t + ' was not found on list.';
}

async function loadJSON() {
	const url = 'https://raw.githubusercontent.com/NE-401/ImpressionZombies_01/refs/heads/main/json/';
	const decimalChar = "0123456789";
	const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
	let ed = '';

	for(let i = 1; ed != 'now' && i < 100; i++) {
		const jsonNum = decimalChar.charAt(i / 10) + decimalChar.charAt(i % 10);
		const jsonUrl = url + jsonNum + '.json';
		const res = await fetch(jsonUrl);
		if(!res.ok) {		// some http errors
			break;
		} else {
			fetch(jsonUrl).then(response => response.json()).then(data => {
				let a = [];
				a.push(jsonNum);
				a.push(data.userIds);
				users.push(a);
				ed = data.endDate;
			}).catch(error => {		// failed to load JSON
				console.log(error);
			});
		}
		await sleep(4);
	}
}

function onClickSearchBtn() {
	const txt = inputId.value;
	if(txt.trim() === '') {
		return;
	} else {
		searchId(txt);
	}
}

window.addEventListener('DOMContentLoaded', function() {
	const submitBtn = document.getElementById('submitBtn');
	submitBtn.addEventListener('click', onClickSearchBtn);
	loadJSON();
});
