let x = mul(pluws(4, 5), 6);
pwint(x);

// runtime functions

// print function
function pwint(...args) {
    console.log(...args);
}

// add two numbers together
function pluws(...args) {
    return args.reduce((sum, num) => sum + num, 0);
}

// subtracted to numbers
function minuwus(x, y) {
    return x - y;
}

// multiply two numbers or more
function mul(...args) {
    return args.reduce((sum, num) => sum * num, 1);
}

// devide two numbers
function dewide(x, y) {
    return x / y;
}

// module numbers
function mod(x, y) {
    return x % y;
}
// absolute numbers
function abs(n) {
    return Math.abs(n);
}
// raising to the power of n
function powah(n, m) {
    return Math.pow(n, m)
}

// get the square root of a number
function squirt(x) {
    return Math.sqrt(x);
}
