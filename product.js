// Shows one shoe on product.html, chosen by ?id=N in the address.
// The owner does not need to edit this file.

function el(tag, className, text) {
  var e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

function makeCard(shoe) {
  var card = el("a", "card");
  card.href = "product.html?id=" + encodeURIComponent(shoe.id);
  var photo = el("div", "photo");
  var img = document.createElement("img");
  img.src = shoe.image;
  img.alt = shoe.name;
  img.onerror = function () { photo.textContent = "No photo"; };
  photo.appendChild(img);
  card.appendChild(photo);
  card.appendChild(el("h3", "", shoe.name));
  card.appendChild(el("p", "brand", shoe.brand));
  card.appendChild(el("p", "", shoe.sizes.join(", ") + " | " + shoe.condition));
  card.appendChild(el("p", "price", "\u00A3" + shoe.price));
  return card;
}

var box = document.getElementById("product");
var idText = new URLSearchParams(window.location.search).get("id");
var shoe = null;
shoes.forEach(function (s) { if (idText !== null && String(s.id) === idText) shoe = s; });

if (!shoe) {
  document.title = "Shoe not found - Shoe Closet";
  box.appendChild(el("h1", "page-title", "Shoe not found"));
  box.appendChild(el("p", "", "We could not find that shoe. It may have been sold."));
  var back = el("a", "btn", "Back to the shop");
  back.href = "shop.html";
  box.appendChild(back);
} else {
  document.title = shoe.name + " - Shoe Closet";

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
  info.appendChild(el("p", "price", "\u00A3" + shoe.price));
  var cond = el("p", "");
  cond.appendChild(el("span", "badge", shoe.condition));
  info.appendChild(cond);
  info.appendChild(el("p", "", "Colour: " + shoe.colour));

  info.appendChild(el("strong", "", "Size"));
  var sizes = el("div", "sizes");
  shoe.sizes.forEach(function (size, i) {
    var b = el("button", "size-btn" + (i === 0 ? " selected" : ""), size);
    b.type = "button";
    b.addEventListener("click", function () {
      sizes.querySelectorAll(".size-btn").forEach(function (x) { x.classList.remove("selected"); });
      b.classList.add("selected");
    });
    sizes.appendChild(b);
  });
  info.appendChild(sizes);

  info.appendChild(el("p", "", shoe.description));

  var add = el("button", "btn green", "Add to basket");
  add.type = "button"; // placeholder: does nothing yet
  info.appendChild(add);
  info.appendChild(el("p", "note", "Basket coming soon."));

  var trust = el("ul", "trust");
  ["Checked by us", "Easy returns", "Secure packaging"].forEach(function (t) { trust.appendChild(el("li", "", "\u2713 " + t)); });
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