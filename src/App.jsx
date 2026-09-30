import { useState } from 'react';
import MainMenu from './components/MainMenu.jsx';
import { starLogContext } from './components/starLogContext.js';
import T5Import from './components/T5Import.jsx';
import MapView from './components/MapView.jsx';
import { JsonImport } from './JsonImport.jsx';

const App = () => {
    const [appMode, setAppMode] = useState('menu');
    const [mapObject, setMapObject] = useState(null);
    const [hexSideLength, setHexSideLength] = useState(180);

    const importFromLocalStorage = () => {
        let storedMap = localStorage.getItem('map');
        if (storedMap) {
            storedMap = JSON.parse(storedMap);
        }
        setMapObject(storedMap);
    };

    const exportToLocalStorage = () => {
        localStorage.setItem('map', JSON.stringify(mapObject));
    };

    const exportToJson = () => {
        const a = document.createElement('a');
        const file = new Blob([JSON.stringify(mapObject)], {type: 'text/plain'});
        a.href= URL.createObjectURL(file);
        a.download = 'traveller-star-log.txt';
        a.click();
        URL.revokeObjectURL(a.href);
    };

    let AppComponent;

    switch (appMode) {
        case 'view':
            AppComponent = MapView;
            break;
        case 'import-tsv':
            AppComponent = T5Import;
            break;
        case 'import-json':
            AppComponent = JsonImport;
            break;
        default:
            AppComponent = MainMenu;
    }

    return (
        <starLogContext.Provider value={{
            appMode,
            setAppMode,
            mapObject,
            setMapObject,
            hexSideLength,
            setHexSideLength,
            importFromLocalStorage,
            exportToLocalStorage,
            exportToJson,
        }}>
            <AppComponent />
        </starLogContext.Provider>
    );
};
export default App;
