import { useMemo, useContext } from 'react';
import { starlogContext } from './starlogContext.js';
import './HexMap.css';

const Hexagon = ({ className='', hexName='', allegiance='' }) => {
    console.log(allegiance)
    return (
        <div className={`clip-block ${className} ${hexName}`}>
            <div className={`clip-each clip-border ${ allegiance ? allegiance + ' allegiance' : ''}`}>
                <div className="clip-caption">
                    {hexName}
                </div>
            </div>
        </div>
    );
};

const HexMap = () => {
    const context = useContext(starlogContext);

    const hexes = useMemo(() => {
        const map = [];
        for (let i = 0; i < context.mapObject.height; i++) {
            if (map[i] === undefined) {
                map[i] = [];
            }
            for (let j = 0; j < context.mapObject.width; j++) {
                const hexName = ('00' + (j + 1)).slice(-2) + ('00' + (i+1)).slice(-2);
                map[i][j] = (
                    <Hexagon
                        className={ j % 2 === 1 ? 'even' : 'odd' /* Off by one due to zero-indexing! */}
                        hexName={hexName}
                        key={hexName}
                        allegiance={ context.mapObject.hexes[i][j].Allegiance ?? null }
                    />
                );
            }
        }

        return map;
    }, [context.mapObject]);

    return (
        <div
            className='hex-map-wrapper'
            style={{
                '--hex-side-length': `${context.hexSideLength}px`,
            }}
        >
            {
                hexes.map((hexRow, rowIdx) => {
                    return (
                        <div
                            className={`hex-map-row ${rowIdx % 2 === 1 ? 'even' : 'odd'}` /* Off by one due to zero-indexing! */}
                            key={rowIdx}
                        >
                            {hexRow}
                        </div>
                    );
                })
            }
        </div>
    );
};
export default HexMap;
