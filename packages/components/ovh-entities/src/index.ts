const nearley = require("nearley");
const grammar = require("./grammar");
const fs = require('fs');
import * as ts from 'typescript';

ts.createIdentifier('pipi');


const parser = new nearley.Parser(
    nearley.Grammar.fromCompiled(grammar),
    { keepHistory: true }
);
const enums = fs.readFileSync('./entities/support/enums', 'utf8');

parser.feed(enums);
console.log(parser.table);