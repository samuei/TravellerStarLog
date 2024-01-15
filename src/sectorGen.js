import Papa from 'papaparse';

const sectorGen = async (hexConfig) => {
    // https://travellermap.com/api/sec?sector=Solomani%20Rim&type=TabDelimited&metadata=0&milieu=iw
    const datafile = await fetch('./assets/SolomaniRim.txt').then(txt => txt.text());
    
    const file = Papa.parse(datafile, {
        skipEmptyLines: 'greedy',
        header: true,
    });
    const referenceMap = new Map();
    file.data.forEach((row) => {
        referenceMap.set(row.Hex, row);
    });

    let hexes = {}, 
        xmax = hexConfig.width ?? 32,  // subsector=8, sector=32
        ymax = hexConfig.height ?? 40; // subsector=10, sector=40
    
    for (let x = 0; x < xmax; x++) {
        for (let y = 0; y < ymax; y++) {
            let hexname = ('00' + (x + 1)).slice(-2) + ('00' + (ymax - y)).slice(-2);
            const hex = referenceMap.get(hexname) ?? {};
            hex.q = x;
            hex.r = y;
            hex.n = hexname;
            if (hex.Allegiance) {
                hex.class = `allegiance ${hex.Allegiance}`;
            }
            
            hexes[hexname] = hex;
        }
    }

    return {
        'layout': 'even-q',
        'hexes': hexes,
    };
};
export default sectorGen;
