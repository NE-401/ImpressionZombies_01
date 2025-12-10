const b64char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function intToBinaryStr(n) {
	let a = Array(6), m = n;
	for(let i = 5; i >= 0; i--) {
		a[i] = (m % 2) ? '1' : '0';
		m = Math.floor(m / 2);
	}
	return a.join('');
}

function binaryStrToInt(s) {
	let n = 0, m = 32;
	for(let i = 0; m >= 1; i++) {
		n += (s.charAt(i) == '1') ? m : 0;
		m /= 2;
	}
	return n;
}

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
			expand += intToBinaryStr(b64char.indexOf(result.charAt(i)));
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
		ds += b64char.charAt(binaryStrToInt(n));
	}
	localStorage.setItem(pageNum, ds);
}

window.addEventListener('DOMContentLoaded', () => {
	const currentPath = window.location.pathname;
	const pattern = /^.*\//g;
	let url = new URL(window.location.href);
	let p = url.searchParams;
	const jsonName = p.get('p');
	const jsonUrl = 'https://raw.githubusercontent.com/NE-401/ImpressionZombies_01/refs/heads/main/json/' + jsonName + '.json';

	fetch(jsonUrl).then(response => response.json()).then(data => {
		const titleString = 'Impression zombies found at ' + (data.startDate + ' ~ ' + data.endDate);
		const userKeys = Object.keys(data.userIds);
		document.write('<title>' + titleString + '</title>');
		document.write('<h2>' + titleString + ' (' + userKeys.length + ' accounts)</h2>');
		document.write('<form><input type="button" id="download" value="Download Account List"></form>');
		document.write('<table border="1"><tr><th>#</th><th>Accound ID</th><th>Blocked?</th></tr>');

		const pageNumber = jsonName.replace('.json','');
		let chkBoxState = readData(pageNumber);
		if(!chkBoxState) {
			chkBoxState = initData(pageNumber, userKeys.length);
		}
		let stateArray = chkBoxState.split('');
		let chkboxArr = [];

		for(let i = 0; i < userKeys.length; i++) {
			const userName = data.userIds[i];
			document.write(
				'<tr><td>' + String(i + 1) + '</td><td><a href="https://x.com/' + userName + '">@' + userName + '</a></td>'
				+ '<td><input type="checkbox" id="c_' + String(i)
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
