import {useContext, useState} from 'react';
import { starlogContext } from './starlogContext';

const buttonConfig = [
    { 
        appMode: 'view',
        display: 'View',
    },
    {
        display: 'Import',
        subMenu: [
            {
                appMode: 'import-tsv',
                display: 'From T5 TSV'
            }
        ]
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
                        <MenuButton
                            key={btn.display}
                            btnConfig={btn}
                        />
                    );
                })
            }
        </div>
    );
};
export default MainMenu;

export const MenuButton = ({
    btnConfig={}, lvl=0
}) => {
    const context = useContext(starlogContext);
    const [open, setOpen] = useState(false);

    const ret = [];
    if (btnConfig.subMenu) {
        ret.push(
            <button
                key={btnConfig.display}
                className="menu-button"
                data-menu-depth={lvl}
                onClick={() => setOpen(true)}
            >
                {btnConfig.display}
            </button>
        );
        if (open) {
            ret.push(
                btnConfig.subMenu.map((subConfig) => {
                    return (
                        <MenuButton
                            key={subConfig.display}
                            btnConfig={subConfig}
                            lvl={lvl + 1}
                            onClick={() => setOpen(false)}
                        />
                    );
                })
            );
        }
    } else {
        ret.push(
            <button
                key={btnConfig.appMode}
                className='menu-button'
                data-menu-depth={lvl}
                onClick={() => {
                    context.appMode = btnConfig.appMode;
                }}
            >
                {btnConfig.display}
            </button>
        );
    }

    return ret;
};
