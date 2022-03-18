import AdminBoiler from "./adminBoiler"
import styled from "styled-components"
import { useState, useContext } from "react"
import { axiosPost } from '../axios'
import { Context } from '../store'
import { Redirect } from "react-router"

const Form = styled.form`
    display:flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    .submit {
        margin-top: 10px;
    }
`

function AdminLogin() {
    const [form, setForm] = useState({
        email: 'test',
        password: 'test123'
    })

    const { state, dispatch } = useContext(Context)

    async function submitFunction(e) {
        e.preventDefault()
        const res = await axiosPost('login', {
            data: {
                email: form.email,
                password: form.password
            }
        })
        if (res.data) {
            dispatch({ action: 'set_token', payload: res.data.token })
        }
    }
    return (
        <AdminBoiler>
            {state.token ?
                <Redirect to="/admin" /> :
                <Form onSubmit={(e) => submitFunction(e)}>
                    <label>
                        <p>Username</p>
                        <input type="text" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </label>
                    <div>
                        <input className="submit" type="submit" value="Zaloguj się" />
                    </div>
                </Form>
            }

        </AdminBoiler>
    )
}

export default AdminLogin