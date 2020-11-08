import React, { createContext, useCallback, useState, useContext, useEffect} from 'react';
import Login from '../pages/Login';
import api from '../services/api';

interface AuthState{
    token: String,
    refresh: String;
}

interface loginCredentials{
    username: String;
    password: String;
}

interface AuthContextData{
    //token: String,
    refresh: String,
    loading: Boolean,
    login(credentials: loginCredentials): Promise<void>,
    logout(): void,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) =>{
    const [loading, setLoading] = useState(true);

    // useEffect(() =>{
    //     const token = localStorage.getItem('@BarberShop:token');

    //     if(token){
    //         api.defaults.headers.Authorization = `Bearer ${token}`;
    //     }
    //     setLoading(false);
    // }, []);

    const [data, setData] = useState<AuthState>(() =>{
        const token = localStorage.getItem('@BarberShop:token');
        const refresh = localStorage.getItem('@BarberShop:refresh' );
        //setLoading(true);
        if(token && refresh){
            api.defaults.headers.Authorization = `Bearer ${token}`;
            //setLoading(false);
            return{ token, refresh };
        }

        
       
        return {} as AuthState;
    }); 

    

    const login = useCallback(async({username, password}) =>{
        const response = await api.post('login/', {username, password});

        console.log(response);

        const token = response.data.access;
        const refresh = response.data.refresh;
        localStorage.setItem('@BarberShop:token', token);
        localStorage.setItem('@BarberShop:refresh', refresh);
        api.defaults.headers.Authorization = `Bearer ${token}`
        setData({ token, refresh});
    },[]);

    const logout = useCallback(() =>{
        localStorage.removeItem('@BarberShop:token');
        localStorage.removeItem('@BarberShop:refresh');
        
        setData({} as AuthState);
    }, []);
    
    return (
        <AuthContext.Provider value={{ refresh: data.refresh, login, logout, loading}}>
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

export {AuthProvider, useAuth };