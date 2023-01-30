import React, { useState } from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
});
export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [isLoggedIn, setisLoggedIn] = useState(false);

    const loginHandler = (token) => {
        setToken(token);
        setisLoggedIn(true);
    }
    const logoutHandler = () => {
        setToken(null);
        setisLoggedIn(false);
    }

    const contextValue = {
        token: token,
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler

    }


    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}
export default AuthContext;