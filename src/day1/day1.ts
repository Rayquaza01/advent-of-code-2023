import { ArgumentParser } from "argparse";
import { puzzle1_1 } from "./puzzle1.1";
import { puzzle1_2 } from "./puzzle1.2";

import fs from "fs";

console.log("Puzzle 1");

const args = new ArgumentParser();
args.add_argument("-i", { type: "str", default: "./input/day1/puzzle1-input" });
args.add_argument("-p", { type: "int", default: 0 });
const opts = args.parse_args();

const file = fs.readFileSync(opts.i, {encoding: "utf-8"});

if (opts.p === 0 || opts.p === 1) {
    console.log("Part 1:", puzzle1_1(file));
}

if (opts.p === 0 || opts.p === 2) {
    console.log("Part 2:", puzzle1_2(file));
}
