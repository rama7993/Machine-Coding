// MapLimit Implementation
// Process array items in parallel with concurrency limit

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  const executing = [];
  
  for (const [index, item] of items.entries()) {
    const promise = mapper(item, index).then(result => {
      results[index] = result;
      return result;
    });
    
    executing.push(promise);
    
    if (executing.length >= limit) {
      await Promise.race(executing);
      executing.splice(executing.findIndex(p => p === promise), 1);
    }
  }
  
  await Promise.all(executing);
  return results;
}

// Alternative implementation using queue
function mapLimitQueue(items, limit, mapper) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    let running = 0;
    let index = 0;
    
    function run() {
      if (index >= items.length && running === 0) {
        return resolve(results);
      }
      
      while (running < limit && index < items.length) {
        const currentIndex = index++;
        running++;
        
        mapper(items[currentIndex], currentIndex)
          .then(result => {
            results[currentIndex] = result;
            running--;
            completed++;
            run();
          })
          .catch(reject);
      }
    }
    
    run();
  });
}

// Example usage
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const asyncMapper = async (item, index) => {
  console.log(`Processing item ${item} at index ${index}`);
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
  return item * 2;
};

mapLimit(items, 3, asyncMapper)
  .then(results => console.log('Results:', results))
  .catch(console.error);
