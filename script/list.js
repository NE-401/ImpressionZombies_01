
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

		const pageNum = jsonName.replace('.json','');
		document.write('<table border="1"><tr><th>#</th><th>Accound ID</th><th>Reported?</th><th>reported</th></tr>');

		let c_Arr = [];

		for(let i = 0; i < userKeys.length; i++) {
			const userName = data.userIds[i];
			const reported = String(pageNum) + '-' + String(i+1);
			document.write(
				'<tr><td>' + String(i+1) + '</td><td><a href="https://x.com/' + userName + '">@' + userName + '</a></td>'
				+ '<td><input type="checkbox" id="reported_' + reported + '"></td><td>' + reported +'</td></tr>'
			);
			const chkBox = document.getElementById('reported_' + reported)
			c_Arr.push(chkBox);
		}
		document.write('</table><br><br><a href="../index.html">Back to index.html</a>');

		let chkList = [];
		if(document.cookie) {
			chkList = document.cookie;
		} else {
			chkList = '0'.repeat(userKeys.length);
		}
		c_Arr.forEach((ci, i) => {
			if(chkList.charAt[i] == '1') {
				ci.checked = true;
			}
			ci.addEventListener('click', function() {
				let x = [];
				c_Arr.forEach((cj) => {
					x.push(cj.checked ? '1' : '0');
				});

				let exp = new Date();
				const a = x.join('');
				const expDay = 365;
				exp.setTime(exp.getTime() + (1000 * 3600 * 24 * expDay));

				const cookieStr = a + '; expires=' + exp.toUTCString();
				document.cookie = cookieStr;
				console.log(cookieStr);
				console.log(document.cookie);
			});
		});
	}).catch(error => {		// failed to load JSON
		document.write('<title>JSON load failed</title>');
		document.write('<h1>JSON load failed</h1>');
		console.log(error);
	});
});
