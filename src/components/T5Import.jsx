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

const parseT5FileIntoMapObject = (dataFile={}) => {
    const file = Papa.parse(dataFile, {
        skipEmptyLines: 'greedy',
        header: true,
    });

    const hexes = arrayToHex(file.data);
    return {
        hexes,
        layout: 'even-q',
        properties : {}
    };
};

const T5Import = () => {
    const [textVal, setTextVal] = useState('');

    const context = useContext(starlogContext);

    return (
        <div className='main-menu'>
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
                            const mapObj = parseT5FileIntoMapObject(dataFile);
                            context.setMapObject(mapObj);
                            context.setAppMode('menu');
                        });
                    }}
                />
            </label>
            <label>
                Input as text
                <textarea
                    onChange={(e) => {
                        setTextVal(e.target.value);
                    }}
                    value={textVal}
                    cols={40}
                    rows={5}
                />
                <button
                    onClick={() => {
                        const mapObj = parseT5FileIntoMapObject(textVal);
                        context.setMapObject(mapObj);
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
