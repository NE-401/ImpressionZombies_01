const b64char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function intToBinaryStr(n) {
	let a = Array(6);
	let m = n;
	for(let i = 5; i >= 0; i--) {
		a[i] = (m % 2) ? '1' : '0';
		m = Math.floor(m / 2);
	}
	console.log(n + ': ' + a.join(''));
	return a.join('');
}

function binaryStrToInt(s) {
	let n = 0;
	n += (s.charAt(0) == '1' ? 32 : 0);
	n += (s.charAt(1) == '1' ? 16 : 0);
	n += (s.charAt(2) == '1' ? 8 : 0);
	n += (s.charAt(3) == '1' ? 4 : 0);
	n += (s.charAt(4) == '1' ? 2 : 0);
	n += (s.charAt(5) == '1' ? 1 : 0);
	return n;
}

function initData(pageNum, max) {
	let s = 'A'.repeat(Math.ceil(max / 6));
	localStorage.setItem(pageNum, s);
	return '0'.repeat(max);
}

// compressed string to binary string
function readData(pageNum) {
	const result = localStorage.getItem(pageNum);
	let expand = '';

	if(result) {
		for(let i = 0; i < result.length; i++) {
			const c = b64char.indexOf(result.charAt(i));
			expand += intToBinaryStr(c);
		}
	} else {
		return null;
	}
	return expand;
}

// binary string to compressed string
function writeData(pageNum, s) {
	let ts = s;
	let ds = '';

	while(ts.length > 0) {
		const n = ts.slice(0,6);
		ts = ts.slice(6);
		ds += b64char.charAt(binaryStrToInt(n));
	}

	localStorage.setItem(pageNum, ds);
}

window.addEventListener('DOMContentLoaded', function() {
	const currentPath = window.location.pathname;
	const pattern = /^.*\//g;
	const url = 'https://raw.githubusercontent.com/NE-401/ImpressionZombies_01/refs/heads/main/json/';
	const jsonName = currentPath.replace(pattern, '').replace('html','json');
	const jsonUrl = url + jsonName;

	fetch(jsonUrl).then(response => response.json()).then(data => {
		const titleString = 'Impression zombies found at ' + (data.startDate + ' ~ ' + data.endDate);
		document.write('<title>' + titleString + '</title>');

		const userKeys = Object.keys(data.userIds);
		document.write('<h1>' + titleString + ' (' + userKeys.length + ' accounts)' + '</h1><ol>');
		document.write('<table border="1"><tr><th>#</th><th>Accound ID</th><th>Blocked?</th></tr>');

		const pageNumber = jsonName.replace('.json','');
		let chkBoxState = readData(pageNumber);
		if(!chkBoxState) {
			chkBoxState = initData(pageNumber, userKeys.length);
		}
		let stateArray = chkBoxState.split('');
		let chkboxArr = [];
		console.log(chkBoxState);

		for(let i = 0; i < userKeys.length; i++) {
			const userName = data.userIds[i];

			document.write(
				'<tr><td>' + String(i + 1) + '</td><td><a href="https://x.com/' + userName + '">@' + userName + '</a></td>'
				+ '<td><input type="checkbox" id="c_' + String(i)
				+ (chkBoxState.charAt(i) == '1' ? '" checked' : '"')
				+ '></td></tr>'
			);

			const c = document.getElementById('c_' + String(i));
			chkboxArr.push(c);
		}

		chkboxArr.forEach((c, i) => {
			c.addEventListener('click', function() {
				stateArray[i] = (c.checked) ? '1' : '0';
				for(let i = 0; i < stateArray.length; i++) {
					if(!stateArray[i]) stateArray[i] = '0';
				}
				console.log(stateArray.join(''));
				writeData(pageNumber, stateArray.join(''));
			});
		});

		document.write('</table><br><br><a href="../index.html">Back to index.html</a>');
	}).catch(error => {		// failed to load JSON
		document.write('<title>JSON load failed</title>');
		document.write('<h1>JSON load failed</h1>');
		console.log(error);
	});
});
