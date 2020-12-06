const PHOTO_API_KEY = "j11jDgXUCziRCB0HLZm-GJ068P9Wb6rw2PAICPB9dsU";

function getRandomPoto() {
	fetch(`https://api.unsplash.com/photos/random?client_id=${PHOTO_API_KEY}&orientation=landscape`)
		.then(function (response) {
			return response.json();
		})
		.then(function (json) {
			const url = json.urls.regular;
			setBackground(url);
		})
		.catch(function (e) {
			//set default images when request error
			setBackground(`src/imgs/${Math.floor(Math.random() * 4) + 1}.jpg`);
		});
}

function setBackground(url) {
	document.body.style.backgroundImage = `url('${url}')`;
	document.body.style.backgroundSize = "cover";
}

function init() {
	getRandomPoto();
}

init();
