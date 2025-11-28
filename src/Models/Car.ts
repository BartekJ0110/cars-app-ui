export enum FuelType {
    Petrol = 'Petrol',
    Diesel = 'Diesel',
    LPG = 'LPG',
    Hybrid = 'Hybrid',
}

export const FuelTypeMap: Record<number, FuelType> = {
    0: FuelType.Petrol,
    1: FuelType.Diesel,
    2: FuelType.LPG,
    3: FuelType.Hybrid,
}

export enum BodyType {
    Sedan = 'Sedan',
    Hetchback = 'Hetchback',
    SUV = 'SUV',
    Coupe = 'Coupe',
    Kombi = 'Kombi',
}

export const BodyTypeMap: Record<number, BodyType> = {
    0: BodyType.Sedan,
    1: BodyType.Hetchback,
    2: BodyType.SUV,
    3: BodyType.Coupe,
    4: BodyType.Kombi,
}

export interface Car {
    id: string | undefined;
    brand: string;
    model: string;
    doorsNumber: number;
    laggageCapacity: number;
    engineCapacity: number;
    fuelType: FuelType;
    productionDate: string;
    carFuelConsumption: number;
    bodyType: BodyType;
}