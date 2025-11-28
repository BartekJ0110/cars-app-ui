import React, {useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {BodyTypeMap, Car, FuelTypeMap} from "./Models/Car";
import {NavLink} from "react-router-dom";
import {Button} from "semantic-ui-react";

export default function CarDetails() {
    const { id } = useParams<{id : string}>()
    const [car, setCar] = useState<Car | null>(null)
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCarById = async () => {
            try {
                const response = await axios.get(`http://localhost:5179/api/Cars/${id}`)
                setCar(response.data);
            } catch (e){
                setError('Błąd');
            }finally {
                setLoading(false);
            }
        };
        fetchCarById();
    },[id])

    if (loading) return <div> Loading... </div>;
    if (error) return <div> Error! </div>;

    return(
        <div style={{textAlign:'center'}}>
            <div className='div-tittle'>
            <h1 className='listH1'>Szczegóły</h1>
            </div>
            {car ? (
                <div id='div-car-details' style={{marginLeft:'31.5%'}}>
                    <p>Model: {car.model}</p>
                    <p>Brand: {car.brand}</p>
                    <p>Doors Number: {car.doorsNumber}</p>
                    <p>Luggage Capacity: {car.laggageCapacity} liters</p>
                    <p>Engine Capacity: {car.engineCapacity} cc</p>
                    <p>Fuel Type: {FuelTypeMap[parseInt(car.fuelType)] || 'Unknown'}</p>
                    <p>Production Date: {new Date(car.productionDate).toLocaleDateString()}</p>
                    <p>Car Fuel Consumption: {car.carFuelConsumption} L/100km</p>
                    <p>Body Type: {BodyTypeMap[parseInt(car.bodyType)] || 'Unknown'}</p>
                </div>

            ) : (
                <p>No car details available</p>
            )}
            <br/>
            <br/>
            <br/>
            <Button as={NavLink} to='/cars' className='przycisk' style={{padding: '20px'}}>
                Wróć do listy samochodów
            </Button>
        </div>
    )
}