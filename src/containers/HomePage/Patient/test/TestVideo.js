import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import PlyrPlayer from './PlyrPlayer';

import getInforVideo from './getInforVideo';


class TestVideo extends Component {
    constructor(props){
        super(props)
        this.state = {
            src : {
                    type: "video",
                    sources: [
                        {
                            src: 'https://www.googleapis.com/drive/v3/files/1umm1BXVNddEGT7-YbDmdRO5MkY0RLUNw?key=AIzaSyAMLhicKHJG0-jAnwlRaAkFrrZqxTMIeg4&alt=media',
                            type: 'video/mp4',
                            size: 720,
                          },
                          {
                            src: 'https://www.googleapis.com/drive/v3/files/1josdh8v_o1Dg7X3UfLPJweyxTm1RDuMT?key=AIzaSyAMLhicKHJG0-jAnwlRaAkFrrZqxTMIeg4&alt=media',
                            type: 'video/mp4',
                            size: 1080,
                          },
                    ],
                    poster: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
                    // tracks: [
                    //     {
                    //       kind: 'captions',
                    //       label: 'English',
                    //       srclang: 'en',
                    //       src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
                    //       default: true,
                    //     },
                    //     {
                    //       kind: 'captions',
                    //       label: 'French',
                    //       srclang: 'fr',
                    //       src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
                    //     },
                    //   ],
                }
        }
    }
    async componentDidMount(){
        // let res = await getInforVideo.getSrcVideo();
        // console.log(res)
    }

    componentDidUpdate(){

    }

    render() {
        return (
        <div style={{width:'100vw', height:'100vh', backgroundColor:'#35363A'}}>
            <div className="container" style={{width:'800px'}}>
                <PlyrPlayer src={this.state.src}/>
            </div> 
        </div>    
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestVideo);
