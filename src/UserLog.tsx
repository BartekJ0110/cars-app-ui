import React, {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginDto, UserDto } from "./Models/User";
import {Button} from "semantic-ui-react";


export default function UserLog() {
    const navigate = useNavigate();
    const [loginDto, setLoginDto] = useState<LoginDto>({
        email: '',
        password: ''
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setLoginDto({ ...loginDto, [name]: value });
    }

    const handleSubmit = async (event:React.FormEvent) => {
        event.preventDefault();
        if (loginDto) {
            try{
                var res = await axios.post(`http://localhost:5179/api/account/login`, loginDto);
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("displayname", res.data.displayname);
                sessionStorage.setItem("username", res.data.username);
                alert(`Pomyślnie zalogowano!`);
                navigate('/');
            }
            catch (e : any){
                alert(`Error: ${e}`);
            }
        }
    }

    return (
        <div style={{textAlign:'center'}}>
            <div className='div-tittle'>
                <h1 className='listH1'>Logowanie</h1>
            </div>
            <form onSubmit={handleSubmit} style={{display: 'inline-block', textAlign: 'left', fontSize:'20px'}}>
                Email: <br /><input name='email' onChange={handleChange} value={loginDto.email}/>
                <br />
                Hasło: <br /><input type='password' name='password' onChange={handleChange} value={loginDto.password}/>
                <br />
                <br />
                <br />
                <Button className='przycisk' style={{width:'75%', marginLeft:'11.5%', fontSize:'15px'}} type='submit'>Zaloguj</Button>
            </form>
            <br />
            <div className='div-log-reg'>
                <p style={{fontSize:'20px',fontWeight:'bolder',marginBottom:'32px'}}>Jeśli nie masz jeszcze konta</p>
                <Button as={NavLink} to='/register' className='przycisk' style={{padding: '15px',borderRadius:'15px'}} >
                    Zarejestruj się
                </Button>
            </div>
        </div>
    )
}