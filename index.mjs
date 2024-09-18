import { HashMap } from "./hashmap.mjs";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.get("apple")); // red

test.set("grape", "green"); // Edit existing pair
test.set("moon", "silver"); // Add new Pair, grows buckets
test.set("ice cream", "mint");

console.log(test.get("apple")); // red after growing buckets
console.log(test.get("moon")); // silver
console.log(test.get("hat")); // black

console.log(test.has("pencil")); // false
console.log(test.has("moon")); // true
console.log(test.remove("moon")); // true
console.log(test.remove("SomeRandomKey")); // false
console.log(test.has("moon")); // false

console.log(test.length()); // 12

test.set("anotherOne", "anotherValue");

console.log(test.length()); // 13

console.log(test.keys());
console.log(test.values());

console.log(test.entries());

test.clear();
console.log(test.length()); // 0
