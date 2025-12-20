import HexMap from './HexMap.jsx';

const MapView = () => {
    return (
        <div className='map-container'>
            <div className='sidebar' />
            <div className='body'>
                <HexMap />
            </div>
        </div>
    );
};
export default MapView;
