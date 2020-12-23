
import React from 'react'

import ReactPlayer from 'react-player'

import "./main.css"


class VideoWatching extends React.Component{
    constructor(props){
        super(props)
        
    }


    render(){
        return (
            <div style={{border:'10px solid '+this.props.backgroundColor}}  id="reactPlayer">
            <ReactPlayer width={'100%'} height={'100%'} playing={this.props.isPlaying} url={this.props.videoVal} />
            </div>
        )
    }
}



export default VideoWatching;

