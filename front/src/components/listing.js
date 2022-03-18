import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import { defColor, ip } from '../config'
import { CgMathPlus, CgMathMinus, CgTrash, CgShoppingCart } from 'react-icons/cg'
import { Context } from '../store'
import styled from 'styled-components'

const ListingContainer = styled.div`
    display: flex;
    max-height: ${window.innerHeight - 80}px;
    flex-flow: row wrap;
    justify-content: center;
    align-items:flex-start;
    overflow-y: scroll;
    overflow-x: hidden;
    box-sizing: content-box;
    background:#fafafa;
    @media (max-width: 767px) {
        max-height: ${window.innerHeight - 50}px;
    }
`

const Item = styled.div`
    width: 350px;
    height: 210px;
    margin: 10px;
    background:white;
    display:flex;
    flex-flow: row nowrap;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    border-radius: 4px;
    position:relative;
    z-index: 0;
    overflow:hidden;
    img {
        margin: 15px 10px;
        max-width: 160px;
    }
    @media(max-width:767px) {
        img {
            height: 120px;
        }
    }
    .quantity {
        margin: 0;
        margin-bottom:15px;
    }
    h2 {
        font-size: 14px;
        text-align:left;
        margin-right: 5px;
    }
    .right {
        flex: 1;
        .description {
            p {
                text-align:left;
                font-size: 15px;
                margin: 2px 0;
                margin-right: 5px;
                color: ${defColor};
            }
        }
    }
    .price {
        position:absolute;
        right: 15px;
        bottom: 30px;
        font-weight:bold;
        font-size: 18px;
        color: ${defColor};
    }
`

const BuyContainer = styled.div`
    position:absolute;
    right:0;
    bottom: 0;
    cursor: pointer;
    background:#006620;
    color:white;
    display:flex;
    align-items:center;
    width: 100px;
    height: 40px;
    justify-content: center;
    .add {
        width: 100%;
        height: 100%;
        display:flex;
        justify-content:center;
    }
    svg {
        stroke: white;
        width: 22px;
        height: auto;
    }
    .trash {
        position:absolute;
        right: 105px;
        background:red;
        height: 40px;
        width: 35px;
        display:flex;
        align-items:center;
        justify-content:center;
}
`

function Listing() {
    const url = new URL(window.location.href)
    const { state, dispatch } = useContext(Context)
    const query = url.searchParams.get('query');
    const [ofset, changeOfest] = useState(0)
    const [data, setData] = useState([]);
    let { id } = useParams();
    const [href, updatehref] = useState(url.href)

    useEffect(() => {
        async function FetchData(request) {
            const result = await axios(request)
            setData(() => result.data && result.data.length ? result.data : null)
            updatehref(url.href)
        }
        if (query) {
            FetchData(ip + 'search/' + query + '/0')
        } else if (id) {
            FetchData(ip + 'category/' + id + '/0')
        } else {
            FetchData(ip + 'popular/0')
        }
        changeOfest(0)
    }, [query, id, url.href]);
    function getOfset(e) {
        async function FetchData(request) {
            const result = await axios(request)
            if (result.data.length)
                setData(data.concat(result.data))
        }
        if (e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight) {
            if (query) {
                FetchData(ip + 'search/' + query + '/' + (ofset + 21))
            } else if (id) {
                FetchData(ip + 'category/' + id + '/' + (ofset + 21))
            } else {
                FetchData(ip + 'popular/' + (ofset + 21))
            }
            changeOfest(ofset + 21)
        }
    }
    if (href !== url.href) {
        return ''
    }
    if (data == null) {
        return (
            <div style={{ textAlign: 'center' }}>
                <p style={{ textAlign: 'center' }} >Nie ma szukanego produktu</p>
            </div>
        )
    } else if (data) {
        return (
            <ListingContainer className="custom-scroll" onScroll={getOfset}>
                {data.map((item, id) => {
                    const storeMatch = state.cart.find(i => i.id === item.id)
                    return (
                        <Item key={id} >

                            <div className="left">
                                <img src={item.img} alt={item.name} height="140" />
                                <p className="quantity">{item.quantity}</p>
                            </div>
                            <div className="right">
                                <h2 className="name">{item.name}</h2>
                                <div className="description">
                                    {item.description.split('\n').map((desc, key) => {
                                        return <p key={key}>{desc}</p>
                                    })}
                                </div>
                                <p className="price">{item.price.replace('.', ',')} zł</p>
                                <BuyContainer>
                                    {storeMatch ?
                                        <>
                                            <div className="trash" onClick={() => dispatch({ action: 'remove_item', payload: item.id })}>
                                                <CgTrash />
                                            </div>
                                            <CgMathMinus style={{ padding: '0 10px' }} onClick={() => dispatch({ action: 'decrease', payload: item.id })} />
                                            <p>{storeMatch.count}</p>
                                            <CgMathPlus style={{ padding: '0 10px' }} onClick={() => dispatch({ action: 'add_item', payload: item.id })} />
                                        </>
                                        :
                                        <div className="add" onClick={() => dispatch({ action: 'add_item', payload: item.id })}>
                                            <CgShoppingCart />
                                            <CgMathPlus />
                                        </div>
                                    }
                                </BuyContainer>
                            </div>
                        </Item>

                    )
                })
                }
            </ListingContainer >
        )
    }
    return 'loading'
}

export default Listing