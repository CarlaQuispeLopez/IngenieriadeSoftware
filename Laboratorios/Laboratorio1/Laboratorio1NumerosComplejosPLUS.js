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
        if (this.imaginaryPart >= 0) {
            return `${this.realPart} + ${this.imaginaryPart}i`;
        } else {
            return `${this.realPart} - ${Math.abs(this.imaginaryPart)}i`;
        }
    }

    static toComplex(realNumber) {
        return new Complex(realNumber, 0);
    }
}

console.log("LAB01 - Complex Numbers");
console.log("Student: Carla Andrea Quispe López");

const complexNumber1 = new Complex(3, 4);
const complexNumber2 = new Complex(1, 2);
const realNumber = 5;

console.log("Complex Number 1:", complexNumber1.toString());
console.log("Complex Number 2:", complexNumber2.toString());
console.log("Real Number:", realNumber);

const complexFromReal = Complex.toComplex(realNumber);
console.log("Converted Real Number to Complex:", complexFromReal.toString());

const sum = complexNumber1.add(complexNumber2);
console.log("Sum:", sum.toString());

const difference = complexNumber1.subtract(complexNumber2);
console.log("Difference:", difference.toString());

const product = complexNumber1.multiply(complexNumber2);
console.log("Product:", product.toString());

const quotient = complexNumber1.divide(complexNumber2);
console.log("Quotient:", quotient.toString());