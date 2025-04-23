function flatten(arr, depth = Infinity) {
  const ans = [];
  arr.forEach((element) => {
    if (Array.isArray(element) && depth > 0) {
      // Recursively flatten the nested array, reducing the depth
      ans.push(...flatten(element, depth - 1));
    } else {
      ans.push(element);
    }
  });

  return ans;
}

const arr = [
  [
    [
      [
        [1, 2, [4, 6], [7, [9]], [8]],
        [10, 11],
      ],
      [12],
    ],
    [15, 16],
  ],
];

// Example usage:
console.log("Flatten with depth 1: ", JSON.stringify(flatten(arr, 1)));
console.log("Flatten with depth 2: ", JSON.stringify(flatten(arr, 2)));
console.log("Flatten with depth 3: ", JSON.stringify(flatten(arr, 3)));
console.log("Flatten with depth Infinity: ", JSON.stringify(flatten(arr)));
