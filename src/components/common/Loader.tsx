import React from 'react'
import styled from 'styled-components'
import loader from '../../loader.svg'
const Center = styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
`
function Loader() {
    return (
        <Center>
            <img src={loader} alt="loader"/>
        </Center>
    )
}

export default Loader
