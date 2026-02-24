import { useContext, useState } from 'react';
import { starLogContext } from './starLogContext.js';

const buttonConfig = [
    { 
        appMode: 'view',
        display: 'View Map',
        mapRequired: true,
    },
    {
        display: 'Load Map',
        subMenu: [
            {
                appMode: 'import-tsv',
                display: 'From T5 TSV',
            },
            {
                appMode: 'import-local-storage',
                display: 'From Local Storage',
            },
        ],
    },
    {
        display: 'Save Map',
        subMenu: [
            {
                appMode: 'save-local-storage',
                display: 'To Local Storage',
            },
        ],
        mapRequired: true,
    },

];

const MainMenu = () => {
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
    const context = useContext(starLogContext);
    const [open, setOpen] = useState(false);

    const ret = [];

    if (btnConfig.mapRequired && !context.mapObject) {
        return null;
    } else if (btnConfig.subMenu) {
        ret.push(
            <button
                key={btnConfig.display}
                className="menu-button"
                data-menu-depth={lvl}
                onClick={() => setOpen(!open)}
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
                            onClick={() => setOpen(!open)}
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
                    context.setAppMode(btnConfig.appMode);
                }}
            >
                {btnConfig.display}
            </button>
        );
    }

    return ret;
};
