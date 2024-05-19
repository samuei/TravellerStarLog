import { useContext } from 'react';
import MainMenu from './components/MainMenu.jsx';
import { starlogContext } from './components/starlogContext.js';

const App = () => {
    const { appMode } = useContext(starlogContext);

    let DisplayComp;
    
    switch (appMode) {
        case 'menu':
        default:
            DisplayComp = MainMenu;
    }
    
    return (
        <DisplayComp />
    );
};
export default App;
