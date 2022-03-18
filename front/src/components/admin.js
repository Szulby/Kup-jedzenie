import { useState, useEffect, useContext } from "react"
import OrderTable from './orderTable'
import AdminBoiler from "./adminBoiler"
import { Redirect } from 'react-router-dom'
import { Context } from '../store'
import { axiosGet } from '../axios'

function Admin() {
    const [newOrders, getNewOrders] = useState('')
    const [inProgressOrders, getInProgressOrders] = useState('')
    const [finalOrders, getFinalOrders] = useState('')
    const [canceledOrders, getCanceledOrders] = useState('')
    const { state, dispatch } = useContext(Context)

    const [sendRequest, setSendRequests] = useState()

    useEffect(() => {
        const addr = ['orders/nowe', 'orders/w trakcie', 'orders/gotowe', 'orders/anulowane']
        const stateUpdate = [getNewOrders, getInProgressOrders, getFinalOrders, getCanceledOrders]
        let isMount = true

        async function getOrders(token) {
            for (let i = 0; i < addr.length; i++) {
                const res = await axiosGet(addr[i], token)
                if (res.data && isMount) {
                    stateUpdate[i](res.data.data)
                } else {
                    dispatch({ action: 'remove_token' })
                }
            }
        }
        if (state.token) {
            getOrders(state.token)
        }
        return () => isMount = false
    }, [state.token, dispatch, sendRequest])

    return (
        <>
            <AdminBoiler>
                {!state.token ? <Redirect to='/admin/login' /> :
                    <>
                        <p style={{ fontSize: '15px', fontWeight: 'bold' }}>Zamówienia nowe</p>
                        {newOrders ?
                            (
                                <OrderTable data={newOrders} setSendRequests={setSendRequests} isLink={true} token={state.token} />
                            ) : <p>Nie ma nowych zamówień</p>

                        }
                        <p style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '50px' }}>Zamówienia w trakcie</p>
                        {inProgressOrders ?
                            (
                                <OrderTable data={inProgressOrders} setSendRequests={setSendRequests} isLink={true} token={state.token} />
                            ) : <p>Nie ma nowych zamówień</p>

                        }
                        <p style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '50px' }}>Zamówienia gotowe</p>
                        {finalOrders ?
                            (
                                <OrderTable data={finalOrders} setSendRequests={setSendRequests} isLink={true} token={state.token} />
                            ) : <p>Nie ma nowych zamówień</p>

                        }
                        <p style={{ fontSize: '15px', fontWeight: 'bold', marginTop: '50px' }}>Zamówienia anulowane</p>
                        {canceledOrders ?
                            (
                                <OrderTable data={canceledOrders} setSendRequests={setSendRequests} isLink={true} token={state.token} />
                            ) : <p>Nie ma nowych zamówień</p>

                        }
                    </>
                }
            </AdminBoiler>
        </>
    )

}

export default Admin