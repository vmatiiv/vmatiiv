import React from 'react'
import { connect } from 'react-redux'
import { getVideo } from '../../selectors'

function Video({src}:any) {
    return (
        <iframe width="420" height="315"
            src={`https://www.youtube.com/embed/${src}`}>
        </iframe>
    )
}
const VideoContainer = ({video}:any) => {
    return video ? <Video src ={video.key }/> : null
}
const mapStateToProps = (store:any) => ({
    video:getVideo(store)
})
export default connect(mapStateToProps,null)(VideoContainer)
