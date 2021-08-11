import { createContext } from 'react';
import { LocationsStore } from './locationsStore';

const locationsStore = new LocationsStore();

export const store = createContext({
    locationsStore,
});
