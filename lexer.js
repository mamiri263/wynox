const moo = require("moo");

/*
things to add:

plus
minus
times
divide
left bracket
right bracket
colon
if keyword
else keyword
for keyword
in keyword
class keyword
*/

module.exports = moo.compile({
    whiteSpace:     /[ \t]+/,
    number:         { match: /0|[1-9][0-9]*/, value: Number },
    string:         /"(?:\\["\\]|[^\n"\\])*"/,
    leftParen:      '(',
    rightParen:     ')',
    openStatement: 'open',
    closeStatement: 'close',
    assignmentOp:   "=",
    identifier:     /[a-zA-Z_][a-zA-Z0-9_]*/,
    newLine:        { match: /\n/, lineBreaks: true },
});
