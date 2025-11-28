const students = [
    { name: "Kamyar", age: 18, scores: [18, 17, 19], id: 1 },
    { name: "Ali", age: 19, scores: [12, 14, 10], id: 2 },
    { name: "Sara", age: 17, scores: [20, 19, 18], id: 3 },
    { name: "Reza", age: 20, scores: [15, 16, 14], id: 4 },
    { name: "Nika", age: 18, scores: [9, 11, 8], id: 5 },
    { name: "Mahdi", age: 21, scores: [16, 18, 17], id: 6 },
    { name: "Bahar", age: 22, scores: [19, 18, 10], id: 7 }
];

const test = [
    42,
    "سلام",
    true,
    false,
    3.14,
    "JavaScript",
    null,
    undefined,
    { name: "علی", age: 25 },
    [1, 2, 3],
    "Node.js",
    0,
    -7,
    100,
    true,
    false,
    "React",
    NaN,
    { framework: "Express", version: "4.x" },
    [true, false, "mixed"],
    "Full-Stack",
    99.99,
    "Frontend",
    null,
    undefined,
    { language: "JavaScript", type: "dynamic" },
    [5, 6, 7, 8],
    "Backend",
    true,
    12345,
    "End",
    NaN,
];

const numbers = [1 , -1];

import { autoSort } from "../src/index.js";

console.log(autoSort(numbers , true , (a , b) => b - a));

import { arrayPrototype } from "../src/index.js";
arrayPrototype();

// console.log(numbers.autoSort());
true
