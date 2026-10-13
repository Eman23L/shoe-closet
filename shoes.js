/*
  HOW TO ADD A SHOE
  The easiest way: open sell.html, fill in the form, and copy the entry it makes.
  Or by hand:
  1. Copy one whole block from { to } (including the comma after it).
  2. Paste it just before the final ];  at the bottom.
  3. Give it a new id number that nobody else uses (higher id = newer).
  4. Fields:
       id          unique number
       name        e.g. "Runner Pro 2, White"
       brand       e.g. "Stride"
       sizes       list of sizes, e.g. ["UK 7", "UK 8"]
       colour      e.g. "White"
       condition   New, Like new, Good or Used
       price       a number in pounds, e.g. 60  (no £ sign, no quotes)
       category    Trainers, Boots, Heels, Sandals or Kids
       description a sentence or two
       image       e.g. "images/shoe-1.svg" or "images/my-photo.jpg"
       featured    true shows it on the home page, false does not
  5. Keep the quote marks and the commas at the end of each line.
  6. Save the file and refresh the page in your browser.
  To remove a shoe, delete its whole block.
  Sizes shown on the site come from the sizes list; the shop filters use these fields.
*/

const shoes = [
  {
    id: 1,
    name: "Runner Pro 2, White",
    brand: "Stride",
    sizes: ["UK 6","UK 7","UK 8","UK 9"],
    colour: "White",
    condition: "Like new",
    price: 60,
    category: "Trainers",
    description: "Lightweight everyday running trainer with a cushioned sole. Worn twice, no marks.",
    image: "images/shoe-1.svg",
    featured: true
  },
  {
    id: 2,
    name: "Court Classic, Black",
    brand: "Northpeak",
    sizes: ["UK 8","UK 9","UK 10"],
    colour: "Black",
    condition: "Good",
    price: 45,
    category: "Trainers",
    description: "Clean black leather court trainer with light creasing across the toe.",
    image: "images/shoe-2.svg",
    featured: true
  },
  {
    id: 3,
    name: "Skyline Hi-Top, Blue",
    brand: "Urban Sole",
    sizes: ["UK 7","UK 8","UK 9","UK 10"],
    colour: "Blue",
    condition: "New",
    price: 85,
    category: "Trainers",
    description: "Brand new high-top in bright blue canvas, boxed with tags.",
    image: "images/shoe-3.svg",
    featured: true
  },
  {
    id: 4,
    name: "Sprint Lite, Green",
    brand: "Stride",
    sizes: ["UK 9","UK 10","UK 11"],
    colour: "Green",
    condition: "Used",
    price: 25,
    category: "Trainers",
    description: "Well-loved trainer with plenty of life left. A few scuffs on the sides.",
    image: "images/shoe-4.svg",
    featured: false
  },
  {
    id: 5,
    name: "Trail Walker Boot, Brown",
    brand: "Northpeak",
    sizes: ["UK 7","UK 8","UK 9"],
    colour: "Brown",
    condition: "Good",
    price: 85,
    category: "Boots",
    description: "Sturdy leather walking boot, recently polished. Light wear on the heel.",
    image: "images/shoe-5.svg",
    featured: true
  },
  {
    id: 6,
    name: "Chelsea Boot, Black",
    brand: "Urban Sole",
    sizes: ["UK 6","UK 7","UK 8","UK 9","UK 10"],
    colour: "Black",
    condition: "Like new",
    price: 70,
    category: "Boots",
    description: "Smart pull-on ankle boot with elastic side panels. Hardly worn.",
    image: "images/shoe-6.svg",
    featured: false
  },
  {
    id: 7,
    name: "Storm Rain Boot, Yellow",
    brand: "Sunway",
    sizes: ["UK 5","UK 6","UK 7"],
    colour: "Yellow",
    condition: "Good",
    price: 30,
    category: "Boots",
    description: "Waterproof rubber boot in sunny yellow. Fully waterproof, small mark on one heel.",
    image: "images/shoe-7.svg",
    featured: false
  },
  {
    id: 8,
    name: "Stiletto Court, Red",
    brand: "Velvet Lane",
    sizes: ["UK 4","UK 5","UK 6"],
    colour: "Red",
    condition: "Like new",
    price: 55,
    category: "Heels",
    description: "Classic red stiletto heel, worn once to a wedding.",
    image: "images/shoe-8.svg",
    featured: true
  },
  {
    id: 9,
    name: "Block Heel Pump, Nude",
    brand: "Velvet Lane",
    sizes: ["UK 5","UK 6","UK 7"],
    colour: "Nude",
    condition: "Good",
    price: 35,
    category: "Heels",
    description: "Comfortable block heel pump that goes with everything.",
    image: "images/shoe-9.svg",
    featured: false
  },
  {
    id: 10,
    name: "Party Heel, Pink",
    brand: "Sunway",
    sizes: ["UK 4","UK 5","UK 6","UK 7"],
    colour: "Pink",
    condition: "New",
    price: 48,
    category: "Heels",
    description: "Sparkly pink party heel, new and unworn in the original box.",
    image: "images/shoe-10.svg",
    featured: false
  },
  {
    id: 11,
    name: "Beach Slide, Orange",
    brand: "Sunway",
    sizes: ["UK 6","UK 7","UK 8","UK 9"],
    colour: "Orange",
    condition: "Like new",
    price: 18,
    category: "Sandals",
    description: "Soft foam slide sandal, perfect for the beach or pool.",
    image: "images/shoe-11.svg",
    featured: true
  },
  {
    id: 12,
    name: "Strappy Sandal, Tan",
    brand: "Velvet Lane",
    sizes: ["UK 4","UK 5","UK 6"],
    colour: "Tan",
    condition: "Good",
    price: 28,
    category: "Sandals",
    description: "Leather strappy flat sandal with adjustable buckle.",
    image: "images/shoe-12.svg",
    featured: false
  },
  {
    id: 13,
    name: "Tiny Runner, Pink",
    brand: "Tiny Steps",
    sizes: ["UK 10","UK 11","UK 12"],
    colour: "Pink",
    condition: "Good",
    price: 15,
    category: "Kids",
    description: "Kids hook-and-loop trainer in pink. Lots of wear left.",
    image: "images/shoe-13.svg",
    featured: true
  },
  {
    id: 14,
    name: "Mini Court, Blue",
    brand: "Tiny Steps",
    sizes: ["UK 11","UK 12","UK 13"],
    colour: "Blue",
    condition: "Like new",
    price: 20,
    category: "Kids",
    description: "Kids blue court shoe with a yellow star. Only worn a handful of times.",
    image: "images/shoe-14.svg",
    featured: false
  }
];
