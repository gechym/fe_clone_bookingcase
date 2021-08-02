import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './Speciality.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
                        

class Speciality extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <>
                <div className="section-share section-speciality">
                    <div className="section-container">
                        
                        <div className="section-header">
                            <span className="title-section">Chuyên khoa phổ biến</span>
                            <button className="button-section">Xem thêm</button>
                        </div>

                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                <div className="section-customize">
                                    <div className="bg-img section-speciality"></div>
                                    <div>Cơ xương khớp 1</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-img section-speciality"></div>
                                    <div>Cơ xương khớp 2</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-img section-speciality"></div>
                                    <div>Cơ xương khớp 3</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-img section-speciality"></div>
                                    <div>Cơ xương khớp 4</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-img section-speciality"></div>
                                    <div>Cơ xương khớp 5</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-img section-speciality"></div>
                                    <div>Cơ xương khớp 6</div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
            
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
