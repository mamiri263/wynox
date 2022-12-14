// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

    const theLexer = require("./lexer.js");
var grammar = {
    Lexer: theLexer,
    ParserRules: [
    {"name": "program", "symbols": ["statements"], "postprocess": 
        (data) => {
            return {
                type: "program",
                body: data[0]
            };
        }
                },
    {"name": "statements", "symbols": [], "postprocess": 
        () =>[]
                },
    {"name": "statements", "symbols": ["_", "statement", "_"], "postprocess": 
        (data) => [data[1]]
                },
    {"name": "statements$ebnf$1", "symbols": [{"literal":"\n"}]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", {"literal":"\n"}], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["_", "statement", "_", "statements$ebnf$1", "statements"], "postprocess": 
        (data) => [data[1], ...data[4]]
                },
    {"name": "statement", "symbols": ["assignment"], "postprocess": id},
    {"name": "statement", "symbols": ["function_call"], "postprocess": id},
    {"name": "statement", "symbols": ["function_definition"], "postprocess": id},
    {"name": "assignment", "symbols": [(theLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"="}, "_", "expression"], "postprocess": 
        (data) => {
            return {
                type: "assignment",
                var_name: data[0],
                value: data[4]
            }
        }
            },
    {"name": "function_call", "symbols": [(theLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "parameter_list", "_", {"literal":")"}], "postprocess": 
        (data) => {
            return {
                type: "function_call",
                fun_name: data[0],
                parameter: data[4]
            }
        }
            },
    {"name": "function_definition", "symbols": [(theLexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"("}, "_", "parameter_list", "_", {"literal":")"}, "_", {"literal":"open"}, "_", {"literal":"\n"}, "statements", {"literal":"\n"}, "_", {"literal":"close"}], "postprocess": 
        (data) => {
            return {
                type: "function_definition",
                fun_name: data[0],
                parameter: data[4],
                body: data[11]
            }
        }
            },
    {"name": "parameter_list", "symbols": [], "postprocess": 
        () => []
                },
    {"name": "parameter_list", "symbols": ["expression"], "postprocess": 
        (data) => {
            return [data[0]]
        }
            },
    {"name": "parameter_list", "symbols": ["expression", "__", "parameter_list"], "postprocess": 
        (data) => {
            return [data[0], ...data[2]]
        } 
                 },
    {"name": "expression", "symbols": [(theLexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expression", "symbols": ["literal"], "postprocess": id},
    {"name": "expression", "symbols": ["function_call"], "postprocess": id},
    {"name": "literal", "symbols": [(theLexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "literal", "symbols": [(theLexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "_", "symbols": []},
    {"name": "_", "symbols": ["__"]},
    {"name": "__", "symbols": [(theLexer.has("whiteSpace") ? {type: "whiteSpace"} : whiteSpace)]}
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
