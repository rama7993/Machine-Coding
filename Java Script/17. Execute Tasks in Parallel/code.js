// Execute Tasks in Parallel
// Run multiple async tasks concurrently

async function executeInParallel(tasks) {
  const results = await Promise.all(
    tasks.map(task => task())
  );
  return results;
}

// Execute with concurrency limit
async function executeWithLimit(tasks, limit) {
  const results = [];
  const executing = [];
  
  for (const task of tasks) {
    const promise = task().then(result => {
      results.push(result);
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

// Execute all regardless of failures
async function executeAllSettled(tasks) {
  const results = await Promise.allSettled(
    tasks.map(task => task())
  );
  
  return results.map(result => 
    result.status === 'fulfilled' ? result.value : result.reason
  );
}

// Execute with timeout
async function executeWithTimeout(tasks, timeoutMs) {
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), timeoutMs)
  );
  
  try {
    return await Promise.race([
      executeInParallel(tasks),
      timeoutPromise
    ]);
  } catch (error) {
    if (error.message === 'Timeout') {
      throw new Error(`Tasks timed out after ${timeoutMs}ms`);
    }
    throw error;
  }
}

// Example usage
const createTask = (id, delay) => async () => {
  console.log(`Task ${id} started`);
  await new Promise(resolve => setTimeout(resolve, delay));
  console.log(`Task ${id} completed`);
  return `Result ${id}`;
};

const tasks = [
  createTask(1, 1000),
  createTask(2, 800),
  createTask(3, 1200),
  createTask(4, 600)
];

// Execute all in parallel
executeInParallel(tasks)
  .then(results => console.log('Parallel results:', results));

// Execute with limit 2
executeWithLimit(tasks, 2)
  .then(results => console.log('Limited results:', results));

// Execute all settled
executeAllSettled(tasks)
  .then(results => console.log('All settled results:', results));
