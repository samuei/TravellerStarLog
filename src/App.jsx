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
            {
                appMode === 'view'
                    ? (
                        <MapView />
                    ) : appMode === 'import-tsv'
                        ? (
                            <T5Import />
                        ) : appMode === 'import-json'
                            ? (
                                <JsonImport />
                            ) : (
                                <MainMenu />
                            )

            }
        </starLogContext.Provider>
    );
};
export default App;
