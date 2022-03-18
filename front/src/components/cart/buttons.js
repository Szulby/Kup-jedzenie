import { CgMathPlus, CgMathMinus, CgTrash } from 'react-icons/cg'
import styled from 'styled-components'
import { Context } from '../../store'
import { useContext } from 'react'

const StyledButtons = styled.div`
    display:flex;
    align-items: center;
    position:absolute;
    right: 0;
    bottom: 0;
    cursor: pointer;
    background:#006620;
    color:white;
    width: 80px;
    height: 30px;
    padding: 0 10px;
    justify-content: center;
    p {
        margin:0;
    }
    svg {
        stroke: white;
        width: 20px;
        height: auto;
    }
    .trash {
        position:absolute;
        right: 85px;
        background:red;
        height: 30px;
        width: 30px;
        display:flex;
        align-items:center;
        justify-content:center;
    }

`

function Buttons({ id, item }) {
    const { state, dispatch } = useContext(Context)
    return (
        <StyledButtons>
            <div className="trash" onClick={() => dispatch({ action: 'remove_item', payload: item.id })}>
                <CgTrash />
            </div>
            <CgMathMinus style={{ paddingRight: '10px' }} onClick={() => dispatch({ action: 'decrease', payload: item.id })} />
            <p>{state.cart[id] && state.cart[id].count}</p>
            <CgMathPlus style={{ paddingLeft: '10px' }} onClick={() => dispatch({ action: 'add_item', payload: item.id })} />
        </StyledButtons>

    )
}
export default Buttons