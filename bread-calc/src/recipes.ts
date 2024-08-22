import { Recipe } from "./models/types";

const recipes: Recipe[] = [
  {
    id: 1,
    name: "Simple Bread",
    components: [
      { name: "Sugar", amountPerKg: 100 },
      { name: "Flour", amountPerKg: 200 },
      { name: "Water", amountPerKg: 50 },
    ],
  },
  {
    id: 2,
    name: "Chocolate Cake",
    components: [
      { name: "Sugar", amountPerKg: 150 },
      { name: "Flour", amountPerKg: 250 },
      { name: "Cocoa", amountPerKg: 100 },
      { name: "Butter", amountPerKg: 200 },
    ],
  },
  {
    id: 3,
    name: "Simple cookies",
    components: [
      { name: "Sugar", amountPerKg: 100 },
      { name: "Flour", amountPerKg: 200 },
      { name: "Water", amountPerKg: 50 },
    ],
  },
  {
    id: 4,
    name: "Творожний чізкейк",
    components: [
      { name: "Sugar", amountPerKg: 150 },
      { name: "Flour", amountPerKg: 250 },
      { name: "Cocoa", amountPerKg: 100 },
      { name: "Butter", amountPerKg: 200 },
    ],
  },
];

export default recipes;
