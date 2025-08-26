const ctx = document.getElementById("chartMS");
const calcButton = document.getElementById("button-calc");
const nd = document.getElementById("nd");
const vfb = document.getElementById("vfb");

fileInput.addEventListener("change", (event) => {
	const file = event.target.files[0];

	const reader = new FileReader();
	reader.onload = (e) => {
		const content = e.target.result;
		axes = parseData(content);
		maxPoints = axes.length - 1;
		updateRangeInputs(maxPoints);
		const lindata = createLinData(0, maxPoints, axes);
		createChart(axes, lindata, "Potential (V)", "1/C² (cm⁴/F²)");
	};
	reader.readAsText(file);
});

function calcMSParams(slope, intercept) {
	dieletric = parseFloat(document.getElementById("dieletric").value);
	A = parseFloat(document.getElementById("area").value);
	const epsilon0 = 8.854e-12;
	const e = 1.602e-19;

	const vfb = -intercept / slope;
	const nd = 2 / (e * epsilon0 * dieletric * A * A * Math.abs(slope));

	return [vfb.toFixed(3), nd.toExponential(2)];
}

calcButton.addEventListener("click", (event) => {
	event.preventDefault();
	data = chartInstance.data.datasets[0].data;

	const [slope, intercept] = calcRegressionParams(
		data,
		rangeInit.value,
		rangeEnd.value
	);

	const [vfbValue, ndValue] = calcMSParams(slope, intercept);

	vfb.innerHTML = vfbValue;
	nd.innerHTML = ndValue;
});
