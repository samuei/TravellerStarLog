import { useMemo, useContext } from 'react';
import { starLogContext } from './starLogContext.js';
import './HexMap.css';

const Hexagon = ({
    className='', hexName='', allegiance='', starport=null, onClick=()=>{},
}) => {
    return (
        <div className={`clip-block ${className} ${hexName}`}>
            <div
                className={`clip-each clip-border ${ allegiance ? allegiance + ' allegiance' : ''}`}
                onClick={onClick}
            >
                <div className="hex-content">
                    {starport}
                    <br />
                    {hexName}
                </div>
            </div>
        </div>
    );
};

const HexMap = ({
    setActiveHex=()=>{},
}) => {
    const context = useContext(starLogContext);

    const hexes = useMemo(() => {
        const map = [];
        for (let i = 0; i < context.mapObject.height; i++) {
            if (map[i] === undefined) {
                map[i] = [];
            }
            for (let j = 0; j < context.mapObject.width; j++) {
                const hex = context.mapObject.hexes[i][j] || {};
                const hexCoordinate = ('00' + (j + 1)).slice(-2) + ('00' + (i + 1)).slice(-2);
                const hexName = hex.Name || hexCoordinate;
                map[i][j] = (
                    <Hexagon
                        className={ j % 2 === 1 ? 'even' : 'odd' /* Off by one due to zero-indexing! */}
                        hexName={hexName}
                        key={hexName}
                        starport={ hex.UWP?.[0] }
                        allegiance={ hex.Allegiance ?? null }
                        onClick={() => setActiveHex(hexCoordinate)}
                    />
                );
            }
        }

        return map;
    }, [context.mapObject, setActiveHex]);

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
