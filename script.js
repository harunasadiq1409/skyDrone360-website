let header = document.querySelector("header");
let main = document.querySelector("main");
let footer = document.querySelector("footer");
let home = document.getElementById("home");
let sectionLinks = document.querySelectorAll(".link-section");
let nav = document.querySelector("nav");
let headerBtn = header.querySelector(".btn-nav-pre-order");
let BTT = document.querySelector(".back-to-top__btn");
// useful function *****************************************************************************************

function inertThisItems(items = [], status) {
	//funcion$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	if (items) {
		items.forEach((item) => {
			if (status) {
				item.setAttribute("inert", "");
				document.body.style.overflow = "hidden";
			} else {
				item.removeAttribute("inert");
				document.body.style.overflow = "scroll";
			}
		});
	}
}

// ******************************************************************************************************
window.addEventListener("scroll", function () {
	// handle back to top  ///////////////////////////////////////////////////////////
	let bttSetTimeOut;
	BTT.classList.toggle("active", window.scrollY > 300);
	if (window.scrollY) {
		bttSetTimeOut = window.setTimeout(() => {
			BTT.classList.remove("active");
		}, 10000);
	}
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
let media = window.matchMedia("(width < 770px)");
let navBtn = document.querySelector(".nav-btn");
let links = nav.querySelectorAll("a");

function setNav(e) {
	if (e.matches) {
		nav.setAttribute("inert", "");
		nav.style.transition = "none";
	} else {
		nav.removeAttribute("inert");
	}
}

setNav(media);
media.addEventListener("change", function () {
	setNav(media);
});
navBtn.addEventListener("click", function () {
	let MenuIsOpen = navBtn.getAttribute("aria-expanded");
	MenuIsOpen == "false" ? navBtn.setAttribute("aria-expanded", "true") : navBtn.setAttribute("aria-expanded", "false");
	MenuIsOpen == "false" ? inertThisItems([main, footer], true) : inertThisItems([main, footer], false);
	nav.removeAttribute("style");
	navBtn.focus();
});

links.forEach((link) => {
	link.addEventListener("click", function () {
		navBtn.setAttribute("aria-expanded", "false");
		inertThisItems([main, footer], false);
		navBtn.focus();
		setTimeout(() => {
			nav.style.transition = "none";
		}, 500);
	});
});

// handle pre order btn ////////////////////////////////////////////////////////

let preOrderBtns = document.querySelectorAll(".pre-order-btn");
let notFoundPage = document.querySelector(".page_not_found");
let notFoundPageBtn = notFoundPage.querySelector("button");

function open404Page() {
	//funcion$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	notFoundPage.classList.add("active");
	inertThisItems([notFoundPage], false);
	inertThisItems([header, main, footer], true);
	notFoundPageBtn.focus();
}

preOrderBtns.forEach((btn) => {
	btn.addEventListener("click", open404Page);
});
notFoundPageBtn.addEventListener("click", function () {
	notFoundPage.classList.remove("active");
	inertThisItems([notFoundPage], true);

	inertThisItems([header, main, footer], false);
});

// handle Email //////////////////////////////////////////////////////////////////

let signUpBtn = document.querySelector(".sign-up-btn");
let emailPage = document.querySelector(".email_page");
let submitBtn = document.querySelector(".submit-btn");
let cancelEmailPageBtn = document.querySelector(".close-email");

function closeEmailModel() {
	//funcion$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
	emailPage.classList.remove("open");
	inertThisItems([header, main, footer], false);
	inertThisItems([emailPage], true);
}
signUpBtn.addEventListener("click", function () {
	emailPage.classList.add("open");
	inertThisItems([header, main, footer], true);
	inertThisItems([emailPage], false);
	cancelEmailPageBtn.focus();
});

cancelEmailPageBtn.addEventListener("click", closeEmailModel);

// handle form ///////////////////////////////////////////////////////////////
let form = document.querySelector("form");
let fullName = document.getElementById("names");
let notFoundPage_h2 = notFoundPage.querySelector("h2");
form.addEventListener("submit", function (e) {
	let fullNameValue = fullName.value;
	e.preventDefault();

	if (fullNameValue) {
		notFoundPage_h2.innerText = `thank you ${fullNameValue} 🙏 for checking this website ❤`;
		closeEmailModel();
		open404Page();
	}
});
