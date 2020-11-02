import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState{
    token: String;
    user: object;
}

interface LoginCredentials{
    username: string;
    password: string;
}

interface AuthContextData{
    user: object;
    validateLogin(credentials: LoginCredentials): Promise<void>;
    //validateLogout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) =>{

    const [data, setData] = useState<AuthState>( () => {
        const token = localStorage.getItem('@BarberShop:token');
        const user = localStorage.getItem('@BarberShop:user');

        if(token && user){
            return { token, user: JSON.parse(user) };
        }

        return{} as AuthState;
    });

    const validateLogin = useCallback(async({username, password}) =>{
        const response = await api.post('login', {username, password});

        //console.log(response.data);
        const { token, user } = response.data;

        localStorage.setItem('@BarberShop:token', token);
        localStorage.setItem('@BarberShop:user', JSON.stringify(user));

        setData({ token, user });
    }, []);

    // const validateLogout = useCallback(() =>{
    //     localStorage.removeItem('@BarberShop:token');
    //     localStorage.removeItem('@BarberShop:user');
        
    //     setData({} as AuthState);
    // }, []);

    return(
        <AuthContext.Provider value={{ user: data.user, validateLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData{
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};

export { AuthProvider, useAuth};