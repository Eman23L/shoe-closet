/*
  HOW TO ADD A SHOE
  1. Copy one whole block from { to } (including the comma after it).
  2. Paste it just before the final ];  at the bottom.
  3. Change the details. Give it a new id number that nobody else uses.
  4. Keep the quote marks "like this" and the commas at the end of each line.
  5. For a photo, put the file in the images folder and write
     image: "images/filename.jpg"   (leave it as "" for no photo).
  6. Save the file and refresh index.html in your browser.
  To remove a shoe, delete its whole block.
*/

const shoes = [
  // EXAMPLE 1 - delete or replace with a real shoe
  {
    id: 1,
    name: "EXAMPLE Classic Runner",
    brand: "ExampleBrand",
    size: "UK 9",
    colour: "White and grey",
    condition: "Like new",
    price: "$60",
    description: "Example only. Worn twice, very comfortable, no marks.",
    image: ""
  },
  // EXAMPLE 2 - delete or replace with a real shoe
  {
    id: 2,
    name: "EXAMPLE Leather Boot",
    brand: "SampleCo",
    size: "UK 8",
    colour: "Brown",
    condition: "Good",
    price: "$85",
    description: "Example only. Some light wear on the heel, recently polished.",
    image: ""
  },
  // EXAMPLE 3 - delete or replace with a real shoe
  {
    id: 3,
    name: "EXAMPLE Canvas Sneaker",
    brand: "DemoWear",
    size: "UK 10",
    colour: "Navy blue",
    condition: "Used",
    price: "$25",
    description: "Example only. Well loved, a few scuffs, still plenty of life left.",
    image: ""
  }
];
