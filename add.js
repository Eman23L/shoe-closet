// Builds a shoe entry from the form so it can be pasted into shoes.js.
// Nothing is saved automatically.

var form = document.getElementById("form");
var result = document.getElementById("result");
var output = document.getElementById("output");

// Escape quote marks and backslashes so the text is safe inside "..." in shoes.js.
function clean(text) {
  return text.trim().replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Use the highest id already in shoes.js and add one, so the new id is unique.
  var nextId = 1;
  shoes.forEach(function (s) { if (s.id >= nextId) nextId = s.id + 1; });

  var block = [
    "  {",
    "    id: " + nextId + ",",
    '    name: "' + clean(document.getElementById("f-name").value) + '",',
    '    brand: "' + clean(document.getElementById("f-brand").value) + '",',
    '    size: "' + clean(document.getElementById("f-size").value) + '",',
    '    colour: "' + clean(document.getElementById("f-colour").value) + '",',
    '    condition: "' + clean(document.getElementById("f-condition").value) + '",',
    '    price: "' + clean(document.getElementById("f-price").value) + '",',
    '    description: "' + clean(document.getElementById("f-desc").value) + '",',
    '    image: "' + clean(document.getElementById("f-image").value) + '"',
    "  }"
  ].join("\n");

  output.value = block;
  result.hidden = false;
  output.select();
});

document.getElementById("copy").addEventListener("click", function () {
  output.select();
  navigator.clipboard.writeText(output.value);
});
