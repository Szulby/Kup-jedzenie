import Input from './input'
import { useContext, useState } from 'react'
import { Context } from '../store'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import logo from '../static/logo.png'
import Menu from './menu'
import { RiShoppingBasket2Line } from 'react-icons/ri'
import { CgSearch } from 'react-icons/cg'
import { defColor, greenColor } from '../config'


const HeaderContainer = styled.div`
    z-index: 10;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 50px;
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 5%);
    position:fixed;
    left: 0;
    top: 0;
    background:white;
    width: 100%;
    .shop-icon {
        width: 30px;
        height: 30px;
    }
    .cart-tel {
        display:flex;
        align-items:center;
        position: relative;
        .about {
            white-space: nowrap;
            position:absolute;
            left: -70px;
            font-weight: 600;
            color: ${defColor};
            @media (max-width: 991px) {
                display: none;
            }
        }
        .tel {
            margin-right: 35px;
            white-space: nowrap;
            color: #3c3c3c;
            font-weight:600;
            @media(max-width: 991px) {
                displaY:none;
            }   
        }
    }
    .cart {
        position:relative;
        p {
            position:absolute;
            right:-5px;
            top:-5px;
            padding: 1px 7px;
            background: green;
            color:white;
            border-radius: 50%;
            margin:0;
            font-size:13px;
        }
    }
    h1, input, a {
        flex: 0 12%;
        text-align: center;
    }
    a {
        text-align: right;
        text-decoration:none;
        color:black;
        display:flex;
        justify-content:flex-end;
        svg {
            width: 20px;
            height: 20px;
        }
    }
    h1 {
        line-height :25px;
    }
    .search-btn {
        display:none;
        width: 25px;
        height: 25px;
        margin-left:auto;
        margin-right: 10px;
        @media(max-width: 991px) {
            display:block;
        }
    }
    @media(max-width: 766px) {
        padding: 10px;
    }

`
const HeaderLogoContainer = styled.div`
    display:flex;
    align-items:center;
    z-index: 10;
    .mobile-search {
        display:none;
        @media(max-width: 991px) {
            display:block;
        }
    }
    svg {
        width: 33px;
        height: 33px;
        margin-right: 15px;
    }
    .open {
        display:none;
    }
    @media(max-width: 767px) {
        img.logo {
            width: 100px;
        }
    }
`
const MobileSearch = styled.div`
    width: 100%;
    height: 50px;
    position:fixed;
    left: 0;
    top: 50px;
    z-index:20;
    display:none;
    background:white;
    &.active {
        display: block;
        box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
    &.active div {
        background:white;
        display:block;
        margin: 0 10px;
    }
`
const MobileKategory = styled.button`
    display:none;
    @media(max-width: 991px) {
        background:none;
        border: 2px solid ${greenColor};
        border-radius: 5px;
        position:absolute;
        left:50%;
        top:50%;
        transform: translate(-50%, -50%);
        padding: 5px 10px;
        font-size: 15px;
        font-weight: 600;
        color: ${greenColor};
        display:block;
        &:active {
            box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
        }
    }
`

function Header() {
    const [menu, toggle] = useState(false)
    const [search, toggleSearch] = useState(false)
    const { state } = useContext(Context)
    function menuToggle(e) {
        if (e && menu && !e.target.href) return
        toggle(!menu)
    }
    function toggleMobileSearch() {
        toggleSearch(!search)
        toggle(false)
    }

    return (
        <>
            <HeaderContainer className={search ? 'search' : ''}>
                <HeaderLogoContainer>
                    <Link to="/">
                        <img src={logo} className="logo" alt="Kup jedzenie" width="200" />
                    </Link>
                    <MobileKategory onClick={() => {
                        toggle(!menu)
                        toggleSearch(false)
                    }}>Kategorie</MobileKategory>
                    {menu && <Menu toggle={menuToggle} />}
                </HeaderLogoContainer>
                <Input />
                <CgSearch className="search-btn" onClick={toggleMobileSearch} />
                <div className="cart-tel">
                    <Link className="about" to="/about">O nas</Link>
                    <a href="tel:517619032" className="tel">tel. +48 517 619 032</a>
                    <Link to={{
                        pathname: "/cart", state: { cartState: 1 }
                    }} className="cart"><RiShoppingBasket2Line className="shop-icon" /><p>{state.cart.length}</p></Link>
                </div>
            </HeaderContainer>
            <MobileSearch className={search ? 'active' : ''}>
                <Input toggle={toggleMobileSearch} />
            </MobileSearch>
        </>
    )
}

export default Header