import React, {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {BodyTypeMap, Car, FuelTypeMap} from "./Models/Car";
import {Button} from "semantic-ui-react";
import {UserDto} from "./Models/User";

export default function CarAdd() {
    const navigate = useNavigate();
    const [userDto, setUserDto] = useState<UserDto>({
        displayname: sessionStorage.getItem("displayname") || '',
        token: sessionStorage.getItem("token") || '',
        username: sessionStorage.getItem("username") || ''
    })
    const [car, setCar] = useState<Car>({
        id: undefined,
        brand: '',
        model: '',
        doorsNumber: 0,
        laggageCapacity: 0,
        engineCapacity: 0,
        fuelType: FuelTypeMap[0],
        productionDate: new Date().toISOString(),
        carFuelConsumption: 0,
        bodyType: BodyTypeMap[0],
    });
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        let finalValue: string | number = value;
        if (name === 'fuelType' || name === 'bodyType') {
            finalValue = value === "" ? 0 : parseInt(value, 10);
        }
        setCar({ ...car, [name]: finalValue });
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (car) {
            try{
                await axios.post(`http://localhost:5179/api/Cars`, car,{headers: {Authorization: 'Bearer ' + userDto.token},},);
                alert(`Samochód dodano pomyślnie!`);
                navigate('/cars');
            }
            catch (e : any){
                if (axios.isAxiosError(e)){
                    if (e.response?.status == 401){
                        window.alert('Nieautoryzowany dostęp. Proszę się zalogować.');
                        navigate('/login');
                    }
                    else {
                    alert(e.toString());}
                }
                else {
                    alert(e.toString());
                }
            }
        }
    }
    return(
        <div style={{textAlign:'center'}}>
            <div className='div-tittle'>
                <h1 className='listH1'>Dodaj Samochód</h1>
            </div>
            <form onSubmit={handleSubmit} style={{display: 'inline-block', textAlign: 'left'}}>
                Marka: <br /><input name='brand' onChange={handleChange} value={car.brand} />
                <br />
                Model:<br /> <input name='model' onChange={handleChange} value={car.model} />
                <br />
                Liczba drzwi: <br /><input name='doorsNumber' onChange={handleChange} value={car.doorsNumber} />
                <br />
                Pojemność bagażnika (litry):<br /> <input name='laggageCapacity' onChange={handleChange} value={car.laggageCapacity} />
                <br />
                Pojemność silnika (cc):<br /> <input name='engineCapacity' onChange={handleChange} value={car.engineCapacity} />
                <br />
                Typ paliwa:<br />
                <select name='fuelType' style={{fontSize:'15px', marginTop:'5px', marginBottom:'7px'}} onChange={handleChange} value={car.fuelType}>
                    <option value="">-- Wybierz paliwo --</option>
                    {Object.entries(FuelTypeMap).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                </select>
                <br />
                Data produkcji:<br /> <input type='date' name='productionDate' onChange={handleChange} value={car.productionDate.split('T')[0]} />
                <br />
                Zużycie paliwa (L/100km):<br /> <input name='carFuelConsumption' onChange={handleChange} value={car.carFuelConsumption} />
                <br />
                Typ nadwozia:<br />
                <select name='bodyType' style={{fontSize:'15px', marginTop:'5px', marginBottom:'7px'}} onChange={handleChange} value={car.bodyType}>
                    <option value="">-- Wybierz nadwozie --</option>
                    {Object.entries(BodyTypeMap).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button className='przycisk' style={{width:'75%', marginLeft:'11.5%', fontSize:'15px'}} type='submit'>Wyślij</Button>
            </form>
        </div>
    );
}