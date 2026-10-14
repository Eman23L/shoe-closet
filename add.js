// Builds a shoe entry from the sell form so it can be pasted into shoes.js.
// Nothing is saved automatically.

var form = document.getElementById("form");
var result = document.getElementById("result");
var output = document.getElementById("output");
var copied = document.getElementById("copied");

// Escape quote marks and backslashes so the text is safe inside "..." in shoes.js.
function clean(text) {
  return text.trim().replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Highest id already in shoes.js plus one, so the new id is unique.
  var nextId = 1;
  shoes.forEach(function (s) { if (s.id >= nextId) nextId = s.id + 1; });

  var sizes = document.getElementById("f-size").value.split(",")
    .map(function (s) { return s.trim(); })
    .filter(function (s) { return s !== ""; })
    .map(function (s) { return '"' + clean(s) + '"'; });

  var price = Number(document.getElementById("f-price").value);
  if (isNaN(price)) price = 0;

  var image = clean(document.getElementById("f-image").value) || "images/shoe-1.svg";

  var block = [
    "  {",
    "    id: " + nextId + ",",
    '    name: "' + clean(document.getElementById("f-name").value) + '",',
    '    brand: "' + clean(document.getElementById("f-brand").value) + '",',
    "    sizes: [" + sizes.join(", ") + "],",
    '    colour: "' + clean(document.getElementById("f-colour").value) + '",',
    '    condition: "' + clean(document.getElementById("f-condition").value) + '",',
    "    price: " + price + ",",
    '    category: "' + clean(document.getElementById("f-category").value) + '",',
    '    description: "' + clean(document.getElementById("f-desc").value) + '",',
    '    image: "' + image + '",',
    "    featured: " + (document.getElementById("f-featured").checked ? "true" : "false"),
    "  }"
  ].join("\n");

  output.value = block;
  result.hidden = false;
  if (copied) copied.textContent = "";
  result.scrollIntoView({ behavior: "smooth", block: "start" });
  output.select();
});

document.getElementById("copy").addEventListener("click", function () {
  output.select();
  var done = function () { if (copied) copied.textContent = "Copied"; };
  if (navigator.clipboard) navigator.clipboard.writeText(output.value).then(done, function () { document.execCommand("copy"); done(); });
  else { document.execCommand("copy"); done(); }
});
