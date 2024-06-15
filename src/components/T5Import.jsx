import { useContext, useState } from 'react';
import { starlogContext } from './starlogContext.js';
import Papa from 'papaparse';

const arrayToHex = (inArray=[], xmax=32, ymax=40) => {
    const referenceMap = new Map();
    inArray.forEach((row) => {
        referenceMap.set(row.Hex, row);
    });

    let hexes = {};

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

    return hexes;
};

const T5Import = () => {
    const [textVal, setTextVal] = useState('');

    const context = useContext(starlogContext);

    return (
        <div>
            <button
                onClick={() => {
                    context.setAppMode('menu');
                }}
            >
                {'<- Back'}
            </button>
            <label>
                Upload
                <input
                    type='file'
                    onChange={(e) => {
                        e.target.files[0].text().then((dataFile) => {
                            const file = Papa.parse(dataFile, {
                                skipEmptyLines: 'greedy',
                                header: true,
                            });

                            const hexes = arrayToHex(file.data);
                            context.setMapObject(hexes);
                            context.setAppMode('menu');
                        });
                    }}
                />
            </label>
            <label>
                Input as text
                <input
                    type='textarea'
                    onChange={(e) => {
                        setTextVal(e.target.value);
                    }}
                    value={textVal}
                />
                <button
                    onClick={() => {
                        const file = Papa.parse(textVal, {
                            skipEmptyLines: 'greedy',
                            header: true,
                        });

                        const hexes = arrayToHex(file.data);
                        context.setMapObject(hexes);
                        context.setAppMode('menu');
                    }}
                >
                    Process
                </button>
            </label>
        </div>
    );
};
export default T5Import;
