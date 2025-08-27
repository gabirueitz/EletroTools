const qrCodeGenerator = document.getElementById("qrCodeGenerator");
const linkInput = document.getElementById("linkInput");
const qrcodeContainer = document.getElementById("qrCodeDiv");
const qrcodeColor = document.getElementById("qrCodeColor");
const backgroundColor = document.getElementById("backgroundColor");
const downloadButton = document.getElementById("button-download");

qrCodeGenerator.addEventListener("submit", (event) => {
	event.preventDefault();

	qrcodeContainer.innerHTML = "";

	const qrcode = new QRCode(qrcodeContainer, {
		text: linkInput.value, // O texto para o QR Code
		width: 300, // Largura em pixels
		height: 300, // Altura em pixels
		colorDark: qrcodeColor.value, // Cor dos "pixels" do QR Code
		colorLight: backgroundColor.value, // Cor do fundo
		correctLevel: QRCode.CorrectLevel.M, // Nível de correção de erro (H = High, o mais alto)
	});

	downloadButton.classList.remove("hidden");
});

function downloadQRCode() {
	// 1. Encontra o container do QR Code
	const imageDataUrl = document.querySelector("#qrCodeDiv img").src;

	// 3. Cria o link de download "invisível"
	const link = document.createElement("a");
	link.href = imageDataUrl;

	// 4. Define o nome do arquivo que será baixado
	link.download = "qrcode.png";

	// 5. Adiciona o link, simula o clique e remove
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

downloadButton.addEventListener("click", downloadQRCode);
