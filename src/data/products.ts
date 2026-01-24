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

// ✅ NEW IMAGE IMPORT
import oreo from "@/assets/products/oreo.png";

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
  assorted?: boolean;
}

export const products: Product[] = [
  {
  id: "square-bites",
  name: "Square Chocolate Bites (13g)",
  description:
    "6 Exotic Flavours (Assorted): Blueberry, Strawberry, Mango, Mint, Rose, Orange",
  details: "12 Pcs Box",
  price: 219,
  priceLabel: "₹219 / Box",
  image: squareBites,
  minOrder: "Min order: 2 Boxes",
  category: "Classic",
  flavors: ["Blueberry", "Strawberry", "Mango", "Mint", "Rose", "Orange"],
  assorted: true, // ✅ ADDED
},
{
  id: "small-bars",
  name: "Small Chocolate Bars (20g)",
  description:
    "3 Variants (Assorted): Dark with Raisins, Milk with Almonds, White with Oreo & Crackle",
  details: "12 Pcs Box",
  price: 349,
  priceLabel: "₹349 / Box",
  image: smallBars,
  minOrder: "Min order: 1 Box",
  category: "Classic",
  flavors: [
    "Dark with Raisins",
    "Milk with Roasted Almonds",
    "White with Oreo & Crackle",
  ],
  assorted: true, // ✅ ADDED
},
{
  id: "big-bars",
  name: "Big Chocolate Bars (50g)",
  description:
    "3 Variants (Assorted): Dark with Raisins, Milk with Almonds, White with Oreo & Crackle",
  details: "6 Pcs Box",
  price: 449,
  priceLabel: "₹449 / Box",
  image: bigBars,
  minOrder: "Min order: 1 Box",
  category: "Classic",
  flavors: [
    "Dark with Raisins",
    "Milk with Roasted Almonds",
    "White with Oreo & Crackle",
  ],
  assorted: true, // ✅ ADDED
},

  // ✅ UPDATED: Floral Name Bar (55g & 100g merged into variants)
  {
  id: "dryfruits-namebar",
  name: "Dry fruits and Nuts Chocolate Name Bar",
  description: "(With Name & Wishes)",
  details: "Personalised Bar",
  price: 249,
  priceLabel: "₹249 / Bar",
  image: dryfruitsNamebar,
  minOrder: "Minimum order quantity 2 Bars",
  category: "Designer Series",
  variants: [
    { label: "55g", price: 249 },
    { label: "100g", price: 349 },
  ],
},
{
  id: "floral-namebar",
  name: "Floral Chocolate Name Bar",
  description: "(With Name & Wishes)",
  details: "Personalised Bar",
  price: 199,
  priceLabel: "₹199 / Bar",
  image: floralNamebar,
  minOrder: "Minimum order quantity 2 Bars",
  category: "Designer Series",
  variants: [
    { label: "55g", price: 199 },
    { label: "100g", price: 299 },
  ],
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

  // ✅ NEW PRODUCT: Chocolate Covered Oreo
  {
    id: "oreo-chocolate",
    name: "Chocolate Covered Oreo",
    description: "Premium Series - Dark, Milk & White (Assorted)",
    details: "Selection by Box",
    price: 310,
    priceLabel: "From ₹310",
    image: oreo,
    minOrder: "Min order: 1 Box",
    category: "Premium Series",
    variants: [
      { label: "12 pcs Box", price: 310 },
      { label: "24 pcs Box", price: 599 },
    ],
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
