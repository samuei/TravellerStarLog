const MapSideBar = ({
    activeHex=null, setActiveHex=()=>{},
}) => {
    return (
        <div className='map-side-bar'>
            <button onClick={() => setActiveHex(null)}>X</button>
            {activeHex}
        </div>
    );
};
export default MapSideBar;
