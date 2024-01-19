import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'wouter';

function NavBar(){
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand>PP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="me-auto">
                    <Link href='/home' className='nav-link'>INICIO</Link>
                    <Link href='/projects' className='nav-link'>PROYECTOS</Link>
                    <Link href='/projects-types' className='nav-link'>TIPOS DE PROYECTOS</Link>
                    <Link href='/state-project' className='nav-link'>ESTADOS DE PROYECTOS</Link>
                    <Link href='/members' className='nav-link'>PARTICIPANTES</Link>
                    <Link href='/type-members' className='nav-link'>PROFESIÓN</Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar;