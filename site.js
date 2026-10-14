// Shared helpers for every page: mobile menu, scroll fade-in, and the shoe card builder.
// The owner does not need to edit this file.

var ICONS = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'
};

function el(tag, className, text) {
  var e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

function conditionClass(condition) {
  if (condition === "New") return "badge new";
  if (condition === "Like new") return "badge like-new";
  return "badge";
}

function makeCard(shoe) {
  var card = el("a", "card");
  card.href = "product.html?id=" + encodeURIComponent(shoe.id);

  var photo = el("div", "photo");
  var img = document.createElement("img");
  img.src = shoe.image;
  img.alt = shoe.name + " by " + shoe.brand;
  img.loading = "lazy";
  img.onerror = function () { photo.textContent = "Photo coming soon"; };
  photo.appendChild(img);
  photo.appendChild(el("span", conditionClass(shoe.condition), shoe.condition));
  card.appendChild(photo);

  var body = el("div", "body");
  body.appendChild(el("p", "brand", shoe.brand));
  body.appendChild(el("h3", "", shoe.name));
  body.appendChild(el("p", "meta", shoe.sizes.join(", ")));
  var foot = el("div", "foot");
  foot.appendChild(el("p", "price", "£" + shoe.price));
  var view = el("span", "view");
  view.innerHTML = "View " + ICONS.arrow;
  foot.appendChild(view);
  body.appendChild(foot);
  card.appendChild(body);
  return card;
}

function showCards(container, list) {
  container.innerHTML = "";
  if (list.length === 0) {
    container.appendChild(el("p", "empty", "No shoes match those filters. Try clearing a few to see more pairs."));
    return;
  }
  list.forEach(function (s) { container.appendChild(makeCard(s)); });
}

/* Mobile menu */
(function () {
  var btn = document.querySelector(".menu-btn");
  var links = document.getElementById("nav-links");
  if (!btn || !links) return;
  btn.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    btn.innerHTML = open ? ICONS.close : ICONS.menu;
  });
})();

/* Gentle fade-in on scroll */
(function () {
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (i) { i.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(function (i) { io.observe(i); });
})();

/* Footer year */
(function () {
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
