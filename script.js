let header = document.querySelector("header");
let main = document.querySelector("main");
let footer = document.querySelector("footer");
let home = document.getElementById("home");
let sectionLinks = document.querySelectorAll(".link-section");
let nav = document.querySelector("nav");
let headerBtn = header.querySelector(".btn-nav--pre-order");
let BTT = document.querySelector(".back-to-top__btn");
// useful function *****************************************************************************************

function inertThisItems(items = [], status) {
	if (items) {
		items.forEach((item) => {
			if (status) {
				item.setAttribute("inert", "");
			} else {
				item.removeAttribute("inert");
			}
		});
	}
}

// ******************************************************************************************************
window.addEventListener("scroll", function () {
	// handle back to top  ///////////////////////////////////////////////////////////
	BTT.classList.toggle("active", window.scrollY > 300);
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
			if (sectionID == "specs" || sectionID == "contact") {
				BTT.classList.remove("btn-primary");
				BTT.classList.add("btn-secondary");
			} else {
				BTT.classList.remove("btn-secondary");
				BTT.classList.add("btn-primary");
			}
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

// nav button toggle//////////////////////////////////////////////////////////
let navBtn = document.querySelector(".nav-btn");
let links = nav.querySelectorAll("a");
navBtn.addEventListener("click", function () {
	let MenuIsOpen = navBtn.getAttribute("aria-expanded");
	MenuIsOpen == "false" ? navBtn.setAttribute("aria-expanded", "true") : navBtn.setAttribute("aria-expanded", "false");
	MenuIsOpen == "false" ? inertThisItems([main, footer], true) : inertThisItems([main, footer], false);
	navBtn.focus();
});

links.forEach((link) => {
	link.addEventListener("click", function () {
		navBtn.setAttribute("aria-expanded", "false");
		inertThisItems([main, footer], false);
		navBtn.focus();
	});
});

// handle pre order btn ////////////////////////////////////////////////////////

let preOrderBtns = document.querySelectorAll(".pre-order-btn");
let notFoundPage = document.querySelector(".page_not_found");
let notFoundPageBtn = notFoundPage.querySelector("button");

preOrderBtns.forEach((btn) => {
	btn.addEventListener("click", function () {
		notFoundPage.classList.add("active");
		inertThisItems([notFoundPage], false);
		inertThisItems([header, main, footer], true);
		notFoundPageBtn.focus();
	});
});

notFoundPageBtn.addEventListener("click", function () {
	notFoundPage.classList.remove("active");
	inertThisItems([notFoundPage], true);

	inertThisItems([header, main, footer], false);
});
