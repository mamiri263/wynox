let n = 4;
let m = 5;
let o = "Hello world!";
pwint(n, m);
pwint(o);
pwint(5);
pwint("random string");

// runtime functions

function pwint(...args) {
    console.log(...args);
}
