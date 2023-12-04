const DIGIT_PAT = /\d+/g

export function puzzle04p1(input: string) {
    let sum = 0;

    input.split("\n").forEach(line => {
        if (line === "") return;

        const numbers = line.split("|");

        // slice to remove Card Number
        const winningNumbers = numbers[0].match(DIGIT_PAT)?.map(Number).slice(1);
        const cardNumbers = numbers[1].match(DIGIT_PAT)?.map(Number);

        if (winningNumbers === undefined || cardNumbers === undefined) return;

        sum += cardNumbers?.reduce((acc, item) => {
            if (winningNumbers.includes(item)) {
                return acc === 0 ? 1 : acc * 2;
            }
            return acc;
        }, 0);
    });

    return sum;
}

// part 2

interface Card {
    winningCount: number
    cardNumber: number
}

// NOT 107208827

export function puzzle04p2(input: string) {
    const cardWins = input.split("\n").map(line => {
        if (line === "") return;

        const numbers = line.split("|");

        // slice to remove Card Number
        // I got the wrong answer at first because I didn't slice here
        // but I sliced in part 1, and I just copied it
        // so why did I remove the slice???
        const winningNumbers = numbers[0].match(DIGIT_PAT)?.map(Number).slice(1) ?? [];
        const cardNumbers = numbers[1].match(DIGIT_PAT)?.map(Number) ?? [];

        if (winningNumbers === undefined || cardNumbers === undefined) return;

        // changed to not count points, but instead to just count winning numbers
        return cardNumbers?.reduce((acc, item) => {
            if (winningNumbers.includes(item)) {
                return acc + 1;
            }
            return acc;
        }, 0);
    })
        .filter(i => i !== undefined)
        .map((item, index) => { return { winningCount: item, cardNumber: index } as Card; });

    const cardStack = [...cardWins];

    let count = 0;

    // process as long as cards are in stack
    while (cardStack.length > 0) {
        count++;
        const top = cardStack.pop() as Card;

        // loop starting from next card for the amount of wins
        for (let i = 1; i <= top.winningCount; i++) {
            let index = top.cardNumber + i;
            // if out of bounds of the card list, reset to last card in list
            if (index >= cardWins.length) index = cardWins.length - 1;
            // duplicate card in stack
            cardStack.push(cardWins[index]);
        }
    }

    return count;
}
