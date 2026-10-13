// Builds the shoe cards from shoes.js and handles the detail panel.
// The owner does not need to edit this file.

var grid = document.getElementById("grid");
var overlay = document.getElementById("overlay");

// Put a photo in a box, or show a placeholder if there is no photo.
function fillPhoto(box, shoe) {
  box.innerHTML = "";
  if (shoe.image) {
    var img = document.createElement("img");
    img.src = shoe.image;
    img.alt = shoe.name;
    // If the file is missing, fall back to the placeholder text.
    img.onerror = function () { box.textContent = "No photo"; };
    box.appendChild(img);
  } else {
    box.textContent = "No photo";
  }
}

// Make a small helper for creating elements with text.
function el(tag, className, text) {
  var e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

// Build one card per shoe.
shoes.forEach(function (shoe) {
  var card = el("button", "card");
  card.type = "button";

  var photo = el("div", "photo");
  fillPhoto(photo, shoe);
  card.appendChild(photo);

  card.appendChild(el("h3", "", shoe.name));
  card.appendChild(el("p", "brand", shoe.brand));
  card.appendChild(el("p", "", "Size: " + shoe.size));
  card.appendChild(el("p", "", "Condition: " + shoe.condition));
  card.appendChild(el("p", "price", shoe.price));

  card.addEventListener("click", function () { openDetail(shoe); });
  grid.appendChild(card);
});

if (shoes.length === 0) {
  grid.appendChild(el("p", "", "No shoes listed yet."));
}

// Show the detail panel for one shoe.
function openDetail(shoe) {
  fillPhoto(document.getElementById("d-photo"), shoe);
  document.getElementById("d-name").textContent = shoe.name;
  document.getElementById("d-price").textContent = shoe.price;
  document.getElementById("d-desc").textContent = shoe.description;

  var info = document.getElementById("d-info");
  info.innerHTML = "";
  [["Brand", shoe.brand], ["Size", shoe.size], ["Colour", shoe.colour],
   ["Condition", shoe.condition]].forEach(function (pair) {
    info.appendChild(el("dt", "", pair[0]));
    info.appendChild(el("dd", "", pair[1]));
  });

  overlay.hidden = false;
}

function closeDetail() { overlay.hidden = true; }

document.getElementById("close").addEventListener("click", closeDetail);
// Clicking the dark area outside the panel also closes it.
overlay.addEventListener("click", function (e) {
  if (e.target === overlay) closeDetail();
});
// So does the Escape key.
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeDetail();
});
