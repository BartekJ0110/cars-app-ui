import {Link, NavLink} from 'react-router-dom';
import {Button} from "semantic-ui-react";

export default function NotFound() {
    return (<div id='div-not-found' style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Strona nie znaleziona</h1>
            <h2>Powrót do strony głównej:</h2>
            <Button as={NavLink} to='/' className='przycisk' style={{ marginTop: '10px', marginBottom: '10px' , fontSize: '20px' }}>
                Strona Główna
            </Button>
        </div>
    )
}