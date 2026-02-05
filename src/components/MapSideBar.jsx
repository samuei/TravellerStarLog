import { useContext } from 'react';
import { starLogContext } from './starLogContext.js';
import './MapSideBar.css';
import { HexDisplay } from './HexDisplay.jsx';

const MapSideBar = ({
    activeHex=null, setActiveHex=()=>{},
}) => {
    if (!activeHex || !activeHex.length) {
        return null;
    }
    const context = useContext(starLogContext);
    const yCoordinates = `${activeHex[0]}${activeHex[1]}`;
    const xCoordinates = `${activeHex[2]}${activeHex[3]}`;
    const hexData = context.mapObject.hexes[xCoordinates - 1][yCoordinates - 1];


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

            <HexDisplay
                hexData={hexData}
                activeHex={activeHex}
            />
        </div>
    );
};
export default MapSideBar;
