import React from 'react'
import styled from 'styled-components';

const Image = styled.img`
    width:100%;
    height:100%;
    object-position: center;
    overflow:hidden;
    border-radius: 20px  20px 0 0;
`
interface IImg {
    src:string,
    alt:string
}
function Img({src,alt}:IImg) {
    
    return <Image src={src} alt={alt}/>
}

export default Img
