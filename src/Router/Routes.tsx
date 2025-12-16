import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../App";
import CarList from "../CarList";
import CarDetails from "../CarDetails";
import CarForm from "../CarForm";
import NotFound from "../NotFound";
import HomePage from "../homePage";
import AddCar from "../CarAdd"
import UserLog from "../UserLog";
import UserReg from "../UserReg";


export const routes: RouteObject[] = [{
    path: '/',
    element: <App />,
    children: [
        {path: '', element: <HomePage />},
        {path: 'cars', element: <CarList />},
        {path: 'cars/:id', element: <CarDetails />},
        {path: 'edit/:id', element: <CarForm />},
        {path: 'not-found', element: <NotFound />},
        {path: 'add', element: <AddCar />},
        {path: 'login', element: <UserLog />},
        {path: 'register', element: <UserReg />},
        {path: '*', element: <Navigate to='/not-found' replace />}
    ]
}]

export const router = createBrowserRouter(routes);