@{%
    const theLexer = require("./lexer.js");
%}

@lexer theLexer


program
    -> statements
        {%
            (data) => {
                return {
                    type: "program",
                    body: data[0]
                };
            }
        %}

statements
    -> null
        {%
            () =>[]
        %}
    | _ statement _
        {%
            (data) => [data[1]]
        %}
    | _ statement _ "\n":+ statements
        {%
            (data) => [data[1], ...data[4]]
        %}

statement 
    -> assignment {% id %}
    | function_call {% id %}
    | function_definition {% id %}

assignment -> %identifier _ "=" _ expression
    {%
        (data) => {
            return {
                type: "assignment",
                var_name: data[0],
                value: data[4]
            }
        }
    %}


function_call -> %identifier _ "(" _ parameter_list _ ")"
    {%
        (data) => {
            return {
                type: "function_call",
                fun_name: data[0],
                parameter: data[4]
            }
        }
    %}

function_definition -> 
    %identifier _ "(" _ parameter_list _ ")" _ 
    "open" _ "\n" statements "\n" _ "close"
    {%
        (data) => {
            return {
                type: "function_definition",
                fun_name: data[0],
                parameter: data[4],
                body: data[11]
            }
        }
    %}

parameter_list
    -> null
        {%
            () => []
        %}
    | expression 
    {%
        (data) => {
            return [data[0]]
        }
    %}
    | expression __ parameter_list
        {%
            (data) => {
                return [data[0], ...data[2]]
            } 
         %}

expression
    -> %identifier   {% id %}
    | literal   {% id %}
    | function_call {% id %}

literal
    -> %number {% id %}
    | %string {% id %}

# optional whiteSpace
_ -> null
    | __
__ -> %whiteSpace # mandatory whiteSpace