const time = document.querySelector(".clock-time");
const date = document.querySelector(".clock-date");
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getTime() {
	const today = new Date();
	const hour = today.getHours();
	const minutes = today.getMinutes();
	const seconds = today.getSeconds();

	date.innerText = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}, ${DAYS[today.getDay()]}`;
	time.innerText = `${timeFormat(hour)}:${timeFormat(minutes)}:${timeFormat(seconds)}`;
}

function timeFormat(time) {
	//change 01~09
	if (parseInt(time, 10) <= 9) return `0${time}`;
	else return `${time}`;
}

function init() {
	getTime();
	setInterval(getTime, 1000);
}

init();
