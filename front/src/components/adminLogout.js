import { useState, useEffect, useContext } from "react"
import { Context } from '../store'
import { Redirect } from 'react-router-dom'

function AdminLogout() {
    const { dispatch } = useContext(Context)
    const [redirect, shouldRedirect] = useState(false)
    useEffect(() => {
        dispatch({ action: 'remove_token' })
        shouldRedirect(true)
    }, [dispatch])
    return (
        redirect ? <Redirect to="/admin/login" /> : ''
    )
}

export default AdminLogout