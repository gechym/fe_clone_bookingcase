import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import './Speciality.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




class Speciality extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
          };
        return (
            <div className="section-specialitry">
                <div className="speciality-content">
                    <Slider {...settings}>
                        <div className="img-customize">
                            <h1>1</h1>
                        </div>
                        <div className="img-customize">
                            <h1>2</h1>
                        </div>
                        <div className="img-customize">
                            <h1>3</h1>
                        </div>
                        <div className="img-customize">
                            <h1>4</h1>
                        </div>
                        <div className="img-customize">
                            <h1>5</h1>
                        </div>
                        <div className="img-customize">
                            <h1>6</h1>
                        </div>
                    </Slider>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
