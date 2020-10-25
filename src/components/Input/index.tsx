import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { Container, Error } from './style';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons';

interface InputProps extends InputHTMLAttributes<HTMLElement>{
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({name, icon: Icon,...rest}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const { fieldName, defaultValue, error, registerField } = useField(name);
    
    useEffect(() =>{
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return(
        <Container isErrored={!!error} isFocused={isFocused}>
            {Icon && <Icon size={20}/>}
            <input
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                defaultValue={defaultValue}
                ref={inputRef}
            {...rest} />

             {error &&(
            <Error title={error}>
              <FiAlertCircle color="c53030" size={20}/>
            </Error> 
            )}   
        </Container>
    );
}

export default Input;