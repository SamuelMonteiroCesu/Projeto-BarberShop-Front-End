import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { Container, cpf, datas, currency, hours, Error } from './style';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons';

interface InputProps extends InputHTMLAttributes<HTMLElement>{
    name: string;
    icon?: React.ComponentType<IconBaseProps>;
    mask?: "cpf" | "datas" | "currency" | "hours";

}

const Input: React.FC<InputProps> = ({mask, name, icon: Icon,...rest}) => {
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

    const handlerKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) =>{

        if(mask === "cpf"){
            cpf(e);
        }
        if(mask === "datas"){
            datas(e);
        }
        if(mask === "currency"){
            currency(e);
        }
        if(mask === "hours"){
            hours(e);
        }
    }, [mask]);

    return(
        <Container isErrored={!!error} isFocused={isFocused}>
            {Icon && <Icon size={20}/>}
            <input
                onKeyUp={handlerKeyUp}
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