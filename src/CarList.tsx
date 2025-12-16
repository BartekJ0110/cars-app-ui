import React, {useEffect, useState} from "react";
import axios, {AxiosHeaders} from 'axios';
import { Car, FuelTypeMap, BodyTypeMap } from "./Models/Car";
import { NavLink, useNavigate } from 'react-router-dom';
import {Button, Header} from 'semantic-ui-react';
import {UserDto} from "./Models/User";

export default function CarList() {
    const [cars, setCars] = useState<Car[]>([]);
    const [userDto, setUserDto] = useState<UserDto>({
        displayname: sessionStorage.getItem("displayname") || '',
        token: sessionStorage.getItem("token") || '',
        username: sessionStorage.getItem("username") || ''
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        axios.get<Car[]>('http://localhost:5179/api/cars',{headers: {Authorization: 'Bearer ' + userDto.token},},)
            .then((response) => {
                setCars(response.data);
            })
            .catch((err: unknown) => {
                if (axios.isAxiosError(err)){
                    if (err.response?.status == 401){
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
            })
            .finally(() => setLoading(false));
    },[])

    const handleDelete = async (id: string) => {
        if (!window.confirm('Czy na pewno chcesz usunąć ten samochód?')) return;
        try {
            await axios.delete(`http://localhost:5179/api/cars/${id}`,{headers: {Authorization: 'Bearer ' + userDto.token},},);
            window.alert('Samochód usunięty pomyślnie');
            setCars(cars.filter(car => car.id !== id));
        }
        catch (e) {
            alert('Błąd podczas usuwania samochodu');
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return (
        <div style={{textAlign:'center'}}>
            <div className='div-tittle'>
            <h1 className='listH1' style={{marginBottom:'35px'}}>Lista Samochodów</h1>
            </div>
            <ul style={{listStyle:'none'}}>
                {cars.map(car => (
                    <li key={car.id}>
                        <div id='div-lista'>
                        <h2>{car.brand} {car.model}
                            <Button as={NavLink} to={`/cars/${car.id}`} className='przycisk' style={{marginLeft: '10px'}}>
                                Szczegóły
                            </Button>
                            <Button as={NavLink} to={`/edit/${car.id}`} className='przycisk'>Edytuj</Button>
                            <Button id='del-button' onClick={() => handleDelete(car.id as string)}>Usuń</Button>
                        </h2>
                        <p>Doors: {car.doorsNumber}</p>
                        <p>Luggage Capacity: {car.laggageCapacity} liters</p>
                        <p>Engine Capacity: {car.engineCapacity} cc</p>
                        <p>Fuel Type: {FuelTypeMap[parseInt(car.fuelType)] || 'Unknown'}</p>
                        <p>Production Date: {new Date(car.productionDate).toLocaleDateString()}</p>
                        <p>Fuel Consumption: {car.carFuelConsumption} L/100km</p>
                        <p>Body Type: {BodyTypeMap[parseInt(car.bodyType)] || 'Unknown'}</p>
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}