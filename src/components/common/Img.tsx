import React from 'react'
import styled from 'styled-components';
import ProgressiveImage from 'react-progressive-image';


const Image = styled.img<{isLoading:boolean,maxWidth?:string}>`
    width:100%;
    height:100%;
    object-position: center;
    max-width: ${props => props.maxWidth || null};
    pointer-events:none;
    filter: ${props => props.loading ? 'blur(10px)' : 'none'};
    overflow:hidden;
    /* border-radius:10px; */
`

interface IImg {
    src:string,
    alt:string,
    maxWidth?:string
}
function Img({src,alt,maxWidth}:IImg) {
    const imgPath = `http://image.tmdb.org/t/p/w400${src}`
    const tinyImg=  `http://image.tmdb.org/t/p/w200${src}`

    return (
        <ProgressiveImage src={imgPath} placeholder={tinyImg}>

            {(src:string,loading:boolean) => <Image src={src} maxWidth={maxWidth} isLoading={loading} alt={alt}/>}

        </ProgressiveImage>
  )
}

export default Img
