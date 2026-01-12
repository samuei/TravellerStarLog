import HexMap from './HexMap.jsx';
import { useState } from 'react';
import MapSideBar from './MapSideBar.jsx';

const MapView = () => {
    const [activeHex, setActiveHex] = useState(null);

    return (
        <div className='map-container'>
            <MapSideBar
                activeHex={activeHex}
                setActiveHex={setActiveHex}
            />
            <div className='body'>
                <HexMap
                    setActiveHex={setActiveHex}
                />
            </div>
        </div>
    );
};
export default MapView;
