import { createContext } from 'react';

export const starLogContext = createContext({
    appMode: 'menu',
    setAppMode: () => {},
    mapObject: null,
    setMapObject: () => {},
    hexSideLength: 360,
    setHexSideLength: () => {},
});
starLogContext.displayName = 'StarLogContext';
