function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve(results);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

const p1 = new Promise((res) => setTimeout(() => res("first"), 300));
//const p2 = new Promise((res) => setTimeout(() => res("second"), 100));
const p2 = new Promise((_, rej) =>
  setTimeout(() => rej("error in second"), 200)
);
const p3 = new Promise((res) => setTimeout(() => res("third"), 200));

promiseAll([p1, p2, p3])
  .then((result) => {
    console.log("Result:", result); 
  })
  .catch((err) => {
    console.error("Error:", err);
  });

Promise.all([p1, p2, p3])
  .then((result) => {
    console.log("Result:", result); 
  })
  .catch((err) => {
    console.error("Error:", err);
  });
