import { useContext, useState } from 'react';
import { starLogContext } from './starLogContext.js';

const buttonConfig = [
    {
        display: 'View Map',
        contextMethod: 'setAppMode',
        arg: 'view',
        mapRequired: true,
    },
    {
        display: 'Load Map',
        subMenu: [
            {
                display: 'From T5 TSV',
                contextMethod: 'setAppMode',
                arg: 'import-tsv',
            },
            {
                display: 'From JSON',
                contextMethod: 'setAppMode',
                arg: 'import-json',
            },
            {
                display: 'From Local Storage',
                contextMethod: 'importFromLocalStorage',
            },
        ],
    },
    {
        display: 'Save Map',
        subMenu: [
            {
                display: 'To JSON',
                contextMethod: 'exportToJson',
            },
            {
                display: 'To Local Storage',
                contextMethod: 'exportToLocalStorage',
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
                key={btnConfig.display}
                className='menu-button'
                data-menu-depth={lvl}
                onClick={() => {
                    if (btnConfig.contextMethod) {
                        context[btnConfig.contextMethod](btnConfig.arg ?? null);
                    }
                }}
            >
                {btnConfig.display}
            </button>
        );
    }

    return ret;
};
