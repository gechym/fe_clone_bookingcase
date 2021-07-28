import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from "react-slick";
import './Speciality.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import specialityImg from "../../../assets/speciality/co-xuong-khop.jpg"
                        

class Speciality extends Component {
    render() {
        var settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // autoplay: true,
            // speed: 2000,
            // autoplaySpeed: 2000,
            // cssEase: "linear"
          };
        return (
            <div className="section-specialitry">
                <div className="speciality-container">
                    
                    <div className="speciality-header">
                        <span className="title-section">Chuyên khoa phổ biến</span>
                        <button className="button-section">Xem thêm</button>
                    </div>

                    <div className="speciality-body">
                        <Slider {...settings}>
                            <div className="speciality-customize">
                                <div className="bg-img"></div>
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className="speciality-customize">
                                <div className="bg-img"></div>
                                <div>Cơ xương khớp 2</div>
                            </div>
                            <div className="speciality-customize">
                                <div className="bg-img"></div>
                                <div>Cơ xương khớp 3</div>
                            </div>
                            <div className="speciality-customize">
                                <div className="bg-img"></div>
                                <div>Cơ xương khớp 4</div>
                            </div>
                            <div className="speciality-customize">
                                <div className="bg-img"></div>
                                <div>Cơ xương khớp 5</div>
                            </div>
                            <div className="speciality-customize">
                                <div className="bg-img"></div>
                                <div>Cơ xương khớp 6</div>
                            </div>
                        </Slider>
                    </div>
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
