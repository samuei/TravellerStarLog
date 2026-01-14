import { useState } from 'react';
import MainMenu from './components/MainMenu.jsx';
import { starLogContext } from './components/starLogContext.js';
import T5Import from './components/T5Import.jsx';
import MapView from './components/MapView.jsx';

const App = () => {
    const [appMode, setAppMode] = useState('menu');
    const [mapObject, setMapObject] = useState(null);
    const [hexSideLength, setHexSideLength] = useState(180);

    let DisplayComp;
    
    switch (appMode) {
        case 'import-tsv':
            DisplayComp = T5Import;
            break;
        case 'view':
            DisplayComp = MapView;
            break;
        case 'save':
            localStorage.setItem('map', JSON.stringify(mapObject));
            setAppMode('menu');
            DisplayComp = MainMenu;
            break;
        case 'load':
            let storedMap = localStorage.getItem('map');
            if (storedMap) {
                storedMap = JSON.parse(storedMap);
            }
            setMapObject(storedMap);
            setAppMode('menu');
            DisplayComp = MainMenu;
            break;
        case 'menu':
        default:
            DisplayComp = MainMenu;
    }

    return (
        <starLogContext.Provider value={{
            appMode,
            setAppMode,
            mapObject,
            setMapObject,
            hexSideLength,
            setHexSideLength,
        }}>
            <DisplayComp key={appMode} />
        </starLogContext.Provider>
    );
};
export default App;
