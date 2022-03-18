import { useEffect, useState, useContext } from "react"
import { Context } from '../store'
import { axiosGet } from "../axios"
import { defColor, greenColor } from '../config'
import styled from 'styled-components'
import { Link } from "react-router-dom"
import Buttons from './cart/buttons'

const CartContainer = styled.div`
    max-height: ${window.innerHeight - 80}px;
    border-radius: 4px;
    background:white;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    .item-container {
        padding: 10px;
        padding-right: 0;
        background: white;
        max-height: ${window.innerHeight - 80 - 163}px;
        border-radius:4px;
    }

    .item-container::-webkit-scrollbar-track {
        background: white;
    }
`

const Item = styled.div`
    display:flex;
    border-bottom: 1px solid grey;
    padding: 5px 0;
    position:relative;
    box-shadow: 0px 3px 5px -5px rgba(66, 68, 90, 1);
    p.title {
        text-align:left;
        margin-top:0;
        font-size:15px;
        color: ${defColor};
    }
`

const Price = styled.p`
    position:absolute;
    bottom: 0;
    right: 120px;
    line-height: 30px;
    font-weight:bold;
    margin:0;
    span {
        font-weight:normal;
        font-size: 12px;
    }
`
const GoToCart = styled.span`
    a {
        display:inline-block;
        border-radius: 4px;
        background: #006620;
        padding: 10px 15px;
        color:white;
        text-decoration: none;
    }
`

const Header = styled.h2`
    background: #006620;
    margin:0;
    border-radius: 4px 4px 0 0;
    line-height: 30px;
    font-size: 22px;
    font-weight: normal;
    color:white;
`
const CartSummary = styled.div`
    background:white;
    padding: 10px 0;
    border-radius: 0 0 4px 4px;
    p {
        margin:0;
        margin-bottom: 10px;
        color: ${defColor};
    }
    .price {
        font-weight: 600;
        span {
            color: ${greenColor};
            font-weight: bold;
        }
    }
`
function DynamicCart() {
    const { state } = useContext(Context)
    const [data, setData] = useState()
    const [total, setTotal] = useState()
    let reduced = ''
    state.cart.forEach(item => {
        reduced += reduced ? ',' + item.id : item.id
    })
    useEffect(() => {
        async function fetchData() {
            const result = await axiosGet('get_cart/' + reduced)
            if (result.data) {
                setData(result.data)
                let total = 0
                result.data.forEach((item, id) => {
                    total += Number(item.price) * state.cart[id].count
                })
                setTotal(total)
            }
        }
        if (reduced)
            fetchData()
        else
            setData(null)
    }, [reduced, state.cart])
    return (
        <CartContainer className="custom-scroll">
            <Header>Koszyk</Header>
            <div className={"item-container " + (data ? "custom-scroll" : "")}>
                {
                    data ?
                        data.map((item, id) => {
                            return (
                                <Item key={id}>
                                    <Buttons id={id} item={item} />
                                    <Price>
                                        <span>{state.cart[id] && state.cart[id].count > 1 ? '(' + item.price.replace('.', ',') + ' zł)' : ''} </span>
                                        {state.cart[id] && (parseFloat(item.price) * state.cart[id].count).toFixed(2).replace('.', ',')} zł
                                    </Price>
                                    <img style={{ width: '80px' }} src={item.img} alt="product name" />
                                    <p className="title">{item.name}</p>
                                </Item>
                            )
                        })
                        : 'Twój koszyk jest pusty'
                }
            </div>

            {
                (data && total) &&
                (
                    <CartSummary>
                        <p>Koszt dostawy: 20zł </p>
                        <p className="price">Razem: <span>{(total + 20).toFixed(2).replace('.', ',')}zł</span></p>
                        <GoToCart>
                            <Link to="/cart">Przejdź do zamówienia</Link>
                        </GoToCart>
                    </CartSummary>
                )
            }
        </CartContainer >
    )
}

export default DynamicCart