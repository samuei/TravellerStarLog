import { useState } from 'react';
import HexMap from './HexMap.jsx';
import MapSideBar from './MapSideBar.jsx';
import './MapView.css';

const MapView = () => {
    const [activeHex, setActiveHex] = useState(null);

    return (
        <div className='map-container'>
            {
                activeHex &&
                <div className='map-side-bar-container'>
                    <MapSideBar
                        key={activeHex}
                        activeHex={activeHex}
                        setActiveHex={setActiveHex}
                    />
                </div>
            }

            <div className='body'>
                <HexMap
                    setActiveHex={setActiveHex}
                />
            </div>
        </div>
    );
};
export default MapView;
