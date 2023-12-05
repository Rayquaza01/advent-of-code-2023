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
            if (pos >= entry.src && pos <= (entry.src + entry.range)) {
                return entry.dest + (pos - entry.src);
            }
        }

        return pos;
    }
}

interface MapEntry {
    src: number
    dest: number
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

export function puzzle05p2(input: string) {

}
