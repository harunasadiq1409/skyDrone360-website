let header = document.querySelector("header");
let home = document.getElementById("home");
let sectionLinks = document.querySelectorAll(".link-section");
let nav = document.querySelector("nav");
let headerBtn = header.querySelector(".btn-nav--pre-order");
window.addEventListener("scroll", function () {
	// handle header transformation  ///////////////////////////////////////////////////////////
	header.classList.toggle("active", window.scrollY > 50);
	headerBtn.classList.toggle("active", window.scrollY > home.clientHeight - 200);
	let headerBtnIsActive = headerBtn.classList.contains("active");
	headerBtnIsActive ? headerBtn.removeAttribute("inert") : headerBtn.setAttribute("inert", "");
	// handle active nav-links  //////////////////////////////////////////////////////////
	sectionLinks.forEach((sLink) => {
		let sectionID = sLink.getAttribute("id");
		let sectionTop = this.window.clientHeight < 800 ? sLink.offsetTop - 150 : sLink.offsetTop - 500;
		let sectionHeight = sLink.scrollHeight;
		let windowViewHeight = window.scrollY;

		if (windowViewHeight > sectionTop && windowViewHeight < sectionTop + sectionHeight) {
			nav.querySelector(`li a[href*=${sectionID}]`).classList.add("active");
		} else {
			nav.querySelector(`li a[href*=${sectionID}]`).classList.remove("active");
		}
	});
});

// handle active accordion ////////////////////////////////////////////////////////////////////////
let accordions = document.querySelectorAll(".accordion-content");
let prevOpenAccordion;
accordions.forEach((accordion) => {
	let currOpenAccordion = accordion.firstElementChild;
	currOpenAccordion.addEventListener("click", function () {
		currOpenAccordion.setAttribute("aria-expanded", "true");
		if (prevOpenAccordion) {
			prevOpenAccordion.setAttribute("aria-expanded", "false");
		}
		if (prevOpenAccordion == currOpenAccordion) {
			prevOpenAccordion = null;
		} else {
			prevOpenAccordion = currOpenAccordion;
		}
	});
});
