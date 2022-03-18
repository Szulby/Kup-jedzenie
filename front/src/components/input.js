import { useState } from 'react'
import styled from 'styled-components'
import { withRouter } from "react-router"
import { CgSearch } from 'react-icons/cg'

const Inputs = styled.input`
    box-sizing:border-box;
    width:450px;
    height: 40px;
    border: 1px solid #cfcfcf;
    border-radius: 30px;
    text-align:left!important;
    padding: 0 110px 0 10px;
    &:focus {
        outline: none;
        box-shadow: 0px 3px 5px -5px rgba(66, 68, 90, 1);
    }
    @media(max-width: 1200px) {
        width: 350px;
    }
    @media(max-width: 767px) {
        width: 100%;
        padding:0;
        padding-left: 10px;
    }
`
const InputContainer = styled.div`
    background:white;
    position:relative;
    button {
        position:absolute;
        right:4px;
        background:#006620;
        border: 0;
        color:white;
        top:50%;
        transform: translateY(-50%);
        width: 100px;
        height: 83%;
        border-radius: 30px;
        cursor:pointer;
        svg {
            width: 20px;
            height: auto;
            margin-top:3px;
        }
    }
    @media(max-width:991px) {
        display:none;
    }
`
function Input({ toggle, history }) {
    const url = new URL(window.location.href)
    let query = url.searchParams.get('query')
    const [search, handleSearch] = useState(query ? query : '')
    const [clear, shouldClear] = useState(false)
    if (!clear && !query) {
        shouldClear(true)
        handleSearch('')

    }

    function handleSubmit(e) {
        if (e.key === 'Enter' && search) {
            shouldClear(false)
            history.push("/search?query=" + search)
            if (window.innerWidth < 600) toggle()
        }
    }
    function handleSubmitButton() {
        shouldClear(false)
        history.push("/search?query=" + search)
        if (window.innerWidth < 600) toggle()
    }
    return (
        <InputContainer>
            <Inputs className="search" type="text" value={search} placeholder="Wyszkaj produkt" onChange={e => handleSearch(e.target.value)} onKeyPress={handleSubmit} />
            <button onClick={handleSubmitButton} aria-label="Right Align">
                <CgSearch />
            </button>
        </InputContainer>
    )
}
export default withRouter(Input)