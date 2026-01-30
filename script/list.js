const b64char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function initData(pageNum, max) {
	localStorage.setItem(pageNum, 'A'.repeat(Math.ceil(max / 6)));
	return '0'.repeat(max);
}

// compressed string to binary string
function readData(pageNum) {
	const result = localStorage.getItem(pageNum);
	if(result) {
		let expand = '';
		for(let i = 0; i < result.length; i++) {
			const idx = b64char.indexOf(result.charAt(i));
			const to6BitStr = n => ('000000' + n.toString(2)).slice(-6);
			expand += to6BitStr(idx);
		}
		return expand;
	} else {
		return null;
	}
}

// binary string to compressed string
function writeData(pageNum, s) {
	let ts = s, ds = '';
	while(ts.length > 0) {
		const n = ts.slice(0,6);
		ts = ts.slice(6);
		ds += b64char.charAt(parseInt(n, 2));
	}
	localStorage.setItem(pageNum, ds);
}

window.addEventListener('DOMContentLoaded', () => {
	const currentPath = window.location.pathname;
	let url = new URL(window.location.href);
	let p = url.searchParams;
	const pageNumber = p.get('p');
	const jsonUrl = 'https://raw.githubusercontent.com/NE-401/ImpressionZombies_01/refs/heads/main/json/' + pageNumber + '.json';

	fetch(jsonUrl).then(response => response.json()).then(data => {
		const titleString = 'Impression zombies found at ' + (data.startDate + ' ~ ' + data.endDate);
		const userKeys = Object.keys(data.userIds);
		document.write('<title>' + titleString + '</title>');
		document.write('<h2>' + titleString + ' (' + userKeys.length + ' accounts)</h2>');
		document.write('<form><input type="button" id="download" value="Download Account List"></form>');
		document.write('<table border="1"><tr><th>#</th><th>Accound ID</th><th>Blocked?</th></tr>');

		let chkBoxState = readData(pageNumber);
		if(!chkBoxState) {
			chkBoxState = initData(pageNumber, userKeys.length);
		}
		let stateArray = chkBoxState.split('');
		let chkboxArr = [];

		for(let i = 0; i < userKeys.length; i++) {
			const userName = data.userIds[i];
			document.write(
				'<tr><td align="left">' + String(i + 1) + '</td><td><a href="https://x.com/' + userName + '" target="_blank">@' + userName + '</a></td>'
				+ '<td align="center"><input type="checkbox" id="c_' + String(i)
				+ ((chkBoxState.charAt(i) == '1') ? '" checked' : '"')
				+ '></td></tr>'
			);
			chkboxArr.push(document.getElementById('c_' + String(i)));
		}

		const dlBtn = document.getElementById('download');
		dlBtn.addEventListener('click', () => {
			let s = titleString + '\nDisclaimer: Account suspension or ID changes may result in the account no longer existing.\n';
			data.userIds.forEach((u) => {
				s += '\n@' + u;
			});
			const blob = new Blob([s], {type: 'text/plain'});
			const url = URL.createObjectURL(blob);
			let elem = document.createElement('a');
			elem.href = url;
			elem.download = 'ImpressionZombies_' + pageNumber + '.txt';
			document.body.appendChild(elem);
			elem.click();
		});

		chkboxArr.forEach((c, i) => {
			c.addEventListener('click', () => {
				stateArray[i] = (c.checked) ? '1' : '0';
				for(let i = 0; i < stateArray.length; i++) {
					if(!stateArray[i]) stateArray[i] = '0';
				}
				writeData(pageNumber, stateArray.join(''));
			});
		});

		document.write('</table><br><br><a href="/ImpressionZombies_01">Back to top page</a>');
	}).catch(error => {		// failed to load JSON
		document.write('<title>JSON load failed</title><h1>JSON load failed</h1>');
		document.write('<br><a href="/ImpressionZombies_01">Back to top page</a>');
		console.log(error);
	});
});
