class Map {
    entries: MapEntry[]

    constructor(map: string) {
        this.entries = map
            .split("\n")
            .map(i => {
                const match = i.match(/\d+/g)?.map(Number) ?? [];

                if (match.length !== 3) return;

                const [ dest, src, range ] = match;
                return { dest, src, range };
            })
            .filter(i => i !== undefined) as MapEntry[];
    }

    /**
     * Finds the corresponding destination in the map, and returns pos if not found
     *
     * @param pos the position of the source
     */
    at(pos: number) {
        for (const entry of this.entries) {
            if (inRange(entry.src, entry.range, pos)) {
                return entry.dest + (pos - entry.src);
            }
        }

        return pos;
    }

    atRange(pos: Position): Position {
        for (const entry of this.entries) {
            let start: number | undefined;
            let range: number | undefined;

            console.log("Entry", entry.src, entry.range);
            console.log("Posit", pos.start, pos.range);

            if (inRange(entry.src, entry.range, pos.start)) {
                start = pos.start;
            } else if( inRange(pos.start, pos.range, entry.src)) {
                start = entry.src;
            }

            if (start === undefined) continue;

            if (inRange(entry.src, entry.range, pos.start + pos.range)) {
                range = (pos.start + pos.range) - start;
            } else if (inRange(pos.start, pos.range, entry.src + entry.range)) {
                range = (entry.src + entry.range) - start;
            }

            if (range === undefined) continue;

            console.log("Selected", {start: this.at(start), range});
            return { start: this.at(start), range };
        }

        // shouldn't get here
        console.log("Selected", pos);
        return pos;
    }
}

function inRange(start: number, range: number, val: number): boolean {
    return val >= start && val <= (start + range);
}

interface MapEntry {
    src: number
    dest: number
    range: number
}

interface Position {
    start: number
    range: number
}

export function puzzle05p1(input: string) {
    const maps = input.split("\n\n");
    const seeds = maps[0].match(/\d+/g)?.map(Number) as number[];

    const seedToSoil            = new Map(maps[1]);
    const soilToFertilizer      = new Map(maps[2]);
    const fertilizerToWater     = new Map(maps[3]);
    const waterToLight          = new Map(maps[4]);
    const lightToTemperature    = new Map(maps[5]);
    const temperatureToHumidity = new Map(maps[6]);
    const humidityToLocation    = new Map(maps[7]);

    const locations = seeds
        .map(s => seedToSoil.at(s))
        .map(s => soilToFertilizer.at(s))
        .map(f => fertilizerToWater.at(f))
        .map(w => waterToLight.at(w))
        .map(l => lightToTemperature.at(l))
        .map(t => temperatureToHumidity.at(t))
        .map(h => humidityToLocation.at(h));

    const closest = Math.min(...locations);
    return closest;
}

// part 2

export function puzzle05p2(input: string) {
    const maps = input.split("\n\n");

    const seeds: Position[] = [];
    const seedRanges = maps[0].match(/\d+/g)?.map(Number) as number[];

    for (let i = 0; i < seedRanges.length; i += 2) {
        seeds.push({ start: seedRanges[i], range: seedRanges[i + 1] });
    }

    const seedToSoil            = new Map(maps[1]);
    const soilToFertilizer      = new Map(maps[2]);
    const fertilizerToWater     = new Map(maps[3]);
    const waterToLight          = new Map(maps[4]);
    const lightToTemperature    = new Map(maps[5]);
    const temperatureToHumidity = new Map(maps[6]);
    const humidityToLocation    = new Map(maps[7]);

    const soils = seeds.map(s => seedToSoil.atRange(s));

    const locations = seeds
        .map(s => seedToSoil.atRange(s))
        .map(s => soilToFertilizer.atRange(s))
        .map(f => fertilizerToWater.atRange(f))
        .map(w => waterToLight.atRange(w))
        .map(l => lightToTemperature.atRange(l))
        .map(t => temperatureToHumidity.atRange(t))
        .map(h => humidityToLocation.atRange(h))
        .map(i => i.start);

    console.log("Locations", locations);

    const closest = Math.min(...locations);
    return closest;
}
