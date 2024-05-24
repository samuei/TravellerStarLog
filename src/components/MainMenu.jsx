import { useContext } from 'react';
import { starlogContext } from './starlogContext';

const buttonConfig = [
    { 
        appMode: 'view',
        display: 'View',
    },
    {
        appMode: 'import',
        display: 'Import',
    },
    {
        appMode: 'load',
        display: 'Load from Local Storage',
    },
    {
        appMode: 'save',
        display: 'Save to Local Storage',
    },
];

const MainMenu = () => {
    const context = useContext(starlogContext);
    
    return (
        <div
            className='main-menu'
        >
            <h1>Traveller Star Log</h1>
            {
                buttonConfig.map((btn) => {
                    return (
                        <button
                            key={btn.appMode}
                            onClick={()=>{
                                context.appMode = btn.appMode;
                            }}
                        >
                            {btn.display}
                        </button>
                    );
                })
            }
        </div>
    );
};
export default MainMenu;
