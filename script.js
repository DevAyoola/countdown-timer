// .start, .stop, .min, .sec, .milli-sec, .time, .reset

const btnStart = document.querySelector(".start");
const btnStop = document.querySelector(".stop");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");
const milliSec = document.querySelector(".milli-sec");
const time = document.querySelector(".time");
const btnReset = document.querySelector(".reset");

time.value = "01:00";

const defaultVal = function () {
	min.textContent = String(time.value.split(":")[0]).padStart(2, "0");
	sec.textContent = String(time.value.split(":")[1]).padStart(2, "0");
};
defaultVal();

let valueMin = Number(min.textContent);
let valueSec = Number(sec.textContent) + valueMin * 60;
let timer;

btnStart.addEventListener("click", function () {
	if (setInterval) {
		clearInterval(timer);
	}

	const tick = function () {
		if (valueSec === 0) clearInterval(timer);

		if (valueSec % 60 === 0) {
			min.textContent = String(valueMin).padStart(2, "0");
			sec.textContent = String(0).padStart(2, "0");
			valueMin--;
		} else {
			min.textContent = String(valueMin).padStart(2, "0");
			sec.textContent = String(valueSec % 60).padStart(2, "0");
		}

		valueSec--;
	};

	tick();
	timer = setInterval(tick, 1000);
});

btnStop.addEventListener("click", function (e) {
	e.preventDefault();
	clearInterval(timer);
});

btnReset.addEventListener("click", function (e) {
	clearInterval(timer);

	defaultVal();
	valueMin = Number(min.textContent);
	valueSec = Number(sec.textContent) + valueMin * 60;
	return 0;
});
