const navegationOptions = document.querySelectorAll('input[name="navegation"]');
const sections = document.querySelectorAll("section");
const allTabs = document.querySelectorAll("nav ul li");

function getMenuOption() {
	const selectedMenu = document.querySelector(
		'input[name="navegation"]:checked'
	);
	const sectionToShow = document.getElementById(selectedMenu.value);
	const activeLi = selectedMenu.closest("li");

	allTabs.forEach((tab) => {
		tab.classList.remove("active");
	});
	activeLi.classList.add("active");

	sections.forEach((section) => {
		section.classList.add("hidden");
	});
	sectionToShow.classList.remove("hidden");
}

navegationOptions.forEach((input) => {
	input.addEventListener("change", getMenuOption);
});
