import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import Index from './components/index'
import Store from './store'
import Cart from './components/cart'
import Admin from './components/admin'
import AdminOrder from './components/adminOrder'
import AdminLogin from './components/adminLogin'
import About from './components/about'
import AdminLogout from './components/adminLogout'

function App() {
    return (
        <Store>
            <Router>
                <Switch>
                    <Route path="/category/:id" children={<Index />} />
                    <Route path="/search" children={<Index />} />
                    <Route path="/cart" children={<Cart />} />
                    <Route path="/admin/login" children={<AdminLogin />} />
                    <Route path="/admin/logout" children={<AdminLogout />} />
                    <Route path="/admin/order/:id" children={<AdminOrder />} />
                    <Route path="/admin" children={<Admin />} />
                    <Route path="/about" children={<About />} />
                    <Route path="/" children={<Index />} />
                </Switch>
            </Router>
        </Store>
    )
}

export default App
