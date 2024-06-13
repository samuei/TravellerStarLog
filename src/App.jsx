import { useState } from 'react';
import MainMenu from './components/MainMenu.jsx';
import { starlogContext } from './components/starlogContext.js';
import T5Import from './components/T5Import.jsx';

const App = () => {
    const [appMode, setAppMode] = useState('menu');
    const [mapObject, setMapObject] = useState(null);

    let DisplayComp;
    
    switch (appMode) {
        case 'import-tsv':
            DisplayComp = T5Import;
            break;
        case 'menu':
        default:
            DisplayComp = MainMenu;
    }
    
    return (
        <starlogContext.Provider value={{
            appMode, setAppMode, mapObject, setMapObject,
        }}>
            <DisplayComp />
        </starlogContext.Provider>
    );
};
export default App;
