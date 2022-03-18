
import Header from './header'
import CartForm from './cart/form'
import styled from 'styled-components'
import { Context } from '../store'
import { useContext, useState, useEffect, useRef } from 'react'
import { defColor, greenColor } from '../config'
import { Link } from 'react-router-dom'
import Buttons from './cart/buttons'
import { useLocation } from 'react-router-dom'
import CartStep from './cart/cartStep'
import { FiCheckCircle } from 'react-icons/fi'
import { axiosGet, axiosPost } from '../axios'

const CartContainer = styled.div`
    max-width: 896px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .left {
        width: 528px;
        box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
        background:White;
        border-radius: 4px;
        padding:15px;
        h3 {
            color: ${greenColor};
            margin: 0;
            border-bottom: 1px solid #f2f2f2;
            padding-bottom: 15px;
            margin-bottom: 10px;
        }
        .item {
            margin-bottom: 20px;
            padding: 15px;
            display:flex;
            position:relative;
            box-shadow: inset 0 -1px 0 0 #f2f2f2;
            img {
                width: 100px;
            }
            .title {
                font-weight: 600;
                color: ${defColor};
                margin-top:0;
                margin-left: 15px;
            }
        }
        .item>div>div {
            display:flex;
        }
    }
    .left.confirmation {
        width: 100%;
        display:flex;
        flex-flow:column;
        align-items:center;
        p {
            text-align:center;
            font-size: 16px;
            font-weight: 600;
            color: ${defColor};
        }
        .icon {
            width: 15%;
            color:${greenColor};
            height: auto;
        }
    }
    .left.empty {
        width: 100%;
    }
    .right {
        width: 344px;
        position:sticky;
        top: 85px;
        .right-content {
            box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
            background:white;
            padding: 15px;
            border-radius: 4px;
            h3 {
                color: ${greenColor};
                margin:0;
                border-bottom: 1px solid #f2f2f2;
                padding-bottom: 15px;
                margin-bottom: 10px;
            }
            p {
                margin: 3px 0;
                display: flex;
                justify-content: space-between;
                color:#3c3c3c;
                span {
                    text-align:right;
                    font-weight:bold;

                }
            }
            p:last-child {
                border-top: 1px solid #f2f2f2;
                padding-top: 10px;
                margin-top: 10px;
                font-size: 18px;
                font-weight: 600;
                span {
                    color: ${greenColor};
                }
            }            
        }
        .right-buttons {
            display:flex;
            align-items:center;
            justify-content:space-between;
            margin-top: 20px;
            .back-to-shop {
                color: ${defColor};
                text-decoration:none;
                font-weight: 600;
                cursor:pointer;
                :hover {
                    text-decoration:underline;
                }
            }
            button {
                border :none;
                padding: 10px 30px;
                background: ${greenColor};
                color: white;
                border-radius: 4px;
                font-size: 20px;
                font-weight:600;
                display:flex;
                align-items:center;
                justify-content:center;
                cursor:pointer;
                :hover {
                    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
                }
                .loader {
                    border: 4px solid ${greenColor}; /* Light grey */
                    border-top: 4px solid white; /* Blue */
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    animation: spin 2s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            }
        }
    }
    .right.empty {
        display:none;
    }
    @media (max-width: 991px) {
        flex-flow: column;
        &.fixed {
            margin-bottom: 0;
            .left {
                margin-bottom: 150px;
            }
            .right {
                position:fixed;
                left:0;
                bottom:0;
                top:auto;
            }
        }
        .left {
            width: 100%;
            margin-bottom: 15px;
        }
        .right {
            width: 100%;
            background:white;
            box-shadow: 0px -5px 10px -10px rgba(66, 68, 90, 1);
            .right-content {
                box-shadow:none;
                padding: 5px;
                h3 {
                    display:none;
                }
                p:last-child {
                    margin-top: 5px;
                    padding-top: 5px;
                }
            }
            .right-buttons {
                margin-top: 0;
                padding: 5px 15px;
            }
        }
    }
`


const Price = styled.p`
    position:absolute;
    bottom: 0;
    right: 120px;
    line-height: 30px;
    font-weight:bold;
    margin:0;
    color: ${defColor};
    span {
        font-weight:normal;
        font-size: 12px;
    }
`
function Cart() {
    const screenHeight = window.screen.height
    const { state, dispatch } = useContext(Context)
    const [data, setData] = useState()
    const [step, setStep] = useState(1)
    const [total, setTotal] = useState()
    const [fixedDiv, changeFixedDiv] = useState(true)
    const myRef = useRef(null)
    const [loader, setLoader] = useState(false)

    const [formError, setFormError] = useState({
        email: '',
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        zipCode: '',
        phone: '',
        info: '',
    })

    const [form, setForm] = useState({
        email: '',
        firstname: '',
        lastname: '',
        street: '',
        city: '',
        zipCode: '',
        phone: '',
        info: '',
        delivery: 'Dowolna'
    })

    const location = useLocation()
    useEffect(() => {
        if (location.state) {
            setStep(location.state.cartState)
        }
    }, [location.state])

    let reduced = ''
    state.cart.forEach(item => {
        reduced += reduced ? ',' + item.id : item.id
    })

    useEffect(() => {
        async function fetchData() {
            const result = await axiosGet('get_cart/' + reduced)
            setData(result.data)
            let total = 0
            result.data.forEach((item, id) => {
                total += Number(item.price.split(' ')[0].split(',').join('.')) * state.cart[id].count
            })
            setTotal(total)
        }
        if (reduced)
            fetchData()
        else
            setData(null)
    }, [reduced, state.cart])

    // const fakeForm = {
    //     email: 'asd@asd.com',
    //     name: 'jan',
    //     surName: 'brzechwa',
    //     street: 'jagodowa 13',
    //     city: 'garwolin',
    //     zipCode: '08-400',
    //     phone: '123123123'
    // }

    function scrollToError(sForm) {
        const arr = Object.entries(sForm)
        const name = arr[arr.findIndex(item => item[1] !== '')][0]
        const ref = myRef.current.querySelector('input#' + name)
        window.scrollTo({ top: window.scrollY + ref.getBoundingClientRect().top - 75, behavior: 'smooth' });
    }
    async function makeOrder() {
        let sForm = { ...formError }
        let shouldReturn = false
        Object.entries(form).forEach(item => {
            if (item[1] === '' && item[0] !== 'info') {
                sForm[item[0]] = 'To pole jest wymagane'
                shouldReturn = true
            }
        })

        //eslint-disable-next-line
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!form.email.match(re)) {
            setFormError({ ...sForm, email: 'Adres email jest nieprawidłowy' })
            scrollToError(sForm)
            return
        }
        if (shouldReturn) {
            setFormError(sForm)
            scrollToError(sForm)
            return
        }
        if (!loader) {
            setLoader(true)
            const res = await axiosPost('order',
                {
                    data: { form: form, products: state.cart }
                }
            )
            if (res.data === 1) {
                setStep(step + 1)
                dispatch({ action: 'clear_cart' })
            }
        }
    }

    return (
        <div>
            <Header />
            <CartStep step={step} setStep={setStep} />
            {step === 1 &&
                <CartContainer className={fixedDiv && 'fixed'}>
                    <div className={"left" + (data ? "" : " empty")}>
                        {data &&
                            <h3>Produkty</h3>
                        }
                        {data ? data.map((item, id) => {
                            return (
                                <div className="item" key={id}>
                                    <img src={item.img} alt="product name" />
                                    <div>
                                        <p className="title">{item.name}</p>
                                        <Buttons id={id} item={item} />
                                        <Price>
                                            <span> {state.cart[id] && state.cart[id].count > 1 ? '(' + item.price.replace('.', ',') + ' zł)' : ''} </span>
                                            {state.cart[id] && (parseFloat(item.price) * state.cart[id].count).toFixed(2).replace('.', ',')} zł
                                        </Price>
                                    </div>
                                </div>
                            )
                        }) :
                            <p style={{ textAlign: 'center' }}>Twój koszyk jest pusty</p>
                        }
                    </div>
                    <div className={"right" + (data ? "" : " empty")}>
                        <div className="right-content">
                            <h3>Twoje zamówienie</h3>
                            <p>Koszyk <span>{total && total.toFixed(2).replace('.', ',')} zł</span></p>
                            <p>Koszt dostawy <span>20 zł</span></p>
                            <p>Do zapłaty <span>{total && (Number(total) + 20).toFixed(2).replace('.', ',')} zł</span></p>
                        </div>
                        <div className="right-buttons">
                            <Link className="back-to-shop" to="/">{'<'} Wróć do zakupów</Link>
                            <button onClick={() => {
                                window.scrollTo(0, 0)
                                setStep(step + 1)
                            }}>Dalej</button>
                        </div>
                    </div>
                </CartContainer>
            }
            {step === 2 &&
                <CartContainer className={fixedDiv && 'fixed'}>
                    <div className="left">
                        <h3>Dane do dostawy</h3>
                        <CartForm form={form} setForm={setForm} formError={formError} setFormError={setFormError} myRef={myRef} fixedDiv={fixedDiv} changeFixedDiv={changeFixedDiv} screenHeight={screenHeight} />
                    </div>
                    <div className={"right" + (data ? "" : " empty")}>
                        <div className="right-content">
                            <h3>Twoje zamówienie</h3>
                            <p>Koszyk <span>{total && total.toFixed(2).replace('.', ',')} zł</span></p>
                            <p>Koszt dostawy <span>20 zł</span></p>
                            <p>Do zapłaty <span>{total && (Number(total) + 20).toFixed(2).replace('.', ',')} zł</span></p>
                        </div>
                        <div className="right-buttons">
                            <p className="back-to-shop" onClick={() => setStep(1)}>{'<'} Wstecz</p>
                            <button
                                onClick={() => {
                                    makeOrder()
                                }}
                                style={{ width: '243px', height: '43px' }}>
                                {loader ? <div className="loader"></div> : 'Potwierdź zakup'}
                            </button>
                        </div>
                    </div>
                </CartContainer>
            }
            {step === 3 &&
                <CartContainer>
                    <div className="left confirmation">
                        <FiCheckCircle className="icon" />
                        <p>Dziękujemy za zakup w naszym sklepie, wkrótce skontaktuje się z Tobą nasz kurier.</p>
                    </div>
                </CartContainer>
            }
        </div >
    )
}

export default Cart