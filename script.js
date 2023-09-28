// .start, .stop, .min, .sec, .time, .reset

const btnStart = document.querySelector(".start");
const btnStop = document.querySelector(".stop");
const min = document.querySelector(".min");
const sec = document.querySelector(".sec");
const time = document.querySelector(".time");
const btnReset = document.querySelector(".reset");

time.value = "01:00";

const defaultVal = function () {
	min.textContent = String(
		Number(time.value.split(":")[0]) + Math.trunc(time.value.split(":")[1] / 60)
	).padStart(2, "0");
	sec.textContent = String(time.value.split(":")[1] % 60).padStart(2, "0");
};
defaultVal();

let valueMin = Number(min.textContent);
let valueSec = Number(sec.textContent) + valueMin * 60;
let timer;

btnStart.addEventListener("click", function (e) {
	e.preventDefault();

	btnStart.style.display = "none";
	btnStop.style.display = "block";

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

	btnStop.style.display = "none";
	btnStart.style.display = "block";

	clearInterval(timer);
});

btnReset.addEventListener("click", function (e) {
	e.preventDefault();
	clearInterval(timer);

	btnStart.style.display = "block";
	btnStop.style.display = "none";

	defaultVal();
	valueMin = Number(min.textContent);
	valueSec = Number(sec.textContent) + valueMin * 60;
	return 0;
});
