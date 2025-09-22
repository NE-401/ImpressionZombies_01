function generateHtml(path) {
	const p = 'https://raw.githubusercontent.com/NE-401/ImpressionZombies_01/refs/heads/main/json/' + path;

	fetch(p).then(response => response.json()).then(data => {
		// load success
		const titleString = 'Impression zombies found at ' + (data.startDate + ' ~ ' + data.endDate);

		document.write('<title>' + titleString + '</title>');
		document.write('<h1>' + titleString + '</h1>');

		const userKeys = Object.keys(data.userIds);

		for(let i = 0; i < userKeys.length; i++) {
			userName = data.userIds[i];
			document.write(
				String(i + 1) + ': <a href="https://x.com/' + userName + '">' + userName + '</a><br>'
			);
		}

		document.write('<br><br><a href="index.html">Back to index.html</a>');
	}).catch(error => {
		console.error('Error:', error);
		const titleStringFailed = 'JSON load failed';
		// title
		const title = document.createElement('title');
		title.textContent = titleStringFailed;
		document.head.appendChild(title);

		// h1
		const h1 = document.createElement('h1');
		h1.textContent = titleStringFailed;
		document.body.appendChild(h1);
	});
}

window.addEventListener('DOMContentLoaded', function() {
	const currentPath = window.location.pathname;
	const pattern = /^.*\//g;
	const htmlPath = currentPath.replace(pattern, '');
	const JSONPath = htmlPath.replace('html','json');

	generateHtml(JSONPath);
});
