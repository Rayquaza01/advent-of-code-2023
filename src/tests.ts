import assert from "assert";
import { describe, it } from "mocha";

import { puzzle01_1 } from "./d01/puzzle01.1";
import { puzzle01_2 } from "./d01/puzzle01.2";

import { puzzle02_1 } from "./d02/puzzle02.1";

import fs from "fs";

function ReadFile(name: string): string {
    return fs.readFileSync(name, { encoding: "utf-8" });
}

const d01p1 = ReadFile("./input/d01p1.test");
const d01p2 = ReadFile("./input/d01p2.test");

const d02p1 = ReadFile("./input/d02p1.test");

describe("Puzzle 1", function () {
    describe("Part 1", function () {
        it("find the first and last digit in a line, and sum each line", function() {
            assert.equal(puzzle01_1(d01p1), 142);
        });
    });

    describe("Part 2", function () {
        it("find the first and last digit in a line, including digits written as words, and sum each line", function() {
            assert.equal(puzzle01_2(d01p2), 281);
        });
    });
});

describe("Puzzle 2", function () {
    describe("Part 1", function () {
        it("should find if a key contains a larger value than maximum, and sum ids that have valid keys", function () {
            assert.equal(puzzle02_1(d02p1), 8);
        });
    });
});
