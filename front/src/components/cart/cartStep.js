import styled from 'styled-components'
import { greenColor } from '../../config'
import { MdDone, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { useState } from 'react'

const CartStepS = styled.div`
    margin-top: 75px;
    height: 60px;
    width: 100%;
    box-shadow: inset 0 -2px 0 0 #eaf6eb;
    .step-container {
        max-width:896px;
        margin: 0 auto;
        display:flex;
        height: 100%;
        div {
            flex: 1;
            height: 100%;
            display:flex;
            align-items:center;
            justify-content:center;
            color: #3c3c3c;
            font-weight: 600;
            span {
                width: 25px;
                height: 25px;
                background: #eaf6eb;
                color:${greenColor};
                text-align:center;
                line-height: 25px;
                font-size: 15px;
                font-weight:600;
                margin-right: 10px;
                border-radius: 50%;
                span.complete {
                    background: #eaf6eb;
                }
                .svg {
                    width: 20px;
                    height: 25px;
                    color:white;
                }
            }
            span.complete {
                    background: ${greenColor};
                }
        }
        div.active {
            box-shadow: inset 0 -4px 0 0 ${greenColor};
            color: ${greenColor};
        }
        div.complete {
            box-shadow: inset 0 -2px 0 0 ${greenColor};
            color: ${greenColor};
        }
        .mobile-button {
            display:none;
        }
    }
    @media(min-width: 992px) {
        .step-container {
            margin-top: 0!important;
        }
    }
    @media(max-width: 991px) {
        height: 40px;
        overflow:hidden;
        position:relative;
        transition:1s;
        &.active {
            height:120px;
            transition:1s;
            .step-container {
                margin-top:0!important;
            }
        }
        .step-container {
            transition:1s;
            flex-flow:column;
            align-items:flex-start;
            &>div {
                line-height: 40px;
                border:none;
            }
            div.active {
                box-shadow: none;
            }
            div.complete {
                box-shadow: none;
            }
            .mobile-button {
                display:flex;
                position:absolute;
                right:0;
                top:0;

                .arrow {
                    width: 25px;
                    height: 25px;
                }
            }
        }
    }
`


function CartStep({ step, setStep }) {
    const [active, setActive] = useState(false)
    return (
        <CartStepS className={active && "active"}>
            <div className="step-container" style={{ marginTop: '-' + (step - 1) * 40 + 'px' }}>
                <div className={"step-1" + (step === 1 ? " active" : "") + (step > 1 ? " complete" : "")} onClick={() => setStep(1)}>
                    <span className={step > 1 ? "complete" : ""}> {step > 1 ? <MdDone className="svg" /> : "1"}</span>Moje zamówienie
                </div>
                <div className={"step-2" + (step === 2 ? " active" : "") + (step > 2 ? " complete" : "")}>
                    <span className={step > 2 ? "complete" : ""}>{step > 2 ? <MdDone className="svg" /> : "2"}</span>Dostawa
                </div>
                <div className={"step-3" + (step === 3 ? " active" : "") + (step > 3 ? " complete" : "")}>
                    <span>3</span>Podsumowanie
                </div>
                <div className="mobile-button" onClick={() => setActive(!active)}>
                    <p>Krok {step}/3</p>
                    {active ? <MdOutlineKeyboardArrowUp className="arrow" /> : <MdOutlineKeyboardArrowDown className="arrow" />}
                </div>
            </div>
        </CartStepS >
    )
}

export default CartStep