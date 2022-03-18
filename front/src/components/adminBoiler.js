import styled from 'styled-components'
import { Link } from "react-router-dom"
import { Context } from '../store'
import { useContext } from 'react'

const H1 = styled.h1`
margin-left: 50px;
margin-top: 50px;
@media (max-width: 1200px) {
    margin-left: 15px;
    margin-top: 15px;
    font-size: 20px;
}
`
const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
    margin-bottom: 50px;
`
const Header = styled.header`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 0 50px;
    @media (max-width: 767px) {
        padding: 0 15px;
    }
`
function AdminBoiler({ children }) {
    const { state } = useContext(Context)
    return <>
        <Header>
            <Link to="/admin"><H1>Admin panel</H1></Link>
            {state.token && <Link to="/admin/logout">Wyloguj</Link>}
        </Header>
        <Container>
            {children}
        </Container>
    </>
}

export default AdminBoiler