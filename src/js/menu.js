const sideMenu = document.getElementById("sideMenu");
const asideContent = `
		<div class="logo">
			<img src="./src/img/logo.png" alt="ElectroTools logo" />
		</div>
		
		<nav>
			<ul class="menu">
				<li><a href="./index.html"><i class="fa-solid fa-house"></i> Home</a></li>
				<li>
					<a href="./reference.html"><i class="fa-solid fa-wrench"></i> Eletrodo de referência</a>
				</li>
				<li><a href="./ionic-force.html"><i class="fa-solid fa-wrench"></i> Força iônica</a></li>
				<li><a href="./mott-schottky.html"><i class="fa-solid fa-wrench"></i> Mott-Schottky</a></li>
				<li><a href="./under-construction.html"><i class="fa-solid fa-wrench"></i> Inclinação de Tafel</a></li>
				<li><a href="./under-construction.html"><i class="fa-solid fa-wrench"></i> Área eletroativa</a></li>
				<li><a href="./under-construction.html"><i class="fa-solid fa-wrench"></i> Queda ôhmica</a></li>
				<hr />
				<li><a href="./qrcode.html"><i class="fa-solid fa-wrench"></i> Gerador de QrCode</a></li>
			</ul>
		</nav>
`;
sideMenu.innerHTML = asideContent;

const root = document.documentElement;
const computedStyle = window.getComputedStyle(root);
const menuButton = document.getElementById("menu-button");
const minWidth = 1300;

function hideShowMenu() {
	const width = window.getComputedStyle(root).getPropertyValue("--aside-width");
	if (width === "0px") {
		root.style.setProperty("--aside-width", "230px");
	} else {
		root.style.setProperty("--aside-width", "0px");
	}
}

menuButton.addEventListener("click", hideShowMenu);