function updateInventory(arr1, arr2) {
  let currInvMap = new Map(arr1.map((item) => [item[1], item[0]]));
  let newInvMap = new Map(arr2.map((item) => [item[1], item[0]]));

  for (const [product, quantity] of newInvMap) {
    if (currInvMap.has(product)) {
      currInvMap.set(product, currInvMap.get(product) + quantity);
    } else {
      currInvMap.set(product, quantity);
    }
  }
  arr1 = [...currInvMap].sort().map((item) => item.reverse());
  return arr1;
}

// Example inventory lists
const curInv = [
  [21, "Bowling Ball"],
  [2, "Dirty Sock"],
  [1, "Hair Pin"],
  [5, "Microphone"],
];

const newInv = [
  [2, "Hair Pin"],
  [3, "Half-Eaten Apple"],
  [67, "Bowling Ball"],
  [7, "Toothpaste"],
];

console.log(
  updateInventory(curInv, newInv),
);
