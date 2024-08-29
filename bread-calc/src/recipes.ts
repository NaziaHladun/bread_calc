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
      { name: "Sugar1", amountPerKg: 150 },
      { name: "Flour2", amountPerKg: 250 },
      { name: "Cocoa3", amountPerKg: 100 },
      { name: "Butter4", amountPerKg: 200 },
      { name: "Sugar5", amountPerKg: 150 },
      { name: "Flour6", amountPerKg: 250 },
      { name: "Cocoa7", amountPerKg: 100 },
      { name: "Butter8", amountPerKg: 200 },
      { name: "Sugar9", amountPerKg: 150 },
      { name: "Flour0", amountPerKg: 250 },
      { name: "Cocoa11", amountPerKg: 100 },
      { name: "Butter12", amountPerKg: 200 },
    ],
  },
  {
    id: 5,
    name: "Banana Bread",
    components: [
      { name: "Sugar", amountPerKg: 120 },
      { name: "Flour", amountPerKg: 220 },
      { name: "Bananas", amountPerKg: 150 },
      { name: "Butter", amountPerKg: 100 },
    ],
  },
  {
    id: 6,
    name: "Muffins",
    components: [
      { name: "Sugar", amountPerKg: 130 },
      { name: "Flour", amountPerKg: 240 },
      { name: "Milk", amountPerKg: 100 },
      { name: "Eggs", amountPerKg: 80 },
    ],
  },
  {
    id: 7,
    name: "Oat Cookies",
    components: [
      { name: "Sugar", amountPerKg: 100 },
      { name: "Oats", amountPerKg: 180 },
      { name: "Butter", amountPerKg: 120 },
      { name: "Eggs", amountPerKg: 50 },
    ],
  },
  {
    id: 8,
    name: "Lemon Cake",
    components: [
      { name: "Sugar", amountPerKg: 150 },
      { name: "Flour", amountPerKg: 250 },
      { name: "Lemon Zest", amountPerKg: 50 },
      { name: "Butter", amountPerKg: 150 },
    ],
  },
  {
    id: 9,
    name: "Brownies",
    components: [
      { name: "Sugar", amountPerKg: 200 },
      { name: "Flour", amountPerKg: 150 },
      { name: "Cocoa", amountPerKg: 200 },
      { name: "Butter", amountPerKg: 250 },
    ],
  },
  {
    id: 10,
    name: "Pancakes",
    components: [
      { name: "Sugar", amountPerKg: 50 },
      { name: "Flour", amountPerKg: 200 },
      { name: "Milk", amountPerKg: 150 },
      { name: "Eggs", amountPerKg: 70 },
    ],
  },
  {
    id: 11,
    name: "Fruit Tart",
    components: [
      { name: "Sugar", amountPerKg: 100 },
      { name: "Flour", amountPerKg: 250 },
      { name: "Fruit", amountPerKg: 200 },
      { name: "Butter", amountPerKg: 150 },
    ],
  },
  {
    id: 12,
    name: "Cinnamon Rolls",
    components: [
      { name: "Sugar", amountPerKg: 200 },
      { name: "Flour", amountPerKg: 300 },
      { name: "Cinnamon", amountPerKg: 50 },
      { name: "Butter", amountPerKg: 200 },
    ],
  },
  {
    id: 13,
    name: "Apple Pie",
    components: [
      { name: "Sugar", amountPerKg: 150 },
      { name: "Flour", amountPerKg: 200 },
      { name: "Apples", amountPerKg: 250 },
      { name: "Butter", amountPerKg: 150 },
    ],
  },
  {
    id: 14,
    name: "Scones",
    components: [
      { name: "Sugar", amountPerKg: 100 },
      { name: "Flour", amountPerKg: 250 },
      { name: "Milk", amountPerKg: 100 },
      { name: "Butter", amountPerKg: 120 },
    ],
  },
  {
    id: 15,
    name: "Carrot Cake",
    components: [
      { name: "Sugar", amountPerKg: 150 },
      { name: "Flour", amountPerKg: 200 },
      { name: "Carrots", amountPerKg: 180 },
      { name: "Butter", amountPerKg: 150 },
    ],
  },
  {
    id: 16,
    name: "Vanilla Pudding",
    components: [
      { name: "Sugar", amountPerKg: 80 },
      { name: "Milk", amountPerKg: 300 },
      { name: "Vanilla Extract", amountPerKg: 20 },
      { name: "Eggs", amountPerKg: 50 },
    ],
  },
  {
    id: 17,
    name: "Gingerbread",
    components: [
      { name: "Sugar", amountPerKg: 150 },
      { name: "Flour", amountPerKg: 250 },
      { name: "Ginger", amountPerKg: 50 },
      { name: "Butter", amountPerKg: 150 },
    ],
  },
  {
    id: 18,
    name: "Blueberry Muffins",
    components: [
      { name: "Sugar", amountPerKg: 100 },
      { name: "Flour", amountPerKg: 250 },
      { name: "Blueberries", amountPerKg: 200 },
      { name: "Butter", amountPerKg: 100 },
    ],
  },
  {
    id: 19,
    name: "Chocolate Chip Cookies",
    components: [
      { name: "Sugar", amountPerKg: 150 },
      { name: "Flour", amountPerKg: 200 },
      { name: "Chocolate Chips", amountPerKg: 150 },
      { name: "Butter", amountPerKg: 150 },
    ],
  },
  {
    id: 20,
    name: "Cheesecake",
    components: [
      { name: "Sugar", amountPerKg: 200 },
      { name: "Cream Cheese", amountPerKg: 500 },
      { name: "Eggs", amountPerKg: 100 },
      { name: "Butter", amountPerKg: 150 },
    ],
  },
];

export default recipes;
