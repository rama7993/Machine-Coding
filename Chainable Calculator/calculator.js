var Calculator = /** @class */ (function () {
    function Calculator(value) {
        if (value === void 0) { value = 0; }
        this.value = 0;
        this.value = value;
    }
    Calculator.prototype.add = function (num) {
        this.value += num;
        return this;
    };
    Calculator.prototype.subtract = function (num) {
        this.value -= num;
        return this;
    };
    Calculator.prototype.multiply = function (num) {
        this.value *= num;
        return this;
    };
    Calculator.prototype.divide = function (num) {
        if (num === 0)
            throw new Error("Cannot divide by zero");
        this.value /= num;
        return this;
    };
    Calculator.prototype.getValue = function () {
        return this.value;
    };
    return Calculator;
}());
var calc = new Calculator();
var res = calc.add(5).subtract(2).multiply(3).getValue();
console.log(res);
