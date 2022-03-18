import styled from "styled-components"
import { axiosGet } from '../axios'
import { useParams } from "react-router"
import { useState, useEffect, useCallback } from "react"
import OrderTable from "./orderTable"
import AdminBoiler from "./adminBoiler"
import { useContext } from "react"
import { Context } from "../store"
import { Redirect } from 'react-router-dom'

const TableContainer = styled.div`
    width: 100%;
    @media(max-width: 1200px) {
        overflow:scroll;
    }
`

const Table = styled.table`
    border-spacing: 0;
    width: 100%;
    cursor:pointer;
    thead {
        th{
            border-bottom: 1px solid black;
            padding: 10px;
            white-space:nowrap;
            text-align:center;
        }

    }
    tbody {
        td {
            padding: 10px;
            white-space:nowrap;
            text-align:center;
            img {
                width: 100px;
            }
        }
        tr:nth-child(even) {
            background:#e3e3e3;
        }
    }
`
function AdminOrder() {
    const { state, dispatch } = useContext(Context)

    const id = useParams().id

    const [orderTarget, getOrderTaget] = useState('')
    const [orderProducts, getOrderProducts] = useState('')
    const [total, setTotal] = useState()
    const order = useCallback(async function getOrder() {
        const res = await axiosGet('/order/' + id, state.token)
        if (res.data)
            getOrderTaget(res.data.data)
        else {
            dispatch({ action: 'remove_token' })
        }
    }, [id, state.token, dispatch])
    useEffect(() => {
        let isMount = true
        async function getProducts() {
            const res = await axiosGet('/order_products/' + id)
            getOrderProducts(res.data)
            if (isMount)
                setTotal(() => {
                    if (res.data.length === 1) {
                        return res.data[0].price * res.data[0].count
                    }
                    return res.data.reduce((acc, cur, id) => {
                        if (id === 1) return Number(acc.price) * acc.count + Number(cur.price) * cur.count
                        return acc + Number(cur.price) * cur.count
                    })
                })
        }
        getProducts()
        order()
        return () => isMount = false
    }, [order, id])
    return (
        <AdminBoiler>
            {!state.token ? <Redirect to='/admin/login' /> :
                <>
                    <p style={{ fontSize: '15px', fontWeight: 'bold' }}>Zamówienie</p>
                    {orderTarget &&
                        <>
                            <OrderTable data={orderTarget} setSendRequests={order} token={state.token} />
                            {orderTarget[0].info &&
                                <>
                                    <p style={{ fontWeight: 'bold', margin: '50px 0 15px' }}>Informacja dla kuriera:
                                        <span style={{ fontWeight: 'normal' }}> {orderTarget[0].info}</span>
                                    </p>
                                </>
                            }
                            {orderTarget[0].delivery &&
                                <>
                                    <p style={{ fontWeight: 'bold', margin: '50px 0 15px' }}>Preferowana pora dostawy:
                                        <span style={{ fontWeight: 'normal' }}> {orderTarget[0].delivery}</span>
                                    </p>
                                </>
                            }
                        </>
                    }

                    <p style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '50px' }}>Produkty</p>
                    {orderProducts &&
                        <TableContainer >
                            < Table cellspacing="0" >
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>id kategorii</th>
                                        <th>produkt id</th>
                                        <th>nazwa prod.</th>
                                        <th>ilość</th>
                                        <th>cena</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderProducts.map((item, id) =>
                                        <tr key={id}>
                                            <td><img src={item.img} alt="img" /></td>
                                            <td>{item.category_id}</td>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.count}</td>
                                            <td>{item.price}</td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td colSpan="4" />
                                        <td>razem za produkty</td>
                                        <td>{total} zł</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4" />
                                        <td>z dostawa</td>
                                        <td>{(total + 20).toFixed(2)} zł</td>
                                    </tr>
                                </tbody>
                            </Table >
                        </TableContainer>
                    }
                </>
            }
        </AdminBoiler>
    )
}

export default AdminOrder