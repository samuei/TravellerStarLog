import { useState } from 'react';
import MainMenu from './components/MainMenu.jsx';
import { starlogContext } from './components/starlogContext.js';
import T5Import from './components/T5Import.jsx';
import MapView from './components/MapView.jsx';

const App = () => {
    const [appMode, setAppMode] = useState('menu');
    const [mapObject, setMapObject] = useState(null);
    const [systemMessage, setSystemMessage] = useState(null);

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
            setSystemMessage('Saved!');
        case 'load':
            let storedMap = localStorage.getItem('map');
            if (storedMap) {
                storedMap = JSON.parse(storedMap);
            }
            setMapObject(storedMap);
            setAppMode('menu');
            setSystemMessage('Loaded!');
        case 'menu':
        default:
            DisplayComp = MainMenu;
    }
    
    return (
        <starlogContext.Provider value={{
            appMode, setAppMode, mapObject, setMapObject,
        }}>
            <div>{systemMessage}</div>
            <DisplayComp />
        </starlogContext.Provider>
    );
};
export default App;
