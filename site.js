// Shared helpers for every page: mobile menu, scroll fade-ins, footer year,
// and the shoe card used on the home, shop and product pages.
// The owner does not need to edit this file.

function el(tag, className, text) {
  var e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

var ARROW = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function makeCard(shoe) {
  var card = el("a", "card");
  card.href = "product.html?id=" + encodeURIComponent(shoe.id);
  card.setAttribute("aria-label", shoe.name + ", " + shoe.condition + ", £" + shoe.price);

  var photo = el("div", "photo");
  var img = document.createElement("img");
  img.src = shoe.image;
  img.alt = shoe.name;
  img.loading = "lazy";
  img.onerror = function () { photo.textContent = "No photo"; };
  photo.appendChild(img);
  photo.appendChild(el("span", "cond" + (shoe.condition === "New" ? " new" : ""), shoe.condition));
  card.appendChild(photo);

  var body = el("div", "body");
  body.appendChild(el("p", "brand", shoe.brand));
  body.appendChild(el("h3", "", shoe.name));
  body.appendChild(el("p", "meta", shoe.sizes.join(", ")));
  var row = el("div", "price-row");
  row.appendChild(el("p", "price", "£" + shoe.price));
  var go = el("span", "go");
  go.innerHTML = ARROW;
  row.appendChild(go);
  body.appendChild(row);
  card.appendChild(body);
  return card;
}

(function () {
  // Mobile menu
  var btn = document.querySelector(".menu-btn");
  var links = document.getElementById("nav-links");
  if (btn && links) {
    btn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) {
        links.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.focus();
      }
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });

  // Home page numbers come from shoes.js so they stay accurate.
  if (typeof shoes !== "undefined" && shoes.length) {
    var count = document.querySelector('[data-stat="count"]');
    if (count) count.textContent = shoes.length;
    var from = document.querySelector('[data-stat="from"]');
    if (from) from.textContent = "£" + Math.min.apply(null, shoes.map(function (s) { return s.price; }));
  }

  // Gentle fade-in on scroll
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(function (n) { n.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  items.forEach(function (n) { io.observe(n); });
})();
