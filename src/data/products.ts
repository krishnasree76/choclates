// import squareBites from "@/assets/products/square-bites.jpg";
// import smallBars from "@/assets/products/small-bars.jpg";
// import bigBars from "@/assets/products/big-bars.jpg";
// import floralNamebar from "@/assets/products/floral-namebar.jpg";
// import dryfruitsNamebar from "@/assets/products/dryfruits-namebar.jpg";
// import kunafaBites from "@/assets/products/kunafa-bites.jpg";
// import kunafaBar from "@/assets/products/kunafa-bar.jpg";
// import almonds from "@/assets/products/almonds.jpg";
// import stuffedDates from "@/assets/products/stuffed-dates.jpg";
// import photoBigbar from "@/assets/products/photo-bigbar.jpg";
// import photoSmallbar from "@/assets/products/photo-smallbar.jpg";
// import photoSquarebites from "@/assets/products/photo-squarebites.jpg";

// export interface Variant {
//   label: string;
//   price: number;
// }

// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   details: string;

//   // default price (used if variants not provided)
//   price: number;
//   priceLabel: string;

//   image: string;
//   minOrder: string;
//   category: string;

//   // ✅ only for actual flavours
//   flavors?: string[];

//   // ✅ for multi-price products like 250g/500g etc
//   variants?: Variant[];
// }

// export const products: Product[] = [
//   {
//     id: "square-bites",
//     name: "13g Square Chocolate Bites",
//     description: "Choose from 6 delicious flavours",
//     details: "12 Pcs Box",
//     price: 219,
//     priceLabel: "₹219 / Box",
//     image: squareBites,
//     minOrder: "Minimum order: 2 Boxes",
//     category: "Classic",
//     flavors: ["Blueberry", "Strawberry", "Mango", "Mint", "Rose", "Orange"],
//   },

//   {
//     id: "small-bars",
//     name: "20g Small Chocolate Bars",
//     description: "Choose your favourite chocolate type",
//     details: "12 Pcs Box",
//     price: 349,
//     priceLabel: "₹349 / Box",
//     image: smallBars,
//     minOrder: "Minimum order: 2 Boxes",
//     category: "Classic",
//     flavors: [
//       "Dark Chocolate with Raisins",
//       "Milk Chocolate with Roasted Almonds",
//       "White Chocolate with Oreo & Crackle",
//     ],
//   },

//   {
//     id: "big-bars",
//     name: "50g Big Chocolate Bars",
//     description: "Choose your favourite chocolate type",
//     details: "Piece / 6 Pcs Box",
//     price: 75,
//     priceLabel: "₹75/pc • ₹450/Box",
//     image: bigBars,
//     minOrder: "Minimum order: 1 Box",
//     category: "Classic",
//     flavors: [
//       "Dark Chocolate with Raisins",
//       "Milk Chocolate with Roasted Almonds",
//       "White Chocolate with Oreo & Crackle",
//     ],
//     // ✅ FIXED (multi-price)
//     variants: [
//       { label: "Piece", price: 75 },
//       { label: "6 Pcs Box", price: 450 },
//     ],
//   },

//   {
//     id: "floral-namebar",
//     name: "Designer Floral Chocolate Name Bar",
//     description:
//       "100g personalised name bar with beautiful floral decoration & wishes",
//     details: "Personalised",
//     price: 299,
//     priceLabel: "₹299 / Bar",
//     image: floralNamebar,
//     minOrder: "Minimum order: 2 Bars",
//     category: "Designer",
//   },

//   {
//     id: "dryfruits-namebar",
//     name: "Designer Dry Fruits Name Bar",
//     description: "100g customised name bar topped with premium nuts & seeds",
//     details: "Personalised",
//     price: 349,
//     priceLabel: "₹349 / Bar",
//     image: dryfruitsNamebar,
//     minOrder: "Minimum order: 2 Bars",
//     category: "Designer",
//   },

//   {
//     id: "kunafa-bites",
//     name: "Dubai Pistachio Kunafa Bites",
//     description: "30g premium kunafa bites with rich pistachio filling",
//     details: "12 Bites Box",
//     price: 449,
//     priceLabel: "₹449 / Box",
//     image: kunafaBites,
//     minOrder: "Minimum order: 1 Box",
//     category: "Premium",
//   },

//   {
//     id: "kunafa-bar",
//     name: "Dubai Pistachio Kunafa Bar",
//     description: "100g premium chocolate bar with authentic kunafa & pistachio",
//     details: "Premium Series",
//     price: 199,
//     priceLabel: "₹199 / Bar",
//     image: kunafaBar,
//     minOrder: "Minimum order: 2 Bars",
//     category: "Premium",
//   },

//   // ✅ FIXED: Almonds (variants added, flavors removed)
//   {
//     id: "chocolate-almonds",
//     name: "Chocolate Coated Almonds",
//     description: "Premium roasted almonds coated in rich milk chocolate",
//     details: "250g / 500g Box",
//     price: 399,
//     priceLabel: "₹399 (250g) • ₹749 (500g)",
//     image: almonds,
//     minOrder: "Minimum order: 1 Box",
//     category: "Premium",
//     variants: [
//       { label: "250g Box", price: 399 },
//       { label: "500g Box", price: 749 },
//     ],
//   },

//   // ✅ FIXED: Stuffed Dates (variants added, flavors removed)
//   {
//     id: "stuffed-dates",
//     name: "Chocolate Covered Stuffed Dates",
//     description: "Premium dates stuffed with nuts, coated in dark chocolate",
//     details: "250g / 500g Box",
//     price: 350,
//     priceLabel: "₹350 (250g) • ₹690 (500g)",
//     image: stuffedDates,
//     minOrder: "Minimum order: 1 Box",
//     category: "Premium",
//     variants: [
//       { label: "250g Box", price: 350 },
//       { label: "500g Box", price: 690 },
//     ],
//   },

//   {
//     id: "photo-bigbar",
//     name: "Photo Printed Big Bar (50g)",
//     description:
//       "Premium handmade chocolate with your photo printed – perfect for gifting",
//     details: "Personalised Gift",
//     price: 90,
//     priceLabel: "₹90 / Bar",
//     image: photoBigbar,
//     minOrder: "Minimum order: 10 pcs",
//     category: "Photo Print",
//   },

//   {
//     id: "photo-smallbar",
//     name: "Photo Printed Small Bar (20g)",
//     description: "Return gift chocolate bars with custom photo printing",
//     details: "Return Gift",
//     price: 40,
//     priceLabel: "₹40 / Bar",
//     image: photoSmallbar,
//     minOrder: "Minimum order: 25 pcs",
//     category: "Photo Print",
//   },

//   {
//     id: "photo-squarebites",
//     name: "Photo Printed Square Bites (13g)",
//     description:
//       "Tiny personalised chocolate bites – ideal for wedding/party return gifts",
//     details: "Return Gift",
//     price: 22,
//     priceLabel: "₹22 / Bite",
//     image: photoSquarebites,
//     minOrder: "Minimum order: 50 pcs",
//     category: "Photo Print",
//   },
// ];
import squareBites from "@/assets/products/square-bites.jpg";
import smallBars from "@/assets/products/small-bars.jpg";
import bigBars from "@/assets/products/big-bars.jpg";
import floralNamebar from "@/assets/products/floral-namebar.jpg";
import dryfruitsNamebar from "@/assets/products/dryfruits-namebar.jpg";
import kunafaBites from "@/assets/products/kunafa-bites.jpg";
import kunafaBar from "@/assets/products/kunafa-bar.jpg";
import almonds from "@/assets/products/almonds.jpg";
import stuffedDates from "@/assets/products/stuffed-dates.jpg";
import photoBigbar from "@/assets/products/photo-bigbar.jpg";
import photoSmallbar from "@/assets/products/photo-smallbar.jpg";
import photoSquarebites from "@/assets/products/photo-squarebites.jpg";

export interface Variant {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  details: string;
  price: number;
  priceLabel: string;
  image: string;
  minOrder: string;
  category: "Classic" | "Designer Series" | "Premium Series" | "Photo Customised";
  flavors?: string[];
  variants?: Variant[];
}

export const products: Product[] = [
  {
    id: "square-bites",
    name: "Square Chocolate Bites (13g)",
    description: "6 Exotic Flavours (Assorted): Blueberry, Strawberry, Mango, Mint, Rose, Orange",
    details: "12 Pcs Box",
    price: 219,
    priceLabel: "₹219 / Box",
    image: squareBites,
    minOrder: "Min order: 2 Boxes",
    category: "Classic",
    flavors: ["Blueberry", "Strawberry", "Mango", "Mint", "Rose", "Orange"],
  },
  {
    id: "small-bars",
    name: "Small Chocolate Bars (20g)",
    description: "3 Variants: Dark w/ Raisins, Milk w/ Almonds, White w/ Oreo & Crackle",
    details: "12 Pcs Box",
    price: 349,
    priceLabel: "₹349 / Box",
    image: smallBars,
    minOrder: "Min order: 1 Box",
    category: "Classic",
    flavors: ["Dark with Raisins", "Milk with Roasted Almonds", "White with Oreo & Crackle"],
  },
  {
    id: "big-bars",
    name: "Big Chocolate Bars (50g)",
    description: "3 Variants: Dark w/ Raisins, Milk w/ Almonds, White w/ Oreo & Crackle",
    details: "6 Pcs Box",
    price: 449,
    priceLabel: "₹449 / Box",
    image: bigBars,
    minOrder: "Min order: 1 Box",
    category: "Classic",
    flavors: ["Dark with Raisins", "Milk with Roasted Almonds", "White with Oreo & Crackle"],
  },
  {
    id: "floral-namebar-55",
    name: "Floral Name Bar (55g)",
    description: "Designer Series - With Name & Wishes decoration",
    details: "Personalised Bar",
    price: 199,
    priceLabel: "₹199 / Bar",
    image: floralNamebar,
    minOrder: "Min order: 2 Bars",
    category: "Designer Series",
  },
  {
    id: "dryfruits-namebar-55",
    name: "Dry Fruits Name Bar (55g)",
    description: "Designer Series - Premium nuts with Name & Wishes",
    details: "Personalised Bar",
    price: 249,
    priceLabel: "₹249 / Bar",
    image: dryfruitsNamebar,
    minOrder: "Min order: 2 Bars",
    category: "Designer Series",
  },
  {
    id: "floral-namebar-100",
    name: "Floral Name Bar (100g)",
    description: "Designer Series - Large Bar with Name & Wishes",
    details: "Personalised Bar",
    price: 299,
    priceLabel: "₹299 / Bar",
    image: floralNamebar,
    minOrder: "Min order: 2 Bars",
    category: "Designer Series",
  },
  {
    id: "dryfruits-namebar-100",
    name: "Dry Fruits Name Bar (100g)",
    description: "Designer Series - Large Bar with Nuts & Wishes",
    details: "Personalised Bar",
    price: 349,
    priceLabel: "₹349 / Bar",
    image: dryfruitsNamebar,
    minOrder: "Min order: 2 Bars",
    category: "Designer Series",
  },
  {
    id: "kunafa-bites",
    name: "Dubai Pistachio Kunafa Bites (30g)",
    description: "Premium Series - Authentic rich pistachio filling",
    details: "12 Bites Box",
    price: 449,
    priceLabel: "₹449 / Box",
    image: kunafaBites,
    minOrder: "Min order: 1 Box",
    category: "Premium Series",
  },
  {
    id: "kunafa-bar",
    name: "Dubai Pistachio Kunafa Bar (100g)",
    description: "Premium Series - 100g Handcrafted luxury bar",
    details: "1 Bar",
    price: 199,
    priceLabel: "₹199 / Bar",
    image: kunafaBar,
    minOrder: "Min order: 2 Bars",
    category: "Premium Series",
  },
  {
    id: "chocolate-almonds",
    name: "Chocolate Coated Almonds",
    description: "Premium Series - Roasted almonds in Milk Chocolate",
    details: "Selection by Weight",
    price: 399,
    priceLabel: "From ₹399",
    image: almonds,
    minOrder: "Min order: 1 Box",
    category: "Premium Series",
    variants: [
      { label: "250g Box", price: 399 },
      { label: "500g Box", price: 749 },
    ],
  },
  {
    id: "stuffed-dates",
    name: "Chocolate Covered Stuffed Dates",
    description: "Premium Series - Dark Chocolate coated dates",
    details: "Selection by Weight",
    price: 350,
    priceLabel: "From ₹350",
    image: stuffedDates,
    minOrder: "Min order: 1 Box",
    category: "Premium Series",
    variants: [
      { label: "250g Box", price: 350 },
      { label: "500g Box", price: 690 },
    ],
  },
  {
    id: "photo-bigbar",
    name: "Photo Customised Big Bar (50g)",
    description: "Personalised with Photo, name, and message",
    details: "Individual Bar",
    price: 90,
    priceLabel: "₹90 / Bar",
    image: photoBigbar,
    minOrder: "Min order: 10 pcs",
    category: "Photo Customised",
  },
  {
    id: "photo-smallbar",
    name: "Photo Customised Small Bar (20g)",
    description: "Personalised with Photo, name, and message",
    details: "Individual Bar",
    price: 40,
    priceLabel: "₹40 / Bar",
    image: photoSmallbar,
    minOrder: "Min order: 25 pcs",
    category: "Photo Customised",
  },
  {
    id: "photo-squarebites",
    name: "Photo Customised Square Bites (13g)",
    description: "Personalised with Photo and Name",
    details: "Individual Bite",
    price: 22,
    priceLabel: "₹22 / Bite",
    image: photoSquarebites,
    minOrder: "Min order: 50 pcs",
    category: "Photo Customised",
  },
];
