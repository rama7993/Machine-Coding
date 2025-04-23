function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const res = Array.isArray(obj) ? [] : {};

  for (key in obj) {
    console.log("Key:", key);
    res[key] = deepClone(obj[key]);
  }

  return res;
}

const original = {
  person: { name: "John", address: { city: "New York", zip: "10001" } },
  age: 30,
};

const cloned = deepClone(original);
console.log(cloned);
