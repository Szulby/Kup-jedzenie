
import styled from "styled-components"
import { defColor } from '../../config'

const Form = styled.form`
    display:flex;
    flex-flow: column;
    align-items:center;
    >div {
        display:flex;
        flex-flow: column;
        width: 100%;
        height: 50px;
        margin: 15px 0;
        position:relative;
        input, textarea, .dostawa-container {
            font-family: arial;
            resize:none;
            height: 100%;
            border: 1px solid #cfcfcf;
            margin:0;
            color: ${defColor};
            padding: 15px;
            font-size: 16px;
            font-weight: 500;
            border-radius: 4px;
            :focus {
                outline: none;
                box-shadow: 0px 3px 5px -5px rgba(66, 68, 90, 1);
            }
        }
        input.error {
            border: 1px solid red;
        }
        p {
            display:none;
        }
        p.error {
            display:block;
            margin-top: 0;
            color:red;
        }
        label {
            color: #999999;
            position:absolute;
            left:15px;
            background:white;
            padding: 0 5px;
            transition: .1s;
            font-size: 15px;
            line-height :15px;
            top: 18px;
            &.focus {
                top: -8px;
            }
        }

    }
    input:focus + label {
        color:red!important;
    }
    .dostawa-container select {
        width: 100%;
    }
`

function CartForm({ setForm, form, formError, setFormError, myRef, changeFixedDiv }) {

    function focus(e, out) {
        if (out) {
            e.target.previousSibling.classList.add('focus')
        } else {
            if (!e.target.value)
                e.target.previousSibling.classList.remove('focus')
        }
    }

    return <Form className="formContainer" ref={myRef}>
        <div>
            <label htmlFor="email" className={form.email && 'focus'}>Adres e-mail</label>
            <input className={formError.email && 'error'} id="email" type="text" value={form.email}
                onBlur={(e) => {
                    focus(e, false)
                    if (window.innerWidth < 992)
                        changeFixedDiv(true)
                }}
                onFocus={e => {
                    focus(e, true)
                    if (window.innerWidth < 992)
                        changeFixedDiv(false)
                }}
                onChange={(e) => {
                    setForm({ ...form, email: e.target.value })
                    focus(e, true)
                    setFormError({ ...formError, email: '' })
                }} />
            <p className={formError.email && 'error'}>* {formError.email}</p>
        </div>
        <div>
            <label htmlFor="firstname" className={form.firstname && 'focus'}>Imię</label>
            <input className={formError.firstname && 'error'} id="firstname" type="text" value={form.firstname}
                onBlur={(e) => {
                    focus(e, false)
                    if (window.innerWidth < 992)
                        changeFixedDiv(true)
                }}
                onFocus={e => {
                    focus(e, true)
                    if (window.innerWidth < 992)
                        changeFixedDiv(false)
                }}
                onChange={(e) => {
                    setForm({ ...form, firstname: e.target.value })
                    focus(e, true)
                    setFormError({ ...formError, firstname: '' })
                }} />
            <p className={formError.firstname && 'error'}>* {formError.firstname}</p>
        </div>
        <div>
            <label htmlFor="lastname" className={form.lastname && 'focus'}>Nazwisko</label>
            <input className={formError.lastname && 'error'} id="lastname" type="text" value={form.lastname}
                onBlur={(e) => {
                    focus(e, false)
                    if (window.innerWidth < 992)
                        changeFixedDiv(true)
                }}
                onFocus={e => {
                    focus(e, true)
                    if (window.innerWidth < 992)
                        changeFixedDiv(false)
                }}
                onChange={(e) => {
                    setForm({ ...form, lastname: e.target.value })
                    focus(e, true)
                    setFormError({ ...formError, lastname: '' })
                }} />
            <p className={formError.lastname && 'error'}>* {formError.lastname}</p>
        </div>
        <div>
            <label htmlFor="street" className={form.street && 'focus'}>Ulica i nr domu</label>
            <input className={formError.street && 'error'} id="street" type="text" value={form.street}
                onBlur={(e) => {
                    focus(e, false)
                    if (window.innerWidth < 992)
                        changeFixedDiv(true)
                }}
                onFocus={e => {
                    focus(e, true)
                    if (window.innerWidth < 992)
                        changeFixedDiv(false)
                }}
                onChange={(e) => {
                    setForm({ ...form, street: e.target.value })
                    focus(e, true)
                    setFormError({ ...formError, street: '' })
                }} />
            <p className={formError.street && 'error'}>* {formError.street}</p>
        </div>
        <div>
            <label htmlFor="phone" className={form.phone && 'focus'}>Telefon</label>
            <input className={formError.phone && 'error'} id="phone" type="text" value={form.phone}
                onBlur={(e) => {
                    focus(e, false)
                    if (window.innerWidth < 992)
                        changeFixedDiv(true)
                }}
                onFocus={e => {
                    focus(e, true)
                    if (window.innerWidth < 992)
                        changeFixedDiv(false)
                }}
                onChange={(e) => {
                    setForm({ ...form, phone: e.target.value })
                    focus(e, true)
                    setFormError({ ...formError, phone: '' })
                }} />
            <p className={formError.phone && 'error'}>* {formError.phone}</p>
        </div>
        <div>
            <label htmlFor="city" className={form.city && 'focus'}>Miasto (Garwolin +10km)</label>
            <input className={formError.city && 'error'} id="city" type="text" value={form.city}
                onBlur={(e) => {
                    focus(e, false)
                    if (window.innerWidth < 992)
                        changeFixedDiv(true)
                }}
                onFocus={e => {
                    focus(e, true)
                    if (window.innerWidth < 992)
                        changeFixedDiv(false)
                }}
                onChange={(e) => {
                    setForm({ ...form, city: e.target.value })
                    focus(e, true)
                    setFormError({ ...formError, city: '' })
                }} />
            <p className={formError.city && 'error'}>* {formError.city}</p>
        </div>
        <div>
            <label htmlFor="zipCode" className={form.zipCode && 'focus'}>Kod pocztowy</label>
            <input className={formError.zipCode && 'error'} id="zipCode" type="text" value={form.zipCode}
                onBlur={(e) => {
                    focus(e, false)
                    if (window.innerWidth < 992)
                        changeFixedDiv(true)
                }}
                onFocus={e => {
                    focus(e, true)
                    if (window.innerWidth < 992)
                        changeFixedDiv(false)
                }}
                onChange={(e) => {
                    setForm({ ...form, zipCode: e.target.value })
                    focus(e, true)
                    setFormError({ ...formError, zipCode: '' })
                }} />
            <p className={formError.zipCode && 'error'}>* {formError.zipCode}</p>
        </div>
        <div style={{ height: 'auto' }}>
            <label htmlFor="info" className={form.info && 'focus'}>Informacja dla kuriera</label>
            <textarea id="info" value={form.info}
                onBlur={(e) => {
                    focus(e, false)
                    if (window.innerWidth < 992)
                        changeFixedDiv(true)
                }}
                onFocus={e => {
                    focus(e, true)
                    if (window.innerWidth < 992)
                        changeFixedDiv(false)
                }}
                onChange={(e) => {
                    setForm({ ...form, info: e.target.value })
                    focus(e, true)
                    setFormError({ ...formError, info: '' })
                }}>
            </textarea>
        </div>
        <div>
            <label htmlFor="delivery" className='focus'>Preferowana godzina dostawy</label>
            <div className="dostawa-container">
                <select name="delivery" id="delivery" value={form.delivery}
                    onBlur={(e) => {
                        if (window.innerWidth < 992)
                            changeFixedDiv(true)
                    }}
                    onFocus={e => {
                        if (window.innerWidth < 992)
                            changeFixedDiv(false)
                    }}
                    onChange={e => {
                        if (window.innerWidth < 992)
                            changeFixedDiv(true)
                        setForm({ ...form, delivery: e.target.value })
                    }} >
                    <option value="Dowolna">Dowolna</option>
                    <option value="8-16">8-16</option>
                    <option value="16-22">16-22</option>
                </select>
            </div>
        </div>
    </Form>
}

export default CartForm