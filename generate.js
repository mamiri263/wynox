const fs = require("fs").promises;
const path = require("path");

const runtime = `
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
`;

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("please provide a file name :)");
        return;
    }
    const astCode = (await fs.readFile(filename)).toString();
    const ast = JSON.parse(astCode);
    const jsCode = generate(ast);
    const baseName = path.basename(filename, ".wy.ast");
    const jsFilename = `${baseName}.js`;
    await fs.writeFile(jsFilename, jsCode);
    console.log(`wrote ${jsFilename}.`)
}
function generate(node) {
    if (node.type === "program") {
        return node.body.map(generate).join(";\n") + ";\n" + runtime;
    } else if (node.type === "assignment") {
        const varName = node.var_name.value;
        const value = generate(node.value);
        return `let ${varName} = ${value}`;
    } else if (node.type === "function_call") {
        const funName = node.fun_name.value;
        const params = node.parameter.map(generate)
            .join(", ");
        return `${funName}(${params})`;
    } else if (node.type === "identifier") {
        return node.value;
    } else if (node.type === "number") {
        return String(node.value);
    } else if (node.type === "string") {
        return node.value;
    } else if (node.type === "function_definition") {
        const funName = node.fun_name.value;
        const params = node.parameter.map(generate)
        .join(", ");
        const body = node.body.map(generate).join(";\n") + ";";
        const indentedBody = body.split("\n").map(line => "\t" + line).join("\n");
        return `function ${funName} (${params}) {\n${indentedBody}\n}`;
    } else {
        throw new Error(`Unknown node type: ${node.type}`);
    }
}

main().catch(err => console.log(err.stack));