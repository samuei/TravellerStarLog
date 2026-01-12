import { createContext } from 'react';

export const starlogContext = createContext({
    appMode: 'menu',
    setAppMode: () => {},
    mapObject: null,
    setMapObject: () => {},
    hexSideLength: 360,
    setHexSideLength: () => {},
});
starlogContext.displayName = 'StarlogContext';
