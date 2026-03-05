import { createContext } from 'react';

export const starLogContext = createContext({
    appMode: 'menu',
    setAppMode: (val = 'menu') => {},
    mapObject: null,
    setMapObject: (val = {}) => {},
    hexSideLength: 360,
    setHexSideLength: (val = 180) => {},
    importFromLocalStorage: () => {},
    exportToLocalStorage: () => {},
    exportToJson: () => {},
});
starLogContext.displayName = 'StarLogContext';
