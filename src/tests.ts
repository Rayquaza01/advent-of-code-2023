import assert from "assert";
import { describe, it } from "mocha";

import { puzzle1_1 } from "./day1/puzzle1.1";
import { puzzle1_2 } from "./day1/puzzle1.2";

import fs from "fs";

function ReadFile(name: string): string {
    return fs.readFileSync(name, { encoding: "utf-8" });
}

const d1p1 = ReadFile("./input/d1p1.test");
const d1p2 = ReadFile("./input/d1p2.test");

describe("Puzzle 1", function () {
    describe("Part 1", function() {
        it("find the first and last digit in a line, and sum each line", function() {
            assert.equal(puzzle1_1(d1p1), 142);
        });
    });

    describe("Part 2", function() {
        it("find the first and last digit in a line, including digits written as words, and sum those for each line", function() {
            assert.equal(puzzle1_2(d1p2), 281);
        });
    });
});
