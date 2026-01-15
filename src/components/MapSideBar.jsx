import { memo, useContext, useState } from 'react';
import { starLogContext } from './starLogContext.js';
import './MapSideBar.css';

const MapSideBar = memo(({
    activeHex=null, setActiveHex=()=>{},
}) => {
    if (!activeHex || !activeHex.length) {
        return null;
    }
    const context = useContext(starLogContext);
    const xCoordinates = `${activeHex[activeHex.length - 2]}${activeHex[activeHex.length - 1]}`;
    const yCoordinates = `${activeHex[0]}${activeHex[1]}`;
    const hexData = context.mapObject.hexes[xCoordinates - 1][yCoordinates - 1];

    const [systemName, setSystemName] = useState(hexData?.Name || activeHex);

    return (
        <div className='map-side-bar'>
            <button
                className='map-side-bar-close'
                onClick={() => setActiveHex(null)}
            >
                X
            </button>
            <form>
                <h2>
                    {activeHex}
                    <br />
                    <input
                        type='text'
                        placeholder={activeHex}
                        value={systemName}
                        onChange={(e) => setSystemName(e.target.value)}
                    />
                </h2>
            </form>
        </div>
    );
});
export default MapSideBar;
