function flattenObject(obj, parentKey = "") {
  let res = {};

  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(res, flattenObject(obj[key], newKey)); // Recursively flatten the object
    } else {
      res[newKey] = obj[key];
    }
  }

  return res;
}

// Function to flatten the object with a depth limit
function flattenObjectDepth(
  obj,
  parentKey = "",
  depth = Infinity,
  currentDepth = 0
) {
  let res = {};

  // Stop recursion if the current depth reaches or exceeds the specified depth
  if (currentDepth >= depth) {
    return { [parentKey]: obj };
  }

  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(
        res,
        flattenObjectDepth(obj[key], newKey, depth, currentDepth + 1)
      );
    } else {
      res[newKey] = obj[key]; // Add primitive value
    }
  }

  return res;
}

const nestedObject = {
  user: {
    name: "John",
    address: {
      city: "New York",
      zip: "10001",
      details: {
        street: "5th Avenue",
        suite: "200",
        floor: {
          level: 5,
          area: "Square 100m²",
        },
      },
    },
    contact: {
      phone: "1234567890",
      email: "john@example.com",
    },
  },
  company: {
    name: "Tech Corp",
    location: "San Francisco",
    departments: {
      engineering: {
        team: {
          lead: "Alice",
          members: ["Bob", "Charlie"],
        },
      },
      hr: {
        head: "Eve",
        employees: ["David", "Emma"],
      },
    },
  },
};

// Flatten without depth limitation
const flattenedObject = flattenObject(nestedObject);
console.log("Flattened Object:", flattenedObject);

// Flatten with depth limitation (depth = 2)
console.log(
  "Flattened Object with Depth 2:",
  JSON.stringify(flattenObjectDepth(nestedObject, "", 2))
);
