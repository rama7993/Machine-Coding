// Prototype and Prototype Inheritance Implementation
// Demonstrating JavaScript prototype-based inheritance

// Parent constructor function
function Animal(name) {
  this.name = name;
}

// Add method to Animal prototype
Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

// Child constructor function
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override method
Dog.prototype.speak = function() {
  return `${this.name} barks`;
};

// Add new method
Dog.prototype.fetch = function() {
  return `${this.name} is fetching`;
};

// Example usage
const animal = new Animal('Generic Animal');
const dog = new Dog('Rex', 'Labrador');

console.log(animal.speak()); // Generic Animal makes a sound
console.log(dog.speak()); // Rex barks
console.log(dog.fetch()); // Rex is fetching
console.log(dog instanceof Animal); // true
console.log(dog instanceof Dog); // true
