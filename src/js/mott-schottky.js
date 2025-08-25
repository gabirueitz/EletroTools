const rangeInit = document.getElementById("init");
const rangeEnd = document.getElementById("end");
const initValue = document.getElementById("initValue");
const endValue = document.getElementById("endValue");

initValue.innerHTML = rangeInit.value;
endValue.innerHTML = rangeEnd.value;

rangeInit.addEventListener("change", () => {
	initValue.innerHTML = rangeInit.value;
});

rangeEnd.addEventListener("change", () => {
	endValue.innerHTML = rangeEnd.value;
});
