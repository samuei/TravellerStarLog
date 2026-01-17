import { useContext, useState } from 'react';
import { starLogContext } from './starLogContext.js';
import './MapSideBar.css';

const MapSideBar = ({
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
                </h2>
                <label>
                    System Name
                    <input
                        type='text'
                        placeholder={activeHex}
                        value={systemName}
                        onChange={(e) => setSystemName(e.target.value)}
                    />
                </label>
                <label>
                    UWP
                    <input
                        type='text'
                        placeholder={uwp}
                        value={uwp}
                        onChange={(e) => setUwp(e.target.value)}
                    />
                </label>
            </form>
        </div>
    );
};
export default MapSideBar;
