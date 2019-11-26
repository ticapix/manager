@{%
    const moo = require("moo");

    const lexer = moo.compile({
        ws: { match: /[ \t\n\v\f]/, lineBreaks: true }, 
    });
%}

@lexer lexer

enum -> "# enum\n" (enumValue "\n"):+ {% function(d) {return "yay!"; } %}
enumValue -> [a-z] [a-zA-Z]:*

_  -> wschar:* {% function(d) {return null;} %}

wschar -> %ws {% id %}
