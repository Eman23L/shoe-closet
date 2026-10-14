// Builds the home page (#featured, stats) and the shop page (#grid with filters) from shoes.js.
// Needs site.js loaded first. The owner does not need to edit this file.

function unique(list) {
  return list.filter(function (v, i) { return list.indexOf(v) === i; });
}

/* ---------- Home page ---------- */
var featured = document.getElementById("featured");
if (featured) {
  showCards(featured, shoes.filter(function (s) { return s.featured; }).slice(0, 8));

  var statPairs = document.getElementById("stat-pairs");
  var statBrands = document.getElementById("stat-brands");
  var statFrom = document.getElementById("stat-from");
  if (statPairs) statPairs.textContent = shoes.length;
  if (statBrands) statBrands.textContent = unique(shoes.map(function (s) { return s.brand; })).length;
  if (statFrom && shoes.length) statFrom.textContent = "£" + Math.min.apply(null, shoes.map(function (s) { return s.price; }));

  // "12 pairs" under each category tile
  document.querySelectorAll("[data-count]").forEach(function (node) {
    var n = shoes.filter(function (s) { return s.category === node.getAttribute("data-count"); }).length;
    node.textContent = n + (n === 1 ? " pair" : " pairs");
  });
}

/* ---------- Shop page ---------- */
var grid = document.getElementById("grid");
if (grid) {
  var catSel = document.getElementById("f-category");
  var sizeSel = document.getElementById("f-size");
  var priceRange = document.getElementById("f-price");
  var priceLabel = document.getElementById("f-price-label");
  var sortSel = document.getElementById("sort");
  var brandBox = document.getElementById("f-brands");
  var condBox = document.getElementById("f-conditions");

  function addOption(select, value, text) {
    var o = document.createElement("option");
    o.value = value;
    o.textContent = text;
    select.appendChild(o);
  }

  function addCheckbox(box, value) {
    var label = document.createElement("label");
    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = value;
    cb.addEventListener("change", update);
    label.appendChild(cb);
    label.appendChild(document.createTextNode(value));
    box.appendChild(label);
  }

  function checked(box) {
    var out = [];
    box.querySelectorAll("input:checked").forEach(function (c) { out.push(c.value); });
    return out;
  }

  addOption(catSel, "", "All categories");
  ["Trainers", "Boots", "Heels", "Sandals", "Kids"].forEach(function (c) { addOption(catSel, c, c); });

  unique(shoes.map(function (s) { return s.brand; })).sort().forEach(function (b) { addCheckbox(brandBox, b); });

  var allSizes = [];
  shoes.forEach(function (s) { allSizes = allSizes.concat(s.sizes); });
  allSizes = unique(allSizes).sort(function (a, b) { return parseFloat(a.replace(/\D+/, "")) - parseFloat(b.replace(/\D+/, "")); });
  addOption(sizeSel, "", "Any size");
  allSizes.forEach(function (s) { addOption(sizeSel, s, s); });

  ["New", "Like new", "Good", "Used"].forEach(function (c) { addCheckbox(condBox, c); });

  var maxPrice = Math.max.apply(null, shoes.map(function (s) { return s.price; }));
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;

  // Home page category tiles link here with ?category=Boots
  var wanted = new URLSearchParams(window.location.search).get("category");
  if (wanted) catSel.value = wanted;

  function update() {
    priceLabel.textContent = "£" + priceRange.value;
    var brands = checked(brandBox);
    var conds = checked(condBox);

    var list = shoes.filter(function (s) {
      if (catSel.value && s.category !== catSel.value) return false;
      if (brands.length && brands.indexOf(s.brand) === -1) return false;
      if (sizeSel.value && s.sizes.indexOf(sizeSel.value) === -1) return false;
      if (s.price > Number(priceRange.value)) return false;
      if (conds.length && conds.indexOf(s.condition) === -1) return false;
      return true;
    });

    if (sortSel.value === "low") list.sort(function (a, b) { return a.price - b.price; });
    else if (sortSel.value === "high") list.sort(function (a, b) { return b.price - a.price; });
    else list.sort(function (a, b) { return b.id - a.id; });

    document.getElementById("count").textContent = list.length + (list.length === 1 ? " shoe" : " shoes");
    var title = document.getElementById("shop-title");
    if (title) title.textContent = catSel.value ? catSel.value : "All shoes";
    showCards(grid, list);
  }

  catSel.addEventListener("change", update);
  sizeSel.addEventListener("change", update);
  priceRange.addEventListener("input", update);
  sortSel.addEventListener("change", update);
  document.getElementById("f-reset").addEventListener("click", function () {
    catSel.value = "";
    sizeSel.value = "";
    sortSel.value = "";
    priceRange.value = maxPrice;
    document.querySelectorAll(".filters input[type=checkbox]").forEach(function (c) { c.checked = false; });
    update();
  });

  // Show / hide filters on phones
  var toggle = document.getElementById("filter-toggle");
  var panel = document.getElementById("filters");
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = panel.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.lastChild.textContent = open ? " Hide filters" : " Show filters";
    });
  }

  update();
}
