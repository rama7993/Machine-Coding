const doc1 = {
    name: "Alice",
    age: 30,
    address: {
      city: "New York",
      zip: "10001"
    },
    skills: ["JavaScript", "CSS"]
  };
  
  const doc2 = {
    name: "Bob",
    address: {
      city: "Los Angeles"
    },
    skills: ["JavaScript", "HTML"]
  };
  
  const diff = compareObjects(doc1, doc2);
  console.log(JSON.stringify(diff, null, 2));
  