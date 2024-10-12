import { createContext } from 'react';

export const starlogContext = createContext({
    appMode: 'menu',
    setAppMode: () => {},
    mapObject: null,
    setMapObject: () => {},
});
starlogContext.displayName = 'StarlogContext';
