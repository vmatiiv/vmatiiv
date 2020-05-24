import React from 'react'
import { connect } from 'react-redux'
import { getVideo } from '../../selectors'
import styled from 'styled-components'

const Wrapper = styled.div`
    position:relative;
    margin-bottom:1rem;
    width:100%;

    height:100700px;
    max-height: 400px;
`
const Video = React.memo(({src}:any) => {
    return ( 
        <Wrapper>
            <iframe width="100%" height="100%"   title={src}
                src={`https://www.youtube.com/embed/${src}`} frameBorder="0" allowFullScreen>
            </iframe>
        </Wrapper>
    )
})
const VideoContainer = ({video}:any) => {
    return video ? <Video src ={video.key }/> : null
}
const mapStateToProps = (store:any) => ({
    video:getVideo(store),

})
export default connect(mapStateToProps)(VideoContainer)
