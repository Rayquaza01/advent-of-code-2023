import { ArgumentParser } from "argparse";

import * as PuzzleSolutions from "./solutions";

import fs from "fs";

function none(): number {
    return 0;
}

const solutions = [
    [PuzzleSolutions.puzzle01p1, PuzzleSolutions.puzzle01p2],
    [PuzzleSolutions.puzzle02p1, PuzzleSolutions.puzzle02p2],
    [PuzzleSolutions.puzzle03p1, PuzzleSolutions.puzzle03p2],
    [PuzzleSolutions.puzzle04p1, PuzzleSolutions.puzzle04p2],
    [PuzzleSolutions.puzzle05p1, PuzzleSolutions.puzzle05p2],
    [PuzzleSolutions.puzzle06p1, PuzzleSolutions.puzzle06p2],
    [PuzzleSolutions.puzzle07p1, PuzzleSolutions.puzzle07p2],
    [PuzzleSolutions.puzzle08p1, PuzzleSolutions.puzzle08p2],
    [PuzzleSolutions.puzzle09p1, PuzzleSolutions.puzzle09p2],
    [PuzzleSolutions.puzzle10p1, PuzzleSolutions.puzzle10p2],
    [PuzzleSolutions.puzzle11p1, PuzzleSolutions.puzzle11p2],
    [PuzzleSolutions.puzzle12p1, PuzzleSolutions.puzzle12p2],
    [none, none],
    [none, none],
    [none, none],
    [none, none],
    [none, none],
    [none, none],
    [PuzzleSolutions.puzzle19p1, PuzzleSolutions.puzzle19p2],
];

const input = [
    "./input/d01.data",
    "./input/d02.data",
    "./input/d03.data",
    "./input/d04.data",
    "./input/d05.data",
    "./input/d06.data",
    "./input/d06.data",
    "./input/d07.data",
    "./input/d08.data",
    "./input/d09.data",
    "./input/d10.data",
    "./input/d11.data",
    "./input/d12.data",
    "./input/d13.data",
    "./input/d14.data",
    "./input/d15.data",
    "./input/d15.data",
    "./input/d16.data",
    "./input/d17.data",
    "./input/d18.data",
    "./input/d19.data",
    "./input/d20.data",
    "./input/d21.data",
    "./input/d22.data",
    "./input/d23.data",
    "./input/d24.data",
];

const args = new ArgumentParser();
args.add_argument("-i", { type: "str" });
args.add_argument("-p", { type: "int", default: 0 });
args.add_argument("-d", { type: "int", default: 0 });
const opts = args.parse_args();

opts.d--;

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
