function promiseAll(promises) {
  return new Promise(function (resolve, reject) {
    var results = [];
    var completed = 0;
    if (promises.length === 0) {
      resolve(results);
    }
    promises.forEach(function (promise, index) {
      Promise.resolve(promise)
        .then(function (value) {
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
