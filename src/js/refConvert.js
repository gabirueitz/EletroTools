const standardPotentials = {
	she: 0.0,
	sce: 0.241,
	calomelano_1m: 0.28,
	calomelano_01m: 0.334,
	ag_agcl_sat: 0.197,
	ag_agcl_35m: 0.205,
	ag_agcl_1m: 0.235,
	hg_hgo: 0.098,
};

const refConverterForm = document.getElementById("refConverterForm");
const originVInput = document.getElementById("originV");
const solutionPHInput = document.getElementById("solutionPH");
const originRefSelect = document.getElementById("originRef");
const newRefSelect = document.getElementById("newRef");
const buttonRefConvert = document.getElementById("buttonRefConvert");
const convertedResult = document.getElementById("refResult");

refConverterForm.addEventListener("submit", (event) => {
	event.preventDefault(); // Impede o recarregamento da página

	const potentialOrigem = parseFloat(originVInput.value);
	const selectedOrigem = originRefSelect.value;
	const selectedDestino = newRefSelect.value;
	const phValue = parseFloat(solutionPHInput.value);

	let potential_vs_she;
	if (selectedOrigem === "rhe") {
		potential_vs_she = potentialOrigem + 0.0591 * phValue;
	} else {
		const potential_origem_vs_she = standardPotentials[selectedOrigem];
		potential_vs_she = potentialOrigem - potential_origem_vs_she;
	}

	if (selectedDestino === "rhe") {
		potentialConverted = potential_vs_she - 0.0591 * phValue;
	} else {
		// Conversão para qualquer outro eletrodo
		const potential_destino_vs_she = standardPotentials[selectedDestino];
		potentialConverted = potential_vs_she + potential_destino_vs_she;
	}

	convertedResult.textContent = potentialConverted.toFixed(3) + " V";
});
