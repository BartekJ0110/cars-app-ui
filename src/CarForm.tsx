import React, {useEffect, useState } from "react";
import {NavLink, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { Car, FuelTypeMap, BodyTypeMap} from "./Models/Car";
import {Button} from "semantic-ui-react";
import {UserDto} from "./Models/User";

export default function CarForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null | Error>(null);
    const [userDto, setUserDto] = useState<UserDto>({
        displayname: sessionStorage.getItem("displayname") || '',
        token: sessionStorage.getItem("token") || '',
        username: sessionStorage.getItem("username") || ''
    });

    useEffect(() => {
        const fetchCarById = async () => {
            try {
                const response = await axios.get(`http://localhost:5179/api/Cars/${id}`,{headers: {Authorization: 'Bearer ' + userDto.token},},)
                setCar(response.data);
            } catch (e){
                if (axios.isAxiosError(e)){
                    if (e.response?.status == 401){
                        window.alert('Nieautoryzowany dostęp. Proszę się zalogować.');
                        navigate('/login');
                    }
                    else {
                        setError('Błąd podczas pobierania danych');
                    }
                }
                else {
                    setError('Błąd podczas pobierania danych');
                }
            }finally {
                setLoading(false);
            }
        };
        fetchCarById();
    },[id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (car){
            const { name, value } = e.target;
            let finalValue: string | number = value;
            if (name === 'fuelType' || name === 'bodyType') {
                finalValue = value === "" ? 0 : parseInt(value, 10);
            }
            setCar({ ...car, [name]: finalValue });
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (car) {
            try{
                 await axios.put(`http://localhost:5179/api/Cars/${id}`, car);
                alert(`Samochód zaktualizowany pomyślnie!`);
                navigate('/cars');
            }
            catch (e : any){
                alert(e.toString());
            }
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error!:</div>;

    return car ? (
        <div style={{textAlign: "center"}}>
            <div className='div-tittle'>
                <h1 className='listH1'>Edytuj Samochód</h1>
            </div>
            <br />
            <br />
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
            <br />
            <br />
            <div style={{marginBottom:'20px'}}>
                <Button as={NavLink} to='/cars' className='przycisk' style={{padding: '20px'}}>
                    Wróć do listy samochodów
                </Button>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    ) : (<div> No car data </div>)
}