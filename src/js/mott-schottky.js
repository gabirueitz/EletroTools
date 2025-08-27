const ctx = document.getElementById("chartMS");
const calcForm = document.getElementById("formCalc");
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
	const dieletric = parseFloat(document.getElementById("dieletric").value);
	const A = parseFloat(document.getElementById("area").value);
	const epsilon0 = 8.854e-12;
	const e = 1.602e-19;

	const vfb = -intercept / slope;
	const nd = 2 / (e * epsilon0 * dieletric * A * A * Math.abs(slope));

	return [vfb.toFixed(3), nd.toExponential(2)];
}

calcForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const dieletric = parseFloat(document.getElementById("dieletric").value);
	const A = parseFloat(document.getElementById("area").value);
	data = chartInstance.data.datasets[0].data;

	const [slope, intercept] = calcRegressionParams(
		data,
		rangeInit.value,
		rangeEnd.value
	);

	const [EfbValue, NdValue] = calcMSParams(slope, intercept);

	vfb.innerHTML = EfbValue;
	nd.innerHTML = NdValue;

	document.getElementById("button-download").classList.remove("hidden");
});

function downloadResults() {
	const startIndex = parseInt(rangeInit.value);
	const endIndex = parseInt(rangeEnd.value);
	const data = chartInstance.data.datasets[0].data;

	const [slope, intercept] = calcRegressionParams(
		data,
		rangeInit.value,
		rangeEnd.value
	);

	const [EfbValue, NdValue] = calcMSParams(slope, intercept);

	const lineResult = createLinData(startIndex, endIndex, data);
	const selectedData = data.slice(startIndex, endIndex);

	// FORMATA O CONTEÚDO DO ARQUIVO
	let fileContent = "";

	// Adiciona um cabeçalho com os resultados da análise
	fileContent += `# Resultados da Análise\n`;
	fileContent += `# Efb: ${EfbValue} V\n`;
	fileContent += `# Nd: ${NdValue} /cm²\n`;
	fileContent += `# ------------------------------------------\n\n`;
	fileContent += `Potential(X)\tOriginal(Y)\tCalculated(Y)\n`;

	// Adiciona os dados de cada ponto em uma linha
	for (let i = 0; i < selectedData.length; i++) {
		fileContent += `${selectedData[i].x}\t${selectedData[i].y}\t${lineResult[i].y}\n`;
	}

	// CRIA E BAIXA O ARQUIVO VIRTUAL
	// Cria um Blob (Binary Large Object), que é a representação do nosso arquivo
	const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });

	// Cria uma URL temporária na memória que aponta para o nosso Blob
	const url = URL.createObjectURL(blob);

	// Cria um elemento de link <a> invisível
	const link = document.createElement("a");
	link.href = url;
	link.download = "resultados_mott-schottky.txt";

	// Adiciona o link ao corpo do documento e simula um clique
	document.body.appendChild(link);
	link.click();

	// Remove o link e a URL da memória para limpar
	document.body.removeChild(link);
	URL.revokeObjectURL(url);

	console.log("Download iniciado.");
}

document
	.getElementById("button-download")
	.addEventListener("click", downloadResults);
