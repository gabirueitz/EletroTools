const addButton = document.getElementById("button-add");
const calcButton = document.getElementById("button-calc");
const inputsDiv = document.getElementById("inputs");
const trashButton = document.getElementById("button-trash");
const ions = document.getElementsByClassName("ion");
const resultFrame = document.getElementById("result");

const ionDev = `
    <div class="ion">
		<input
			type="number"
			name="valence"
			step="1"
			min="-9"
			max="9"
			required />
		<input
		type="number"
		name="concentration"
		step="0.0000001"
		min="0"
		required />
    </div>
`;

addButton.addEventListener("click", () => {
	inputsDiv.innerHTML += ionDev;
	trashButton.classList.remove("hidden");
});

trashButton.addEventListener("click", () => {
	inputsDiv.removeChild(inputsDiv.lastElementChild);
	if (inputsDiv.children.length === 2) {
		trashButton.classList.add("hidden");
	}
});

function calculateIonicForce() {
	let ionicForce = 0;
	for (let i = 0; i < ions.length; i++) {
		const valence = parseFloat(ions[i].children[0].value);
		const concentration = parseFloat(ions[i].children[1].value);
		ionicForce += 0.5 * valence * valence * concentration;
	}
	return ionicForce.toExponential(2);
}

calcButton.addEventListener("click", (event) => {
	event.preventDefault();
	resultFrame.innerHTML = calculateIonicForce();
});
