import styled from "styled-components";


export const Container = styled.div`
`;


export const Header = styled.header`
padding: 32px 0;
background: #808080; 
`;

export const HeaderContent = styled.div`
max-width: 1120px;
margin: 0 auto;
display: flex;
align-items: center;

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

`;

export const Profile = styled.div`
display: flex;
align-items: center;
margin-left: 80px;

svg{
    color: #E0E0E0;
    width: 50px;
    height: 50px;
}

div{
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span{
        color: #E0E0E0;
    }
}

`;

export const Content = styled.main`
    max-width: 1120px;
    margin: 64px auto;
    display: flex;
`;

export const Schedule = styled.div`
    flex: 1;
    margin-right: 120px;

    h1 {
        font-size: 34px;
        color: #FFFFFF;
    }

    p{
        margin-top: 8px;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        font-weight: 500;

        span{
            display: flex;
            align-items: center;
        }

        span + span::before{
            content: '';
            width: 1px;
            height: 12px;
            background: #FFFFFF;
            margin: 0 8px;
        }
    }

`;

export const NextAppointment = styled.div`
    margin-top: 48px;

    >strong{
        color: #E0E0E0;
        font-size: 20px;
        font-weight: 400;
    }

    div{
        background: #85929E; 
        display: flex;
        align-items: center;
        padding: 16px 24px;
        border-radius: 10px;
        margin-top: 24px;
        position: relative;

        &::before{
            position: absolute;
            height: 80%;
            width: 1px;
            left: 0;
            top: 10%;
            content: '';
            background: #FFFFFF;
        }

       > svg{
            color: #E0E0E0;
            width: 50px;
            height: 50px;
        }

       p{
            margin-left: 18px;
            color: #FFFFFF;
        }

        span{
            margin-left: auto;
            display: flex;
            align-items: center;

            svg{
                color: #2E86C1;
                margin-right: 8px;
            }
        }

        
    }
`;

export const Section = styled.section`
    margin-top: 36px;

    >strong{
        color: #E0E0E0;
        font-size: 20px;
        line-height:26px;
        border-bottom: 1px solid #85929E;
        display: block;
        padding-bottom: 16px;
        margin-bottom: 16px;

    }
`;

export const Appointments = styled.div`
    display: flex;
    align-items: center;

    & + div{
        margin-top: 16px;
    }

    span{
        margin-left: auto;
        display: flex;
        align-items: center;

        svg{
            color: #2E86C1;
            margin-right: 8px;
        }
    }

    div{
        flex: 1;
        background: #85929E; 
        display: flex;
        align-items: center;
        padding: 16px 24px;
        border-radius: 10px;
        margin-left: 24px;
        

        svg{
            color: #E0E0E0;
            width: 40px;
            height: 40px;
        }
        
        p{
            margin-left: 18px;
            color: #FFFFFF;
            
        }
    }
`;

export const Calendar = styled.aside`
    width: 300px;
`;

