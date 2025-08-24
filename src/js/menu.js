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
				<li><a href=""><i class="fa-solid fa-wrench"></i> Mott-Schottky</a></li>
				<li><a href=""><i class="fa-solid fa-wrench"></i> Inclinação de Tafel</a></li>
				<li><a href=""><i class="fa-solid fa-wrench"></i> Área eletroativa</a></li>
				<li><a href=""><i class="fa-solid fa-wrench"></i> Queda ôhmica</a></li>
			</ul>
		</nav>
`;

const root = document.documentElement;
const sideMenu = document.getElementById("sideMenu");
const menuButton = document.getElementById("menu-button");

sideMenu.innerHTML = asideContent;

function hideShowMenu() {
	const width = root.style.getPropertyValue("--aside-width");
	if (width == "0px") {
		root.style.setProperty("--nav-width", "220px");
	} else {
		root.style.setProperty("--nav-width", "0px");
	}
}

console.log(root.style.getPropertyValue("--primary-color"));
menuButton.addEventListener("click", hideShowMenu);
