import React, {ChangeEvent, useState} from "react";
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';
import {Button} from "semantic-ui-react";
import { RegisterDto, UserDto } from "./Models/User";

export default function UserReg() {
    const navigate = useNavigate();
    const [regDto, setRegDto] = useState<RegisterDto>({
        email: '',
        password: '',
        displayname: '',
        username: ''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setRegDto({ ...regDto, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        var rePass = document.getElementsByName('re-password')[0] as HTMLInputElement;
        var rePassValue = rePass.value;
        if(regDto.password === rePass.value){
            if (regDto) {
                try {
                    var res = await axios.post(`http://localhost:5179/api/account/register`, regDto);
                    sessionStorage.setItem("token", res.data.token);
                    sessionStorage.setItem("displayname", res.data.displayname);
                    sessionStorage.setItem("username", res.data.username);
                    alert(`Pomyślnie utworzono konto!`);
                    navigate('/');
                } catch (e: any) {
                    alert(e.toString());
                }
            }
        }
        else{
            alert("Hasła nie są identyczne!");
        }
    }

    return (
        <div style={{textAlign:'center'}}>
            <div className='div-tittle'>
                <h1 className='listH1'>Rejestracja</h1>
            </div>
            <form onSubmit={handleSubmit} style={{display: 'inline-block', textAlign: 'left', fontSize:'20px'}}>
                Email: <br /><input type='email' onChange={handleChange} name='email' value={regDto.email} />
                <br />
                Hasło: <br /><input type='password' onChange={handleChange} name='password' value={regDto.password} />
                <br />
                Potwierdź Hasło: <br /><input type='password' name='re-password' />
                <br />
                Nazwa Użytkownika: <br /><input onChange={handleChange} name='displayname' value={regDto.displayname} />
                <br />
                Login: <br /><input onChange={handleChange} name='username' value={regDto.username} />
                <br />
                <br />
                <br />
                <Button className='przycisk' style={{width:'75%', marginLeft:'11.5%', fontSize:'15px'}} type='submit'>Potwierdź Dane</Button>
            </form>
            <br />
            <div className='div-log-reg'>
                <p style={{fontSize:'20px',fontWeight:'bolder',marginBottom:'32px'}}>Masz już konto?</p>
                <Button as={NavLink} to='/login' className='przycisk' style={{padding: '15px',borderRadius:'15px'}} >
                    Zaloguj się
                </Button>
            </div>
        </div>
    )
}