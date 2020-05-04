import React from 'react'
import { connect } from 'react-redux'
import { getVideo, getMoviesId } from '../../selectors'

function Video({src}:any) {
    return ( 
        <iframe  width="100%" height="400" title={src}
            src={`https://www.youtube.com/embed/${src}`} frameBorder="0" allowFullScreen>
        </iframe>
    )
}
const VideoContainer = ({video}:any) => {

    return video ? <Video src ={video.key }/> : null
}
const mapStateToProps = (store:any) => ({
    video:getVideo(store),
    id:getMoviesId(store)

})
export default connect(mapStateToProps)(VideoContainer)
