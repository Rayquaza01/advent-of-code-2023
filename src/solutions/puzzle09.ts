class Sequence {
    seq: number[];
    diff: Sequence | 0;

    constructor(seq: number[]) {
        this.seq = seq;
        this.diff = 0;

        const diffArr: number[] = [];

        for (let i = 0; i < seq.length - 1; i++) {
            diffArr[i] = seq[i + 1] - seq[i];
        }

        if (diffArr.some(i => i !== 0)) {
            this.diff = new Sequence(diffArr);
        }
    }

    extrapolate(): number {
        if (this.diff === 0) {
            const next = this.seq[this.seq.length - 1];
            this.seq.push(next);
            return next;
        }

        const diff = this.diff.extrapolate();
        const next = this.seq[this.seq.length - 1] + diff;
        this.seq.push(next);
        return next;
    }

    extrapolate_prev(): number {
        if (this.diff === 0) {
            const prev = this.seq[0];
            this.seq.unshift(prev);
            return prev;
        }

        const diff = this.diff.extrapolate_prev();
        const prev = this.seq[0] - diff;
        this.seq.push(prev);
        return prev;
    }
}

// NOT 1178736146, TOO LOW

export function puzzle09p1(input: string) {
    return input
        .split("\n")
        .slice(0, -1)
        .map(line => {
            // haha I forgot to include the minus sign
            const seq = new Sequence(line.match(/-?\d+/g)?.map(Number) as number[]);
            return seq.extrapolate();
        })
        .reduce((acc, i) => acc + i, 0);
}

export function puzzle09p2(input: string) {
    return input
        .split("\n")
        .slice(0, -1)
        .map(line => {
            const seq = new Sequence(line.match(/-?\d+/g)?.map(Number) as number[]);
            return seq.extrapolate_prev();
        })
        .reduce((acc, i) => acc + i, 0);
}
