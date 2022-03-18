import Header from './header'
import styled from 'styled-components'
import Listing from './listing'
import DynamicCart from './dynamicCart';
import Menu from './menu'

const Page = styled.div`
    display: flex;
    margin-top: 80px;
    background:#fafafa;
    @media (max-width: 767px) {
        margin-top: 50px;
    }    
`

const Main = styled.div`
    margin-left: 350px;
    margin-right: 350px;
    flex: 1 65%;
    max-width: 100%;
    @media (max-width: 1199px) {
        margin-right: 0;
    }
    @media (max-width: 991px) {
        margin:0;
    }
`

const Cart = styled.div`
    flex: 0 20%;
    position:fixed;
    right: 0;
    top: 80px;
    width: 350px;
    padding:0 10px;
    padding-right: 0;
    background:#fafafa;
    @media (max-width:1199px) {
        display:none;
    }
`

export default function Index() {
    return (
        <div style={{ textAlign: 'center' }}>
            <Header />
            <Page>
                <Menu device="desktop" />
                <Main>
                    <Listing />
                </Main>
                <Cart>
                    <DynamicCart />
                </Cart>
            </Page>
        </div>
    )
}
