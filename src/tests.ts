import assert from "assert";
import { describe, it } from "mocha";

import * as PuzzleSolutions from "./solutions";

import fs from "fs";

function ReadFile(name: string): string {
    return fs.readFileSync(name, { encoding: "utf-8" });
}

const d01p1 = ReadFile("./input/d01p1.test");
const d01p2 = ReadFile("./input/d01p2.test");

const d02p1 = ReadFile("./input/d02p1.test");

const d03p1 = ReadFile("./input/d03p1.test");

describe("Puzzle 1", function () {
    describe("Part 1", function () {
        it("find the first and last digit in a line, and sum each line", function() {
            assert.equal(PuzzleSolutions.puzzle01p1(d01p1), 142);
        });
    });

    describe("Part 2", function () {
        it("find the first and last digit in a line, including digits written as words, and sum each line", function() {
            assert.equal(PuzzleSolutions.puzzle01p2(d01p2), 281);
        });
    });
});

describe("Puzzle 2", function () {
    describe("Part 1", function () {
        it("should find if a key contains a larger value than maximum, and sum ids that have valid keys", function () {
            assert.equal(PuzzleSolutions.puzzle02p1(d02p1), 8);
        });
    });

    describe("Part 2", function () {
        it("should find the max of each key in each line, multiply each line's maxes, and sum the products", function () {
            assert.equal(PuzzleSolutions.puzzle02p2(d02p1), 2286);
        });
    });
});


describe("Puzzle 3", function () {
    describe("Part 1", function () {
        it("should find all numbers adjacent to a symbol and sum them", function () {
            assert.equal(PuzzleSolutions.puzzle03p1(d03p1), 4361);
        });
    });

    // describe("Part 2", function () {
    //     it("should find the max of each key in each line, multiply each line's maxes, and sum the products", function () {
    //         assert.equal(PuzzleSolutions.puzzle02p2(d02p1), 2286);
    //     });
    // });
});
