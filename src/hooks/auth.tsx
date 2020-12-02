import React, { createContext, useCallback, useState, useContext, useEffect} from 'react';
import { object } from 'yup';
import Login from '../pages/Login';
import api from '../services/api';
import {AxiosResponse} from 'axios';

interface UserProps{
    id: number,
    first_name: String,
    last_name: String,
    email: String,
    username: String,
    password: String,
    is_staff: Boolean,
 }

interface AuthState{
    token: string,
    refresh: String,
    user: UserProps,
}

interface loginCredentials{
    username: String;
    password: String;
}

interface AuthContextData{
    token: string,
    refresh: String,
    loading: Boolean,
    login(credentials: loginCredentials): Promise<void>,
    logout(): void,
    user: UserProps,
    updateUser(user: UserProps): void, 
}

 

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) =>{
    const [loading, setLoading] = useState(true);

    const [data, setData] = useState<AuthState>(() =>{
        const token = localStorage.getItem('@BarberShop:token');
        const refresh = localStorage.getItem('@BarberShop:refresh' );
        const user = localStorage.getItem('@BarberShop:user');

        if(token && refresh && user){
            api.defaults.headers.Authorization = `Bearer ${token}`;
            
            return{ token, refresh, user: JSON.parse(user) };
        }
        return {} as AuthState;
    }); 

    

    const login = useCallback(async({username, password}) =>{
        const response = await api.post('login/', {username, password});
    
        //console.log(response);
        const token = response.data.access;
        const refresh = response.data.refresh;
        localStorage.setItem('@BarberShop:token', token);
        localStorage.setItem('@BarberShop:refresh', refresh);
        api.defaults.headers.Authorization = `Bearer ${token}`

        const res = await api.get('/getuser/');
        const user = res.data;
        localStorage.setItem('@BarberShop:user', JSON.stringify(user));
        setData({ token, refresh, user});
    },[]);

    const logout = useCallback(() =>{
        localStorage.removeItem('@BarberShop:token');
        localStorage.removeItem('@BarberShop:refresh');
        localStorage.removeItem('@BarberShop:user');
        setData({} as AuthState);
    }, []);

    const updateUser = useCallback((user: UserProps) =>{
        localStorage.setItem('@BarberShop:user', JSON.stringify(user));
        setData({
            token: data.token,
            refresh: data.refresh,
            user,
        })
    }, [setData, data.token, data.refresh]);
    
    return (
        <AuthContext.Provider value={{ refresh: data.refresh, token: data.token, user: data.user, login, logout, loading, updateUser}}>
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