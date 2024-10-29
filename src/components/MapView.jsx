import { useContext, useEffect, useRef, useState } from 'react';
import { starlogContext } from './starlogContext.js';

const MapView = () => {
    const hexMapRef = useRef(null);
    const [currentMap, setCurrentMap] = useState(null);

    const context = useContext(starlogContext);

    useEffect(() => {
        if (!hexMapRef.current.firstElementChild) {
            const mapObj = new OI.hexmap(
                hexMapRef.current,
                {
                    'label': {
                        'show': true,    // Show a label
                        'clip': true,    // Make sure the label is clipped to the hexagon
                        // Define a function to format the hex labels
                        // It is passed:
                        //  * txt - a text string with the hex's name
                        //  * attr - an object containing:
                        //        * size - the size in pixels
                        //        * font-size - the font size in pixels
                        //        * x - the horizontal position in pixels
                        //        * y - the vertical position in pixels
                        //        * hex - the hexagon's HexJSON properties
                        'format': function (txt, attr) {
                            let tspans;

                            if (attr?.hex?.Name !== undefined) {
                                tspans = `<tspan class="active" x="${attr.x}" y="${attr.y}">${attr.hex.Name.length ? attr.hex.Name : '????'}</tspan>`;
                                tspans += `<tspan class="active" x="${attr.x}" y="${attr.y + (1.2 * attr['font-size'])}">${txt}</tspan>`;
                            } else {
                                tspans = `<tspan class="active big" y="${attr.y}" x="${attr.x}">${txt}</tspan>`;
                            }

                            return tspans;
                        }
                    },

                    // The HexJSON layout
                    //'hexjson': 'emptySubsector.hexjson'
                    hexjson: context.mapObject,
                },
            );
            setCurrentMap(mapObj);
        }
    }, []);

    return (
        <div className='map-container'>
            <div className='sidebar' />
            <div className='body'>
                <div id='hexmap' ref={hexMapRef} />
            </div>
        </div>
    );
};
export default MapView;
