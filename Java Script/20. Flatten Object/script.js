flattenObject = (obj, parentKey = "user") => {
  const mp = {};
  for (const [key, value] of Object.entries(obj)) {
    const newkey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(mp, flattenObject(value, newkey));
    } else {
      mp[newkey] = value;
    }
  }
  return mp;
};

const user = {
  name: "Mansi",
  age: 25,
  department: {
    name: "Customer Experience",
    section: "Technical",
    branch: {
      name: "Bangalore",
      timezone: "IST",
    },
  },
  company: {
    name: "SAP",
    customers: ["Ford", "Nestle"],
  },
  skills: ["javascript", "node.js", "html"],
};

console.log(flattenObject(user));
