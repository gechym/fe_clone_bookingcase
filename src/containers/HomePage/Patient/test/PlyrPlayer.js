import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";


class PlyrPlayer extends Component {
    constructor(props){
        super(props)
        
    }
    async componentDidMount(){
        
    }

    componentDidUpdate(){

    }

    render() {
        let {src} = this.props 
        return (
            <Plyr source={src} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PlyrPlayer);
