//**render sidebar link data */
const navItems = document.getElementById("nav-items-container");

//create nav item link
function createNavLinks(subNavs) {
  let html = "";
  subNavs.forEach((sub) => {
    html += `<li><a href="${sub.url}">${sub.title}</a></li>`;
  });

  return html;
}

//create nav title
function createNavTitle(item) {
  const div = document.createElement("div");
  div.classList.add("item");
  div.innerHTML = `
  <div class="nav-link d-flex space-between">
    <strong>
     <i class="${item.icon}">
     </i><span class="ml-1">${item.title}</span>
    </strong>
    <i class="right-icon fas fa-chevron-right"></i>
  </div>
  <ul>${createNavLinks(item.subNavs)}</ul>`;

  return div;
}

//render nav items
function initNavItem() {
  const fragment = document.createDocumentFragment();
  sidebar.forEach((item) => {
    fragment.appendChild(createNavTitle(item));
  });

  navItems.appendChild(fragment);
}

//on page loaded
initNavItem();

//**link open close */
function toggleLinkClass(element) {
  const chevron = element.querySelector(".right-icon");
  chevron.classList.toggle("open");
  element.nextElementSibling.classList.toggle("open");
}

//click on link category
navItems.addEventListener("click", function (evt) {
  const element = evt.target;
  const onClicked = element.classList.contains("nav-link");
  if (!onClicked) return;

  toggleLinkClass(element);
});

//active Current Page Link
function activeCurrentPageLink() {
  const links = document.links;
  const currentUrl = document.URL;

  for (let i = 0; i < links.length; i++) {
    if (links[i].href === currentUrl) {
      links[i].classList.add("current-page");
      const item = links[i].parentElement.parentElement.previousElementSibling;
      toggleLinkClass(item);
      break;
    }
  }
}

//call function on page loaded
activeCurrentPageLink();

//**sidebar toggle */
const btnMenu = document.getElementById("btn-menu");
const btnCLose = document.querySelector(".close-nav");

//sidebar open toggle
btnMenu.addEventListener("click", function (evt) {
  toggleSideabr();
});

//sidebar close on mobie
btnCLose.addEventListener("click", function (evt) {
  toggleSideabr();
});

//set toggle class on body
function toggleSideabr() {
  const body = document.getElementsByTagName("body")[0];
  body.classList.toggle("sidebar-active");
}
