import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeFooter.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class HomeFooter extends Component {

    render() {
        return (
                <div className="home-footer">
                    &copy; 2021 ABC.xyz.com
                </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter
);
