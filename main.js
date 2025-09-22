window.addEventListener('DOMContentLoaded', function() {
	let titleString = 'Impression zombies found at ';

	const currentPath = window.location.pathname;

	// title
	const title = document.createElement('title');
	title.textContent = titleString;
	document.head.appendChild(title);

	// h1
	const h1 = document.createElement('h1');
	h1.textContent = titleString;

	document.body.appendChild(h1);

	// p (test)
	const p = document.createElement('p');
	p.textContent = currentPath;
	document.body.appendChild(p);
});
