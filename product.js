// Shows one shoe on product.html, chosen by ?id=N in the address.
// Uses el() and makeCard() from site.js. The owner does not need to edit this file.

var CHECK = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

var box = document.getElementById("product");
var crumb = document.getElementById("crumb-name");
var idText = new URLSearchParams(window.location.search).get("id");
var shoe = null;
shoes.forEach(function (s) { if (idText !== null && String(s.id) === idText) shoe = s; });

if (!shoe) {
  document.title = "Shoe not found - Shoe Finder";
  if (crumb) crumb.textContent = "Not found";
  var nf = el("div", "empty");
  nf.appendChild(el("h1", "title-lg", "Shoe not found"));
  nf.appendChild(el("p", "", "We could not find that shoe. It may have been sold."));
  var back = el("a", "btn", "Back to the shop");
  back.href = "shop.html";
  nf.appendChild(back);
  box.appendChild(nf);
} else {
  document.title = shoe.name + " - Shoe Finder";
  if (crumb) crumb.textContent = shoe.name;
  var catLink = document.getElementById("crumb-cat");
  if (catLink) {
    catLink.textContent = shoe.category;
    catLink.href = "shop.html?category=" + encodeURIComponent(shoe.category);
  }

  var layout = el("div", "product");

  var photo = el("div", "photo big");
  var img = document.createElement("img");
  img.src = shoe.image;
  img.alt = shoe.name;
  img.onerror = function () { photo.textContent = "No photo"; };
  photo.appendChild(img);
  layout.appendChild(photo);

  var info = el("div", "info");
  info.appendChild(el("p", "brand", shoe.brand));
  info.appendChild(el("h1", "", shoe.name));

  var priceLine = el("div", "price-line");
  priceLine.appendChild(el("p", "price", "£" + shoe.price));
  priceLine.appendChild(el("span", "badge", shoe.condition));
  priceLine.appendChild(el("span", "badge neutral", "Colour: " + shoe.colour));
  info.appendChild(priceLine);

  info.appendChild(el("p", "desc", shoe.description));

  var sizeLabel = el("span", "label", "Choose your size");
  sizeLabel.id = "size-label";
  info.appendChild(sizeLabel);
  var sizes = el("div", "sizes");
  sizes.setAttribute("role", "group");
  sizes.setAttribute("aria-labelledby", "size-label");
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

  var add = el("button", "btn block", "Add to basket");
  add.type = "button"; // placeholder: the basket is not built yet
  info.appendChild(add);
  info.appendChild(el("p", "note", "Basket coming soon."));

  var trust = el("ul", "trust-list");
  ["Checked by us", "Easy returns", "Secure packaging"].forEach(function (t) {
    var li = el("li");
    li.innerHTML = CHECK;
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
