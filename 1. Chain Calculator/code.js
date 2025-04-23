class Calculator {
    constructor(value = 0) {
      this.value = value;
    }
  
    add(num) {
      this.value += num;
      return this;
    }
  
    subtract(num) {
      this.value -= num;
      return this;
    }
  
    multiply(num) {
      this.value *= num;
      return this;
    }
  
    divide(num) {
      if (num === 0) throw new Error("Cannot divide by zero");
      this.value /= num;
      return this;
    }
  
    getValue() {
      return this.value;
    }
  }
  
  const calc = new Calculator();
  const res = calc.add(5).subtract(2).multiply(3).getValue();
  console.log(res);
  