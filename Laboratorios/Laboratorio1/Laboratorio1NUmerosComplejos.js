class Complex {
    constructor(realPart, imaginaryPart) {
        this.realPart = realPart;
        this.imaginaryPart = imaginaryPart;
    }

    add(complexNumber) {
        return new Complex(
            this.realPart + complexNumber.realPart,
            this.imaginaryPart + complexNumber.imaginaryPart
        );
    }

    subtract(complexNumber) {
        return new Complex(
            this.realPart - complexNumber.realPart,
            this.imaginaryPart - complexNumber.imaginaryPart
        );
    }

    multiply(complexNumber) {
        return new Complex(
            this.realPart * complexNumber.realPart - this.imaginaryPart * complexNumber.imaginaryPart,
            this.realPart * complexNumber.imaginaryPart + this.imaginaryPart * complexNumber.realPart
        );
    }

    divide(complexNumber) {
        const denominator = complexNumber.realPart * complexNumber.realPart + complexNumber.imaginaryPart * complexNumber.imaginaryPart;
        return new Complex(
            (this.realPart * complexNumber.realPart + this.imaginaryPart * complexNumber.imaginaryPart) / denominator,
            (this.imaginaryPart * complexNumber.realPart - this.realPart * complexNumber.imaginaryPart) / denominator
        );
    }

    toString() {
        return `${this.realPart} + ${this.imaginaryPart}i`;
    }
}

const complexNumber1 = new Complex(3, 4);
const complexNumber2 = new Complex(1, 2);

console.log("LAB01 - Complex Numbers");
console.log("Student: Carla Andrea Quispe López");
console.log("Complex Number 1:", complexNumber1.toString());
console.log("Complex Number 2:", complexNumber2.toString());

const sum = complexNumber1.add(complexNumber2);
console.log("Sum:", sum.toString());

const difference = complexNumber1.subtract(complexNumber2);
console.log("Difference:", difference.toString());

const product = complexNumber1.multiply(complexNumber2);
console.log("Product:", product.toString());

const quotient = complexNumber1.divide(complexNumber2);
console.log("Quotient:", quotient.toString());