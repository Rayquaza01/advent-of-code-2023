import { ArgumentParser } from "argparse";
import { puzzle01_1 } from "./d01/puzzle01.1";
import { puzzle01_2 } from "./d01/puzzle01.2";

import {puzzle02_1 } from "./d02/puzzle02.1";

import fs from "fs";

const solutions = [
    [puzzle01_1, puzzle01_2],
    [puzzle02_1]
];

const input = [
    "./input/d01.data",
    "./input/d02.data",
];

const args = new ArgumentParser();
args.add_argument("-i", { type: "str" });
args.add_argument("-p", { type: "int", default: 0 });
args.add_argument("-d", { type: "int", default: 0 });
const opts = args.parse_args();

console.log(`Day ${(opts.d + 1).toString().padStart("0", 2)}, Part ${opts.p === 0 ? "All" : opts.p}`);
const filename = opts.i ?? input[opts.d];

console.log("Using input file", filename);

const data = fs.readFileSync(filename, {encoding: "utf-8"});

if (opts.p === 0 || opts.p === 1) {
    console.log("Part 1:", solutions[opts.d][0](data));
}

if (opts.p === 0 || opts.p === 2) {
    console.log("Part 2:", solutions[opts.d][1](data));
}
