import React from 'react';
import { 
    Route as ReactDOMRoute,    
    RouteProps as ReactDOMRouteProps,
    Redirect
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
 
interface RouteProps extends ReactDOMRouteProps{
    isEmployee?: boolean;
    isClient?: boolean;
    component: React.ComponentType;
}
const Route: React.FC <RouteProps> = ({ isEmployee = false, isClient = false, component: Component, ...rest}) =>{
   const { refresh } = useAuth();
   
        return(
            <ReactDOMRoute
                {...rest}
                
                render={({ location }) =>{
                    return isEmployee === !!refresh ?(
                        <Component/>
                    ) : (
                        <Redirect 
                            to={{ pathname: isEmployee ? '/' : '/dashboard',
                            state: { from: location },
                            }}
                        />
                    )
                }}
            />
        );
};

export default Route;