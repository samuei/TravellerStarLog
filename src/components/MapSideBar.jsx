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

    const [systemName, setSystemName] = useState(hexData?.Name || '');
    const [uwp, setUwp] = useState(hexData?.UWP || '');
    const [allegiance, setAllegiance] = useState(hexData?.Allegiance || '');
    const [nobility, setNobility] = useState(hexData?.Nobility || '');
    const [bases, setBases] = useState(hexData?.Bases || '');
    const [zone, setZone] = useState(hexData?.Zone || '');

    const saveHex = (e) => {
        e.preventDefault();

        hexData.Name = systemName;
        hexData.UWP = uwp;
        hexData.Allegiance = allegiance;
        hexData.Nobility = nobility;
        hexData.Bases = bases;
        hexData.Zone = zone;

        const newMapObject = Object.assign({}, context.mapObject);
        context.setMapObject(newMapObject);
    };

    return (
        <div className='map-side-bar'>
            <div className='map-side-bar-controls'>
                <button
                    className='map-side-bar-return-to-menu'
                    onClick={() => {
                        context.setAppMode('menu');
                    }}
                    title='Return to Menu'
                >
                    ≡
                </button>
                <button
                    className='map-side-bar-close'
                    onClick={() => setActiveHex(null)}
                    title='Close System Details'
                >
                    X
                </button>
            </div>

            <form onSubmit={saveHex}>
                <h2>
                    {activeHex}
                </h2>
                <label htmlFor='systemName'>
                    System Name
                </label>
                <input
                    id='systemName'
                    type='text'
                    placeholder={activeHex}
                    value={systemName}
                    onChange={(e) => setSystemName(e.target.value)}
                />
                <label htmlFor='uwp'>
                    UWP
                </label>
                <input
                    id='uwp'
                    type='text'
                    value={uwp}
                    onChange={(e) => setUwp(e.target.value)}
                />
                <label htmlFor='allegiance'>
                    Allegiance
                </label>
                <input
                    id='allegiance'
                    type='text'
                    value={allegiance}
                    onChange={(e) => setAllegiance(e.target.value)}
                />
                <label htmlFor='nobility'>
                    Nobility
                </label>
                <input
                    id='nobility'
                    type='text'
                    value={nobility}
                    onChange={(e) => setNobility(e.target.value)}
                />
                <label htmlFor='bases'>
                    Bases
                </label>
                <input
                    id='bases'
                    type='text'
                    value={bases}
                    onChange={(e) => setBases(e.target.value)}
                />
                <label htmlFor='zone'>
                    Travel Zone
                </label>
                <input
                    id='zone'
                    type='text'
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    maxLength={1}
                />

                <button type='submit'>
                    Save Hex
                </button>
            </form>
        </div>
    );
};
export default MapSideBar;
