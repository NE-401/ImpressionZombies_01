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
		document.write('<h1>' + titleString + ' (' + userKeys.length + ' accounts)' + '</h1>');

		for(let i = 0; i < userKeys.length; i++) {
			userName = data.userIds[i];
			document.write(
				String(i+1) + ': <a href="https://x.com/' + userName + '">@' + userName + '</a><br>'
			);
		}
		document.write('<br><br><a href="../index.html">Back to index.html</a>');
	}).catch(error => {		// failed to load JSON
		document.write('<title>JSON load failed</title>');
		document.write('<h1>JSON load failed</h1>');
	});
});
