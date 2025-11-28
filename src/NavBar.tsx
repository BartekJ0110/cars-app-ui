import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";


export default function NavBar() {
    return(
        <Menu inverted fixed="top" style={{ width: '100%' }}>
            <Container  className="header-container" style={{width:'100%', display:'flex'}}>
                <Menu.Item as={NavLink} to='/cars' style={{ width: '33%' }}>
                    <Button
                        content="Wszystkie Auta"
                        size="large"
                        style={{ borderRadius: '0px', padding: '10px 20px', width:'100%', fontSize:'23px'}}
                    />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/' header style={{ width: '34%' }}>
                    <Button
                        content="Strona Główna"
                        size="large"
                        style={{ borderRadius: '0px', padding: '10px 20px', width:'100%',fontSize:'23px' }}
                    />
                </Menu.Item>
                <Menu.Item as={ NavLink } to='/add' style={{ width: '33%' }}>
                    <Button
                        content="Dodaj Auto"
                        size="large"
                        style={{ borderRadius: '0px', padding: '10px 20px', width:'100%', fontSize:'23px' }}
                    />
                </Menu.Item>
            </Container>
        </Menu>
    )
}