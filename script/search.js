let users = [];

function searchId(t) {
	let found = false;
	users.forEach((u) => {
		const uArr = u[1];
		if(!found) {
			uArr.forEach((ud) => {
				if(t.toLowerCase() === ud.toLowerCase()) {
					found = u[0];
				}
			});
		}
	});
	return found;
}

async function onClickSearchBtn() {
	const url = 'https://raw.githubusercontent.com/NE-401/ImpressionZombies_01/refs/heads/main/json/';
	const decimalChar = "0123456789";
	const txt = inputId.value;
	const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

	if(txt.trim() === '') {
		return;
	} else {
		const result = document.getElementById('result');
		if(users.length) {
			const res = searchId(txt);
			if(res) {
				result.innerText = txt + ' was found on ' + res + '.html.';
			} else {
				result.innerText = txt + ' was not found on list.';
			}
		} else {
			for(let i = 1; i < 100; i++) {
				const jsonNum = decimalChar.charAt(i / 10) + decimalChar.charAt(i % 10);
				const jsonUrl = url + jsonNum + '.json';
				const xhr = new XMLHttpRequest();
				xhr.open("HEAD", jsonUrl, false);
				xhr.send();
				if(xhr.status == 404) {		// not found JSON
					const res = searchId(txt);
					if(res) {
						result.innerText = txt + ' was found on ' + res + '.html.';
					} else {
						result.innerText = txt + ' was not found on list.';
					}
					break;
				} else {
					fetch(jsonUrl).then(response => response.json()).then(data => {
						let a = [];
						a.push(jsonNum);
						a.push(data.userIds);
						users.push(a);
					}).catch(error => {		// failed to load JSON
						console.log(error);
					});
				}
				await sleep(4);
			}
		}
	}
}

window.addEventListener('DOMContentLoaded', function() {
	const submitBtn = document.getElementById('submitBtn');
	submitBtn.addEventListener('click', onClickSearchBtn);
});
