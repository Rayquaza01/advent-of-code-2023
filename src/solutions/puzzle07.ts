/**
 * Types of hands. Values are bitmasks
 */
enum HandTypes {
    INVALID       = 0x00,
    HIGH_CARD     = 0x01,
    ONE_PAIR      = 0x02,
    TWO_PAIR      = 0x04,
    THREE_OF_KIND = 0x08,
    FULL_HOUSE    = 0x10,
    FOUR_OF_KIND  = 0x20,
    FIVE_OF_KIND  = 0x40
}

/**
 * Gives face cards a numerical value
 * @param string The face card to parse
 * @param part 1 or 2. In part 1, J is 11 and in part 2, J is 1
 */
function parseFaceCard(card: string, part: number): number {
    switch (card) {
        case "T":
            return 10;
        case "J":
            // j is a 1 in part 2
            return part === 1 ? 11 : 1;
        case "Q":
            return 12;
        case "K":
            return 13;
        case "A":
            return 14;
    }

    return -1;
}

interface Hand {
    type: HandTypes
    cards: number[]
    bid: number
}

function evaluateHand(hand: number[]): HandTypes {
    const counts: number[] = [];
    for (const card of hand) {
        Object.hasOwn(counts, card)
            ? counts[card]++
            : counts[card] = 1;
    }

    // treat j as a wild card
    // find the max value that isn't j,
    // increment it by the j's value
    // (this is ok to run always, because j is undefined in part 1
    if (counts[1] > 0) {
        let max = -Infinity;
        let maxIndex = -1;

        for (let i = 2; i < counts.length; i++) {
            if (counts[i] === undefined) continue;

            if (counts[i] > max) {
                max = counts[i];
                maxIndex = i;
            }
        }

        // if found next high value, add J to it
        if (maxIndex > -1) {
            counts[maxIndex] += counts[1];
            counts[1] = 0;
        }
    }

    // bitwise hand evaluation
    // if hand matches a type, mark it
    // return the strongest type that it matches

    let flags = 1;

    for (const c of counts) {
        // if two of a kind, mark one pair
        if (c === 2) {
            // if previously found 2 of a kind, mark 2 pair
            if ((flags & HandTypes.ONE_PAIR) === HandTypes.ONE_PAIR) {
                flags |= HandTypes.TWO_PAIR;
            }

            // if previously found three of kind, mark full house
            if ((flags & HandTypes.THREE_OF_KIND) === HandTypes.THREE_OF_KIND) {
                flags |= HandTypes.FULL_HOUSE;
            }

            flags |= HandTypes.ONE_PAIR;
        }

        // if three of kind
        if (c === 3) {
            // if previusly found 3 of a kind, mark full house
            if ((flags & HandTypes.ONE_PAIR) === HandTypes.ONE_PAIR) {
                flags |= HandTypes.FULL_HOUSE;
            }

            flags |= HandTypes.THREE_OF_KIND;
        }

        // if four of kind
        if (c === 4) {
            flags |= HandTypes.FOUR_OF_KIND;
        }

        // if five of kind
        if (c === 5) {
            flags |= HandTypes.FIVE_OF_KIND;
        }
    }

    for (let i = HandTypes.FIVE_OF_KIND; i > 0; i /= 2) {
        if ((flags & i) === i) return i;
    }

    return HandTypes.INVALID;
}

/**
 * Compares two hands.
 * If returns > 0, b comes before a
 * If returns < 0, a comes before b
 * if returns = 0, a and b are equal
 */
function compareHand(a: Hand, b: Hand) {
    if (a.type > b.type) return 1;
    if (a.type < b.type) return -1;

    // types are equal

    for (let i = 0; i < a.cards.length; i++) {
        if (a.cards[i] > b.cards[i]) return 1;
        if (a.cards[i] < b.cards[i]) return -1;
    }

    return 0;
}

// NOT 255205860 (too high)

export function puzzle07p1(input: string) {
    return input
        .split("\n")
        .slice(0, -1)
        .map(line => {
            const [hand, bid] = line.split(" ");

            const h: Partial<Hand> = {};

            h.bid = Number((bid.match(/\d+/g) ?? [])[0]);
            h.cards = hand
                .split("")
                .map(card => /\d/.test(card) ? Number(card) : parseFaceCard(card, 1));
            h.type = evaluateHand(h.cards);

            // console.log(h, HandTypes[h.type]);

            return h as Hand;
        })
        .sort(compareHand)
        .reduce((acc, hand, index) => acc + hand.bid * (index + 1), 0);
}

// part 2
// NOT 247967442 (too high)

export function puzzle07p2(input: string) {
    return input
        .split("\n")
        .slice(0, -1)
        .map(line => {
            const [hand, bid] = line.split(" ");

            const h: Partial<Hand> = {};

            h.bid = Number((bid.match(/\d+/g) ?? [])[0]);
            h.cards = hand
                .split("")
                .map(card => /\d/.test(card) ? Number(card) : parseFaceCard(card, 2));
            h.type = evaluateHand(h.cards);

            // console.log(h, HandTypes[h.type]);

            return h as Hand;
        })
        .sort(compareHand)
        .reduce((acc, hand, index) => acc + hand.bid * (index + 1), 0);
}
