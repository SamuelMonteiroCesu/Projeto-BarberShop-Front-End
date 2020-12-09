import styled from 'styled-components';
import { shade } from 'polished';


export const Container = styled.div`
    height: 100vh;

     > header {
        height: 144px;
        background: #5D6D7E;
        display: flex;
        align-items: center;

        div{
            width: 100%;
            max-width: 1120px;
            margin: 0 auto;
        }
        button{
            margin-left: auto;
            background: transparent;
            border: 0;
        
            svg{
                color: #FFFFFF;
                width: 20px;
                height: 20px;
            }
        }
    }

    button{
        background: #5D6D7E;

        &:hover{
            background: ${shade(0.2, '#5D6D7E')};
        }
    }


`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: -108px auto 0;

    width: 100%;

    form{
        margin: 80px 0 16px;
        width: 340px;
        text-align: center;
    }

    h1{
        color: #FFFFFF;
        margin-bottom: 24px;
        font-size: 20px;
        text-align: left;
    }

`;

export const Passwords = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
    h1{
        margin-top: 16px;
        font-size: 18px;
        color: #FFFFFF;
    }
    form{
        margin: 15px 0 16px;
        width: 340px;
        text-align: center;
    }
`;