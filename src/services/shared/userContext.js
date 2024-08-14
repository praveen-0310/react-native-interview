import { createContext } from 'react';

const UserContext = createContext({
    myGoldBalance: {},
    setMyGoldBalance: () => { },

});

export default UserContext;