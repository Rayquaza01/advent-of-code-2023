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
const d04p1 = ReadFile("./input/d04p1.test");
const d05p1 = ReadFile("./input/d05p1.test");
const d06p1 = ReadFile("./input/d06p1.test");
const d07p1 = ReadFile("./input/d07p1.test");

const d08p1a = ReadFile("./input/d08p1a.test");
const d08p1b = ReadFile("./input/d08p1b.test");
const d08p2 = ReadFile("./input/d08p2.test");

const d09p1 = ReadFile("./input/d09p1.test");

const d10p1a = ReadFile("./input/d10p1a.test");
const d10p1b = ReadFile("./input/d10p1b.test");
const d10p2a = ReadFile("./input/d10p2a.test");
const d10p2b = ReadFile("./input/d10p2b.test");

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

    describe("Part 2", function () {
        it("should find all symbols with two adjacent numbers, and sum the the adjacent number's products", function () {
            assert.equal(PuzzleSolutions.puzzle03p2(d03p1), 467835);
        });
    });
});

describe("Puzzle 4", function () {
    describe("Part 1", function () {
        it("should find all winning numbers on a card, and sum the cards", function () {
            assert.equal(PuzzleSolutions.puzzle04p1(d04p1), 13);
        });
    });

    describe("Part 2", function () {
        it("should give copies of the next card for number of winners, and count the number of processed cards", function () {
            assert.equal(PuzzleSolutions.puzzle04p2(d04p1), 30);
        });
    });
});

describe("Puzzle 5", function () {
    describe("Part 1", function () {
        it("should find the closest location that maps tot the initial seeds", function () {
            assert.equal(PuzzleSolutions.puzzle05p1(d05p1), 35);
        });
    });

    describe("Part 2", function () {
        it("should find the closest location that maps to a range of seeds", function () {
            assert.equal(PuzzleSolutions.puzzle05p2(d05p1), 46);
        });
    });
});

describe("Puzzle 6", function () {
    describe("Part 1", function () {
        it("should find the maximum number of ways to win, and multiply them", function () {
            assert.equal(PuzzleSolutions.puzzle06p1(d06p1), 288);
        });
    });

    describe("Part 2", function () {
        it("should find the maximum number of ways to win, and multiply them", function () {
            assert.equal(PuzzleSolutions.puzzle06p2(d06p1), 71503);
        });
    });
});

describe("Puzzle 7", function () {
    describe("Part 1", function () {
        it("should order each hand, multiply its bid by its rank, and sum", function () {
            assert.equal(PuzzleSolutions.puzzle07p1(d07p1), 6440);
        });
    });

    describe("Part 2", function () {
        it("should order each hand, multiply its bid by its rank, and sum, treating J as a wild", function () {
            assert.equal(PuzzleSolutions.puzzle07p2(d07p1), 5905);
        });
    });
});

describe("Puzzle 8", function () {
    describe("Part 1", function () {
        it("should find the number of steps needed to reach ZZZ", function () {
            assert.equal(PuzzleSolutions.puzzle08p1(d08p1a), 2);
        });

        it("should find the number of steps needed to reach ZZZ", function () {
            assert.equal(PuzzleSolutions.puzzle08p1(d08p1b), 6);
        });
    });

    describe("Part 2", function () {
        it("should find the number of steps needed to reach all ending with Z", function () {
            assert.equal(PuzzleSolutions.puzzle08p2(d08p2), 6);
        });
    });
});

describe("Puzzle 9", function () {
    describe("Part 1", function () {
        it("should find the next in the pattern for each value, and sum them", function () {
            assert.equal(PuzzleSolutions.puzzle09p1(d09p1), 114);
        });
    });

    describe("Part 2", function () {
        it("should find the prev in the pattern for each value, and sum them", function () {
            assert.equal(PuzzleSolutions.puzzle09p2(d09p1), 2);
        });
    });
});

describe("Puzzle 10", function () {
    describe("Part 1", function () {
        it("find the farthest distance from the start", function () {
            assert.equal(PuzzleSolutions.puzzle10p1(d10p1a), 4);
        });

        it("find the farthest distance from the start", function () {
            assert.equal(PuzzleSolutions.puzzle10p1(d10p1b), 8);
        });
    });

    describe("Part 2", function () {
        it("should find the number of tiles enclosed by the loop", function () {
            assert.equal(PuzzleSolutions.puzzle10p2(d10p2a), 4);
        });
        it("should find the number of tiles enclosed by the loop", function () {
            assert.equal(PuzzleSolutions.puzzle10p2(d10p2b), 8);
        });
    });
});
