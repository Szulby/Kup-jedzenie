import styled from "styled-components"
import { useState } from "react"
import { Redirect } from "react-router"
import { axiosGet } from '../axios'

const TableContainer = styled.div`
    @media(max-width: 1200px) {
        overflow:scroll;
    }
`
const Table = styled.table`
    border-spacing: 0;
    width: 100%;
    cursor:pointer;
    thead th {
        border-bottom: 1px solid black;
        padding: 10px;
    }
    tbody {
        td {
            padding: 10px;
            white-space: nowrap;
            text-align:center;
        }
        tr:nth-child(even) {
            background:#e3e3e3;
        }
    }
`

function OrderTable({ data, setSendRequests, isLink, token }) {
    const [redirect, makeRedirect] = useState('')
    const [logout, shouldLogout] = useState(false)

    if (logout) {
        return <Redirect to="/admin/login" />
    }
    function redirectF(e, { order_id }) {
        if (e.target.tagName !== 'SELECT' && isLink) {
            makeRedirect('/admin/order/' + order_id)
        }
    }
    return (
        <>
            {redirect ? <Redirect to={redirect} /> :
                <TableContainer>
                    < Table cellspacing="0" >
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>email</th>
                                <th>imie</th>
                                <th>nazwisko</th>
                                <th>ulica</th>
                                <th>miasto</th>
                                <th>kod</th>
                                <th>created_at</th>
                                <th>updated_at</th>
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, id) => {
                                return (
                                    <tr key={id} onClick={(e) => redirectF(e, item)}>
                                        <td>{item.order_id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.street}</td>
                                        <td>{item.city}</td>
                                        <td>{item.zipcode}</td>
                                        <td>{item.create_at}</td>
                                        <td>{item.update_at}</td>
                                        <td>
                                            <select value={item.status} onChange={(e) => {
                                                axiosGet('change_status/' + item.order_id + '/' + e.target.value, token).then((res) => {
                                                    if (res.data) {
                                                        setSendRequests(Math.random())
                                                    } else {
                                                        shouldLogout(true)
                                                    }
                                                })
                                            }}>
                                                <option value="nowe">nowe</option>
                                                <option value="w trakcie">w trakcie</option>
                                                <option value="gotowe">gotowe</option>
                                                <option value="anulowane">anulowane</option>
                                            </select>

                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table >
                </TableContainer>
            }
        </>
    )
}

export default OrderTable