// Async Progress Bar Implementation
// Progress bar for async operations

class AsyncProgressBar {
  constructor(options = {}) {
    this.total = options.total || 100;
    this.width = options.width || 40;
    this.completeChar = options.completeChar || '█';
    this.incompleteChar = options.incompleteChar || '░';
    this.showPercentage = options.showPercentage !== false;
    this.showETA = options.showETA !== false;
    this.startTime = null;
    this.current = 0;
    this.callbacks = [];
  }
  
  start() {
    this.startTime = Date.now();
    this.render();
    return this;
  }
  
  update(current, message = '') {
    this.current = Math.min(current, this.total);
    this.render(message);
    
    if (this.current >= this.total) {
      this.complete();
    }
    
    return this;
  }
  
  increment(step = 1, message = '') {
    return this.update(this.current + step, message);
  }
  
  render(message = '') {
    const percentage = Math.round((this.current / this.total) * 100);
    const filledLength = Math.round((this.current / this.total) * this.width);
    const emptyLength = this.width - filledLength;
    
    const filledBar = this.completeChar.repeat(filledLength);
    const emptyBar = this.incompleteChar.repeat(emptyLength);
    const bar = `[${filledBar}${emptyBar}]`;
    
    let output = bar;
    
    if (this.showPercentage) {
      output += ` ${percentage}%`;
    }
    
    if (this.showETA && this.startTime && this.current > 0) {
      const elapsed = Date.now() - this.startTime;
      const rate = this.current / elapsed;
      const remaining = (this.total - this.current) / rate;
      const eta = Math.round(remaining / 1000);
      output += ` (ETA: ${eta}s)`;
    }
    
    if (message) {
      output += ` ${message}`;
    }
    
    // Clear line and render
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(output);
    
    // Trigger callbacks
    this.callbacks.forEach(callback => callback(this.current, this.total));
  }
  
  complete(message = 'Complete!') {
    this.update(this.total, message);
    console.log(); // New line
    return this;
  }
  
  onProgress(callback) {
    this.callbacks.push(callback);
    return this;
  }
  
  reset() {
    this.current = 0;
    this.startTime = null;
    return this;
  }
}

// Progress for async operations
async function withProgress(asyncFn, options = {}) {
  const progressBar = new AsyncProgressBar(options);
  progressBar.start();
  
  try {
    const result = await asyncFn((progress, message) => {
      progressBar.update(progress, message);
    });
    
    progressBar.complete('Operation completed successfully!');
    return result;
  } catch (error) {
    progressBar.complete('Operation failed!');
    throw error;
  }
}

// Batch progress
async function processBatch(items, processor, options = {}) {
  const progressBar = new AsyncProgressBar({
    total: items.length,
    ...options
  });
  
  progressBar.start();
  
  const results = [];
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    try {
      const result = await processor(item, i);
      results.push(result);
      progressBar.increment(1, `Processed item ${i + 1}/${items.length}`);
    } catch (error) {
      results.push({ error: error.message, item });
      progressBar.increment(1, `Error processing item ${i + 1}`);
    }
  }
  
  progressBar.complete('Batch processing complete!');
  return results;
}

// Concurrent progress
async function processConcurrent(items, processor, concurrency = 3, options = {}) {
  const progressBar = new AsyncProgressBar({
    total: items.length,
    ...options
  });
  
  progressBar.start();
  
  const results = new Array(items.length);
  let completed = 0;
  
  const processItem = async (item, index) => {
    try {
      const result = await processor(item, index);
      results[index] = result;
    } catch (error) {
      results[index] = { error: error.message, item };
    } finally {
      completed++;
      progressBar.update(completed, `Completed ${completed}/${items.length}`);
    }
  };
  
  // Process in batches
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const promises = batch.map((item, batchIndex) => 
      processItem(item, i + batchIndex)
    );
    await Promise.all(promises);
  }
  
  progressBar.complete('Concurrent processing complete!');
  return results;
}

// Example usage functions
async function simulateLongTask(onProgress) {
  const total = 100;
  
  for (let i = 0; i <= total; i++) {
    await new Promise(resolve => setTimeout(resolve, 50));
    onProgress(i, `Processing step ${i}/${total}`);
  }
  
  return 'Task completed!';
}

async function simulateFileProcessing(files) {
  return processBatch(files, async (file, index) => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    return { file, processed: true, size: Math.floor(Math.random() * 1000) };
  }, { width: 30 });
}

// Example usage (requires Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    AsyncProgressBar,
    withProgress,
    processBatch,
    processConcurrent
  };
}

// Example runs
async function runExamples() {
  console.log('Example 1: Simple progress bar');
  await withProgress(simulateLongTask, { total: 100, width: 40 });
  
  console.log('\nExample 2: Batch processing');
  const files = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];
  await simulateFileProcessing(files);
  
  console.log('\nExample 3: Concurrent processing');
  const tasks = Array.from({ length: 10 }, (_, i) => `Task ${i + 1}`);
  await processConcurrent(tasks, async (task, index) => {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));
    return { task, completed: true, duration: Math.random() * 1000 };
  }, 3, { width: 35 });
}

// Uncomment to run examples
// runExamples().catch(console.error);
