const greetingForm = document.querySelector(".greeting");
const greetingInput = document.querySelector(".greeting-input");
const greetingSayHello = document.querySelector(".greeting-sayHello");
const USER_NAME = "userName";

function saveName(name) {
	localStorage.setItem(USER_NAME, name);
}

function loadName() {
	return localStorage.getItem(USER_NAME);
}

function sayHello(event) {
	event.preventDefault();

	const name = greetingInput.value;
	saveName(name);
	paintSayHello(name);
}

function paintSayHello(name) {
	greetingSayHello.innerText = `Hello, ${name}`;
	greetingInput.remove();
}

function init() {
	const name = loadName();
	if (name === null) {
		greetingForm.addEventListener("submit", sayHello);
	} else {
		paintSayHello(name);
	}
}

init();
