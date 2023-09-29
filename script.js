// .start, .stop, .time-up, .min, .sec, .time, .reset

const btnStart = document.querySelector(".start");
const btnStop = document.querySelector(".stop");
const btnTimeUp = document.querySelector(".time-up");
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

const resetVal = function () {
	defaultVal();
	valueMin = Number(min.textContent);
	valueSec = Number(sec.textContent) + valueMin * 60;
};

let valueMin = Number(min.textContent);
let valueSec = Number(sec.textContent) + valueMin * 60;
let timer;

btnStart.addEventListener("click", function (e) {
	e.preventDefault();

	if (valueSec === 0) {
		btnStart.style.display = "none";
		btnTimeUp.style.display = "block";
	} else {
		btnStart.style.display = "none";
		btnStop.style.display = "block";
	}
	// if (setInterval) clearInterval(timer);

	const tick = function () {
		if (valueMin === 0 && valueSec === 0) {
			clearInterval(timer);

			btnStop.style.display = "none";
			btnTimeUp.style.display = "block";
		}

		if (valueMin != 0 && valueSec % 60 === 0) {
			min.textContent = String(valueMin).padStart(2, "0");
			sec.textContent = String(0).padStart(2, "0");
			valueMin--;
		} else {
			min.textContent = String(valueMin).padStart(2, "0");
			sec.textContent = String(valueSec % 60).padStart(2, "0");
		}

		if (valueSec != 0) valueSec--;
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

btnTimeUp.addEventListener("click", function (e) {
	e.preventDefault();

	btnTimeUp.style.display = "none";
	btnStart.style.display = "block";

	resetVal();
});

btnReset.addEventListener("click", function (e) {
	e.preventDefault();
	clearInterval(timer);

	btnStart.style.display = "block";
	btnStop.style.display = "none";

	resetVal();
});
