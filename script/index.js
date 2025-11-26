async function generateList() {
	const url = 'https://raw.githubusercontent.com/NE-401/ImpressionZombies_01/refs/heads/main/json/';
	const decimalChar = "0123456789";
	const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
	let ed = '', docList = '';
	let doc = '<title>Impression zombies list</title><h1>Impression zombies list</h1>';
	let total = 0;

	for(let i = 1; ed != 'now' && i < 100; i++) {
		const jsonNum = decimalChar.charAt(i / 10) + decimalChar.charAt(i % 10);
		const jsonUrl = url + jsonNum + '.json';
		const res = await fetch(jsonUrl);
		if(!res.ok) {		// some http errors
			break;
		} else {
			fetch(jsonUrl).then(response => response.json()).then(data => {
				docList += '<li><a href="lists/' + jsonNum + '.html">' + data.startDate + ' ~ ' + data.endDate + ' (' + data.userIds.length + 'x Zombies)</a></li>';
				total += data.userIds.length;
				ed = data.endDate;
			}).catch(error => {		// failed to load JSON
				console.log(error);
			});
			await sleep(1);
		}
	}
	doc += '<h3>Total: ' + total + 'x Zombies</h3><ul>' + docList + '</ul>';
	doc += '<br><br><a href="search.html">Search user ID</a><br></body>';
	document.write(doc);
}

window.addEventListener('DOMContentLoaded', () => {
	generateList();
});
