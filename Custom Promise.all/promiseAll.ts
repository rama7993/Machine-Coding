function promiseAll(promises: Promise<any>[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
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
  