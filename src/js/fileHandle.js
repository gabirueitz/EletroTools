const fileInput = document.getElementById("fileInput");
chartInstance = null;

const rangeInit = document.getElementById("init");
const rangeEnd = document.getElementById("end");
const initValue = document.getElementById("initValue");
const endValue = document.getElementById("endValue");

rangeInit.addEventListener("change", () => {
	initValue.innerHTML = rangeInit.value;
	updateChart();
});

rangeEnd.addEventListener("change", () => {
	endValue.innerHTML = rangeEnd.value;
	updateChart();
});

function parseData(file) {
	const lines = file.split("\n").filter((line) => line.trim() !== "");

	if (lines.length === 0) {
		return [];
	}

	const firstLineColumns = lines[0].trim().split(/[\s,;]+/);

	const col1AsNumber = parseFloat(firstLineColumns[0]);
	const col2AsNumber = parseFloat(firstLineColumns[1]);

	let dataLines;
	if (isNaN(col1AsNumber) || isNaN(col2AsNumber)) {
		dataLines = lines.slice(1);
	} else {
		dataLines = lines;
	}

	return dataLines.map((line) => {
		const columns = line.trim().split(/[\s,;]+/);
		const x = parseFloat(columns[0]);
		const y = parseFloat(columns[1]);
		return { x, y };
	});
}

function createLinData(initIndex, endIndex, data) {
	slope =
		(data[endIndex].y - data[initIndex].y) /
		(data[endIndex].x - data[initIndex].x);
	intercept = data[initIndex].y - slope * data[initIndex].x;
	linData = [];
	for (let i = initIndex; i <= endIndex; i++) {
		const x = data[i].x;
		const y = slope * x + intercept;
		linData.push({ x, y });
	}
	return linData;
}

function createChart(originalData, lineData, xLabel, yLabel) {
	if (chartInstance) {
		chartInstance.destroy();
	}
	chartInstance = new Chart(ctx, {
		data: {
			datasets: [
				{
					type: "scatter",
					data: originalData,
					backgroundColor: "rgba(54, 162, 235, 0.8)",
				},
				{
					type: "line",
					data: lineData,
					borderColor: "rgba(255, 99, 132, 0.6)",
					backgroundColor: "transparent",
					borderWidth: 2,
					pointRadius: 0,
					fill: false,
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false,
				},
			},
			scales: {
				x: {
					type: "linear",
					position: "bottom",
					title: {
						display: true,
						text: xLabel,
					},
				},
				y: {
					title: {
						display: true,
						text: yLabel,
					},
				},
			},
		},
	});
}

function updateRangeInputs(maxValue) {
	rangeInit.max = maxValue - 1;
	rangeEnd.max = maxValue;
	rangeEnd.value = maxValue;
	endValue.innerHTML = rangeEnd.value;
}

function updateChart() {
	const data = chartInstance.data.datasets[0].data;
	linData = createLinData(
		parseInt(rangeInit.value),
		parseInt(rangeEnd.value),
		data
	);
	chartInstance.data.datasets[1].data = linData;
	chartInstance.update();
}

function calcRegressionParams(data, initIndex, endIndex) {
	data = data.slice(initIndex, endIndex + 1);
	const n = data.length;

	let sumX = 0,
		sumY = 0,
		sumXY = 0,
		sumX2 = 0;

	data.forEach((point) => {
		sumX += point.x;
		sumY += point.y;
		sumXY += point.x * point.y;
		sumX2 += point.x * point.x;
	});

	const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
	const intercept = (sumY - slope * sumX) / n;

	return [slope, intercept];
}
