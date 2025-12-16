import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserDto} from "./Models/User";
import {Button} from "semantic-ui-react";


export default function HomePage() {
    const [userDto, setUserDto] = useState<UserDto>({
        displayname: sessionStorage.getItem("displayname") || '',
        token: sessionStorage.getItem("token") || '',
        username: sessionStorage.getItem("username") || ''
    });
    const navigate = useNavigate();
    const logoutFun =  () => {
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("displayname");
        sessionStorage.removeItem("token");
        setUserDto({
            displayname: '',
            token: '',
            username: ''
        });
    }
    const redirLog = () =>{
        navigate('/login');
    }
    if (!userDto.token || userDto.token === '') {return(
        <div>
            <div className="div-tittle" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1 id="home-tittle">Baza Samochodów!</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button className='przycisk' style={{fontSize:'20px'}} onClick={redirLog}>Zaloguj</Button>
            </div>
        </div>
    );}
    else {
        return (
            <div>
            <div className="div-tittle" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1 id="home-tittle">Baza Samochodów!</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button className='przycisk' style={{fontSize:'20px'}} onClick={logoutFun}>Wyloguj</Button>
            </div>
            </div>
        );
    }
}
