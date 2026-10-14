// Shows one shoe on product.html, chosen by ?id=N in the address.
// Needs site.js loaded first. The owner does not need to edit this file.

var box = document.getElementById("product");
var crumb = document.getElementById("crumb-name");
var idText = new URLSearchParams(window.location.search).get("id");
var shoe = null;
shoes.forEach(function (s) { if (idText !== null && String(s.id) === idText) shoe = s; });

if (!shoe) {
  document.title = "Shoe not found | Shoe Closet";
  if (crumb) crumb.textContent = "Not found";
  var nf = el("div", "not-found");
  nf.appendChild(el("h1", "", "Shoe not found"));
  nf.appendChild(el("p", "", "We could not find that pair. It may already have found a new home."));
  var back = el("a", "btn", "Back to the shop");
  back.href = "shop.html";
  nf.appendChild(back);
  box.appendChild(nf);
} else {
  document.title = shoe.name + " | Shoe Closet";
  if (crumb) crumb.textContent = shoe.name;

  var layout = el("div", "product");

  var photo = el("div", "gallery");
  var img = document.createElement("img");
  img.src = shoe.image;
  img.alt = shoe.name + " by " + shoe.brand;
  img.onerror = function () { photo.textContent = "Photo coming soon"; };
  photo.appendChild(img);
  layout.appendChild(photo);

  var info = el("div", "info");
  info.appendChild(el("p", "brand", shoe.brand));
  info.appendChild(el("h1", "", shoe.name));

  var priceRow = el("div", "price-row");
  priceRow.appendChild(el("p", "price", "£" + shoe.price));
  priceRow.appendChild(el("span", conditionClass(shoe.condition), shoe.condition));
  info.appendChild(priceRow);

  var spec = el("dl", "spec");
  [["Colour", shoe.colour], ["Category", shoe.category], ["Condition", shoe.condition]].forEach(function (row) {
    spec.appendChild(el("dt", "", row[0]));
    spec.appendChild(el("dd", "", row[1]));
  });
  info.appendChild(spec);

  info.appendChild(el("span", "size-label", "Choose your size"));
  var sizes = el("div", "sizes");
  sizes.setAttribute("role", "group");
  sizes.setAttribute("aria-label", "Sizes");
  shoe.sizes.forEach(function (size, i) {
    var b = el("button", "size-btn" + (i === 0 ? " selected" : ""), size);
    b.type = "button";
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", function () {
      sizes.querySelectorAll(".size-btn").forEach(function (x) {
        x.classList.remove("selected");
        x.setAttribute("aria-pressed", "false");
      });
      b.classList.add("selected");
      b.setAttribute("aria-pressed", "true");
    });
    sizes.appendChild(b);
  });
  info.appendChild(sizes);

  info.appendChild(el("p", "desc", shoe.description));

  var add = el("button", "btn dark block", "Add to basket");
  add.type = "button"; // placeholder: the basket is not built yet
  info.appendChild(add);
  info.appendChild(el("p", "note", "Online basket coming soon."));

  var trust = el("ul", "trust");
  ["Checked by us before listing", "Easy returns if they don't fit", "Wrapped in secure packaging"].forEach(function (t) {
    var li = el("li", "");
    li.innerHTML = ICONS.check;
    li.appendChild(document.createTextNode(t));
    trust.appendChild(li);
  });
  info.appendChild(trust);

  layout.appendChild(info);
  box.appendChild(layout);

  // 4 other shoes, same category first.
  var others = shoes.filter(function (s) { return s.id !== shoe.id; });
  var same = others.filter(function (s) { return s.category === shoe.category; });
  var rest = others.filter(function (s) { return s.category !== shoe.category; });
  var picks = same.concat(rest).slice(0, 4);
  var related = document.getElementById("related");
  picks.forEach(function (s) { related.appendChild(makeCard(s)); });
  if (picks.length) document.getElementById("related-wrap").hidden = false;
}
