import React from 'react'
import styled from 'styled-components';
import alternative from '../../alternative.jpg'
import ProgressiveImage from 'react-progressive-image';


const Image = styled.img<{isLoading:boolean}>`
    width:100%;
    height:100%;
    object-position: center;
    pointer-events:none;
    filter: ${props => props.loading ? 'blur(10px)' : 'none'};
    overflow:hidden;
`

interface IImg {
    src:string,
    alt:string,
}
function Img({src,alt}:IImg) {
    const imgPath = `http://image.tmdb.org/t/p/original${src}`
    const tinyImg=  `http://image.tmdb.org/t/p/w200${src}`
    const onError = (e:any) => {
        e.target.src = alternative;
      }
    
    return (
        <ProgressiveImage src={imgPath} placeholder={tinyImg}>

            {(src:string,loading:boolean) => <Image onError={onError} src={src} isLoading={loading} alt={alt}/>}

        </ProgressiveImage>
  )
}

export default Img
