import { useContext, useState } from 'react';
import { starLogContext } from './starLogContext.js';
import Papa from 'papaparse';

const parseT5FileIntoMapObject = (dataFile={}, xMax=32, yMax=40) => {
    const file = Papa.parse(dataFile, {
        skipEmptyLines: 'greedy',
        header: true,
    });

    const hexes = {};
    const referenceMap = new Map();

    file.data.forEach((row) => {
        referenceMap.set(row.Hex, row);
    });

    for (let x = 0; x < xMax; x++) {
        for (let y = 0; y < yMax; y++) {
            if (hexes[y] === undefined) {
                hexes[y] = [];
            }
            let hexname = ('00' + (x + 1)).slice(-2) + ('00' + (y + 1)).slice(-2);
            const hex = referenceMap.get(hexname) ?? {};
            hex.x = x;
            hex.y = y;
            hex.hexName = hexname;

            hexes[y][x] = hex;
        }
    }

    return {
        hexes,
        height: yMax,
        width: xMax,
        properties : {}
    };
};

const T5Import = () => {
    const [textVal, setTextVal] = useState('');

    const context = useContext(starLogContext);

    return (
        <div className='main-menu'>
            <button
                onClick={() => {
                    context.setAppMode('menu');
                }}
            >
                ← Back
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
